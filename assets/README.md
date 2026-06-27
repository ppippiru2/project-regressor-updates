# Project Regressor Assets

This folder is the landing zone for future image, VFX, UI, icon, audio, and sprite assets.

Do not paste large images as base64 into JavaScript, JSON save data, or documentation.

Use this workflow:

1. Put new raw files in `assets/inbox/`.
2. Register approved assets in `data/asset-manifest.json`.
3. Connect approved assets to game display slots in `data/asset-slots.json`.
4. Keep source images and processed game images separate.

Current important runtime icon:

- `assets/icon.png`: representative install/header icon, copied from the dark-background icon.
- `assets/icon-dark.png`: preserved dark-background icon source, currently copied from the 2026-06-28 provided purple-blue emblem.
- `assets/icon-light.png`: preserved light-background icon source.

See `docs/ASSET_PIPELINE_PLAN_v1.0.md` for the full asset workflow.
