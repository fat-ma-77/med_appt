# StayHealthy design handoff

The editable SVG frames in this folder are original interface designs prepared for import into Figma. They are not evidence of work already completed in Figma.

1. Open a new Figma design file.
2. Drag the three SVG files onto the canvas (or use Place image).
3. Review the navigation and form fields. Imported SVG layers remain editable.
4. Capture the navigation frame as `navbar_design.png`, registration frame as `signup_form_design.png`, and login frame as `login_form_design.png`.

Design direction: warm cream backgrounds, forest-green primary actions, sage accents, Georgia editorial headings, and Segoe UI/Arial form text. Interactive controls have visible keyboard focus states; every input has a programmatic label. Desktop and mobile app layouts are defined in `app/globals.css`.

Required navigation: Home, Appointments, Reviews, Login, Sign Up. Signed-in users also see Reports, their profile, and Logout.

Registration: Role (Patient/Caregiver), Name, Email, Phone Number, Password, Confirm Password. Login: Email, Password.

The browser captures in `screenshots/` are implemented-app captures unless the submission guide explicitly records a later Figma capture. Do not describe app screenshots as Figma screenshots.
