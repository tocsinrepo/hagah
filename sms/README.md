# Hagah by text message

An extra way to use Hagah: it texts you a verse, and you reply with a single number to move through the same five steps as the web app. Every chapter's last text links to the app.

## How the text flow works
- Text **HAGAH** to the Hagah number. It replies with the topic menu (Purity, Wisdom, Peace, Love, Faithfulness; Patience and Delight open after your first journey).
- Reply a number to pick a topic. Each topic is three chapters, one ESV verse each.
- Steps: **1/5 Read slowly** (reply 1), **2/5 Say it three times** (reply 1), **3/5 Fill in the word** (reply 1, 2, or 3), **4/5 Be a doer** (reply 1, 2, or 3), **5/5 Pray it back** (reply AMEN or 1).
- Other replies: **MENU**, **LINK**, **HELP**, **STOP** (stops texts), **START** (resumes).
- **Hourly Hagah:** every hour from 8 AM to 7 PM ET it texts "Your 3 PM Hagah" with a link (`?hour=15`) that opens that hour's verse in the app. The 12 hours walk the five topics in order and continue the next day. STOP turns the texts off.
- Only phone numbers listed in `ALLOWED_NUMBERS` get answers, so strangers can't run up texts.

## What it needs to go live
1. A Twilio account and a Twilio phone number. US numbers have to pass carrier registration (A2P 10DLC, or toll-free verification) before they can send.
2. A free Cloudflare account to run `worker.js`.
3. Deploy: `wrangler kv namespace create HAGAH`, put the id in `wrangler.toml`, set the secrets listed there with `wrangler secret put`, then `wrangler deploy`.
4. In Twilio, set the number's "A message comes in" webhook to the worker URL (HTTP POST).

Verses live in `topics.js` and match `index.html`. Keep the two in sync.
Scripture quotations are from the ESV Bible, (c) 2001 by Crossway. Used by permission. All rights reserved.
