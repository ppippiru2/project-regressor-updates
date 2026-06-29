# Project Regressor Assets

This folder is the landing zone for future image, VFX, UI, icon, audio, and sprite assets.

Do not paste large images as base64 into JavaScript, JSON save data, or documentation.

Use this workflow:

1. Put new raw files in `assets/inbox/`.
2. Register approved assets in `data/asset-manifest.json`.
3. Connect approved assets to game display slots in `data/asset-slots.json`.
4. Keep source images and processed game images separate.

Current important runtime brand assets:

- `assets/icon.png`: representative install/header icon, generated from the 2026-06-29 rounded blue gate app icon.
- `assets/icons/app-install-192.png`, `assets/icons/app-install-512.png`, `assets/icons/app-install-maskable-512.png`: PWA install icon variants generated from the current app icon.
- `assets/icon-dark.png`: preserved dark-background icon variant synchronized with the current app icon.
- `assets/icon-light.png`: preserved light-background icon source.
- `assets/brand/regressor_gate_start_16x9.jpg`: landscape/desktop start screen key art.
- `assets/brand/regressor_gate_portrait_9x16.jpg`: portrait/mobile start screen key art.
- `assets/brand/regressor_gate_loading_wide_21x9.jpg`: wide runtime/loading backdrop key art.
- `assets/brand/regressor_gate_representative_4x5.jpg`: representative/social/store-style key art.
- `assets/source/brand/`: preserved original source images and previous icon backup files.

See `docs/ASSET_PIPELINE_PLAN_v1.0.md` for the full asset workflow.
