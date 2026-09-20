import { beats, forms } from '@lib/consts'
import { renderCard, type CardOptions } from '@lib/og'
import { readingTime } from '@lib/utils'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

/* One card per writing entry, rendered at build time.
 *
 * The route mirrors the page it belongs to — /writing/building-with-ai
 * becomes /og/writing/building-with-ai.png — so the pairing is greppable and a
 * stale card is obvious rather than mysterious. The template asks for its own
 * URL by the same rule, in src/pages/writing/[...slug].astro.
 *
 * The home page and the other standing pages keep the hand-made /og.png: they
 * are cards about a person rather than about an article, and that one carries
 * the ensō.
 */

const FORMAT = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })

export async function getStaticPaths() {
	const entries = (await getCollection('writing')).filter((entry) => !entry.data.draft)

	return entries.map((entry) => ({
		params: { slug: `writing/${entry.slug}` },
		props: {
			card: {
				title: entry.data.title,
				kicker: forms[entry.data.form].label,
				beat: { label: beats[entry.data.beat].label, tone: beats[entry.data.beat].tone },
				/* A project leads with its status rather than a reading time: what
				   a reader wants to know before clicking one is whether it is
				   finished. Everything else leads with when it was written. */
				meta: entry.data.form === 'project' ? [entry.data.status ?? 'In progress', FORMAT.format(entry.data.date)] : [FORMAT.format(entry.data.date), readingTime(entry.body)]
			} satisfies CardOptions
		}
	}))
}

export const GET: APIRoute = async ({ props }) => {
	const png = await renderCard(props.card as CardOptions)

	return new Response(new Uint8Array(png), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	})
}
