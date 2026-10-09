---
name: set
description: Set or clear the status line label of this window. Usage - /label:set <text>, /label:set alone clears it.
disable-model-invocation: true
---
The UserPromptSubmit hook has already stored the label. Reply with ONLY this line, no tool, no comment:
Label: $ARGUMENTS
(if $ARGUMENTS is empty: Label cleared)
