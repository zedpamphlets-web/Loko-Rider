const fs = require("fs");
const path = require("path");
const { expo } = require("./app.json");

/**
 * Same Supabase project as the customer app: nothing on the server changes.
 * (These are the public keys the customer app already ships with.)
 */
const URL = "https://lmyvvwulabezlglxjzvl.supabase.co";
const ANON = "sb_publishable_XJVKUkLgF-0OJk2Mf4N8nQ_ZhmtezXu";

/**
 * Push notifications on Android need a google-services.json made for THIS app's package name.
 * It is only used when the file exists and really belongs to this package, so builds never fail
 * because the customer app's file was copied here by mistake.
 */
function googleServicesFile() {
  try {
    const text = fs.readFileSync(path.join(__dirname, "google-services.json"), "utf8");
    if (text.includes(`"${expo.android.package}"`)) return "./google-services.json";
  } catch {}
  return undefined;
}

module.exports = () => {
  const gs = googleServicesFile();
  return {
    ...expo,
    android: { ...expo.android, ...(gs ? { googleServicesFile: gs } : {}) },
    extra: {
      ...(expo.extra || {}),
      supabaseUrl: (process.env.EXPO_PUBLIC_SUPABASE_URL || URL).trim(),
      supabaseAnonKey: (process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ANON).trim(),
      paymentApiUrl: (process.env.EXPO_PUBLIC_PAYMENT_API_URL || `${URL}/functions/v1`).trim(),
    },
  };
};
