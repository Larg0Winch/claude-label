---
name: setup
description: Wire the label into the Claude Code status line (edits statusLine in ~/.claude/settings.json once).
disable-model-invocation: true
---
Edit the user's `~/.claude/settings.json` (or `$CLAUDE_CONFIG_DIR/settings.json`) so that `statusLine` becomes:

- if no `statusLine` exists yet:
  `{"type":"command","command":"node \"${CLAUDE_PLUGIN_ROOT}/scripts/statusline.mjs\""}`
- if a `statusLine.command` already exists and does not mention `statusline.mjs`, keep it and chain it:
  `node "${CLAUDE_PLUGIN_ROOT}/scripts/statusline.mjs" -- <existing command, verbatim>`
- if it already mentions `statusline.mjs`: nothing to do.

Do not change anything else in the file. Then tell the user in one line: restart Claude Code, then type `/label:set hello`.
