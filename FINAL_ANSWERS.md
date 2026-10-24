# StayHealthy - answers to copy into the assignment

Project title: StayHealthy: Accessible Healthcare Booking with React

Repository: https://github.com/fat-ma-77/stayhealthy-final-project

For the URL questions, copy the matching link below after the repository push is verified.

## Task 4

https://github.com/fat-ma-77/stayhealthy-final-project/blob/main/README.md

## Task 5

https://github.com/fat-ma-77/stayhealthy-final-project/blob/main/components/Sign_Up.jsx

## Task 6

https://github.com/fat-ma-77/stayhealthy-final-project/blob/main/components/Login.jsx

## Task 7

https://github.com/fat-ma-77/stayhealthy-final-project/blob/main/components/Navbar.jsx

## Task 8

https://github.com/fat-ma-77/stayhealthy-final-project/blob/main/components/FindDoctorSearch.jsx

## Task 9

https://github.com/fat-ma-77/stayhealthy-final-project/blob/main/app/App.jsx

## Task 10

https://github.com/fat-ma-77/stayhealthy-final-project/blob/main/components/AppointmentFormIC.jsx

## Task 11

https://github.com/fat-ma-77/stayhealthy-final-project/blob/main/components/GiveReviews.jsx

## Task 12

https://github.com/fat-ma-77/stayhealthy-final-project/blob/main/components/ProfileCard.jsx

## Task 14

https://github.com/fat-ma-77/stayhealthy-final-project/blob/main/index.html

## Task 18

https://github.com/fat-ma-77/stayhealthy-final-project/blob/main/components/AppointmentForm.jsx

## Task 19

https://github.com/fat-ma-77/stayhealthy-final-project/blob/main/components/DoctorCard.jsx

## Task 13

Copy the following actual output. Registration/login use the included local demo API.

```text

> site-creator-vinext-starter@0.1.0 build
> node scripts/run-framework.mjs build


  vinext build  (Vite 8.0.13)

[1/5] analyze client references...

transforming...✓ 345 modules transformed.
rendering chunks...
[PLUGIN_TIMINGS] Your build spent significant time in plugins. Here is a breakdown:
  - vinext:og-inline-fetch-assets (41%)
  - alias (16%)
  - vinext:css-data-url (11%)
  - rsc:virtual-client-package (10%)
  - vinext:middleware-server-only (7%)
See https://rolldown.rs/options/checks#plugintimings for more details.

✓ built in 4.18s
[2/5] analyze server references...

transforming...✓ 126 modules transformed.
rendering chunks...
✓ built in 1.40s
[3/5] build rsc environment...

transforming...✓ 342 modules transformed.
rendering chunks...
computing gzip size...
✓ built in 1.15s
[4/5] build client environment...

transforming...✓ 1915 modules transformed.
rendering chunks...
computing gzip size...
[PLUGIN_TIMINGS] Your build spent significant time in plugins. Here is a breakdown:
  - vinext:og-inline-fetch-assets (17%)
  - vinext:css-data-url (17%)
  - alias (10%)
  - rsc:virtual-client-package (8%)
  - vinext:middleware-server-only (7%)
See https://rolldown.rs/options/checks#plugintimings for more details.

✓ built in 3.78s
[5/5] build ssr environment...

transforming...✓ 132 modules transformed.
rendering chunks...
computing gzip size...
✓ built in 1.64s

  Route (app)
  ┌ ? /              
  ├ ƒ /:view         
  └ λ /api/:segments+

  λ API  ƒ Dynamic  ? Unknown

  ? Some routes could not be classified. vinext currently uses static analysis
    and cannot detect dynamic API usage (headers(), cookies(), etc.) at build time.
    Automatic classification will be improved in a future release.
  Build complete. Run `vinext start` to start the production server.


```

## Task 16

Copy the following actual output. Registration/login use the included local demo API.

```text
LOCAL DEMO API - actual cURL execution

curl -X POST "http://127.0.0.1:5188/api/auth/register" -H "Content-Type: application/json" --data '{"role":"Patient","name":"Amina Demo","email":"assignment.1792868112674@example.com","phone":"+252610000000","password":"Fictional-Demo-2026!"}'

HTTP 201
{"message":"Account created. You can now log in.","user":{"id":"d1fc9d00-7ebf-4ad8-84a1-12b0293e6552","name":"Amina Demo","email":"assignment.1792868112674@example.com","phone":"+252610000000","role":"Patient"}}

```

## Task 17

Copy the following actual output. Registration/login use the included local demo API.

```text
LOCAL DEMO API - actual cURL execution

curl -X POST "http://127.0.0.1:5188/api/auth/login" -H "Content-Type: application/json" --data '{"email":"assignment.1792868112674@example.com","password":"Fictional-Demo-2026!"}'

HTTP 200
{"message":"Logged in successfully.","user":{"id":"d1fc9d00-7ebf-4ad8-84a1-12b0293e6552","name":"Amina Demo","email":"assignment.1792868112674@example.com","phone":"+252610000000","role":"Patient"}}

The HttpOnly session cookie was received and used for further tests; its token is omitted from this evidence.

```

## Screenshot/PDF tasks

1. Upload screenshots/navbar_design.png (implementation preview; replace with Figma capture if required).
2. Upload screenshots/signup_form_design.png (same Figma caveat).
3. Upload screenshots/login_form_design.png (same Figma caveat).
15. Capture the deployed homepage with the real browser address visible; save as launch.png. Page-only preview captures are not a substitute.
20. Upload evidence/patient_report.pdf. All patient/prescription information is fictional.
21. Capture the completed screenshots folder after adding launch.png and any Figma captures.

Editable Figma import frames are in design/. See SUBMISSION_GUIDE.md for final checks.