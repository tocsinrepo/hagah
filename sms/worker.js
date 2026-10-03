// Hagah by text message: a Cloudflare Worker that Twilio calls when you text the Hagah number.
// Replies are single numbers (or AMEN), so there's no real typing. Each text also links to the web app.
import { TOPICS } from "./topics.js";

const APP = "https://tocsinrepo.github.io/hagah/";
const MENU_TOPICS = ["purity","wisdom","peace","love","faithfulness","patience","delight"];

const blankLine = v => v.text.replace(new RegExp(`\\b${v.blank}\\b`), "____");
// Same rule as index.html: 12 daily slots walk the five open topics in order.
export function hourSlot(date, hour){
  const list = TOPICS.filter(t => !t.locked).flatMap(t => t.verses.map((_, i) => ({ t: t.id, ch: i })));
  const dayNum = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 864e5);
  const slot = Math.min(11, Math.max(0, hour - 8));
  return list[(((dayNum * 12 + slot) % list.length) + list.length) % list.length];
}
const topicOf = id => TOPICS.find(t => t.id === id);
const available = st => TOPICS.filter(t => !t.locked || (st.finished || []).length > 0);

export function fresh() { return { topic: null, ch: 0, step: "menu", opts: null, finished: [], journal: [], paused: false }; }

function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

function menuText(st){
  const list = available(st).map((t,i)=>`${i+1} ${t.name}`).join("\n");
  const held = TOPICS.filter(t=>t.locked && !available(st).includes(t)).map(t=>t.name).join(" and ");
  return `Hagah: "his delight is in the law of the LORD" (Ps 1:2 ESV)\nPick a topic. Reply:\n${list}` + (held ? `\n(${held} open after your first journey)` : "");
}

export function prompt(st){
  if (st.step === "menu") return menuText(st);
  const t = topicOf(st.topic), v = t.verses[st.ch], head = `${t.name} · Ch ${st.ch+1}/${t.verses.length}`;
  const link = `\n${APP}?topic=${t.id}`;
  switch (st.step) {
    case "read": return `${head} · 1/5 Read slowly\n"${v.text}" ${v.ref} ESV\nRead it out loud, slowly.\nReply 1 when done.`;
    case "say":  return `${head} · 2/5 Say it 3 times\nSay it softly three times.\nReply 1 when done.`;
    case "know": return `${head} · 3/5 Fill in the word\n"${blankLine(v)}"\n` + st.opts.map((o,i)=>`${i+1} ${o}`).join("\n") + `\nReply 1, 2, or 3.`;
    case "do":   return `${head} · 4/5 Be a doer\nPick one way to live this today:\n` + t.doer.map((d,i)=>`${i+1} ${d}`).join("\n") + `\nReply 1, 2, or 3.`;
    case "pray": return `${head} · 5/5 Pray it back\n${t.prayer}\nReply AMEN (or 1) when done.` + link;
  }
}

