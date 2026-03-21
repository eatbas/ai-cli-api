# AI CLI API

Local FastAPI wrapper around warm `bash` workers for `gemini`, `codex`, `claude`, and `kimi`.

## What it does

- starts one warm background bash worker per configured `provider + model`
- accepts API calls over HTTP
- runs the matching CLI inside the already-open bash worker
- streams output back over Server-Sent Events or returns JSON
- keeps no persistent conversation state in the bridge

The caller must send `provider`, `model`, `workspace_path`, and when resuming, the provider-native session reference.

## Quick start

```bash
python -m venv .venv
. .venv/Scripts/activate
pip install -e .[dev]
uvicorn ai_cli_api.main:app --reload
```

Default config is loaded from `config.toml`. Override with `AI_CLI_API_CONFIG=/path/to/config.toml`.

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to use the built-in web test console.

## Config

`config.toml` prewarms workers for the configured provider-model pairs.

- `models = ["default"]` means route requests under the label `default` and omit the provider `--model` flag.
- Any other model string is passed through to the provider CLI unchanged, except for provider-specific legacy aliases such as Codex `codex-5.3`, which is normalized to `gpt-5.3-codex`.
- `default_options.extra_args` is an allowlisted escape hatch for provider-specific flags.

## API

### `GET /health`
Returns health, shell availability, and worker boot state.

### `GET /v1/providers`
Returns provider capabilities and executable discovery results.

### `GET /v1/workers`
Returns the warm worker inventory, status, and queue depth.

### `POST /v1/chat`
Example JSON body:

```json
{
  "provider": "claude",
  "model": "default",
  "workspace_path": "C:\\Github\\ai-cli-api",
  "mode": "new",
  "prompt": "say hello in one word",
  "stream": true
}
```

Resume example:

```json
{
  "provider": "gemini",
  "model": "default",
  "workspace_path": "C:\\Github\\ai-cli-api",
  "mode": "resume",
  "prompt": "say hi in one word",
  "provider_session_ref": "e3c7d445-d2f3-4e61-931f-62d7182902e6",
  "stream": false
}
```

### `POST /v1/test/verify`

Verifies test results across multiple models using keyword matching. Accepts per-model test results (exit codes and resume response text) and checks each against expected keywords (case-insensitive).

A model receives **PASS** when: NEW chat exited 0, RESUME chat exited 0, and every keyword is found in the resume response.

```json
{
  "items": [
    {
      "provider": "claude",
      "model": "sonnet",
      "new_exit_code": 0,
      "resume_text": "Your responsibilities include managing PF, ATM, and Transit.",
      "resume_exit_code": 0,
      "keywords": ["PF", "ATM", "Transit"]
    }
  ]
}
```

### `POST /v1/test/generate-scenario`

Uses the cheapest available model (Claude Haiku or GPT-5.4-mini) to AI-generate test scenario content. Set `field` to `"story"`, `"questions"`, `"expected"`, or `"all"`.

```json
{
  "field": "all",
  "workspace_path": "C:\\Github\\ai-cli-api"
}
```

## Test Lab

The web console includes a **Test Lab** section that runs automated 2-step tests across all configured models in parallel:

1. **NEW** — Sends a "story" prompt to each selected model as a new chat session
2. **RESUME** — Sends a follow-up question to each model, resuming the session from step 1
3. **VERIFY** — Checks the resume response for expected keywords and grades each model PASS/FAIL

Features:
- Run all 9 models in parallel with one click
- Magic buttons to AI-generate test scenarios
- Real-time results table with progressive status updates
- Keyword-based verification (case-insensitive)
