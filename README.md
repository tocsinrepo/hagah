# Hagah

A Psalm 1 meditation game: delight in God's word, one verse at a time.

- Pick a topic (Purity, Wisdom, Peace, Love, Faithfulness). Patience and Delight open after the first finished journey.
- Each topic is a three-chapter journey. Each chapter is one ESV verse and five steps: read slowly, say it three times, fill in the missing word, pick one way to live it, pray it back.
- Taps only. No typing anywhere. An optional mic button (where the browser supports it) lets you say the verse or your own commitment out loud.
- No leaderboard, badges, or random rewards (Matthew 6:1-6). Progress stays in your browser.

## Adding verses later
Open `index.html` and find `TOPICS` near the top of the script. Add `{ref, text, blank, wrong:[...]}` to a topic's `verses` list. `blank` is one word from `text`; `wrong` is two other plausible words.

Scripture quotations are from the ESV Bible, (c) 2001 by Crossway. Used by permission. All rights reserved.
