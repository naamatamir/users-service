const fs = require('fs');
const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('hex');

fs.writeFile('.env', `JWT_SECRET=${secret}\n`, (err) => {
  if (err) {
    console.error('Failed to write to .env file:', err);
  } else {
    console.log('Secret generated and saved to .env file.');
  }
});

