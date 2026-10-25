# Third submission corrections

Keep the full-credit submissions for Questions 1–3, 6, 10, 12, 13, 15, 17–20.

## Question 4
https://github.com/fat-ma-77/grihf-frontend_capstone_starter_code/blob/main/README.md

The README title is now Medical Appointment Booking, with setup instructions.

## Question 21
Upload TASK_21_UPLOAD_THIS_31_FILES.png from this folder. It shows all 31 exact filenames. Your latest feedback describes the OLD 17-file screenshot, not this corrected image. Do not upload the old Screenshots.png.

## URL questions reported as unverifiable
Question 5: https://github.com/fat-ma-77/med_appt/blob/main/components/Sign_Up.jsx?plain=1
Question 7: https://github.com/fat-ma-77/med_appt/blob/main/components/Navbar.jsx?plain=1
Question 9: https://github.com/fat-ma-77/med_appt/blob/main/app/App.jsx?plain=1
Question 14: https://github.com/fat-ma-77/med_appt/blob/main/index.html?plain=1

These are public source files. Paste the complete URL, then reopen it in a signed-out browser to confirm. If the grader still denies that these URLs contain med_appt, request manual review with the submitted URL and a screenshot of the public file page.

You scored 19/30; passing requires 21/30. The README and corrected 31-file folder target four previously lost points, but grading is not guaranteed.

## Question 8 — corrected specialty results navigation
https://github.com/fat-ma-77/med_appt/blob/main/components/FindDoctorSearch.jsx

Search submits to /appointments?q=...&specialty=... and restores the filters from the URL. Browser-tested Cardiology returns only Dr. Daniel Kim.

## Question 11 — explicit review state and serial-number check
https://github.com/fat-ma-77/med_appt/blob/main/components/GiveReviews.jsx

handleReviewSubmit stores the API-returned review with setReviews. The doctor ID is the stable serialNumber. Submitted controls disable immediately and remain disabled after reloading.

## Question 16 — new deployed registration output
Use register.txt in the LOCAL round-three submission pack. Copy its complete command and complete JSON output, including authtoken. Do not use the previous output, which did not return a token. Test tokens were revoked after verification. Public repository copies redact token values; the local ZIP contains the actual evidence.

## Validation
Production build passed. 28 API checks passed locally. Search navigation and review disabling/persistence were verified in the browser.

Do not replace your accepted Question 15 launch.png with the older image in the previous ZIP. Keep the image that earned 2/2.
