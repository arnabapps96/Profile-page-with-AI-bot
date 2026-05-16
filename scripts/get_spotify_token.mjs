/**
 * SPOTIFY REFRESH TOKEN GENERATOR
 * 
 * Instructions:
 * 1. Ensure you have SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your .env.local
 * 2. Run this script: node get_spotify_token.mjs
 * 3. Follow the URL, log in, and copy the 'code' from the URL you are redirected to.
 * 4. Paste the code back here.
 */

import { createInterface } from 'readline';
import fs from 'fs';
import path from 'path';

// Helper to read .env.local
function getEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  return Object.fromEntries(
    content.split('\n')
      .filter(line => line.includes('='))
      .map(line => {
        const [key, ...val] = line.split('=');
        return [key.trim(), val.join('=').trim()];
      })
  );
}

const env = getEnv();
const client_id = env.SPOTIFY_CLIENT_ID;
const client_secret = env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://127.0.0.1:3000'; // Spotify no longer allows 'localhost' for new apps

if (!client_id || !client_secret) {
  console.error('Error: SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET missing in .env.local');
  process.exit(1);
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const scopes = 'user-read-currently-playing user-read-recently-played';
const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}`;

console.log('\n1. Visit this URL in your browser:\n');
console.log(authUrl);
console.log('\n2. After logging in, you will be redirected to localhost:3000 (it might show an error, that is fine).');
console.log('3. Copy the "code" parameter from the URL in your browser address bar.');

rl.question('\n4. Paste the code here: ', async (code) => {
  try {
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    if (data.refresh_token) {
      console.log('\nSUCCESS! Your Refresh Token is:\n');
      console.log(data.refresh_token);
      console.log('\nAdd this to your .env.local:');
      console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
    } else {
      console.log('\nFailed to get token:', data);
    }
  } catch (error) {
    console.error('Error fetching token:', error);
  } finally {
    rl.close();
  }
});
