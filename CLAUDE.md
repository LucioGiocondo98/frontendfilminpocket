# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

FilmInPocket — React SPA collectible-card game about cinema (directors, actors, movies). Users open packs, collect cards, build decks, manage their profile; admins create/edit/delete cards. Frontend only; backend is a separate Spring Boot + PostgreSQL project (not in this repo) reachable via `VITE_API_URL`.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint (flat config, `eslint.config.js`)

## Environment

- `.env` needs `VITE_API_URL` (falls back to `http://localhost:8080` if unset — see `src/apiConfig.js`).
- Backend must be running separately for any page that hits the API.

## Architecture

- **Routing**: single `<Routes>` tree in `src/App.jsx`, mounted under `<BrowserRouter>` in `src/main.jsx`. `/` and `/login` are public; most pages are wrapped in `ProtectedRoute`; `/admin/*` pages are wrapped in `AdminRoute`.
- **Auth**: `src/context/AuthContext.jsx` holds `accessToken`/`user` in React state, mirrored to `localStorage` (`accessToken`, `user`). `login()`/`logout()` write both; `refreshUser()` GETs `/users/me` to resync the user object. `ProtectedRoute` (`src/components/ProtectedRoute.jsx`) redirects to `/login` when there's no token; `AdminRoute` (`src/components/AdminRoute.jsx`) additionally requires `user.role === "ROLE_ADMIN"`, else redirects to `/home`.
- **API access**: no shared HTTP client — every page/component calls `fetch` directly against `` `${API_URL}/...` `` (`src/apiConfig.js`), manually attaching `Authorization: Bearer ${accessToken}` and manually handling `res.ok`/JSON parsing/error state. **Follow this same inline-fetch pattern** when adding new API calls — don't introduce a client library (axios, react-query, etc.) unless explicitly asked.
- **Structure**: `src/pages/` = route-level screens; `src/components/` = shared UI (cards, navbars, forms, modals, filters, pack-opening animation); `src/styles/` = one CSS file per feature area, imported directly by the component that uses it (no CSS modules).
- **UI kit**: React-Bootstrap + Bootstrap CSS (imported globally in `main.jsx`) plus `bootstrap-icons`/`react-icons` for iconography — see migration section below for the ongoing move to Mantine.
- **Deployment**: Vercel (`vercel.json`); `vite.config.js` sets `historyApiFallback: true` for client-side routing.

## Conventions

- Match existing patterns over "best practice" defaults — this is a small project with deliberate consistency (inline fetch, no client lib, CSS-per-feature). When in doubt, grep for how a similar page/component already does it and mirror that.

## Migrazione UI: Bootstrap → Mantine (in corso)

Il progetto sta migrando da React-Bootstrap a Mantine. Stato attuale: **Bootstrap è ancora la libreria UI primaria**, la migrazione non è completa.

Regole durante la transizione:

- Non convertire componenti a Mantine di propria iniziativa durante task non correlati (fix bug, nuove feature) — resta con Bootstrap in quei casi, seguendo la sezione Architecture sopra
- Quando esplicitamente richiesto di migrare un componente/pagina, sostituisci gli equivalenti React-Bootstrap con i componenti Mantine corrispondenti, rimuovi gli import Bootstrap non più usati in quel file, mantieni gli stessi CSS custom in `src/styles/` se non gestibili via Mantine theming
- Non rimuovere `bootstrap`/`react-bootstrap` da `package.json` finché non sono stati migrati tutti i componenti che li usano
- Traccia i file già migrati in questo file (lista sotto) così sai cosa manca

### File migrati a Mantine

- `src/pages/DeckPage.jsx` (Container → `@mantine/core`)
- `src/main.jsx` — `MantineProvider` aggiunto (coesiste con Bootstrap CSS)
- `src/App.jsx` (Container → `Center`, solo in `AuthLayout`)
- `src/components/ToastMessage.jsx` (Toast/ToastContainer → `Notification`, API pubblica invariata)
- `src/components/MovieCard.jsx` (Card → Card/Image/Text Mantine)
- `src/components/PersonCard.jsx` (Card → Card/Image/Text Mantine)
- `src/components/CardPreview.jsx` (div flex → `Center`, nessun import bootstrap da rimuovere)
- `src/pages/WelcomePage.jsx` — nessun bootstrap presente, nessuna modifica necessaria

### File da migrare

- `src/pages/`: CardDetailsPage.jsx, CollectionPage.jsx, CreateCardPage.jsx, DeleteCardPage.jsx, EditCardPage.jsx, HomePage.jsx, LoginPage.jsx, NotFoundPage.jsx, PackOpenedPage.jsx, ProfilePage.jsx
- `src/components/`: TopNavbar.jsx, BottomNavbar.jsx (alto blast radius — usati da tutte le page), CardForm.jsx, ImageUpload.jsx, AuthForm.jsx, AdminHomeContent.jsx, AcquirePack.jsx, DeckDetailsModal.jsx, CardGrid.jsx, DeckSidebar.jsx, DeckBuilder.jsx, MainContent.jsx, SidebarFiltri.jsx

## Test

Nessuna test suite era configurata in origine: va introdotta gradualmente, non retroattivamente su tutto il codice esistente in un colpo solo.

Per ogni funzionalità nuova o modificata (componenti, hook, chiamate API), scrivi/aggiorna i test corrispondenti prima di considerare il task completo.

Scrittura test delegata al subagent `test-writer`: dopo aver implementato/modificato
codice, delega a `test-writer` la generazione dei test corrispondenti.
Se test-writer restituisce STATUS diverso da PASS, il task NON è completo:
analizza il bug segnalato, correggilo nel codice implementativo, poi richiama
di nuovo test-writer per rigenerare/verificare i test sul fix.

Se il progetto non ha ancora Vitest/RTL configurato, il primo compito di
`test-writer` è impostare la configurazione base (vitest.config, setup file)
prima di scrivere il primo test.

## Workflow di completamento task

Ordine obbligatorio a fine task:

1. Implementazione
2. Delega a `test-writer` → deve restituire STATUS: PASS (altrimenti fix e ripeti)
3. Delega a `commit-manager` → build check + commit, deve restituire STATUS: PASS
   (altrimenti fix build e ripeti da commit-manager)

Tutti i comandi git passano SEMPRE da `rtk` (es. `rtk git status`, `rtk git commit`),
mai `git` nudo — nè dal main nè dai subagent.

## Da evitare

- Introdurre un client HTTP (axios, react-query) al posto del pattern fetch inline esistente
- Migrare componenti a Mantine senza richiesta esplicita per il task in corso
- Riscrivere test suite intere per file non toccati dal task corrente