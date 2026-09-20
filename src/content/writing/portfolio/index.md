---
title: 'This site'
slug: 'this-site'
description: 'In 2024 I took a Tailwind template apart to learn Astro. Two years later I threw it out and built this one from scratch, around three levels of depth and one list that holds everything I write.'
date: 2026-09-17T00:00:00Z
beat: 'frontend'
form: 'project'
status: 'Shipping'
stack:
  - Astro
  - TypeScript
  - Tailwind
  - CSS scroll-driven animation
  - Canvas 2D
categories: ['website']
tags: ['astro', 'css', 'design', 'writing']
repoURL: https://github.com/gianatiempo/strata
---

Two years ago I built this site to learn Tailwind and Astro. That was the whole brief. I found a Tailus template, took it apart, put it back together in a way I liked, borrowed the blog and projects setup from Astro Micro, uninstalled React halfway through because I'd stopped needing it, and shipped. It worked fine. I was pretty happy with it.

Then I moved forgot about it and moved to Spain. Two years later, I'm back for more.

## So what was wrong with it?

Nothing was broken. It still built and it still loaded fast. The problem is that it was made to prove I could use Tailwind, and by 2026 that's not something anybody needs proof of.

What I need it to say now is a much bigger ask. Nineteen years of work, eight of them on Java Back-Ends, eleven on the Front-End, and now going back to the server with Python and building things that have AI inside them. A recruiter and an engineer both have to land on that and get what they came for, and those two people read completely differently. One wants the shape of a career in about ten seconds. The other one goes looking for what I actually touched, and notices when it isn't there.

So I rebuilt it. No template this time, just me and AI for about a week.

## The new look

The design is organized around how deep you want to go, and there are three levels. Everything on the site is one of them.

Level one is the claim. One plain sentence, readable by anyone. "Nineteen years making complicated software easier to use." If you read nothing else on the site, you've got the pitch.

Then the account, where I get to explain myself instead of just asserting things at people.

And in the end, the evidence. Numbers, dates, stacks, links to repos, the career as a table. Dark panels so you can skim the whole site reading only those.

There's also a hairline running down the left of every page... solid above where you're reading, a small dot that breathes where you are, and a dashed line below that keeps crawling downward.

Finally, a very slow field of particles drifting behind all of it, which does nothing whatsoever except giving some action to the whole thing. Both are there because a quiet, tasteful site reads as old, and I've shipped old once already.

## And the content

The 2024 site had a blog and a projects section, which is what everybody does and which I now think is wrong, at least for me.

So there's one list now, everything at `/writing`, newest first. A post is the long version of something, worked out properly. A project is a thing that exists, with a status and a stack on it. Same list, different treatment on the row, and the old `/post` and `/project` links still land where they always did.

Every entry also gets a beat, which is a magazine word and I'm using it on purpose. Front-End, Back-End, Trajectory. The browser side, the server and AI side, and the career stuff. Three facets of one publication, filed the way a magazine files its sections, because the Back-End years and the Front-End move really were very different things, and I'm trying to put them back together as one.

The career itself moved to `/about`, which is where somebody goes once the home page has already convinced them.

## What is next?

More writing, mostly. The point of the rebuild was to have somewhere to put things as I learn them, and Python is about to generate a lot of things to put (hope so!).

Thanks for reading, and see you soon.
