<p align="center">
  <img src="assets/logo.svg" alt="UnixPilot" width="420"/>
</p>

<p align="center">
  <strong>Intelligent UNIX/Linux management agent for Claude Code.</strong><br/>
  <em>A Senior Systems Engineer in your IDE.</em>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"/></a>
  <a href="https://github.com/yourname/unixpilot"><img src="https://img.shields.io/badge/plugin-claude%20code-orange" alt="Claude Code"/></a>
</p>

---

## What is UnixPilot?

UnixPilot is a Claude Code plugin that transforms your AI assistant into a **Senior Linux Systems Engineer**. It activates automatically on shell, dotfile, package, and system administration tasks — and enforces FHS standards, POSIX compliance, safety-first execution, and idempotent operations by default.

Never run a destructive command blindly again. UnixPilot previews, dry-runs, and asks for confirmation before touching `/boot`, block devices, or anything dangerous.

---

## Features

✅ **Auto-activation** on UNIX/Linux topics (shell, bash, zsh, dotfiles, systemd, cron, etc.)  
✅ **FHS-first** — knows the Filesystem Hierarchy Standard by heart  
✅ **POSIX-compliant** — `#!/bin/sh` by default, bash only when necessary  
✅ **Safety-enforced** — dry-run preview + explicit confirmation for destructive ops  
✅ **Idempotent** — every operation is safe to run twice  
✅ **GNU Stow dotfiles** — dedicated `/unixpilot-dotfiles` mode  
✅ **Cross-platform** — Linux, macOS, BSD  
✅ **System detection** — auto-detects distro, package manager, shell  

---

## Install

### Via Claude Code Marketplace (recommended)
```bash
/plugin marketplace add https://unixpilot.pages.dev/marketplace.json
/plugin install unixpilot@unixpilot

```

### Or install with Git
```bash
git clone https://github.com/KiddosTech/UnixPilot.git
cd unixpilot
/plugin add .
```

Then restart Claude Code. UnixPilot is active.

---

## Usage

### Basic activation
Just ask Claude about UNIX/Linux:
> "How do I safely change file permissions on /etc/ssh?"

UnixPilot activates automatically. It will:
1. **Show the command** before running it
2. **Dry-run first** if it's destructive
3. **Ask for confirmation**
4. **Verify the result**

### Explicit commands
Activate manually:
```bash
/unixpilot [task]
/unixpilot-dotfiles stow nvim
```

### Example: Stow dotfiles safely
> "Stow my nvim config from ~/dotfiles/nvim"

```
UnixPilot responds with:
1. Dry-run preview: stow -v -n --no-folding nvim
2. Shows what symlinks would be created
3. Asks: "Proceed?"
4. Runs: stow -v --no-folding nvim
5. Verifies: lists created symlinks
```

---

## Safety Model

UnixPilot **blocks without explicit confirmation**:
- `rm -rf` below user home
- `mkfs`, `fdisk`/`parted` write ops
- `dd if=… of=/dev/sd*` (raw disk writes)
- `chmod 777` on system paths
- Anything touching `/boot`, `/etc/fstab`, `/etc/shadow`, `/etc/sudoers`

Every destructive operation gets:
1. **Inspection** — reads current state first
2. **Explanation** — why this change is needed
3. **Preview** — exact command shown
4. **Dry-run** — executes with `-n` flag first
5. **Confirmation** — "Yes, proceed?" required
6. **Verification** — confirms result matches intent

---

## Requirements

- Claude Code CLI (latest)
- Python 3.7+ (for hook)
- `bash` or `zsh` (for commands)

GNU Stow (optional, needed for `/unixpilot-dotfiles`):
```bash
# Debian/Ubuntu
sudo apt install stow
# Arch
sudo pacman -S stow
# macOS
brew install stow
```

---

## Core Principles

| Principle | Why |
|-----------|-----|
| **FHS-first** | Every path decision follows the Filesystem Hierarchy Standard — no guessing. |
| **POSIX-first** | Default to `#!/bin/sh`, bash only when necessary. Portable = predictable. |
| **Idempotent** | Every operation runs safely twice — no side effects or surprises. |
| **Stdlib before packages** | Never install a package if a built-in tool covers it. |
| **Least privilege** | Suggest `sudo` only for what genuinely needs root. |
| **Show before do** | Every command is previewed and explained before execution. |

---

## Example Skills

### `/unixpilot`
General UNIX/Linux agent. Use for:
- Shell scripting (bash, zsh, fish, sh)
- Dotfiles and symlinks
- Package management (apt, dnf, pacman, brew, nix)
- Systemd services and timers
- Process management (ps, kill, signals)
- File permissions (chmod, chown, ACLs)
- Cron jobs and scheduling
- Networking (iptables, nftables, ip, ss)
- Mounts and filesystems
- SSH, GPG, and key management

### `/unixpilot-dotfiles`
GNU Stow dotfile management. Use for:
- Stowing/unstowing packages
- Preview before apply
- Conflict resolution
- `.config/` tree management

---

## Dry-Run Example

```bash
# UnixPilot shows the command:
$ stow -v -n --no-folding nvim
# Output:
#   LINK: .config/nvim -> ../../dotfiles/nvim/.config/nvim
#   LINK: .local/share/nvim/site -> ../../../dotfiles/nvim/.local/share/nvim/site

# Then asks:
# "This would create 2 symlinks. Proceed? (yes/no)"
```

---

## Contributing

Issues and PRs welcome. Keep changes FHS/POSIX-compliant and safety-first.

Read `.clinerules` before contributing — it defines the non-negotiable safety policy.

---

## License

MIT © UnixPilot Contributors

---

## Roadmap

- [ ] Advanced SELinux/AppArmor mode
- [ ] Encrypted password manager integration
- [ ] Volume/LVM management
- [ ] Network namespace management
- [ ] Container (podman/docker) agent
- [ ] Package signing verification

---

**Made for power users who demand precision, safety, and correctness.**
