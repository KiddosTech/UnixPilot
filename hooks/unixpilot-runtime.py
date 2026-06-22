"""Shared runtime helpers for UnixPilot hooks."""
import json
import os
import sys


def get_host():
    if os.environ.get("COPILOT_PLUGIN_DATA"):
        return "copilot"
    if os.environ.get("PLUGIN_DATA"):
        return "codex"
    return "claude"


def write_hook_output(event: str, context: str = "") -> None:
    host = get_host()
    if host == "copilot":
        out = {"additionalContext": context} if context else {}
        sys.stdout.write(json.dumps(out))
    elif host == "codex":
        out = {"systemMessage": "UNIXPILOT:ACTIVE"}
        if context:
            out["hookSpecificOutput"] = {
                "hookEventName": event,
                "additionalContext": context,
            }
        sys.stdout.write(json.dumps(out))
    else:
        sys.stdout.write(context)
