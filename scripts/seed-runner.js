/**
 * Optional helper to run seeds from node if needed.
 */
const { execSync } = require('child_process');
try {
  execSync('psql "$DATABASE_URL" -f packages/db/seed.sql', { stdio: 'inherit' });
} catch (e) {
  console.error('seed-runner failed', e.message);
}
