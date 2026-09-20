import type { Site } from '../types'

export const SITE: Site = {
	TITLE: 'Ariel Gianatiempo',
	DESCRIPTION:
		'Senior Front-End engineer in Málaga. Nineteen years across both ends of the stack: Eight years of web development with Java, eleven in the browser, and Front-End architecture for Openbank, J.P. Morgan and V3 Cybersecurity. Currently picking the server half back up in Python, and building features with a model inside them.',
	EMAIL: 'gianatiempo@gmail.com',
	IMAGE: '/og.png',
	TYPE: 'website',
	NUM_ENTRIES_ON_HOMEPAGE: 4
}

/* The masthead of the writing. Three beats — the two ends of the job, and the
   business of picking one of them back up. `beat` lives on the post schema
   (src/content/config.ts); this is only how each one is presented.

   Note what these are NOT for. An earlier version of this site used them to
   argue that front-end work and model work belonged together, which was a
   mistake: that is called fullstack, it has existed since the job existed, and
   arguing for it is what makes it sound doubtful. They are filing categories
   for a publication with ordinary range. State, do not defend.

   Each beat carries a `tone` rather than a register. Under Strata a beat is a
   marker on a row — a dot and a word — not a page-scale treatment, because a
   dot still works when there are forty posts and a full-bleed band does not.

   `plain` is the layer-one sentence: what this beat covers, said without a
   single term a non-technical reader would have to look up. `summary` is
   layer two, and keeps the vocabulary. */
export const beats = {
	frontend: {
		label: 'Front-End',
		tone: 'warm',
		plain: 'The part of the software people actually see and touch.',
		summary: "The user's side of the thing. React, UI, design, and everything you can actually see."
	},
	backend: {
		label: 'Back-End',
		tone: 'cool',
		plain: 'The machinery behind it, where the work happens out of sight.',
		summary: 'The dark side of the same thing. Python, APIs, AI, and everything we sweep under the carpet.'
	},
	trajectory: {
		label: 'Trajectory',
		tone: 'ink',
		plain: 'The part where I talk about the nineteen years behind me.',
		summary: "Past, present, and where I'm headed from here."
	}
} as const

export type Beat = keyof typeof beats
export type Tone = (typeof beats)[Beat]['tone']

/* How a beat renders as a text colour, in one place because several surfaces
   need it — the post list, the project list, the writing masthead — and they
   must agree. Both accent tokens are already restated per ground (see
   --accent-alt in tokens.css), so these stay legible on the page and on the
   evidence plane alike. */
export const beatTone: Record<Tone, string> = {
	warm: 'text-accent',
	cool: 'text-accent-alt',
	ink: 'text-primary'
}

/* What kind of entry this is, said in one word on the row. Deliberately not a
   filter, a badge or a colour: the beat already carries the subject, and a row
   that announces its format twice is a row nobody reads. `plain` is the
   sentence the archive header uses when the reader has filtered to one form. */
export const forms = {
	post: { label: 'Post', plain: 'The long version, worked out properly.' },
	project: { label: 'Project', plain: 'A thing that exists, and what state it is actually in.' }
} as const

export type Form = keyof typeof forms

/* Trajectory, not a logo grid: where the craft came from, and where it's going.
   `status` is deliberately honest — two of these three are in progress.

   Three layers per entry, which is the whole system in one data shape:
     plain     one sentence with no term anyone would have to look up
     body      the account, vocabulary intact
     figures   the receipts, every one of them quoted from `body` above it

   Nothing in `figures` is a new claim. If a number is not already stated in
   the prose beside it, it does not belong here. */
export const practice = [
	{
		label: 'Foundation',
		status: 'Eight years',
		heading: 'Web developer, Java and painful UI',
		plain:
			'Java, Spring, Hibernate and a lot of MySQL. APIs, new features and legacy migrations for telcos, an airline and a long list of enterprise clients I could not put in the right order today. Somewhere in there I started volunteering for every ticket that touched the UI, which is pretty much how the next eleven years happened.',
		figures: [
			{ value: '8', label: 'Years of Java' },
			{ value: '2007', label: 'Where it all started' }
		],
		keywords: ['Java', 'Spring', 'Hibernate', 'MySQL', 'Wicket', 'SVN']
	},
	{
		label: 'Blooming',
		status: 'Eleven years',
		heading: 'From jQuery to Front-End architecture that holds',
		plain: 'I build the parts of an application people actually see and use. Started in telcos, ended up enjoying banks... faster, more dynamic, wider.',
		figures: [
			{ value: '11', label: 'Years on the Front-End' },
			{ value: '60%', label: 'Faster after a rewrite' },
			{ value: '90%', label: 'Fewer reported bugs' }
		],
		keywords: ['React', 'TypeScript', 'Hexagonal architecture', 'Component libraries', 'Technical leadership']
	},
	{
		label: 'Mastery',
		status: 'Reaching for it',
		heading: 'Both ends of the stack, on purpose this time',
		plain: 'Getting properly good at both halves of the job, the server one included.',
		figures: [
			{ value: '2', label: 'Ends of the stack' },
			{ value: '4', label: 'Courses in 2026' }
		],
		keywords: ['Python', 'AI', 'Fullstack', 'Testing']
	},
	{
		label: 'Building',
		status: 'Day one',
		heading: 'AI as an engineer, not a user',
		plain:
			"Small things, written in Python, with a model doing actual work inside them instead of just helping me type. Retrieval, evals, streaming responses... that list is what I'm working through right now, not a set of things I already know. First ones go up on GitHub shortly, and they will look exactly like what they are.",
		figures: [
			{ value: '1', label: 'Product rewrite, solo' },
			{ value: '2026', label: 'Launch target' }
		],
		keywords: ['Python', 'Model APIs', 'Retrieval', 'Evals', 'Streaming UI', 'AI-assisted delivery']
	}
]

