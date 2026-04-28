const http = require('http');

const data = JSON.stringify({
  message: 'Congratulations! You won $1,000,000. Click here to claim your prize now!'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/analyze',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
    try {
      const parsed = JSON.parse(body);
      console.log('\nParsed Result:');
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log('Raw response (not JSON):', body);
    }
  });
});

req.on('error', (e) => {
  console.error('Request failed:', e.message);
});

req.write(data);
req.end();
