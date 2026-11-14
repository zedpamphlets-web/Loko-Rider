# Loko Cooks Rider

The rider app for Loko Cooks. It uses the SAME Supabase project as the customer app.
Nothing on the server changes: same database, same functions, same rider accounts.

## First build (one time)
1. `npm install`
2. `eas init`  (creates the EAS project for this app). Copy the project id it prints into
   `app.json` under `expo.extra.eas.projectId`:
   ```json
   "extra": { "eas": { "projectId": "PASTE-ID-HERE" }, ... }
   ```
3. Push notifications (job offers): in Firebase add an ANDROID app with the package name
   `com.siximages.lokocooks.rider`, download its `google-services.json`, put it in this folder
   (next to app.json). Then `eas credentials` > Android > upload the FCM service account key
   (the same key you used for the customer app works if it is the same Firebase project).
4. `eas build -p android --profile production`

## Rider flow
Log in with phone and SMS code > (new riders) Apply to deliver > an admin approves in the Admin app >
Jobs, Earnings, delivery code (OTP) and payouts work exactly as before.
