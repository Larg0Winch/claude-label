# claude-label

An editable label in the [Claude Code](https://code.claude.com) status line, one per window.

Running five Claude Code windows side by side? Name them. Type `/label:set BO mail` in one, `/label:set invoices` in another, and the status line of each window shows `[BO mail]` or `[invoices]`. The label survives `/clear`, is stored per session and never shared between windows.

```
[invoices]
>> accept edits on (shift+tab to cycle)
```

## Install

```
/plugin marketplace add Larg0Winch/claude-label
/plugin install label@claude-label
/label:setup
```

`/label:setup` edits `statusLine` in `~/.claude/settings.json` once. If you already have a status line (a cost meter, a git branch, the caveman badge...), it is kept and the label is appended after it. Restart Claude Code afterwards.

## Use

| Command | Effect |
|---|---|
| `/label:set some text` | shows `[some text]` in the status line of this window |
| `/label:set` | clears it |

Up to 60 characters. The status line refreshes with the conversation, so the label appears after the next message.

## How it works

The Claude Code status line is the output of a shell command, not an interactive widget, so there is no way to click on it and edit it. This plugin uses the two mechanisms that exist:

- a `UserPromptSubmit` hook (`scripts/label.mjs`) catches `/label:set <text>` and writes `~/.claude/.label-sessions/<session_id>.txt`;
- a status line command (`scripts/statusline.mjs`) reads that file for the current session and prints the label, optionally after the output of your previous status line command (`-- <command>`).

Requires Node.js 18+ (present whenever Claude Code runs). Works on Windows, macOS and Linux.

## Manual wiring

If you prefer to edit `settings.json` yourself:

```json
"statusLine": {
  "type": "command",
  "command": "node \"/path/to/claude-label/scripts/statusline.mjs\" -- <your previous command>"
}
```

Drop the `-- ...` part if you had no status line before.

## Credits

Built and offered by [Pacto](https://pacto.global), the platform where companies share a programme's revenue with the freelances who build it. MIT licence.
