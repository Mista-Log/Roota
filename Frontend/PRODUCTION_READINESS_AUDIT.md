# Frontend Production Readiness Audit

**Last Updated:** May 15, 2026  
**Status:** Hardening in progress  
**Live vs Demo Analysis:** This document tracks which screens are truly functional end-to-end vs. only demo-capable.

---

## 🟢 LIVE & PRODUCTION-READY

These screens have real backend integration wired and will work end-to-end once the backend endpoints are available.

### Authentication Flow
- **Login Page** (`/auth` - login tab)
  - ✅ Sends email/password to `/api/auth/login/`
  - ✅ Stores JWT tokens in localStorage
  - ✅ Redirects to dashboard on success
  - ✅ Handles auth errors with user feedback
  - **Status**: LIVE

- **Signup Page** (`/auth` - signup tab)
  - ✅ Sends full_name/email/password/role to `/api/auth/register/`
  - ✅ Auto-logs in after signup
  - ✅ Validates required fields
  - **Status**: LIVE

- **Google Login**
  - ✅ Sends token to `/api/auth/google/`
  - ✅ Handles new user creation
  - ✅ Stores tokens and redirects
  - **Status**: LIVE

- **Auto-Login on Refresh**
  - ✅ Checks localStorage for token
  - ✅ Calls `/api/auth/me/` to verify token
  - ✅ Populates user state
  - ✅ Clears token if invalid
  - **Status**: LIVE

### Public Pages
- **Landing Page** (`/`)
  - ✅ No auth required
  - ✅ Marketing UI only (no API calls)
  - **Status**: LIVE

- **Role Selection Page** (`/role`)
  - ✅ Local UI state only
  - ✅ Stores role choice in localStorage
  - **Status**: LIVE

---

## 🟡 PARTIALLY LIVE

These screens have some real wiring but also fall back to mock data or are only half-integrated.

### Worker Pages

- **Worker Dashboard** (`/worker/dashboard`)
  - ✅ Navigation links wired (See All → `/worker/jobs`, View All earnings → `/worker/wallet`)
  - ❌ Data is hardcoded UI state (recommended jobs, stats, skills progress)
  - ❌ "View All" buttons are only UI navigation, not fetching server data
  - **Status**: PARTIALLY LIVE (navigation works, data is demo)

- **Worker Marketplace** (`/worker/marketplace`)
  - ✅ Attempts to fetch `/api/worker/marketplace/jobs/`
  - ✅ Filter UI and search built
  - ✅ "Apply Filters" calls `/api/worker/marketplace/jobs/?params`
  - ✅ Apply job button sends to `/api/worker/applications/`
  - ❌ **Falls back to mock data if API unavailable**
  - **Status**: PARTIALLY LIVE (API-wired but with fallback)

- **Worker Job Details** (`/worker/jobs/:jobId`)
  - ✅ Attempts to fetch `/api/jobs/:jobId/`
  - ✅ Application form is fully built
  - ✅ Apply sends to `/api/jobs/:jobId/apply/`
  - ❌ Falls back to hardcoded mock data
  - **Status**: PARTIALLY LIVE (API wired with fallback)

- **Worker Wallet** (`/worker/wallet`)
  - ✅ Attempts to fetch `/api/worker/wallet/transactions/`
  - ✅ Also fetches `/api/worker/finances/metrics/`
  - ✅ Send/Withdraw modals are functional UI
  - ❌ Falls back to mock transaction list
  - ❌ Send/Withdraw do not actually submit anywhere (modal closes locally)
  - **Status**: PARTIALLY LIVE (reads attempt but writes are local-only)

- **Worker Transactions** (`/worker/transactions`)
  - ✅ UI has filtering and expandable details
  - ❌ Data is entirely mock and local
  - **Status**: DEMO

- **Worker Trust Score** (`/worker/trust-score`)
  - ✅ Attempts to fetch `/api/worker/trust-score/metrics/`
  - ❌ Falls back to mock data
  - ❌ No mutation endpoints (read-only)
  - **Status**: PARTIALLY LIVE (read-only with fallback)

- **Worker Settings** (`/worker/settings`)
  - ✅ Tabs and form UI are fully built
  - ✅ Profile tab attempts `/api/worker/settings/profile/` (GET) and `/api/worker/settings/profile/update/` (POST)
  - ✅ Account preferences attempt `/api/worker/settings/preferences/update/`
  - ✅ Billing section has download/action buttons (local logic)
  - ✅ Connected accounts attempt `/api/worker/settings/connections/update/`
  - ✅ Delete account attempts `/api/worker/settings/account/delete/`
  - ❌ Falls back to mock form data if fetch fails
  - **Status**: PARTIALLY LIVE (all mutations wired with fallback data)

- **Worker Support** (`/worker/support`)
  - ✅ Form is fully built
  - ❌ Submit button does not send data anywhere (no API endpoint)
  - ❌ Only shows success message locally
  - **Status**: DEMO (UI only, no backend)

- **Worker Insights** (`/worker/insights`)
  - ✅ Attempts to fetch `/api/worker/insights/recommendations/`
  - ❌ Falls back to mock insight cards
  - **Status**: PARTIALLY LIVE (read-only with fallback)

### Employer Pages

