from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field

from .enums import ProviderName


class ProviderCapability(BaseModel):
    """Capability metadata for a registered AI CLI provider."""

    provider: ProviderName = Field(description="Provider identifier.")
    executable: str | None = Field(description="Resolved executable path, or null if not found.")
    enabled: bool = Field(description="Whether this provider is enabled in configuration.")
    available: bool = Field(description="Whether the provider executable was discovered at startup.")
    models: list[str] = Field(description="Configured model identifiers for this provider.")
    supports_resume: bool = Field(description="Whether resume is supported.")
    supports_streaming: bool = Field(description="Whether streaming output is supported.")
    supports_model_override: bool = Field(description="Whether model can be overridden.")
    session_reference_format: str = Field(description="Format of provider session reference.")


class ModelDetail(BaseModel):
    """Detailed information about a single configured model."""

    provider: ProviderName = Field(description="Provider that serves this model.")
    model: str = Field(description="Model identifier used in chat requests.")
    ready: bool = Field(description="Whether the drone is ready to accept requests.")
    busy: bool = Field(description="Whether the drone is currently processing a request.")
    supports_resume: bool = Field(description="Whether this model supports session resume.")
    chat_request_example: dict[str, Any] = Field(description="Example POST /v1/chat body.")


class DroneInfo(BaseModel):
    """Runtime status of a drone process."""

    provider: ProviderName = Field(description="Provider this drone serves.")
    model: str = Field(description="Model this drone is configured for.")
    shell_backend: str = Field(description="Path to the shell executable backing this drone.")
    ready: bool = Field(description="True if the drone shell has started.")
    busy: bool = Field(description="True if the drone is currently processing a request.")
    queue_length: int = Field(description="Number of requests waiting in queue.")
    last_error: str | None = Field(default=None, description="Most recent error message, or null.")


class HealthResponse(BaseModel):
    """System health status."""

    status: Literal["ok", "degraded"] = Field(description="Overall health status.")
    config_path: str = Field(description="Filesystem path of loaded configuration.")
    shell_path: str | None = Field(description="Resolved shell executable path, or null.")
    bash_version: str | None = Field(default=None, description="Bash version string, or null.")
    drones_booted: bool = Field(description="True if all configured drones started successfully.")
    drone_count: int = Field(description="Total number of configured drones.")
    details: list[str] = Field(default_factory=list, description="Error messages from unhealthy drones.")


class CLIVersionStatus(BaseModel):
    """Version and update status for a CLI provider executable."""

    provider: ProviderName = Field(description="Provider this status applies to.")
    executable: str | None = Field(description="Resolved executable path, or null if missing.")
    current_version: str | None = Field(description="Installed version, or null if detection failed.")
    latest_version: str | None = Field(description="Latest available version, or null if lookup failed.")
    needs_update: bool = Field(description="True when installed version is older than latest.")
    last_checked: str | None = Field(default=None, description="ISO-8601 timestamp of most recent check.")
    next_check_at: str | None = Field(default=None, description="ISO-8601 timestamp of next scheduled check.")
    auto_update: bool = Field(default=True, description="Whether auto-update is enabled for this cycle.")
    last_updated: str | None = Field(default=None, description="ISO-8601 timestamp of last successful update.")
    update_skipped_reason: str | None = Field(default=None, description="Reason update was skipped, if any.")

    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "provider": "claude",
                    "executable": "claude",
                    "current_version": "1.0.16",
                    "latest_version": "1.0.17",
                    "needs_update": True,
                    "last_checked": "2026-03-21T12:00:00Z",
                    "next_check_at": "2026-03-21T16:00:00Z",
                    "auto_update": True,
                    "last_updated": None,
                    "update_skipped_reason": "drones busy",
                }
            ]
        }
    )


class ErrorDetail(BaseModel):
    """Standard error response body returned by the API."""

    detail: str = Field(description="Human-readable error message.")