// Pure state machine: takes saved state and the incoming text, returns [newState, replyText].
export function step(st, raw){
  const body = (raw || "").trim().toUpperCase();
  const n = parseInt(body, 10);
  if (["STOP","UNSUBSCRIBE","CANCEL","END","QUIT"].includes(body)) { st.paused = true; return [st, ""]; } // Twilio sends the opt-out confirmation itself.
  if (["START","HAGAH","UNSTOP","YES"].includes(body)) { st.paused = false; if (st.step === "menu") return [st, menuText(st)]; return [st, "Welcome back.\n" + prompt(st)]; }
  if (body === "MENU") { st.step = "menu"; return [st, menuText(st)]; }
  if (body === "HELP") return [st, "Hagah replies: a number to choose, AMEN to finish a chapter, MENU for topics, LINK for the app, STOP to stop texts."];
  if (body === "LINK") return [st, st.topic ? `${APP}?topic=${st.topic}` : APP];

  if (st.step === "menu") {
    const list = available(st);
    if (n >= 1 && n <= list.length) { st.topic = list[n-1].id; st.ch = 0; st.step = "read"; return [st, `Journey: ${list[n-1].name} (3 chapters)\n` + prompt(st)]; }
    return [st, menuText(st)];
  }
  const t = topicOf(st.topic), v = t.verses[st.ch];
  switch (st.step) {
    case "read": if (n === 1) { st.step = "say"; return [st, prompt(st)]; } break;
    case "say":  if (n === 1) { st.step = "know"; st.opts = shuffle([v.blank, ...v.wrong]); return [st, prompt(st)]; } break;
    case "know":
      if (n >= 1 && n <= 3) {
        if (st.opts[n-1] === v.blank) { st.step = "do"; return [st, `Yes: "${v.text}"\n\n` + prompt(st)]; }
        return [st, "Not quite. Read it once more in your mind.\n" + prompt(st)];
      } break;
    case "do":
      if (n >= 1 && n <= t.doer.length) { st.journal.push({ text: t.doer[n-1], ref: v.ref, date: new Date().toISOString().slice(0,10) }); st.journal = st.journal.slice(-50); st.step = "pray"; return [st, `Committed: ${t.doer[n-1]}\n\n` + prompt(st)]; }
      break;
    case "pray":
      if (body === "AMEN" || n === 1) {
        if (st.ch < t.verses.length - 1) { st.ch++; st.step = "read"; return [st, `Amen. Chapter ${st.ch} complete.\n\n` + prompt(st)]; }
        if (!st.finished.includes(t.id)) st.finished.push(t.id);
        st.step = "menu"; st.topic = null; st.ch = 0;
        return [st, `Amen. ${t.name} journey complete. "Your word is a lamp to my feet" (Ps 119:105 ESV)\n\n` + menuText(st)];
      } break;
  }
  return [st, "Reply with one of the numbers shown.\n" + prompt(st)];
}

// ---------- Twilio plumbing ----------
async function twilioSignatureOk(req, env, params){
  const sig = req.headers.get("X-Twilio-Signature") || "";
  const url = env.PUBLIC_URL || req.url;
  const data = url + Object.keys(params).sort().map(k => k + params[k]).join("");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.TWILIO_AUTH_TOKEN), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const expected = btoa(String.fromCharCode(...new Uint8Array(mac)));
  return expected === sig;
}
const xml = s => s.replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
const twiml = text => new Response(`<?xml version="1.0" encoding="UTF-8"?><Response>${text ? `<Message>${xml(text)}</Message>` : ""}</Response>`, { headers: { "Content-Type": "text/xml" } });
const allowed = (env, from) => (env.ALLOWED_NUMBERS || "").split(",").map(s => s.trim()).filter(Boolean).includes(from);

async function sendSms(env, to, body){
  const auth = btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`);
  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
    method: "POST", headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ To: to, From: env.TWILIO_FROM, Body: body })
  });
}

export default {
  async fetch(req, env){
    if (req.method !== "POST") return new Response("Hagah SMS is running.", { status: 200 });
    const params = Object.fromEntries(new URLSearchParams(await req.text()));
    if (!(await twilioSignatureOk(req, env, params))) return new Response("Forbidden", { status: 403 });
    const from = params.From;
    if (!allowed(env, from)) return twiml(""); // Only numbers you list can use it, so strangers can't run up texts.
    const st = JSON.parse(await env.HAGAH.get(from) || "null") || fresh();
    const [next, reply] = step(st, params.Body);
    await env.HAGAH.put(from, JSON.stringify(next));
    return twiml(reply);
  },
  // Hourly Hagah: one text per hour, 8 AM-7 PM Eastern, each linking to that hour's meditation.
  async scheduled(evt, env){
    const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",hour12:false}).formatToParts(new Date(evt.scheduledTime)).map(p=>[p.type,p.value]));
    const hour = parseInt(parts.hour,10) % 24;
    if (hour < 8 || hour > 19) return;
    const date = new Date(+parts.year, +parts.month-1, +parts.day);
    const s = hourSlot(date, hour), t = topicOf(s.t), v = t.verses[s.ch];
    const label = `${hour%12||12} ${hour<12?"AM":"PM"}`;
    for (const to of (env.ALLOWED_NUMBERS || "").split(",").map(x => x.trim()).filter(Boolean)) {
      const st = JSON.parse(await env.HAGAH.get(to) || "null") || fresh();
      if (st.paused) continue;
      await sendSms(env, to, `Your ${label} Hagah: ${t.name}, ${v.ref}\nTap to begin: ${APP}?hour=${hour}`);
    }
  }
};
