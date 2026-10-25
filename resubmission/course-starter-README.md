# Medical Appointment Booking

This repository retains the official IBM course starter. The completed StayHealthy React application is maintained in [fat-ma-77/med_appt](https://github.com/fat-ma-77/med_appt).

## Project name and purpose

**Project name: Medical Appointment Booking**

StayHealthy is a fictional nonprofit healthcare platform for finding doctors, booking and cancelling appointments, reviewing doctors, editing patient profiles, and downloading a sample report. All clinicians and patient details are fictional.

## Setup instructions

Requires Node.js 22.13 or newer and npm.

```bash
git clone https://github.com/fat-ma-77/med_appt.git
cd med_appt
npm ci
npm run build
```

The production bundle is created in `server/build/`. Initialize the local database with the committed schema migrations:

```bash
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_bouncy_bloodaxe.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_nervous_pet_avengers.sql
npm start -- --port 5188
```

Open http://127.0.0.1:5188 and register a fictional account. Apply each SQL migration once only.

## Public deployment

https://stayhealthy-fatma-project.faatum7.chatgpt.site

## Source and evidence

The original `Landing_Page` course starter is preserved in this fork. The completed React components, production build evidence, cURL output and screenshots are in [med_appt](https://github.com/fat-ma-77/med_appt). Login returns a real opaque `authtoken`; the browser uses an HttpOnly session cookie. This is an educational demonstration, not a medical service.
