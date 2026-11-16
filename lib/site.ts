// The ONE place for the site's domain. Canonical URLs, sitemap, robots, Open Graph, JSON-LD,
// share texts and the chat API all read from here. No trailing slash, no "www".
// Two files cannot import this and keep their own copy: next.config.mjs and public/chatbot.js.
// Change them too if the domain ever changes.
export const SITE_URL = "https://bdtoolsflow.bond";
export const SITE_HOST = "bdtoolsflow.bond";

// Edit this one line if your contact email changes (used on About, Contact, Privacy, Disclaimer, schema)
export const CONTACT_EMAIL = "bdtoolsflowadmin@gmail.com";

const BN = "০১২৩৪৫৬৭৮৯";
export const toBnDigits = (n: number) => String(n).replace(/\d/g, (d) => BN[+d]);
