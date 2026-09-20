import { defineCollection, z } from 'astro:content'

/* One collection. One author. One river.
 *
 * `post` and `project` used to be two collections, which meant two schemas,
 * two index pages, two row components, two detail templates and two entries in
 * the nav — all to express a distinction nobody reading the site cares about.
 * A project write-up *is* a piece of writing about a build. Filing it
 * elsewhere said the opposite, and it split the one thing on the site that is
 * supposed to accumulate: evidence that the work is still happening.
 *
 * So: `writing`. Everything dated, everything ongoing, newest first. Posts and
 * projects both still exist and are still called that — they are `form`s of
 * one entry rather than two kinds of object, which is a presentation detail
 * and not a schema.
 */

/* A beat is a facet of one publication: the same person covering a different
   part of the stack. Separate `frontend` and `ai` collections would file them
   as if they were different jobs, which they are not — the front end and the
   server have been two ends of one job since the job existed. */
export const BEATS = ['frontend', 'backend', 'trajectory'] as const

/* Two forms, one schema.
 *
 *   post     a piece of writing
 *   project  a thing that exists, with a status and a stack
 *
 * `project` is a post with a state: it was its own collection until the merge,
 * and the only thing it ever needed that a post did not was a status and a
 * stack in the rail.
 *
 * There was a third, `note`, for short pieces, and it is gone. Two formats
 * where one will do is a decision to make before every post about whether the
 * thing you are writing counts as substantial, and that decision is a reason
 * not to publish. A post that is short is a short post.
 *
 * There is no `tldr` field either, and there used to be one. A summary panel
 * at the top of a post is an invitation to read the panel and skip the post,
 * which is the opposite of why anything gets written here. `description`
 * already gives a skimmer the one sentence it is owed. Do not add it back.
 *
 * Neither form gets its own collection, its own route or its own template —
 * only its own row treatment and its own rail. */
export const FORMS = ['post', 'project'] as const

const writing = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.date(),
		author: z.string().default('Ariel Gianatiempo'),
		beat: z.enum(BEATS).default('trajectory'),
		form: z.enum(FORMS).default('post'),

		/* Projects only, and optional even there — `status` is honest by design.
		   Most of these will be in progress for a long time, and saying so is
		   worth more than implying otherwise by omission. */
		status: z.string().optional(),
		stack: z.array(z.string()).default([]),
		demoURL: z.string().optional(),

		/* Where the code is, when there is code. Renders as a repository card,
		   so an entry about building something can point at the thing it built
		   without the link being buried in a paragraph. Not project-only: a post
		   about a refactor frequently has a repo behind it. */
		repoURL: z.string().optional(),

		categories: z.array(z.string()).default(['others']),
		tags: z.array(z.string()).default(['others']),
		draft: z.boolean().optional()
	})
})

export const collections = { writing }
