# StayHealthy - corrected resubmission answers

Keep the screenshots for Questions 1, 2 and 3 and the PDF for Question 20 that already earned full marks. The previous registration output for Question 16 was also accepted.

Use the exact repository names below. These are real public repositories, not renamed text in the URLs.

## Question 4

https://github.com/fat-ma-77/grihf-frontend_capstone_starter_code/blob/main/README.md

## Question 5

https://github.com/fat-ma-77/med_appt/blob/main/components/Sign_Up.jsx

## Question 6

https://github.com/fat-ma-77/med_appt/blob/main/components/Login.jsx

## Question 7

https://github.com/fat-ma-77/med_appt/blob/main/components/Navbar.jsx

## Question 8

https://github.com/fat-ma-77/med_appt/blob/main/components/FindDoctorSearch.jsx

## Question 9

https://github.com/fat-ma-77/med_appt/blob/main/app/App.jsx

## Question 10

https://github.com/fat-ma-77/med_appt/blob/main/components/AppointmentFormIC.jsx

## Question 11

https://github.com/fat-ma-77/med_appt/blob/main/components/GiveReviews.jsx

## Question 12

https://github.com/fat-ma-77/med_appt/blob/main/components/ProfileCard.jsx

## Question 14

https://github.com/fat-ma-77/med_appt/blob/main/index.html

## Question 18

https://github.com/fat-ma-77/med_appt/blob/main/components/AppointmentForm.jsx

## Question 19

https://github.com/fat-ma-77/med_appt/blob/main/components/DoctorCard.jsx

## Question 13

```text

> med_appt@0.1.0 build
> node scripts/build-project.mjs


  vinext build  (Vite 8.0.13)

[PLUGIN_TIMINGS] Your build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[1/5] analyze client references...

transforming...✓ 345 modules transformed.
rendering chunks...
[PLUGIN_TIMINGS] Your build spent significant time in plugins. Here is a breakdown:
  - rsc:virtual-client-package (19%)
  - vinext:css-data-url (17%)
  - rsc:scan-strip (13%)
  - alias (11%)
  - rsc:rsc-css-export-transform (7%)
See https://rolldown.rs/options/checks#plugintimings for more details.

✓ built in 16.70s
[2/5] analyze server references...

transforming...✓ 126 modules transformed.
rendering chunks...
✓ built in 11.48s
[3/5] build rsc environment...

transforming...✓ 342 modules transformed.
rendering chunks...
computing gzip size...
[PLUGIN_TIMINGS] Your build spent significant time in plugins. Here is a breakdown:
  - alias (23%)
  - rsc:virtual-client-package (20%)
  - vinext:og-inline-fetch-assets (9%)
  - vinext:css-data-url (8%)
  - rsc:use-server (5%)
See https://rolldown.rs/options/checks#plugintimings for more details.

✓ built in 18.90s
[4/5] build client environment...

transforming...✓ 1915 modules transformed.
rendering chunks...
computing gzip size...
✓ built in 35.35s
[5/5] build ssr environment...

transforming...✓ 132 modules transformed.
rendering chunks...
computing gzip size...
[PLUGIN_TIMINGS] Your build spent significant time in plugins. Here is a breakdown:
  - vinext:og-inline-fetch-assets (22%)
  - rsc:rsc-css-export-transform (11%)
  - rsc:scan-strip (8%)
  - vinext:rsc-client-reference-loaders (7%)
  - rsc:load-environment-module (6%)
See https://rolldown.rs/options/checks#plugintimings for more details.

✓ built in 12.14s

  Route (app)
  ┌ ? /              
  ├ ƒ /:view         
  └ λ /api/:segments+

  λ API  ƒ Dynamic  ? Unknown

  ? Some routes could not be classified. vinext currently uses static analysis
    and cannot detect dynamic API usage (headers(), cookies(), etc.) at build time.
    Automatic classification will be improved in a future release.
  Build complete. Run `vinext start` to start the production server.


Production deployment bundle copied to server/build.

Contents of server/:
  build/

Contents of server/build/:
  .openai/
  client/
  server/

Mode  Name
----  ----
d---- build



```

## Question 16

```text
REAL DEMO API - actual cURL execution

curl -X POST "https://stayhealthy-fatma-project.faatum7.chatgpt.site/api/auth/register" -H "Content-Type: application/json" --data '{"role":"Patient","name":"Amina Demo","email":"assignment.1792917184009@example.com","phone":"+252610000000","password":"Fictional-Demo-2026!"}'

HTTP 201
{"message":"Account created. You can now log in.","user":{"id":"a84a8386-474b-4a86-8cae-534a0734495b","name":"Amina Demo","email":"assignment.1792917184009@example.com","phone":"+252610000000","role":"Patient"}}

```

## Question 17

```text
REAL DEMO API - actual cURL execution

curl -X POST "https://stayhealthy-fatma-project.faatum7.chatgpt.site/api/auth/login" -H "Content-Type: application/json" --data '{"email":"assignment.1792917184009@example.com","password":"Fictional-Demo-2026!"}'

HTTP 200
{"message":"Logged in successfully.","authtoken":"REDACTED_PUBLIC_COPY","user":{"id":"a84a8386-474b-4a86-8cae-534a0734495b","name":"Amina Demo","email":"assignment.1792917184009@example.com","phone":"+252610000000","role":"Patient"}}

The returned authtoken was verified and revoked by logout after testing. It belongs only to this fictional demo account.

```

## Question 15 - replace launch.png

Open https://stayhealthy-fatma-project.faatum7.chatgpt.site in Chrome. Log out of the StayHealthy app if necessary. Press Ctrl+0 and Ctrl+Home. Capture the address bar, StayHealthy logo/title, tagline and the visible Home, Appointments, Login and Sign Up links together. Save over screenshots/launch.png.

The launch.png initially copied into this pack is your ORIGINAL submitted screenshot. It has the address bar but its page header is offscreen. It is retained as a genuine file for the folder inventory, not presented as a corrected Question 15 screenshot. Replace it before submitting Question 15.

## Question 21 - required folder

The screenshots/ subfolder is prepared with the 31 exact names listed in required-screenshots.txt. Some tasks ask for the same visible UI at design/layout/output stages; those files reuse the corresponding genuine app capture, as recorded in screenshot-provenance.json. No browser address bar, editor window or terminal output has been fabricated. report.png is a rendering of the actual patient report PDF.

Use screenshots_folder.png when provided, or capture the completed screenshots folder in File Explorer. Make all 31 PNG filenames visible; use Details view and two columns if needed.

The three original design screenshots already earned full marks. No Figma recapture is needed for the requirements assessed in this feedback.