/* The strongest material on the site for anyone who is not an engineer: these
   are stories about a person, and they are readable without a glossary. Under
   v2 they sat four sections down in a dark monospace band, which is the visual
   code for "skip this". They lead the page now, in the reading voice.

   `figures` is the evidence layer of each one, and every value is quoted from
   the `description` directly above it. An entry with no number in its prose —
   Globant — gets no figures, which is the check that stops the shape becoming
   a template that needs filling. */
export const timeline = [
	{
		date: 'Jul 2025',
		label: 'Plexus Tech · Openbank, Santander Group',
		description:
			"Four core areas of Openbank's homebanking platform: accounts, deposits, contracting and customer profile. I moved the team's ESLint setup from v8 to v10 and added new rules to the internal plugin. Then I noticed the same code living in all four codebases, proposed a shared component library, and it got adopted right away. Which was nice.",
		figures: [
			{ value: '4', label: 'Core platform areas' },
			{ value: 'v8→10', label: 'ESLint migration' }
		]
	},
	{
		date: 'Apr 2023',
		label: 'V3 Cybersecurity · the rewrite I argued for · part time',
		description:
			"I rewrote the MVP when I arrived and got a 60% performance gain out of it. Then I spent months convincing leadership to let me rewrite the whole thing, Front-End and Back-End. They said yes. I defined the layout and the product philosophy, directed the designer through Figma, specified the data contracts, and I'm now building the entire Front-End on my own. Launch is meant to be the end of 2026.",
		figures: [
			{ value: '60%', label: 'Faster MVP' },
			{ value: '1', label: 'Developer on it' }
		]
	},
	{
		date: 'Jul 2022',
		label: 'System One · healthcare',
		description:
			'I overhauled two core areas of the product. Reported bugs dropped 90% in the two weeks after release. I also built a standalone Playwright and Cucumber project so the QA team could write their own regression tests without waiting on me.',
		figures: [
			{ value: '90%', label: 'Fewer reported bugs' },
			{ value: '2 wks', label: 'After release' }
		]
	},
	{
		date: 'Nov 2019',
		label: 'J.P. Morgan Chase · tech lead',
		description:
			'Promoted twice here. I led three React developers, then six, through a Flex-to-React migration that killed every deprecated component in eight months. I also ran a six-developer internship programme from analysis all the way to production, cut local build time in half, and ran an internal React best-practices group.',
		figures: [
			{ value: '3→6', label: 'Developers I led' },
			{ value: '8 mo', label: 'To finish it' }
		]
	},
	{
		date: 'Sep 2018',
		label: 'Globant · the React turn',
		description:
			'I led an internal product and pushed standards across the team. Then I got contracted out to J.P. Morgan, and that work turned into a permanent offer. This is also where React stopped being a tool I happened to use and became the thing I was actually good at.',
		figures: [
			{ value: '1st', label: 'First time managing' },
			{ value: '4 mo', label: 'Internal project' }
		]
	},
	{
		date: 'Mar 2015',
		label: 'Redbee · crossing to the Front-End',
		description:
			"Fullstack work: API endpoints on one side, Front-End components and services on the other. AngularJS was making the browser look like the fun place to be, so I crossed over. Eleven years later I'm still here. That was never the plan.",
		figures: [{ value: '11', label: 'Years in the browser started here' }]
	},
	{
		date: 'May 2007',
		label: 'Eight years of Java Back-End',
		description:
			"Hewlett-Packard, FDV Solutions, GetSense, Cubika, Teracode. APIs, features and legacy migrations for airline and enterprise clients. People forget this part when someone says Front-End developer, and it's the reason I keep saying I'm going back to the server instead of starting over on it.",
		figures: [
			{ value: '8', label: 'Years on the server' },
			{ value: '5', label: 'Companies' }
		]
	}
]

/* Only the first three render (see Testimonials.astro). Six generic endorsements
   read as a wall nobody finishes; three chosen ones read as evidence. These three
   are ordered to corroborate three different claims the site makes — the J.P.
   Morgan lead role, the appetite for what's next, and the mentoring — and each
   comes from a different seniority. The rest are kept rather than deleted: they
   are real words from real colleagues, and they are here to rotate in. */
