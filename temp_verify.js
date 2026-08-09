const fetch = require('node-fetch');
const fs = require('fs');
(async () => {
  const base = process.env.VERIFY_API || 'http://localhost:5000';
  const results = [];
  try {
    const root = await (await fetch(base)).text();
    results.push({ step:'ROOT', ok:true, detail: root.slice(0,120) });
  } catch (err) {
    results.push({ step:'ROOT', ok:false, error: err.message });
    console.log(JSON.stringify(results, null, 2));
    process.exit(1);
  }

  const email = `autotestdonor${Math.floor(Math.random()*100000)}@test.com`;
  const register = await fetch(`${base}/api/auth/register`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ name:'Auto Test Donor', email, phone:'01700000000', password:'123456', role:'donor' })
  });
  const regData = await register.json();
  results.push({ step:'REGISTER', status: register.status, ok: register.ok, data: regData });
  if (!register.ok) {
    console.log(JSON.stringify(results, null, 2));
    process.exit(1);
  }
  const login = await fetch(`${base}/api/auth/login`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email, password:'123456' })
  });
  const loginData = await login.json();
  results.push({ step:'LOGIN', status: login.status, ok: login.ok, data: loginData });
  if (!login.ok) {
    console.log(JSON.stringify(results, null, 2));
    process.exit(1);
  }
  const token = loginData.token;
  const donation = await fetch(`${base}/api/donations`, {
    method:'POST',
    headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
    body: JSON.stringify({ foodName:'Test Rice', quantity:'5 plates', foodType:'Cooked Food', pickupLocation:'Test Kitchen', description:'Test donation' })
  });
  const donationData = await donation.json();
  results.push({ step:'CREATE_DONATION', status: donation.status, ok: donation.ok, data: donationData });
  if (!donation.ok) {
    console.log(JSON.stringify(results, null, 2));
    process.exit(1);
  }
  const available = await fetch(`${base}/api/donations/available`);
  const availableData = await available.json();
  results.push({ step:'AVAILABLE', status: available.status, ok: available.ok, count: Array.isArray(availableData)?availableData.length:null});
  if (!available.ok) {
    console.log(JSON.stringify(results, null, 2));
    process.exit(1);
  }
  if (availableData.length > 0) {
    const claim = await fetch(`${base}/api/donations/${availableData[0]._id}/claim`, {
      method:'PUT', headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`}
    });
    const claimData = await claim.json();
    results.push({ step:'CLAIM', status: claim.status, ok: claim.ok, data: claimData });
  }
  console.log(JSON.stringify(results, null, 2));
})();
