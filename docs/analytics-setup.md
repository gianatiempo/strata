# Analytics setup (Umami Cloud + Search Console)

What is already in the code, and what is still on you to do. Nothing here needs a cookie banner: Umami sets no cookies and stores nothing on the visitor's device.

## What is already done in the repo

- The Umami script is in the `<head>` of every page (`src/Layout.astro`), pointing at the EU-region cloud with this site's website ID.
- It only counts visits to the live hostname (`data-domains` is set from `site` in `astro.config.mjs`), so localhost and Netlify deploy previews never appear in your stats.
- Navigation between pages without a reload is tracked automatically; there is no extra code for it.
- Click events are attached to the links worth measuring:

| Event             | Where it fires                              |
| ----------------- | ------------------------------------------- |
| `book-call`       | "Book 30 minutes" in the Contact section    |
| `email-click`     | Every "Email me" link                       |
| `resume-download` | Resume link: header, mobile menu and footer |
| `social-github`   | GitHub links: footer and the identity card  |
| `social-linkedin` | LinkedIn link in the footer                 |
| `social-rss`      | RSS link in the footer                      |

To add an event to any other link, give the element `data-umami-event="your-event-name"`.

## What you need to do

### 1. Deploy and verify (10 minutes)

- [ ] Commit and deploy to Netlify.
- [ ] Open the live site in a normal window (not blocked by an ad blocker; those often block analytics, including yours) and look at **Realtime** in the Umami dashboard. Your visit should appear.
- [ ] Click through two or three pages, and check each one shows up. This confirms navigation without reloads is counted.
- [ ] Click "Email me", the resume link and "Book 30 minutes", then check **Events** in Umami for `email-click`, `resume-download` and `book-call`.
- [ ] If nothing appears: check the live domain is exactly the one in `site` (`astro.config.mjs`), and test in a private window with extensions off.

### 2. Tag the links you share (5 minutes, worth doing once)

Visitors from LinkedIn, email and a CV all look like "direct" traffic unless the link says where it came from. Add a `utm_source` to the site link in each place:

- [ ] LinkedIn profile: `https://arielgianatiempo.com/?utm_source=linkedin`
- [ ] CV / resume PDF: `https://arielgianatiempo.com/?utm_source=cv`
- [ ] Email signature: `https://arielgianatiempo.com/?utm_source=email`
- [ ] GitHub profile README: `https://arielgianatiempo.com/?utm_source=github`

Umami reads these under **Campaigns** / **UTM** in the dashboard.

### 3. Set up the dashboard (5 minutes)

- [ ] In **Settings** for the website, check the timezone and, if you want, share the dashboard publicly (a read-only link) to look at it without logging in.
- [ ] Optional: create a **Goal** for `book-call` and `email-click`, so contact intent is one number instead of two separate events.
- [ ] Optional: ignore your own visits. Umami can exclude your IP, or you can open the site once with `localStorage.setItem('umami.disabled', 1)` in the browser console on the live site, which stops that browser from being counted.

### 4. Google Search Console (15 minutes)

Umami cannot tell you which Google searches bring people to the site; Search Console can.

- [ ] Add the site in Search Console as a **URL prefix** property: `https://arielgianatiempo.com/`. The `www` address redirects to it, so this is the right one to verify. (A Domain property would need a DNS record, which cannot be added from the code.)
- [ ] Verification is already in the code: the `google-site-verification` meta tag is in `src/Layout.astro`. After deploying, click **Verify** in Search Console. Leave the tag in place afterwards, since removing it un-verifies the property.
- [ ] Submit the sitemap: `https://arielgianatiempo.com/sitemap-index.xml`
- [ ] Optional: do the same in Bing Webmaster Tools, which can import the setup from Search Console in one click.
- [ ] Check back after a week or two. Search data takes a while to appear.

## What to look at, and when

- **Weekly, if you like:** Umami **Overview** for visitors, top pages, referrers and countries.
- **After you publish something:** which post got read and where visitors came from.
- **After you share the site:** **Campaigns** for UTM sources, and **Events** for whether anyone clicked Book 30 minutes, Email me or the resume link.
- **Monthly:** Search Console queries, to see what people searched for before landing here.

## Notes and limits

- Ad blockers and some privacy browsers block analytics scripts, so your numbers will undercount real visitors. Treat them as a floor, not an exact count.
- Umami's free tier has a monthly event cap. Check the current limit in your account; a personal site is unlikely to reach it. If you ever do, GoatCounter is an easy replacement because only the script tag and the event attributes would change.
- The data stays in the EU region you chose at sign-up.
- The website ID in `src/Layout.astro` is not a secret: it is visible in any page's source and only identifies where to send the counts.
