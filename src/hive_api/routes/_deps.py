from __future__ import annotations

from typing import TYPE_CHECKING

from fastapi import Request

if TYPE_CHECKING:
    from ..colony import Colony
    from ..updater import CLIUpdater


def get_colony(request: Request) -> Colony:
    """Retrieve the Colony from application state."""
    return request.app.state.colony


def get_updater(request: Request) -> CLIUpdater:
    """Retrieve the CLIUpdater from application state."""
    return request.app.state.updater
