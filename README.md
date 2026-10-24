# StayHealthy - Care within reach

A responsive React healthcare booking project for a fictional nonprofit serving remote and underserved communities. Patients can explore fictional doctors, create an account, log in, book or cancel demo appointments, save one review per doctor, edit their profile, and download a fictional patient report.

Educational demonstration only. No real doctors, consultations, prescriptions or clinical services are provided. Use fictional information.

## Project links

- Public source: https://github.com/fat-ma-77/stayhealthy-final-project
- Hosted preview: https://stayhealthy-fatma-project.faatum7.chatgpt.site (public; deployment and API verification recorded in evidence).

## Technology

React 19, HTML/CSS, Lucide icons, Vinext routing/build on Vite, Cloudflare Worker API, SQLite/D1 persistence with Drizzle. Passwords use PBKDF2 with unique salts; session tokens are hashed and delivered in HttpOnly cookies.

## Setup

Requires Node.js 22.13 or newer, npm, and Git. Works on Windows PowerShell. No IBM Cloud environment is required.

```bash
npm ci
npm run build
```

Initialize the local demo database **once** after the first build:

```bash
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_bouncy_bloodaxe.sql
```

Start the built app:

```bash
npm start -- --port 5188
```

Open http://127.0.0.1:5188. Register a fictional account, then log in. Do not replay an already-applied migration. On Windows, stop the preview before rebuilding if it locks dist/.

For development after database setup:

```bash
npm run dev -- --port 5189
```

Local data is stored in ignored .wrangler/state/ and is not uploaded with source. Hosted data uses the separate DB binding declared in .openai/hosting.json.

## User flows

1. **Sign Up:** Role (Patient/Caregiver), Name, Email, Phone Number, Password and Confirm Password. Passwords must be 10–128 characters; duplicate email and mismatched passwords are rejected.
2. **Login/Logout:** the form invokes /api/auth/login; Navbar logout revokes the session. No passwords or session tokens in localStorage.
3. **Appointments:** search by name, specialty or language. Scheduled form: Name, Phone Number, Date and Time (UTC). Instant form: exactly Name and Phone Number; doctor/type are passed through props. Conflicting doctor slots are rejected.
4. **Cancellation:** Your appointments offers a confirmation step and persists cancellation. Users can cancel only their own appointments.
5. **Reviews:** book a demo appointment, choose a doctor, submit a rating/comment. The submitted form is disabled; server-side uniqueness prevents duplicate reviews, including after reload.
6. **Profile:** display profile card and edit Name/Phone; Email remains the account identifier.
7. **Reports:** download a fictional sample with invented patient information and non-clinical prescription placeholders.

## Required files

| File | Purpose |
| --- | --- |
| app/App.jsx | Root UI; Notification mounted outside individual pages |
| components/Sign_Up.jsx | Registration API and form |
| components/Login.jsx | Login authentication API and form |
| components/Navbar.jsx | Navigation and logout |
| components/FindDoctorSearch.jsx | Doctor search and specialty filter |
| components/AppointmentFormIC.jsx | Instant consultation: only Name and Phone Number |
| components/AppointmentForm.jsx | Scheduled form: Name, Phone Number, Date, Time |
| components/DoctorCard.jsx | Doctor UI and cancellation logic |
| components/GiveReviews.jsx | Review submission and post-submission disabling |
| components/ProfileCard.jsx | Profile card and edit form |
| index.html | Standalone SEO HTML reference for assignment |
| app/layout.tsx | Actual production title, description, keywords and Open Graph metadata |

Vinext renders production HTML from app/layout.tsx. index.html is the corresponding standalone SEO reference, not the framework build entrypoint.

## API

The included backend is a purpose-built demo because no course API was supplied. It is not represented as IBM's or Coursera's API.

| Method | Route | Purpose |
| --- | --- | --- |
| POST | /api/auth/register | Create an account |
| POST | /api/auth/login | Authenticate and issue HttpOnly session cookie |
| POST | /api/auth/logout | Revoke the session |
| GET / PATCH | /api/profile | Read / update own profile |
| GET / POST / PATCH | /api/appointments | List / create / cancel own appointments |
| GET / POST | /api/reviews | List / submit own reviews |

POST/PATCH require application/json. Foreign Origin requests are rejected. User IDs are resolved from the session, not trusted from request bodies. Password hashes, salts and session tokens are omitted from response bodies.

This course demo is not a production health-record system: it does not implement password recovery, email verification, abuse controls, clinical operations or healthcare compliance.

## Verification and evidence

With the built app running on port 5188:

```bash
node scripts/test-api.mjs
node node_modules/typescript/bin/tsc --noEmit --incremental false
```

The API script executes real cURL requests against the local app, uses invented example.com identities, and saves command output. It currently invokes curl.exe on Windows; replace that name with curl on macOS/Linux.

- evidence/build.txt: production build output.
- evidence/register.txt and evidence/login.txt: actual cURL command/output from the public deployed demo API.
- evidence/api-tests.txt: API verification results.
- screenshots/: genuine browser captures of the implementation.
- design/: editable SVG frames and Figma import instructions.
- output/pdf/patient_report.pdf: fictional report, rendered and visually checked.
- SUBMISSION_GUIDE.md: mapping for all 21 tasks and remaining submission actions.

The SVGs are prepared for Figma import; Figma editing is not claimed as completed. App captures do not contain browser chrome. For launch.png, capture the deployed homepage with its actual browser address bar. For Task 21, take a Windows File Explorer screenshot of the completed screenshots folder.
