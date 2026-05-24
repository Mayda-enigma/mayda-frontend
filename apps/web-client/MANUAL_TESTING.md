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
- Current expected limitation: GLB files are not present in `public/models/demo/`, so the viewer may show a missing model or a 404 in DevTools.
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

- `burger_merged.glb` and `croissant.glb` are not present unless they are added later.
- iOS Quick Look needs real USDZ files later.
- AR mapping is local/static and currently name-based for the demo dishes.
- The backend does not manage AR model URLs yet.
- No dedicated automated test suite exists in `package.json`.
- Menu, recommendations, checkout, and orders depend on backend API availability through `NEXT_PUBLIC_API_URL`.

## Troubleshooting

- Port 3000 already in use: stop the other process or run `npm run dev -- -p 3001` and open `http://localhost:3001`.
- API backend unavailable: set `NEXT_PUBLIC_API_URL` in `.env.local` or start the backend expected by the app. Without it, API-backed pages may show empty, loading, or error states.
- Missing `NEXT_PUBLIC_API_URL`: the app falls back to `http://localhost:8001/api`.
- `model-viewer` not rendering: confirm the browser supports Web Components and check DevTools for module loading errors.
- GLB missing 404: confirm the model exists under `apps/web-client/public/models/demo/` with the exact expected filename.
- Dark mode visual issue: toggle the theme, refresh the route, and verify whether the issue is route-specific or global.
