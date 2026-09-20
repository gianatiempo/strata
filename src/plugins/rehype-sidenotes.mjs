/**
 * GFM footnotes → margin sidenotes.
 *
 * Markdown stays plain: write `[^1]` in the sentence and `[^1]: the note` at the
 * bottom of the file. remark-gfm turns that into a `<sup>` reference plus a
 * collected `<section data-footnotes>` at the end of the document. Footnotes at
 * the end of a page are a footer nobody scrolls to; the same content in the
 * margin is a second layer of explanation sitting next to the sentence it
 * explains. This moves it there at build time.
 *
 * Each reference becomes three siblings, in this order, so plain CSS adjacency
 * can wire them together without a line of JavaScript:
 *
 *   <input class="sn-toggle">   hidden switch, only used on narrow screens
 *   <sup class="sn-ref">        the visible number, a <label> for the input
 *   <span class="sn">           the note itself
 *
 * The note is phrasing content only (paragraphs are unwrapped), because the
 * whole group lives inside the `<p>` that referenced it — a block element there
 * would be reparsed and the association would break.
 */

const isElement = (node, tagName) => node && node.type === 'element' && node.tagName === tagName

/** Depth-first walk that hands each node to `fn` along with its parent and index. */
function walk(node, fn, parent = null, index = -1) {
	fn(node, parent, index)
	const children = node.children
	if (!children) return
	// Backwards: `fn` is allowed to splice, and splicing shifts later indices.
	for (let i = children.length - 1; i >= 0; i--) walk(children[i], fn, node, i)
}

/** Footnote bodies are `<li><p>…</p></li>`. Flatten to inline nodes and drop the ↩ backref. */
function toInline(children) {
	const out = []
	for (const child of children) {
		if (isElement(child, 'p')) {
			if (out.length) out.push({ type: 'text', value: ' ' })
			out.push(...toInline(child.children))
		} else if (isElement(child, 'a') && child.properties?.dataFootnoteBackref !== undefined) {
			continue
		} else if (child.type === 'text' && child.value.trim() === '' && !out.length) {
			continue
		} else {
			out.push(child)
		}
	}
	// Trailing whitespace left behind by the removed backref.
	while (out.length && out[out.length - 1].type === 'text' && out[out.length - 1].value.trim() === '') out.pop()
	return out
}

export default function rehypeSidenotes() {
	return (tree, file) => {
		const definitions = new Map()
		const sections = []

		walk(tree, (node, parent, index) => {
			if (isElement(node, 'section') && node.properties?.dataFootnotes !== undefined) {
				sections.push({ node, parent, index })
			}
		})

		if (!sections.length) return

		for (const { node, parent, index } of sections) {
			const list = node.children.find((child) => isElement(child, 'ol'))
			if (list) {
				for (const item of list.children) {
					if (!isElement(item, 'li') || !item.properties?.id) continue
					definitions.set(String(item.properties.id), toInline(item.children))
				}
			}
			// The margin is now the only place these live.
			if (parent) parent.children.splice(index, 1)
		}

		// Every post is an `index.md` inside its own folder, so the folder is what
		// actually identifies it. Scoping the checkbox ids that way keeps them
		// unique if more than one post body ever lands on the same page.
		const path = String(file?.history?.[file.history.length - 1] || file?.path || 'sn')
		const parts = path.split(/[\\/]/).filter(Boolean)
		const scope = (parts[parts.length - 1]?.startsWith('index.') ? parts[parts.length - 2] : parts[parts.length - 1] || 'sn').replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/gi, '-')
		const seen = new Set()

		walk(tree, (node, parent, index) => {
			if (!isElement(node, 'sup') || !parent) return

			const ref = node.children.find((child) => isElement(child, 'a') && child.properties?.dataFootnoteRef !== undefined)
			if (!ref) return

			const id = String(ref.properties.href || '').replace(/^#/, '')
			const body = definitions.get(id)
			if (!body) return

			const label = ref.children.map((child) => (child.type === 'text' ? child.value : '')).join('') || String(definitions.size)

			// A footnote cited twice gets the number both times but the note once,
			// next to the first mention.
			const duplicate = seen.has(id)
			seen.add(id)

			const toggleId = `sn-${scope}-${id.replace(/[^a-z0-9]+/gi, '-')}`

			const mark = {
				type: 'element',
				tagName: 'sup',
				properties: { className: ['sn-ref'] },
				children: duplicate ? [{ type: 'text', value: label }] : [{ type: 'element', tagName: 'label', properties: { htmlFor: toggleId }, children: [{ type: 'text', value: label }] }]
			}

			if (duplicate) {
				parent.children.splice(index, 1, mark)
				return
			}

			const toggle = {
				type: 'element',
				tagName: 'input',
				properties: { type: 'checkbox', id: toggleId, className: ['sn-toggle'], 'aria-label': `Note ${label}` },
				children: []
			}

			const note = {
				type: 'element',
				tagName: 'span',
				properties: { className: ['sn'], role: 'note' },
				children: [{ type: 'element', tagName: 'span', properties: { className: ['sn-num'], 'aria-hidden': 'true' }, children: [{ type: 'text', value: label }] }, ...body]
			}

			parent.children.splice(index, 1, toggle, mark, note)
		})
	}
}
