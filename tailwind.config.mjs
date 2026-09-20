/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				canvas: 'var(--bg-canvas)',
				surface: 'var(--bg-surface)',
				sunken: 'var(--bg-sunken)',
				primary: 'var(--text-primary)',
				secondary: 'var(--text-secondary)',
				tertiary: 'var(--text-tertiary)',
				quaternary: 'var(--text-quaternary)',
				accent: {
					DEFAULT: 'var(--accent)',
					hover: 'var(--accent-hover)',
					muted: 'var(--accent-muted)',
					/* The cool signal, already restated for whichever ground it
					   lands on. `text-accent-alt` marks the `backend` beat and
					   stays legible on the ground and on the evidence plane, in
					   both themes. */
					alt: 'var(--accent-alt)'
				},
				rule: {
					DEFAULT: 'var(--rule)',
					strong: 'var(--rule-strong)'
				}
			},
			borderColor: {
				DEFAULT: 'var(--border)'
			},
			/* Only `font-display` is exposed as a utility. Body and mono are set
			   once each in tokens.css — on `body` and on `.meta` / `.figure-*` —
			   and never switched per element, so utilities for them were never
			   used. */
			fontFamily: {
				display: 'var(--font-display)'
			},
			/* The heading sizes carry --display-scale so they stay voice-aware: an
			   evidence panel sets the scale once and every `text-h2` inside it
			   takes mono's optical correction, instead of the markup having to
			   know which voice it is in. The scale is 1 on the ground, so nothing
			   moves by default. */
			fontSize: {
				display: 'calc(var(--text-display) * var(--display-scale))',
				h1: 'calc(var(--text-h1) * var(--display-scale))',
				h2: 'calc(var(--text-h2) * var(--display-scale))',
				h3: 'calc(var(--text-h3) * var(--display-scale))',
				/* Between h3 and h2, for list rows. A post title set at --text-h3
				   (1.5rem at most) sat barely above its own standfirst and the
				   archive lost its hierarchy; at --text-h2 every row shouted. */
				row: 'calc(clamp(1.35rem, 1.1vw + 1.05rem, 1.75rem) * var(--display-scale))',
				'body-lg': 'var(--text-body-lg)',
				body: 'var(--text-body)',
				meta: 'var(--text-meta)'
			},
			spacing: {
				'section-tight': 'var(--space-section-tight)',
				section: 'var(--space-section)',
				'section-loose': 'var(--space-section-loose)'
			},
			/* One token for every page title, because hand-set values drifted to
			   15 / 16 / 18 / 20 / none across six pages — `max-w-title`,
			   greppable, changed in one place.

			   It was 18ch, which broke every title at the same early point and
			   made two lines the floor even for a title that would have fitted on
			   one. The display size already answers this: --text-display is fluid
			   (clamp to 7.5rem), so a title wraps when the viewport genuinely
			   cannot hold it and does not when it can. The token stays because
			   the pages reference it and a future cap belongs here rather than
			   hand-set across six files. */
			maxWidth: {
				title: '100%'
			},
			transitionTimingFunction: {
				out: 'var(--ease-out)',
				glide: 'var(--ease-glide)'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
