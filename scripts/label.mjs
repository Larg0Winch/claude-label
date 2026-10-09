// Stores one label per Claude Code session, read back by statusline.mjs.
// Entry 1 (hook UserPromptSubmit): JSON on stdin, catches "/label:set <text>" and "/label <text>". Silent.
// Entry 2 (CLI): node label.mjs <session_id> [text]. Empty text clears the label.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const dir = join(process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude"), ".label-sessions");

let sid, txt;
if (process.argv[2]) { sid = process.argv[2]; txt = process.argv.slice(3).join(" "); }
else {
  let j; try { j = JSON.parse(readFileSync(0, "utf8")); } catch { process.exit(0); }
  const m = /^\s*\/(?:label:set|label)(?:\s+([\s\S]*))?$/.exec(j.prompt ?? "");
  if (!m) process.exit(0);
  sid = j.session_id ?? ""; txt = m[1] ?? "";
}
if (!/^[A-Za-z0-9_-]{1,128}$/.test(sid)) process.exit(0);
txt = txt.trim().slice(0, 60);
const f = join(dir, `${sid}.txt`);
if (txt) { mkdirSync(dir, { recursive: true }); writeFileSync(f, txt); } else rmSync(f, { force: true });
if (process.argv[2]) process.stdout.write(txt ? `Label: ${txt}` : "Label cleared");
