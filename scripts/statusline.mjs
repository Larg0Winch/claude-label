// Status line: prints "[label]" for the current session. Optional: chain your previous
// status line command and append the label to its output:
//   node statusline.mjs -- <your previous command...>
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { spawnSync } from "node:child_process";

const dir = join(process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude"), ".label-sessions");
const payload = readFileSync(0, "utf8");
let out = "";
const i = process.argv.indexOf("--");
if (i > 0 && process.argv[i + 1]) {
  const r = spawnSync(process.argv.slice(i + 1).join(" "), { input: payload, encoding: "utf8", shell: true, timeout: 3000, windowsHide: true });
  out = (r.stdout ?? "").replace(/\r?\n$/, "");
}
let sid = "";
try { sid = JSON.parse(payload).session_id ?? ""; } catch {}
const f = join(dir, `${sid}.txt`);
if (/^[A-Za-z0-9_-]{1,128}$/.test(sid) && existsSync(f)) {
  const txt = readFileSync(f, "utf8").replace(/[\x00-\x1f\x7f]/g, "").slice(0, 60);
  if (txt) out += (out ? " " : "") + `\x1b[38;5;110m[${txt}]\x1b[0m`;
}
process.stdout.write(out);
