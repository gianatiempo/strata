import { Resvg } from '@resvg/resvg-js'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import satori from 'satori'

/* Per-entry link previews.
 *
 * The card *is* the first impression. Almost everything that reaches this site
 * arrives through a link someone posted, and what a reader sees before they
 * decide to click is a 1200×630 image — not the page. Until now every link on
 * the site unfurled the same static og.png, so a post about retrieval and a
 * post about hiring looked identical in a feed.
 *
 * The card is Strata stated in one frame: the claim on the ground in the
 * serif, the receipts raised on the ink plane underneath it. Which means the
 * design system is doing the work here rather than a second, preview-only look
 * that would have to be maintained alongside it.
 *
 * The home page keeps the hand-made og.png with the ensō — it is a card about
 * a person rather than about an article, and it is the one image on the site
 * that carries a mark.
 */

/* Mirrors tokens.css, resolved to sRGB because satori has no oklch. These are
   the *day* values: a link preview has no theme to follow, and cream stands
   out in a feed that is mostly white cards. Changing a token here without
   changing it there is how the two drift apart — keep the pairs together. */
const COLOR = {
	ground: '#faf9f6', // --ground-bg-canvas
	ink: '#111c28', // --ev-bg
	primary: '#110c08', // --ground-text-primary
	tertiary: '#6e645e', // --ground-text-tertiary
	inkText: '#eef2f5', // --ev-text-primary
	inkTertiary: '#8e99a2', // --ev-text-tertiary
	inkAccent: '#2ad4d7', // --ev-accent
	inkAccentAlt: '#ffa370', // --ev-accent-alt
	rule: '#c9c5c1' // --ground-rule-strong, flattened: satori has no alpha compositing on borders
} as const

/* Read straight out of node_modules at build time. Satori takes ttf/otf/woff
   and cannot read woff2, which is the only format the *variable* Fontsource
   packages ship — hence the static @fontsource/jetbrains-mono alongside the
   variable one the site itself loads. Inter is absent on purpose: the card has
   no layer-two prose on it, only a claim and its evidence, so the two display
   voices are all it needs. */
const FONT_DIR = (pkg: string) => path.join(process.cwd(), 'node_modules', pkg, 'files')

function font(pkg: string, file: string): Buffer {
	const full = path.join(FONT_DIR(pkg), file)
	try {
		return readFileSync(full)
	} catch {
		throw new Error(`OG card font missing: ${full}\nRun a package install — satori reads these directly from node_modules at build time.`)
	}
}

const fonts = [
	{ name: 'Instrument Serif', data: font('@fontsource/instrument-serif', 'instrument-serif-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
	{ name: 'JetBrains Mono', data: font('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff'), weight: 500 as const, style: 'normal' as const },
	{ name: 'JetBrains Mono', data: font('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const }
]

/* Satori takes React elements; these are the same plain objects React would
   produce, which keeps the file a .ts with no JSX pragma to configure. */
type Node = { type: string; props: Record<string, unknown> }
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({ type, props: { style, children } })

export interface CardOptions {
	/* The claim. Set in the serif, and the only thing on the card sized to be
	   read from a thumbnail. */
	title: string
	/* Top-right: which part of the site this is. "Writing", "Project". */
	kicker: string
	/* The evidence strip: beat, date, and whatever else is genuinely known. */
	beat?: { label: string; tone: 'warm' | 'cool' | 'ink' }
	meta: string[]
}

/* Three steps rather than a formula so the reasoning is visible: 88px holds a
   short headline at thumbnail size, and a long one has to come down or satori
   wraps it past the panel. Measured in characters because the serif is close
   enough to monospaced at display size for this to be stable. */
function titleSize(title: string): number {
	if (title.length <= 42) return 86
	if (title.length <= 74) return 70
	return 58
}

const beatColor = { warm: COLOR.inkAccentAlt, cool: COLOR.inkAccent, ink: COLOR.inkText } as const

export async function renderCard({ title, kicker, beat, meta }: CardOptions): Promise<Buffer> {
	const tree = el(
		'div',
		{
			position: 'relative',
			width: 1200,
			height: 630,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			backgroundColor: COLOR.ground,
			padding: '68px 72px',
			fontFamily: 'JetBrains Mono'
		},
		[
			/* The spine, and the tick that hangs the kicker row off it. On the site
			   the line carries reading position; a still card has nothing to be
			   partway through, so it is drawn at its rest state — one unbroken
			   hairline, which is exactly what the page renders under reduced
			   motion. Same geometry as scripts/og-card.html: line at x=40, tick
			   closing 14px short of the 72px content edge. */
			el('div', { position: 'absolute', top: 0, left: 40, width: 2, height: 630, backgroundColor: COLOR.rule }),
			el('div', { position: 'absolute', top: 78, left: 40, width: 18, height: 2, backgroundColor: COLOR.rule }),

			el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, [
				el('div', { display: 'flex', fontSize: 22, fontWeight: 600, letterSpacing: '0.16em', color: COLOR.primary }, 'ARIEL GIANATIEMPO'),
				el('div', { display: 'flex', fontSize: 22, fontWeight: 500, letterSpacing: '0.16em', color: COLOR.tertiary }, kicker.toUpperCase())
			]),

			/* The claim. flexGrow so it takes the slack rather than the gaps above
			   and below doing so, and anchored to the bottom of that space: a
			   one-line title then sits just above the evidence strip and a
			   four-line one grows upward into the air, which is how a masthead
			   behaves. Centring it left short titles floating in the middle of
			   the card with nothing under them. */
			el(
				'div',
				{ display: 'flex', flexGrow: 1, alignItems: 'flex-end', paddingTop: 24, paddingBottom: 36 },
				el(
					'div',
					{
						display: 'flex',
						fontFamily: 'Instrument Serif',
						fontSize: titleSize(title),
						lineHeight: 1.04,
						letterSpacing: '-0.025em',
						color: COLOR.primary
					},
					title
				)
			),

			/* Layer three, raised. No shadow: satori supports box-shadow but it
			   renders as a hard band at this scale, and the card is flattened to
			   a PNG anyway, so the edge and the fill do the lifting. */
			el(
				'div',
				{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: COLOR.ink,
					borderRadius: 18,
					padding: '26px 32px'
				},
				[
					el(
						'div',
						{ display: 'flex', alignItems: 'center' },
						beat
							? [
									el('div', { display: 'flex', width: 12, height: 12, borderRadius: 6, backgroundColor: beatColor[beat.tone], marginRight: 16 }),
									el('div', { display: 'flex', fontSize: 24, fontWeight: 600, letterSpacing: '0.14em', color: beatColor[beat.tone] }, beat.label.toUpperCase())
								]
							: []
					),
					el('div', { display: 'flex', fontSize: 24, fontWeight: 500, letterSpacing: '0.1em', color: COLOR.inkTertiary }, meta.join('  ·  '))
				]
			)
		]
	)

	const svg = await satori(tree as never, { width: 1200, height: 630, fonts })
	return Buffer.from(new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng())
}

/* The card's own description, for `og:image:alt`. Generated from the same
   inputs as the picture so the two can never disagree — the previous alt text
   was a hand-written sentence about a card that had since been redesigned. */
export function cardAlt({ title, kicker, beat, meta }: CardOptions): string {
	const strip = [beat?.label, ...meta].filter(Boolean).join(', ')
	return `${kicker} card on cream: "${title}", above a dark panel reading ${strip}. Ariel Gianatiempo.`
}
