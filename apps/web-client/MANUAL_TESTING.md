# Web Client Manual Testing

## Start From VS Code

1. Open the Mayda frontend monorepo in VS Code.
2. Open a terminal.
3. Run:

```bash
cd apps/web-client
npm run dev
```

You can also run the VS Code task **Web Client: Dev** from the command palette: `Tasks: Run Task`.

Local URL:

```text
http://localhost:3000
```

## Quality Gates

Run these from `apps/web-client` before manual testing:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

There is no dedicated automated test script in `package.json` at this time.

## Routes To Test

- `/`
- `/menu`
- `/cart`
- `/orders`
- `/filters`
- `/login`
- `/signup`

## Menu Checklist

- `/menu` loads without a client crash.
- Menu data appears when the API backend is available.
- Empty or failed menu data does not crash the page.
- Categories/tabs work when menu items are present.
- Search filters visible dish cards when menu items are present.
- Dish cards render images, names, prices, and badges.
- Clicking a dish opens the dish detail modal.
- Quantity controls in the dish detail modal increment and decrement.
- Add to cart from the modal adds the selected quantity.
- Quick add from a menu card adds one item.
- Cart badge/sidebar updates after adding an item.
- Closing the dish detail modal returns to the menu.

## AR Checklist

- Gourmet Burger shows `AR disponible` and a `Voir en AR` action when that dish is present in API data.
- Croissant shows `AR disponible` and a `Voir en AR` action when that dish is present in API data.
- Unsupported dishes show `AR bientôt disponible` and do not open the AR viewer.
- Clicking `Voir en AR` opens the model-viewer modal without crashing the app.
- GLB files are present on the `test` branch under `public/models/demo/`.
- When model files are later added, place them at:
  - `apps/web-client/public/models/demo/burger_merged.glb`
  - `apps/web-client/public/models/demo/croissant.glb`
- After adding real GLB files, retest `Voir en AR` on a mobile browser.

## Cart And Orders Checklist

- Add an item from `/menu`.
- Open the cart sidebar from the cart icon.
- Increase and decrease item quantity.
- Remove an item.
- Add a note from the dish detail modal and confirm it appears in cart.
- Click `Place Order` with the backend available and confirm the success path closes the sidebar and routes to `/orders`.
- With the backend unavailable, confirm checkout shows an error instead of crashing.
- Open `/cart` directly and verify the full cart page renders.
- Open `/orders` and verify the orders page renders; backend availability may affect displayed data.

## Theme Checklist

- Test light mode.
- Test dark mode.
- Use the theme toggle where visible.
- Confirm menu cards, detail modal, cart sidebar, AR modal, auth pages, and route error/loading states remain readable.

## Mobile Browser Testing

1. Start the dev server on your computer.
2. Keep the phone and computer on the same Wi-Fi.
3. Find your computer IP address:

```bash
ip addr
```

On macOS, use:

```bash
ipconfig getifaddr en0
```

4. Open this URL on the phone:

```text
http://<computer-ip>:3000
```

Use a tunnel only if same-network access is not available.

## Known Limitations

- The `test` branch includes `burger_merged.glb` and `croissant.glb` for AR testing.
- iOS Quick Look needs real USDZ files later.
- AR mapping is local/static and currently name-based for the demo dishes.
- The backend does not manage AR model URLs yet.
- No dedicated automated test suite exists in `package.json`.
- Menu, recommendations, checkout, and orders depend on backend API availability through `NEXT_PUBLIC_API_URL`.

## Testing Web AR on Android

### Prerequisites

- Android phone with **Chrome** installed
- **Google ARCore / Google Play Services for AR** installed and updated (Settings → Google → ARCore)
- Computer and phone on the same network (or use ngrok)
- `public/models/demo/burger_merged.glb` and `public/models/demo/croissant.glb` exist

### Steps

1. **Start the dev server**:
   ```bash
   cd apps/web-client
   npm run dev
   ```

2. **Expose with HTTPS using ngrok** (AR requires HTTPS on mobile):
   ```bash
   ngrok http 3000
   ```
   Copy the HTTPS URL (e.g. `https://abc123.ngrok.io`).

3. **Open on Android Chrome**:
   ```
   https://<ngrok-url>/menu
   ```

4. **Find a demo dish**:
   - "Gourmet Burger" (category: mains)
   - "Croissant" (category: starters)
   - Both show an "AR disponible" badge on the card.

5. **Open the dish detail** → tap **Voir en AR**.

6. **In the AR viewer**:
   - The 3D model loads inside `<model-viewer>`.
   - The **visualiseur intégré** (native AR button inside the model-viewer shadow DOM) is available and visible.
   - A custom button **"Voir sur ma table"** is also shown below the 3D viewer. Tap it to programmatically launch AR.
   - If AR launches, the phone camera opens and the model is placed on the table surface.

### If the camera does not open

Use the **🔧 Diagnostic AR (dev)** panel inside the AR modal (development mode only). It shows:

| Check | What to look for |
|---|---|
| Model path | Verify `/models/demo/burger_merged.glb` is correct |
| Protocol | Must be `https:` — HTTP/local IP may not launch AR camera |
| Mobile | Must be `true` — AR requires a mobile device |
| Android | Must be `true` — ARCore only on Android |
| Lib loaded | Must be `true` — model-viewer library registered |

**Direct GLB URL test**: Open this URL in Android Chrome:
```
https://<ngrok-url>/models/demo/burger_merged.glb
https://<ngrok-url>/models/demo/croissant.glb
```
If the GLB downloads, the file is served correctly. If 404, the file is missing or the path is wrong.

### Common issues

| Issue | Cause | Fix |
|---|---|---|
| "AR non disponible" error | Browser does not support WebXR / Scene Viewer | Use Android Chrome, update ARCore |
| Camera does not open on HTTP | HTTPS required for WebXR AR | Use ngrok or deploy to HTTPS |
| Camera does not open on local network IP | Browsers block AR on non-HTTPS | Use ngrok |
| "Échec lancement AR" | `activateAR()` threw | Check Chrome and ARCore version |
| model-viewer shows blank | GLB path wrong or file missing | Check dev diagnostics panel |

### iOS limitation

iOS Quick Look requires **USDZ** files. No USDZ is configured yet. On iOS, the model renders in 3D but AR will not launch. iOS support requires adding `.usdz` model files later.

## Troubleshooting

- Port 3000 already in use: stop the other process or run `npm run dev -- -p 3001` and open `http://localhost:3001`.
- API backend unavailable: set `NEXT_PUBLIC_API_URL` in `.env.local` or start the backend expected by the app. Without it, API-backed pages may show empty, loading, or error states.
- Missing `NEXT_PUBLIC_API_URL`: the app falls back to `http://localhost:8001/api`.
- `model-viewer` not rendering: confirm the browser supports Web Components and check DevTools for module loading errors.
- GLB missing 404: confirm the model exists under `apps/web-client/public/models/demo/` with the exact expected filename.
- Dark mode visual issue: toggle the theme, refresh the route, and verify whether the issue is route-specific or global.
