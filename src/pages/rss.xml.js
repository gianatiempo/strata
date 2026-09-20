import rss from '@astrojs/rss'
import { beats, forms, SITE } from '@lib/consts'
import { getCollection } from 'astro:content'

export async function GET(context) {
	const blog = (await getCollection('writing')).filter((entry) => !entry.data.draft)

	const items = blog.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())

	return rss({
		title: SITE.TITLE,
		description: SITE.DESCRIPTION,
		site: context.site,
		items: items.map((item) => ({
			title: item.data.title,
			description: item.data.description,
			pubDate: item.data.date,
			// Feed readers show these as the item's categories, so the beat and
			// the form travel with the entry instead of only existing on the site.
			// A subscriber can then tell a project write-up from a post without
			// opening either.
			categories: [beats[item.data.beat].label, forms[item.data.form].label],
			link: `/writing/${item.slug}/`
		}))
	})
}
