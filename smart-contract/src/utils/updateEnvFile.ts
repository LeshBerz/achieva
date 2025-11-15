import { writeFileSync, readFileSync } from 'fs';
import path from 'path';

export function updateEnvFile(_path: string[], key: string, value: string): void {
  const envPath = path.resolve(..._path, '.env');
  let envContent = readFileSync(envPath, 'utf8');
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (regex.test(envContent)) {
    envContent = envContent.replace(regex, `${key}=${value}`);
  } else {
    if (envContent && !envContent.endsWith('\n')) {
      envContent += '\n';
    }
    envContent += `${key}=${value}\n`;
  }
  writeFileSync(envPath, envContent);
  console.log(`Saved ${value} for ${key} in .env`);
}
