from __future__ import annotations

from fastapi import APIRouter, Request

from ..models import ModelDetail, ProviderCapability, DroneInfo
from ._deps import get_colony

router = APIRouter()


@router.get(
    "/v1/providers",
    tags=["Providers"],
    summary="List provider capabilities",
    response_model=list[ProviderCapability],
)
async def providers(request: Request) -> list[ProviderCapability]:
    return get_colony(request).capabilities()


@router.get(
    "/v1/models",
    tags=["Models"],
    summary="List all supported models with chat examples",
    response_model=list[ModelDetail],
)
async def models(request: Request) -> list[ModelDetail]:
    return get_colony(request).model_details()


@router.get(
    "/v1/drones",
    tags=["Drones"],
    summary="List active drones",
    response_model=list[DroneInfo],
)
async def drones(request: Request) -> list[DroneInfo]:
    return get_colony(request).drone_info()
