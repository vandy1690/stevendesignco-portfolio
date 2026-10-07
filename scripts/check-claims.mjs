/* Runs the never-say check (never-say.txt) over every page the Q&A pass covers,
 * rendered by the running site, and over the published docs in public/docs.
 * The page list is qa/config.mjs PAGES, so a new page is covered once Q&A covers it.
 *
 * Usage:  npm run dev   (one terminal)
 *         npm run check:claims
 */
import { spawnSync } from 'node:child_process';
import { LOCAL, PAGES } from '../qa/config.mjs';

const run = (args) => spawnSync('node', ['scripts/check-never-say.mjs', '--list', 'never-say.txt', ...args], { stdio: 'inherit' }).status;
const pages = run(['--url', LOCAL, ...PAGES]);
const docs = run(['--files', 'public/docs']);
process.exit(pages || docs ? 1 : 0);
