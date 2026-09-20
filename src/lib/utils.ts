import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content'
import { slug } from 'github-slugger'

export const taxonomyFilter = (posts: any[], name: string, key: any) => posts.filter((post) => post.data[name].map((name: string) => slug(name)).includes(key))

export const getSinglePage = async <C extends CollectionKey>(collectionName: C): Promise<CollectionEntry<C>[]> => {
	const allPages = await getCollection(collectionName)
	const removeDrafts = allPages.filter((data) => !data.data.draft)
	return removeDrafts
}

// get taxonomy from frontmatter
export const getTaxonomy = async (collection: any, name: string) => {
	const singlePages = await getSinglePage(collection)
	const taxonomyPages = singlePages.map((page: any) => page.data[name])
	let taxonomies: string[] = []
	for (let i = 0; i < taxonomyPages.length; i++) {
		const categoryArray = taxonomyPages[i]
		for (let j = 0; j < categoryArray.length; j++) {
			taxonomies.push(slug(categoryArray[j])!)
		}
	}
	const taxonomy = [...new Set(taxonomies)]
	return taxonomy
}

export const sortByDate = (array: any[]) => {
	const sortedArray = array.sort((a: any, b: any) => new Date(b.data.date && b.data.date).valueOf() - new Date(a.data.date && a.data.date).valueOf())
	return sortedArray
}

export const similarItems = (currentItem: any, allItems: any, slug: string) => {
	let categories: [] = []
	let tags: [] = []

	// set categories
	if (currentItem.data.categories.length > 0) {
		categories = currentItem.data.categories
	}

	// set tags
	if (currentItem.data.tags.length > 0) {
		tags = currentItem.data.tags
	}

	// filter by categories
	const filterByCategories = allItems.filter((item: { data: { categories: string } }) => categories.find((category) => item.data.categories.includes(category)))

	// filter by tags
	const filterByTags = allItems.filter((item: { data: { tags: string } }) => tags.find((tag) => item.data.tags.includes(tag)))

	// merged after filter
	const mergedItems = [...new Set([...filterByCategories, ...filterByTags])]

	// filter by slug
	const filterBySlug = mergedItems.filter((product) => product.slug !== slug)

	return filterBySlug
}

/* Words that are acronyms rather than words. Tags are stored lowercase, and
   sentence-casing turned `ai` into `Ai` everywhere it was displayed — in the
   tag page's heading and, since titles carry the page name, in the browser tab
   too. Matched whole-word and case-insensitively, so `building with ai` comes
   out as `Building with AI` and a word like `said` is untouched. */
const ACRONYMS = new Set(['ai', 'api', 'aws', 'cli', 'css', 'html', 'rss', 'sql', 'ui', 'ux'])

export const humanize = (content: string) => {
	return content
		.replace(/^[\s_]+|[\s_]+$/g, '')
		.replace(/[_\s]+/g, ' ')
		.replace(/[-\s]+/g, ' ')
		.replace(/^[a-z]/, function (m) {
			return m.toUpperCase()
		})
		.replace(/\b[a-z]+\b/gi, (word) => (ACRONYMS.has(word.toLowerCase()) ? word.toUpperCase() : word))
}

export const readingTime = (content: string) => {
	const WPS = 275 / 60

	let images = 0
	const regex = /\w/

	let words = content.split(' ').filter((word) => {
		if (word.includes('<img')) {
			images += 1
		}
		return regex.test(word)
	}).length

	let imageAdjust = images * 4
	let imageSecs = 0
	let imageFactor = 12

	while (images) {
		imageSecs += imageFactor
		if (imageFactor > 3) {
			imageFactor -= 1
		}
		images -= 1
	}

	// Never less than a minute, and no zero-padding — "05 mins read" reads like a
	// stopwatch rather than a reading estimate.
	const minutes = Math.max(1, Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60))

	return `${minutes} min read`
}
