import fs from 'fs/promises';

const FAIL_IF_EXISTS = fs.constants.COPYFILE_EXCL;

await fs.copyFile('.env.example', '.env', FAIL_IF_EXISTS).catch(() => null);
