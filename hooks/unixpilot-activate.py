#!/usr/bin/env python3
"""
UnixPilot — SessionStart activation hook.

Runs on every session start:
  1. Detects OS, distro, shell, and package manager.
  2. Loads SKILL.md instructions.
  3. Emits combined context so Claude activates as UnixPilot.
"""
import os
import shutil
import sys
from pathlib import Path

# Allow sibling import
sys.path.insert(0, str(Path(__file__).parent))
from unixpilot_runtime import write_hook_output


def detect_system() -> dict:
    import platform
    info = {
        "os": platform.system(),
        "kernel": platform.release(),
        "arch": platform.machine(),
        "shell": os.environ.get("SHELL", "unknown"),
    }

    if info["os"] == "Linux":
        # Detect distro from /etc/os-release (FHS standard location)
        try:
            text = Path("/etc/os-release").read_text()
            for line in text.splitlines():
                if line.startswith("PRETTY_NAME="):
                    info["distro"] = line.split("=", 1)[1].strip().strip('"')
                    break
        except OSError:
            pass

        # Detect package manager — first match wins
        for pm in ("apt-get", "dnf", "pacman", "zypper", "apk", "xbps-install"):
            if shutil.which(pm):
                info["package_manager"] = pm
                break

    elif info["os"] == "Darwin":
        info["distro"] = "macOS"
        if shutil.which("brew"):
            info["package_manager"] = "brew"

    return info


def load_skill() -> str:
    skill_path = (
        Path(__file__).parent.parent / "skills" / "unixpilot" / "SKILL.md"
    )
    return skill_path.read_text() if skill_path.exists() else ""


def main() -> None:
    sys_info = detect_system()

    distro = sys_info.get("distro", sys_info["os"])
    parts = [f"OS: {distro} {sys_info['kernel']} ({sys_info['arch']})",
             f"Shell: {sys_info['shell']}"]
    if "package_manager" in sys_info:
        parts.append(f"Package manager: {sys_info['package_manager']}")

    sys_context = " | ".join(parts)
    skill_text = load_skill()

    output = f"UNIXPILOT ACTIVE — {sys_context}\n\n{skill_text}"
    write_hook_output("SessionStart", output)


if __name__ == "__main__":
    try:
        main()
    except Exception:
        sys.exit(0)  # Never block session start