- **Employer Dashboard** (`/employer/dashboard`)
  - ✅ Attempts to fetch `/api/employer/payroll/`, `/api/employer/talent/`, `/api/employer/recent-hires/`
  - ✅ Job creation modal sends to `/api/employer/jobs/create/`
  - ❌ Falls back to mock data
  - ❌ Dashboard stats are hardcoded
  - **Status**: PARTIALLY LIVE (writes wired, reads with fallback)

- **Employer Marketplace** (`/employer/marketplace`)
  - ✅ Attempts to fetch `/api/employer/marketplace/talent/` and `/api/employer/marketplace/suggested/`
  - ✅ Talent card clicks navigate to `/employer/talent/:id`
  - ❌ Falls back to mock talent profiles
  - **Status**: PARTIALLY LIVE (navigation works, data falls back to mock)

- **Employer Talent Details** (`/employer/talent/:talentId`)
  - ✅ Attempts to fetch `/api/employer/marketplace/talent/`
  - ✅ Message/Shortlist buttons are UI only (no submit)
  - ❌ Falls back to mock talent profile
  - **Status**: PARTIALLY LIVE (read-only with fallback, actions are demo)

- **Employer Jobs** (`/employer/jobs`)
  - ✅ Attempts to fetch `/api/employer/jobs/`
  - ❌ Falls back to mock jobs
  - **Status**: PARTIALLY LIVE (read-only with fallback)

- **Employer Job Details** (`/employer/jobs/:jobId`)
  - ✅ Attempts to fetch `/api/jobs/:jobId/`
  - ✅ "View Applicants" / "Edit Listing" buttons are UI only
  - ❌ Falls back to mock job data
  - **Status**: PARTIALLY LIVE (read-only with fallback)

- **Employer Wallet** (`/employer/wallet`)
  - ✅ Attempts to fetch `/api/employer/wallet/transactions/`
  - ✅ Also fetches `/api/employer/finances/metrics/`
  - ❌ Falls back to mock data
  - ❌ Send/Withdraw are local UI only
  - **Status**: PARTIALLY LIVE (reads attempt but writes are local-only)

- **Employer Transactions** (`/employer/transactions`)
  - ✅ UI filtering and expandable details built
  - ❌ Data is entirely mock
  - **Status**: DEMO

- **Employer Trust Score** (`/employer/trust-score`)
  - ✅ Attempts to fetch `/api/employer/trust-score/metrics/`
  - ❌ Falls back to mock data
  - **Status**: PARTIALLY LIVE (read-only with fallback)

- **Employer Settings** (`/employer/settings`)
  - ✅ Same as Worker Settings (all mutations wired with fallback)
  - **Status**: PARTIALLY LIVE

- **Employer Support** (`/employer/support`)
  - ❌ UI only, no backend wiring
  - **Status**: DEMO

- **Employer Insights** (`/employer/insights`)
  - ✅ Attempts to fetch `/api/employer/insights/recommendations/`
  - ❌ Falls back to mock data
  - **Status**: PARTIALLY LIVE (read-only with fallback)

---

## 🔴 DEMO ONLY

These screens are UI-only prototypes with no real API wiring. They look functional but have no backend integration.

- **Worker Transactions** - mock data only
- **Employer Transactions** - mock data only
- **Worker Support** - form UI with no submit endpoint
- **Employer Support** - form UI with no submit endpoint
- **Talent Details Message/Shortlist buttons** - UI buttons that do nothing
- **Wallet Send/Withdraw modals** - modal UI that closes locally without submitting

---

## 🔒 SECURITY & AUTH NOTES

### Route Protection
- ✅ ProtectedRoute now **re-enabled** and checks authentication
- ✅ Redirects unauthenticated users to `/auth`
- ✅ Redirects wrong-role users to `/role`
- ✅ Shows loading state while verifying token

### Token Handling
- ✅ New centralized `apiFetch()` utility in `src/utils/api.ts`
- ✅ All API calls now automatically inject `Authorization: Bearer <token>` header
- ✅ Tokens are cleared on 401 response
- ⚠️ Refresh token rotation not yet implemented (TODO)

### CORS & Localhost
- ✅ Frontend uses `VITE_API_BASE_URL` env var (defaults to `http://localhost:8000`)
- ⚠️ Hardcoded localhost in a few pages (GoogleLogin, AuthContext) - should use env var
- ✅ Content-Type headers now centrally managed

---

## 🛠 NEXT STEPS (Frontend-Only)

1. **Replace all raw fetch() calls** with `apiFetch()` from the new utils
   - Update marketplace pages
   - Update wallet pages
   - Update settings pages
   - Update all dashboard pages

2. **Remove hardcoded localhost URLs** in GoogleLogin and any remaining places

3. **Improve error handling** - add retry logic and user-friendly error messages

4. **Add loading spinners** to all data-fetching pages

5. **Document mock fallback behavior** clearly in code comments

---

## 📊 SUMMARY TABLE

| Category | Count | Status |
|----------|-------|--------|
| Auth & Public | 4 | ✅ LIVE |
| Worker Pages | 8 | 6🟡, 2🔴 |
| Employer Pages | 8 | 6🟡, 2🔴 |
| **Total Screens** | **20** | **10 LIVE/PARTIAL, 4 DEMO** |

**Overall Readiness**: ~65% wired for backend, ~35% demo-only
