import rss from '@astrojs/rss'
import { beats, forms, SITE } from '@lib/consts'
import { byNewest } from '@lib/utils'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { getCollection, render } from 'astro:content'
import sanitizeHtml from 'sanitize-html'

/* What a feed reader is allowed to see of a post's HTML. The body is rendered by
   Astro's own pipeline (so it matches the page, rehype plugins included) and
   then cleaned, because feed readers sanitise inconsistently and the page's
   markup carries things a reader has no use for: the sidenote toggles are
   hidden checkboxes wired up with CSS that will not exist there. */
function cleanForFeed(html, site) {
	const absolute = (value) => {
		try {
			return new URL(value, site).href
		} catch {
			return value
		}
	}

	return sanitizeHtml(html, {
		allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'figure', 'figcaption', 'h1', 'h2', 'details', 'summary', 'small', 'sup'],
		allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, a: ['href', 'name'], img: ['src', 'alt', 'width', 'height'], '*': [] },
		transformTags: {
			// A sidenote is a margin note on the page; in a feed it is a small aside inline.
			span: (_tag, attribs) => (attribs.class?.split(/\s+/).includes('sn') ? { tagName: 'small', attribs: {} } : { tagName: 'span', attribs: {} }),
			a: (tagName, attribs) => ({ tagName, attribs: { ...attribs, href: attribs.href ? absolute(attribs.href) : attribs.href } }),
			img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, src: attribs.src ? absolute(attribs.src) : attribs.src } })
		}
	})
}

export async function GET(context) {
	const container = await AstroContainer.create()
	const entries = (await getCollection('writing')).filter((entry) => !entry.data.draft).sort(byNewest)

	const items = await Promise.all(
		entries.map(async (entry) => {
			const { Content } = await render(entry)
			const body = await container.renderToString(Content)

			return {
				title: entry.data.title,
				description: entry.data.description,
				pubDate: entry.data.date,
				// Feed readers show these as the item's categories, so the beat and
				// the form travel with the entry instead of only existing on the site.
				// A subscriber can then tell a project write-up from a post without
				// opening either.
				categories: [beats[entry.data.beat].label, forms[entry.data.form].label],
				link: `/writing/${entry.id}/`,
				content: cleanForFeed(body, context.site)
			}
		})
	)

	return rss({
		title: SITE.TITLE,
		description: SITE.DESCRIPTION,
		site: context.site,
		// `self` is what lets a reader that was handed a copy of the feed find where it lives.
		xmlns: { atom: 'http://www.w3.org/2005/Atom' },
		customData: `<language>en</language><atom:link href="${new URL('rss.xml', context.site).href}" rel="self" type="application/rss+xml" />`,
		items
	})
}
