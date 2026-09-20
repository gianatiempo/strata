import tailwind from '@astrojs/tailwind'
import { defineConfig, squooshImageService } from 'astro/config'

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import rehypeSidenotes from './src/plugins/rehype-sidenotes.mjs'

// https://astro.build/config
export default defineConfig({
	site: 'https://arielgianatiempo.com',

	/* /post and /project were merged into /writing. Posts and projects both
	   still exist under those names — they are `form`s of one entry now rather
	   than two collections — but they share one index, so the two old routes
	   need somewhere to land.

	   Kept alive rather than deleted, because a URL that has been shared once
	   is a URL somebody else controls now: the links are in other people's
	   bookmarks, other people's feeds and Google's index, and breaking them to
	   tidy up a route table is a bad trade. The slugs did not change, so every
	   one of them lands on the entry it always did. */
	redirects: {
		'/post': '/writing',
		'/post/[...slug]': '/writing/[...slug]',
		'/project': '/writing',
		'/project/[...slug]': '/writing/[...slug]'
	},
	integrations: [
		tailwind(),
		// No filter. If you ever add a route you genuinely do not want indexed,
		// exclude it here *and* say which route and why — a silent filter
		// outlives its reason. (The /post and /project redirects above emit no
		// sitemap entries of their own, which is correct: the canonical URL of
		// every entry is its /writing one.)
		sitemap(),
		mdx()
	],
	image: {
		service: squooshImageService()
	},
	vite: {
		ssr: {
			/* `@resvg/resvg-js` loads a platform-specific `.node` binary, and
			   esbuild has no loader for that extension — bundling it fails with
			   "No loader is configured for .node files". `astro build` survives
			   because it runs the OG endpoint in Node directly; `astro dev` runs
			   it through Vite and crashes on the first request to any page.
			   Marking it external leaves it as a plain runtime require. */
			external: ['@resvg/resvg-js']
		},
		optimizeDeps: {
			/* `ssr.external` covers the module graph, but Vite's dev dependency
			   scanner runs esbuild over the same imports before the first request
			   and dies on the same `.node` binary. Excluding it here keeps the
			   scanner away from it. */
			exclude: ['@resvg/resvg-js']
		}
	},
	markdown: {
		// `css-variables` hands syntax colours over to --astro-code-* in tokens.css,
		// so code blocks follow the light/dark theme instead of shipping their own.
		shikiConfig: {
			theme: 'css-variables'
		},
		rehypePlugins: [rehypeSidenotes]
	}
})
