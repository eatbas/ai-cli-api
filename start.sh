#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

VENV_DIR=".venv"

# Require Python 3.12+
PYTHON_BIN=""
for candidate in python3.14 python3.13 python3.12; do
  if command -v "$candidate" &>/dev/null; then
    PYTHON_BIN="$candidate"
    break
  fi
done

if [ -z "$PYTHON_BIN" ]; then
  echo "Error: Python 3.12 or newer is required but was not found on PATH."
  echo "Install it via: brew install python@3.12"
  exit 1
fi

# Detect venv Python path (Unix vs Windows)
VENV_PYTHON="$VENV_DIR/bin/python"
[ -f "$VENV_DIR/Scripts/python" ] && VENV_PYTHON="$VENV_DIR/Scripts/python"

# Recreate venv if missing or built with Python < 3.12
if [ -f "$VENV_PYTHON" ] && "$VENV_PYTHON" -c "import sys; exit(0 if sys.version_info >= (3,12) else 1)" 2>/dev/null; then
  : # venv is valid
else
  [ -d "$VENV_DIR" ] && echo "Existing venv has wrong Python version — recreating..." && rm -rf "$VENV_DIR"
  echo "Creating virtual environment..."
  "$PYTHON_BIN" -m venv "$VENV_DIR"
fi

# Activate
if [ -f "$VENV_DIR/Scripts/activate" ]; then
  # Windows (Git Bash / MSYS)
  source "$VENV_DIR/Scripts/activate"
else
  source "$VENV_DIR/bin/activate"
fi

# Install the package if uvicorn isn't available yet
if ! command -v uvicorn &>/dev/null; then
  echo "Installing dependencies..."
  python -m pip install --quiet --upgrade pip
  python -m pip install --quiet -e ".[dev]"
fi

HOST="${HIVE_API_HOST:-127.0.0.1}"
PORT="${HIVE_API_PORT:-8000}"

echo "Checking CLI availability..."
for cli in claude gemini codex kimi copilot opencode; do
  if command -v "$cli" &>/dev/null; then
    echo "  $cli: $(command -v "$cli")"
  else
    echo "  $cli: not found"
  fi
done
echo ""

echo "Starting Hive on http://${HOST}:${PORT}"
exec python -m uvicorn hive_api.main:app --host "$HOST" --port "$PORT"