export const testimonialData = [
	{
		name: 'Carla Benedetto',
		url: 'https://www.linkedin.com/in/carlabenedetto',
		position: 'Analyst, J.P. Morgan',
		message:
			'I had the chance to work with Ariel this past year in J.P.Morgan. He is a great leader and an amazing coworker. He is always eager to help and contribute with the team with his remarkable coding skills!'
	},
	{
		name: 'Beatriz Martínez',
		url: 'https://www.linkedin.com/in/martinez-beatriz/',
		position: 'Senior Developer, Tecnosoftware',
		message:
			'Ariel is a professional who seeks to always be at the forefront with the latest technologies, he likes to contribute ideas and research and contribute new knowledge, he is a very good colleague and likes to maintain a good work environment.'
	},
	{
		name: 'Dante Moore',
		url: 'https://github.com/DanteCypress',
		position: 'Tech Leader, V3 Cybersecurity',
		message:
			'Working alongside Ariel has been an absolute delight. His dedication to crafting high-quality front-end solutions is unparalleled. Not only does he possess a deep understanding of the technologies he works with, but he consistently goes above and beyond to ensure that every component he touches is executed excellently.'
	},
	{
		name: 'Emilia Goicoechea',
		url: 'https://www.linkedin.com/in/emilia-goicoechea-a00ab3183/',
		position: 'Analyst',
		message:
			'From the first moment I joined the company, Ariel taught me how to develop UI and how to work as a team. He always motivated us Jr developers to improve and gave us tools to do so. He is an exceptional coworker and an excellent person.'
	},
	{
		name: 'Esther Sack',
		url: 'https://www.linkedin.com/in/esther-sack/',
		position: 'Scrum Master',
		message: 'Ariel is an excellent developer, with great technical-functional analysis skills and has extensive experience working in agile teams.'
	},
	{
		name: 'Bárbara Lyschenko',
		url: 'https://www.linkedin.com/in/barbaralyschenko/',
		position: 'Designer',
		message: 'I worked with him for a while and he was an excellent professional with a lot of knowledge of his role.'
	}
]

export const facts = [
	{ k: 'Based in', v: 'Málaga, Spain' },
	{ k: 'Citizenship', v: 'Italian (EU)' },
	{ k: 'Working', v: 'Fully remote, Europe' },
	{ k: 'Languages', v: 'Spanish native · English C2 · Italian' }
]

/* What I'm open to, said once and reused. It used to exist only as a sentence
   in the closing Contact block, which meant the one thing a reader deciding
   whether to get in touch needs first was the last thing on the page. It now
   appears in the hero, in every post's footer and in Contact, all from here. */
export const availability = {
	open: 'Open to Front-End, Fullstack and AI work',
	where: 'Remote, Europe',
	status: 'Available'
}

/* The card that closes every post. Most readers arrive on an article from a
   shared link and never see the home page, so the article has to answer who
   wrote this, what they do and what they want — in plain language, because the
   person deciding whether to forward it is frequently not an engineer. */
export const identity = {
	name: 'Ariel Gianatiempo',
	role: 'Senior Front-End engineer',
	plain:
		"I've spent nineteen years making complicated software easier to use. Eight of them on the Back-End, eleven on the Front-End. I'm picking the Back-End half back up in Python, and building AI applications that follow what companies actually need.",
	place: 'Málaga, Spain'
}

/* Deliberately recent-first: the 2026 entries are what evidence the AI and
   Python claims, which otherwise rest on assertion alone. */
export const certifications = [
	{ year: '2026', name: 'Full Stack Development with Integrated AI', issuer: 'OpenWebinars' },
	{ year: '2026', name: 'Generative AI Agents', issuer: 'OpenWebinars' },
	{ year: '2026', name: 'Claude Platform 101 & Claude Code 101', issuer: 'Anthropic' },
	{ year: '2026', name: 'AWS Certified Cloud Practitioner (exam prep)', issuer: 'LinkedIn' },
	{ year: '2024', name: 'Python for Data Science, AI & Development', issuer: 'IBM' },
	{ year: '2024', name: 'EF SET English Certificate (C2 Proficient)', issuer: 'EF SET' }
]

/* Four items, and every one of them a place rather than a scroll position.
   
   It was seven: Practice, Projects, Writing, Milestones, Contact, About, CV —
   four of which were anchors into the home page and three of which were
   routes, so the same bar mixed "go somewhere" with "move down this page" and
   you could not tell which was which until you clicked. The home page is now
   short enough that it needs no internal navigation at all, Projects has been
   folded into Writing, and Practice and Milestones both live on About.

   Contact is the exception and stays an anchor — but a root-relative one,
   `/#contact` rather than `#contact`. The closing block only exists on the
   home page and on /about, so a bare fragment does nothing at all from
   /writing, from an entry, or from a beat page: the browser looks for
   `#contact` on the page you are already on, does not find it, and silently
   stays put. The leading slash is the whole fix — it means "the contact block
   on the home page" rather than "somewhere on this one". */
export const links: { to: string; label: string; external?: boolean }[] = [
	{ to: '/about', label: 'About' },
	{ to: '/writing', label: 'Writing' },
	{ to: '/#contact', label: 'Contact' },
	{ to: '/Ariel-Gianatiempo-Resume.pdf', label: 'CV', external: true }
]
