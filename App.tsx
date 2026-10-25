import { useState, useEffect, useMemo } from "react";

// ----- Types & Data -----
type Pattern = {
  id: string;
  name: string;
  desc: string;
  formula: string;
};

const PATTERNS: Pattern[] = [
  { id: "frame", name: "結構性框架", desc: "先把框架搭起來，再繼續討論", formula: "拉高層次 → 拆成變項 → 追問依據 → 持續討論" },
  { id: "loop", name: "定義繞圈", desc: "有做嗎？不一定。沒做嗎？也不盡然", formula: "有做嗎 → 不一定 → 沒做嗎 → 也不盡然 → 正在過程中" },
  { id: "corridor", name: "城市廊帶", desc: "發現問題，串聯地標，解決一切", formula: "發現節點 → 串聯廊帶 → 系統對齊 → 四面向一次解決" },
  { id: "abcd", name: "ABCD因果接龍", desc: "讓A回到B，再一路接到D", formula: "A → B → C → D → 從A走到D" },
  { id: "risk", name: "風險治理體", desc: "先談風險，再談治理，細節再說", formula: "風險識別 → 結構化 → 治理機制 → 細節再議" },
  { id: "info", name: "資訊透明體", desc: "資訊進來，標準形成，持續對齊", formula: "資訊輸入 → 標準形成 → 透明對齊 → 持續討論" },
  { id: "resilience", name: "韌性防禦體", desc: "從脆弱出發，走向韌性，疊加社會", formula: "脆弱盤點 → 韌性建構 → 社會疊加 → 不對稱防禦" },
  { id: "align", name: "對齊共識體", desc: "我們要對齊，要收斂，要前進", formula: "對齊變項 → 收斂分歧 → 共識前進" },
  { id: "rolling", name: "滾動修正體", desc: "邊走邊修，邊修邊對，持續迭代", formula: "滾動實施 → 對齊修正 → 迭代治理" },
  { id: "inventory", name: "盤點機制體", desc: "先盤點，再機制，最後治理", formula: "盤點現況 → 建構機制 → 治理收斂" },
  { id: "cross", name: "跨域整合體", desc: "跨域、整合、加值、永續", formula: "跨域串聯 → 整合節點 → 加值永續" },
  { id: "corridor-econ", name: "廊帶經濟體", desc: "一個廊帶，串起所有願景", formula: "單點 → 廊帶 → 系統經濟 → 願景疊加" },
  { id: "digital", name: "數位賦能體", desc: "數位是手段，賦能是過程", formula: "數位手段 → 賦能過程 → 依據透明" },
  { id: "diverse", name: "多元共榮體", desc: "多元、共融、共好、共榮", formula: "多元盤點 → 共融對齊 → 共榮願景" },
  { id: "value", name: "價值疊加體", desc: "疊加價值，創造新局", formula: "價值盤點 → 疊加建構 → 新局創造" },
  { id: "depth", name: "戰略縱深體", desc: "拉出縱深，建構不對稱", formula: "拉出縱深 → 建構不對稱 → 系統對接" },
];

const ABSTRACT_NOUNS = ["框架","結構","風險","資訊","透明度","韌性","治理","機制","變項","依據","廊帶","節點","盤點","對齊","疊加","縱深","系統","脈絡","願景","論述","節奏","共識","標準","介面"];
const VERBS = ["涵蓋","對接","串聯","盤點","收斂","對齊","拆解","建構","疊加","滾動","修正","加值","賦能","整合"];
const QUICK_TAGS = ["颱風假","健身","城市更新","買咖啡","加班","房租","點開率"];

const ABSTRACTION_LABELS = [
  { max: 20, label: "還聽得懂" },
  { max: 40, label: "開始繞了" },
  { max: 60, label: "概念湧現" },
  { max: 80, label: "進入結構" },
  { max: 100, label: "平行宇宙" },
];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random()*arr.length)]; }

function enhanceForAbstraction(text: string, level: number): string {
  if (level < 30) return text;
  if (level < 70) {
    if (Math.random() < 0.4) {
      const inject = ["也就是說，","換句話說，","在這個脈絡底下，"];
      return inject[Math.floor(Math.random()*inject.length)] + text;
    }
    return text;
  }
  const heavy = [
    "結構性的結構",
    "系統性的盤點",
    "機制化的機制",
    "概念上的概念",
    "持續性的持續",
    "治理的治理",
  ];
  let t = text;
  if (Math.random() < 0.6) {
    t += `，這本身就是一種${pick(heavy)}的過程。`;
  }
  if (Math.random() < 0.5) {
    t = t.replace(/。/g, `，並在${pick(ABSTRACT_NOUNS)}與${pick(ABSTRACT_NOUNS)}之間持續被${pick(VERBS)}。`);
  }
  return t;
}

type CustomABCD = { A:string; B:string; C:string; D:string };

function generateEssay(topic: string, patternId: string, abstraction: number, custom: CustomABCD): string {
  const rN = () => pick(ABSTRACT_NOUNS);
  const rV = () => pick(VERBS);
  const t = topic || "這個議題";
  const A = custom.A || "基礎認知";
  const B = custom.B || "風險評估";
  const C = custom.C || "治理機制";
  const D = custom.D || "社會韌性";

  let paras: string[] = [];

  const low = abstraction < 30;
  const high = abstraction >= 70;

  switch(patternId) {
    case "frame":
      paras = [
        `我覺得，討論${t}，可能要先跳出我們平常習慣的問法。`,
        `如果只問眼前有沒有${t}，可能還不足以涵蓋整個決策問題。我們要談的，還包括預測的不確定性、${rN()}如何被理解，以及生活如何被安排。`,
        `所以在這裡，我們要多問幾個問題：資訊是怎麼進來的？標準是怎麼形成的？不同的人，能不能看見同一套依據？`,
        `如果只拿單一現象當答案，整個框架可能就被壓得太扁了。`,
        `未來值得討論的是，怎麼讓${t}的${rN()}，在${rN()}與${rN()}之間，持續被對齊。`
      ];
      break;
    case "loop":
      paras = [
        `談到${t}，大家第一個會問：有做嗎？`,
        `我的答案是，不一定。`,
        `那沒做嗎？也不盡然。`,
        `因為${t}這件事情，本身就有一個定義的問題。我們如果把定義拉得太窄，好像什麼都沒做；拉得太寬，又好像什麼都做了。`,
        `所以與其說有或沒有，不如說我們正在一個「${rN()}正在${rV()}的過程中」。這個過程，本身就是${rN()}。`,
        `重點不是答案是有或沒有，而是${rN()}有沒有被${rV()}，${rN()}有沒有被看見。`
      ];
      break;
    case "corridor":
      paras = [
        `當我們在談${t}的時候，其實是在談一條廊帶。`,
        `從${pick(["北門","大稻埕","華山","松菸","信義","南港"])}到${pick(["關渡","士林","公館","景美","木柵"])}, 每一個節點都是一個${rN()}。${t}不是單點，而是一個系統。`,
        `如果我們能把${t}放進城市的廊帶裡，就能同時處理交通、經濟、生活與願景。四個面向，一次對齊。`,
        `這就是為什麼談${t}，最後會談到${rN()}，談到${rN()}，談到城市如何透過${rV()}來建構新的${rN()}。`
      ];
      break;
    case "abcd":
      paras = [
        `A是${A}，A會回到B，也就是${B}。`,
        `當${B}被建構起來，C，也就是${C}，就會自然產生。`,
        `最後，所有的C，都會通往D，也就是${D}。`,
        `所以談${t}，其實就是在談怎麼從${A}走到${D}。`,
        `這中間的每一層${rN()}，都是在${rN()}的脈絡下，被${rV()}與${rV()}的過程。`
      ];
      break;
    case "risk":
      paras = [
        `談${t}，我們要先談風險。不是談有沒有風險，而是談風險怎麼被看見。`,
        `風險如果沒有被結構化，它就會在${rN()}裡面不斷${rV()}，然後變成另一種${rN()}。`,
        `治理不是一次到位的答案，而是讓${t}的${rN()}能夠被${rV()}、被${rV()}、最後被收斂。`,
        `所以細節可以再說，但框架要先搭起來。沒有框架的細節，就是沒有${rN()}的${rN()}。`
      ];
      break;
    case "info":
      paras = [
        `${t}的第一個問題是資訊怎麼進來。`,
        `如果資訊進不來，${rN()}就無法形成，${rN()}也無法對齊。`,
        `我們要讓資訊是${high ? "結構性地透明、系統性地可追溯" : "透明"}的，讓標準可以被看見，讓${t}可以在${rN()}與${rN()}之間被討論。`,
        `持續對齊，本身就是答案。對齊不是一次性的，而是讓${rN()}可以不斷被${rV()}的過程。`
      ];
      break;
    case "resilience":
      paras = [
        `從脆弱出發，${t}其實暴露了我們的${rN()}還不夠韌性。`,
        `韌性不是硬起來就好，而是讓${rN()}可以疊加在${rN()}之上，形成一種不對稱的保護。`,
        `當${t}發生時，我們要問的不只是怎麼修補，而是怎麼讓社會的${rN()}也一起被${rV()}。`,
        `這就是從脆弱走向韌性，再從韌性走向社會的過程。這條路，就是${t}的${rN()}。`
      ];
      break;
    case "align":
      paras = [
        `談${t}，核心就是對齊。`,
        `我們要先對齊${rN()}，再對齊${rN()}，最後對齊願景。`,
        `如果沒有對齊，每個人談的${t}都是不同的${t}。有人看到的是${rN()}，有人看到的是${rN()}。`,
        `所以我們要收斂，要前進，要在${rN()}的基礎上，讓${t}被重新建構一次。這就是對齊的價值。`
      ];
      break;
    case "rolling":
      paras = [
        `${t}不是一次定案的事情。`,
        `我們是邊走邊修，邊修邊對，持續迭代。`,
        `今天看見的${rN()}，明天可能就要被${rV()}，因為脈絡在變，${rN()}也在變。`,
        `所以與其一次給答案，不如讓${t}在滾動中被修正，在修正中被對齊。這才是負責任的${rN()}。`
      ];
      break;
    case "inventory":
      paras = [
        `要談${t}，第一步是盤點。`,
        `盤點什麼？盤點${rN()}、盤點${rN()}、盤點目前的${rN()}。沒有盤點，就沒有${rN()}。`,
        `盤點完之後，才是機制。機制是讓${t}可以被${rV()}、被${rV()}的過程，是讓${rN()}可以對接${rN()}的介面。`,
        `最後才是治理。治理不是終點，是讓盤點與機制可以持續對話的框架。`
      ];
      break;
    case "cross":
      paras = [
        `${t}從來不是單一領域的問題。`,
        `它需要跨域，需要整合，需要加值，最後走向永續。`,
        `當我們把${t}的${rN()}放進${rN()}的脈絡裡，就會發現它其實可以${rV()}到更多節點，從${rN()}到${rN()}，都是一個系統。`,
        `跨域的重點不是跨得多，而是整合之後，能不能產生新的${rN()}，能不能讓${t}從議題變成願景。`
      ];
      break;
    case "corridor-econ":
      paras = [
        `一個廊帶，可以串起所有願景。`,
        `${t}如果只是一個點，它的經濟效益是有限的。但如果把它放進廊帶，它就變成一個系統。`,
        `從${rN()}到${rN()}，從${rN()}到${rN()}，${t}會在廊帶裡面不斷${rV()}，不斷疊加，最後形成一種${rN()}的經濟。`,
        `所以我們談的不是${t}本身，而是廊帶如何帶動整個${rN()}，如何讓${rN()}被重新定義。`
      ];
      break;
    case "digital":
      paras = [
        `數位是手段，賦能是過程。`,
        `談${t}的時候，很多人會問要不要數位化。我的答案是，數位不是目的，賦能才是。`,
        `重點是${t}的${rN()}，能不能透過數位被${rV()}，讓${rN()}被${rV()}，讓人可以看見依據，可以看見標準。`,
        `如果數位不能賦能，那數位就只是數位而已，就只是另一種${rN()}，沒有辦法回到${rN()}本身。`
      ];
      break;
    case "diverse":
      paras = [
        `${t}的多元性，在於它的${rN()}本來就很多元。`,
        `我們要談共融，要談共好，最後談共榮。共融不是口號，是讓不同的${rN()}可以在同一個${rN()}裡被看見。`,
        `共榮不是說大家都一樣，而是讓不同的${rN()}可以在同一個框架裡被對齊，被${rV()}，被${rV()}。`,
        `所以${t}的答案，可能不是單一答案，而是多元的${rN()}如何共榮的過程，如何在${rN()}中長出新的${rN()}。`
      ];
      break;
    case "value":
      paras = [
        `${t}的價值，不在於它本身，而在於它能疊加什麼。`,
        `當${rN()}疊加在${rN()}之上，${t}就會產生新的價值。這個價值不是被給定的，是被建構出來的。`,
        `是在${rN()}與${rN()}的對接中，持續被${rV()}，持續被${rV()}，最後被收斂成一個願景的過程。`,
        `所以我們要談疊加，談創造新局，談${t}如何從一個議題，變成一個可以被對齊的${rN()}。`
      ];
      break;
    case "depth":
      paras = [
        `談${t}，要先拉出縱深。`,
        `如果只看眼前的${t}，我們看到的只有點。但如果拉出縱深，看到的就是系統，就是${rN()}與${rN()}的疊加。`,
        `縱深讓我們可以建構不對稱，讓${rN()}可以對接${rN()}，讓${rN()}可以疊加在風險之上，形成一種韌性。`,
        `所以${t}的重點，從來不是${t}，而是縱深之後，我們有沒有更完整的${rN()}，有沒有辦法在${rN()}中看見${rN()}。`
      ];
      break;
    default:
      paras = [`討論${t}，我們需要一個${rN()}的框架。`];
  }

  if (low) {
    paras = paras.slice(0, 3).map(p => {
      return p.split("，")[0] + "。我覺得這需要被" + rV() + "。";
    });
  } else if (high) {
    paras = paras.map(p => enhanceForAbstraction(p, abstraction));
    if (Math.random() < 0.8) {
      paras.push(`而這一切，最終都要回到${rN()}本身，回到${rN()}如何被${rV()}、被對齊、被持續討論的提問。`);
    }
  } else {
    paras = paras.map(p => enhanceForAbstraction(p, abstraction));
  }

  return paras.join("\n\n");
}

const PATTERN_HINTS: Record<string, string[]> = {
  frame: ["框架","依據","追問","變項"],
  loop: ["有做嗎","不一定","也不盡然","定義"],
  corridor: ["廊帶","節點","地標"],
  abcd: ["會回到","自然產生","通往"],
  risk: ["風險","治理"],
  info: ["資訊","標準","透明"],
  resilience: ["韌性","脆弱","防禦"],
  align: ["對齊","收斂","共識"],
  rolling: ["滾動","迭代","邊走邊修"],
  inventory: ["盤點","機制"],
  cross: ["跨域","整合","永續"],
  "corridor-econ": ["經濟","單點"],
  digital: ["數位","賦能"],
  diverse: ["多元","共榮","共融"],
  value: ["價值","疊加","新局"],
  depth: ["縱深","不對稱"],
};

const REPLY_OPENERS = [
  "你說的「{q}」，我覺得要先對齊一下定義。",
  "關於「{q}」，這個問題很好，但我們要先跳出來看。",
  "「{q}」這件事，我們先拆成變項再談。",
];

const REPLY_CLOSERS = [
  "所以我想反問一句：{a}的{b}，到底怎麼被對齊？",
  "這樣講，應該已經很清楚了吧。",
];

function buildReply(input: string, patternId: string, abstraction: number): string {
  const q = input.replace(/[，。！？、；：,.!?;:]/g, "").trim().slice(0, 30);
  const opener = pick(REPLY_OPENERS).replace("{q}", q);
  const body = generateEssay(q, patternId, abstraction, { A:"", B:"", C:"", D:"" });
  const closer = pick(REPLY_CLOSERS).replace("{a}", pick(ABSTRACT_NOUNS)).replace("{b}", pick(ABSTRACT_NOUNS));
  return [opener, body, closer].join("\n\n");
}

function splitSentences(text: string): string[] {
  return text.split(/[。！？!?\n]/).map(s=>s.trim()).filter(Boolean);
}

function analyzeText(text: string) {
  const sentences = splitSentences(text);
  const termCounts = [...new Set([...ABSTRACT_NOUNS, ...VERBS])]
    .map(term=>({ term, count: text.split(term).length - 1 }))
    .filter(x=>x.count>0)
    .sort((a,b)=>b.count-a.count);
  const termHits = termCounts.reduce((sum,x)=>sum+x.count, 0);
  const ranked = PATTERNS
    .map(p=>({ pattern: p, matched: PATTERN_HINTS[p.id].filter(h=>text.includes(h)) }))
    .sort((a,b)=>b.matched.length-a.matched.length);
  const best = ranked[0].matched.length > 0 ? ranked[0] : null;
  const density = sentences.length ? termHits / sentences.length : 0;
  const abstraction = Math.min(100, Math.round(density * 15));
  return { sentences, termCounts, pattern: best?.pattern ?? null, matched: best?.matched ?? [], abstraction };
}

function highlight(sentence: string, terms: string[]) {
  if (terms.length === 0) return sentence;
  const escaped = terms.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "g");
  return sentence.split(re).map((part, i)=> terms.includes(part)
    ? <mark key={i} style={{ background: "var(--lime)", color: "#111", borderRadius: 4, padding: "0 2px" }}>{part}</mark>
    : <span key={i}>{part}</span>
  );
}

function ReplyPanel() {
  const [input, setInput] = useState("");
  const [patternId, setPatternId] = useState("frame");
  const [abstraction, setAbstraction] = useState(70);
  const [reply, setReply] = useState("");
  const label = ABSTRACTION_LABELS.find(a=> abstraction <= a.max)?.label || "平行宇宙";

  return (
    <div className="p-5 md:p-7">
      <div className="mono text-[10px] tracking-[0.14em] font-bold opacity-60 mb-4">INPUT / 對方的說法</div>
      <h2 className="text-[22px] md:text-[26px] font-black mb-4">對方說了什麼？</h2>
      <textarea
        value={input}
        onChange={e=>setInput(e.target.value)}
        placeholder="例如：颱風假到底要不要放？"
        rows={3}
        maxLength={60}
        className="w-full border-[2px] rounded-[14px] px-4 py-3 text-[16px] font-bold focus:outline-none themed-transition"
        style={{ background: "var(--input-bg)", borderColor: "var(--border)", color: "var(--text)" }}
      />

      <div className="mt-6">
        <h3 className="font-black text-[14px] mb-3">用哪種句型回？</h3>
        <div className="flex flex-wrap gap-2">
          {PATTERNS.map(p=>(
            <button
              key={p.id}
              onClick={()=>setPatternId(p.id)}
              className="mono text-[11px] font-bold border-[2px] rounded-full px-3 py-1.5 themed-transition"
              style={{
                background: patternId===p.id ? "var(--lime)" : "var(--card)",
                borderColor: "var(--border)",
                color: patternId===p.id ? "#111" : "var(--text)",
              }}
            >{p.name}</button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-black text-[14px] mono">抽象濃度</h3>
          <div className="mono text-[12px] font-bold rounded-full px-3 py-1 themed-transition" style={{ background: "var(--text)", color: "var(--bg)" }}>
            {abstraction}% · {label}
          </div>
        </div>
        <input type="range" min={0} max={100} value={abstraction} onChange={e=>setAbstraction(parseInt(e.target.value))} className="w-full" />
      </div>

      <button
        disabled={!input.trim()}
        onClick={()=>setReply(buildReply(input, patternId, abstraction))}
        className="mt-6 w-full border-[2px] rounded-[14px] py-4 font-black text-[18px] themed-transition disabled:opacity-40"
        style={{ background: "var(--text)", color: "var(--bg)", borderColor: "var(--border)" }}
      >產生回覆</button>

      {reply && (
        <div className="mt-6 border-[2px] rounded-[14px] p-5 themed-transition" style={{ background: "var(--card-2)", borderColor: "var(--border)" }}>
          <div className="mono text-[10px] font-bold opacity-60 mb-3">REPLY / 伯洋式回覆</div>
          <div className="font-black text-[16px] leading-[1.7] whitespace-pre-wrap">{reply}</div>
        </div>
      )}
    </div>
  );
}

function DecodePanel() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeText> | null>(null);
  const label = result ? (ABSTRACTION_LABELS.find(a=> result.abstraction <= a.max)?.label || "平行宇宙") : "";

  return (
    <div className="p-5 md:p-7">
      <div className="mono text-[10px] tracking-[0.14em] font-bold opacity-60 mb-4">INPUT / 待拆解的文字</div>
      <h2 className="text-[22px] md:text-[26px] font-black mb-4">把這段話拆開看看</h2>
      <textarea
        value={input}
        onChange={e=>setInput(e.target.value)}
        placeholder="貼上一段論述，例如：我們要先拆解風險，再談治理與對齊。"
        rows={5}
        maxLength={400}
        className="w-full border-[2px] rounded-[14px] px-4 py-3 text-[16px] font-bold focus:outline-none themed-transition"
        style={{ background: "var(--input-bg)", borderColor: "var(--border)", color: "var(--text)" }}
      />

      <button
        disabled={!input.trim()}
        onClick={()=>setResult(analyzeText(input))}
        className="mt-6 w-full border-[2px] rounded-[14px] py-4 font-black text-[18px] themed-transition disabled:opacity-40"
        style={{ background: "var(--text)", color: "var(--bg)", borderColor: "var(--border)" }}
      >開始拆解</button>

      {result && (
        <div className="mt-6 space-y-6">
          <section>
            <h3 className="font-black text-[14px] mb-2">偵測句型</h3>
            {result.pattern ? (
              <>
                <div className="font-black text-[18px] mb-2">{result.pattern.name}</div>
                <div className="rounded-[12px] p-3 border-[2px] mono text-[12px] font-bold leading-snug themed-transition" style={{ background: "var(--formula-bg)", borderColor: "var(--border)", color: "var(--formula-text)" }}>{result.pattern.formula}</div>
                <div className="mt-2 mono text-[11px] opacity-60">命中關鍵詞：{result.matched.join("、")}</div>
              </>
            ) : (
              <div className="mono text-[12px] opacity-60">未偵測到明確句型</div>
            )}
          </section>

          <section>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-black text-[14px]">抽象濃度</h3>
              <div className="mono text-[12px] font-bold rounded-full px-3 py-1 themed-transition" style={{ background: "var(--text)", color: "var(--bg)" }}>
                {result.abstraction}% · {label}
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-black text-[14px] mb-2">抽象詞彙</h3>
            {result.termCounts.length > 0 ? (
              <div className="flex flex-wrap gap-2 mono text-[11px]">
                {result.termCounts.map(x=>(
                  <span key={x.term} className="border-[2px] rounded-full px-3 py-1 font-bold themed-transition" style={{ background: "var(--card-2)", borderColor: "var(--border)" }}>{x.term} ×{x.count}</span>
                ))}
              </div>
            ) : (
              <div className="mono text-[12px] opacity-60">沒有抽象詞彙</div>
            )}
          </section>

          <section>
            <h3 className="font-black text-[14px] mb-2">逐句標記</h3>
            {result.sentences.length > 0 ? (
              <div className="space-y-2">
                {result.sentences.map((s, i)=>(
                  <p key={i} className="border-l-[3px] pl-3 text-[15px] font-bold leading-relaxed" style={{ borderColor: "var(--border)" }}>
                    {highlight(s, result.termCounts.map(x=>x.term))}
                  </p>
                ))}
              </div>
            ) : (
              <div className="mono text-[12px] opacity-60">沒有可拆解的句子</div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

// ----- Component -----
export default function App() {
  const [topic, setTopic] = useState("颱風假");
  const [selectedPattern, setSelectedPattern] = useState<string>("frame");
  const [abstraction, setAbstraction] = useState(70);
  const [expanded, setExpanded] = useState(false);
  const [customABCD, setCustomABCD] = useState<CustomABCD>({ A:"基礎認知", B:"風險評估", C:"治理機制", D:"社會韌性" });
  const [showCustom, setShowCustom] = useState(false);
  const [essay, setEssay] = useState("");
  const [essayMeta, setEssayMeta] = useState<{pattern: string; topic: string; no: number}>({pattern:"結構性框架", topic:"颱風假", no:1});
  const [genCount, setGenCount] = useState(1);
  const [activeTab, setActiveTab] = useState<"01"|"02"|"03">("01");
  const [copied, setCopied] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [lastClickedTag, setLastClickedTag] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light"|"dark">("light");

  const visiblePatterns = useMemo(()=> expanded ? PATTERNS : PATTERNS.slice(0,4), [expanded]);

  const currentPatternObj = PATTERNS.find(p=>p.id===selectedPattern) || PATTERNS[0];
  const abstractionLabel = ABSTRACTION_LABELS.find(a=> abstraction <= a.max)?.label || "平行宇宙";

  // Theme init: localStorage + prefers-color-scheme
  useEffect(()=>{
    const saved = localStorage.getItem("boyangti-theme");
    let init: "light"|"dark" = "light";
    if (saved === "dark" || saved === "light") {
      init = saved as "light"|"dark";
    } else if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      init = "dark";
    }
    setTheme(init);
    document.documentElement.setAttribute("data-theme", init);
  }, []);

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("boyangti-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const handleGenerate = (overrideTopic?: string, overridePattern?: string, overrideAbstraction?: number) => {
    const t = overrideTopic ?? topic;
    const p = overridePattern ?? selectedPattern;
    const abs = overrideAbstraction ?? abstraction;
    const result = generateEssay(t, p, abs, customABCD);
    setEssay(result);
    const patName = PATTERNS.find(x=>x.id===p)?.name || "";
    setEssayMeta({ pattern: patName, topic: t, no: genCount });
    setGenCount(c=>c+1);
  };

  useEffect(()=> {
    const initial = generateEssay("颱風假", "frame", 70, { A:"基礎認知", B:"風險評估", C:"治理機制", D:"社會韌性" });
    setEssay(initial);
  }, []);

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = essay;
    document.body.appendChild(textArea);
    textArea.select();
    try { document.execCommand("copy"); setCopied(true); setTimeout(()=>setCopied(false), 1500); } catch {}
    document.body.removeChild(textArea);
  };

  const handleRandom = () => {
    const randomTopic = pick(QUICK_TAGS.concat(["捷運","夜市","AI","通勤","都更","咖啡廳","房價"]));
    const randomPattern = pick(PATTERNS).id;
    const randomAbs = Math.floor(Math.random()*60)+30;
    setTopic(randomTopic);
    setSelectedPattern(randomPattern);
    setAbstraction(randomAbs);
    handleGenerate(randomTopic, randomPattern, randomAbs);
  };

  const handleMoreAbstract = () => {
    const next = Math.min(100, abstraction+15);
    setAbstraction(next);
    handleGenerate(undefined, undefined, next);
  };

  const isDark = theme === "dark";

  // shared themed styles
  const cardStyle = {
    background: "var(--card)",
    borderColor: "var(--border)",
    color: "var(--text)",
  } as const;

  const inputStyle = {
    background: "var(--input-bg)",
    borderColor: "var(--border)",
    color: "var(--text)",
  } as const;

  return (
    <div 
      data-safe-area-inset-root
      className="min-h-screen w-full overflow-x-clip selection:bg-[#D4FF00] themed-transition"
      style={{ 
        background: "var(--bg)", 
        color: "var(--text)",
        boxSizing: "border-box", 
        paddingTop: "var(--safe-area-inset-top)" 
      }}
    >
      {/* Header */}
      <header 
        data-safe-area-sticky-top
        className="sticky z-30 w-full backdrop-blur-md border-b-[2px] themed-transition"
        style={{ 
          top: "var(--safe-area-inset-top)",
          background: "var(--header-bg)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div 
              className="h-8 w-8 rounded-full flex items-center justify-center font-black mono text-[10px] themed-transition"
              style={{ background: "var(--text)", color: "var(--lime)" }}
            >RH</div>
            <div className="leading-[0.9]">
              <div className="font-black text-[13px] tracking-tight">空話製造研究所</div>
              <div className="mono text-[9px] tracking-[0.15em] opacity-70">THE RHETORIC LAB</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? "切換至亮版" : "切換至暗版"}
              className="mono text-[11px] font-bold border-[2px] rounded-full px-3 md:px-4 py-1.5 flex items-center gap-1.5 themed-transition hover:opacity-80 active:scale-[0.97]"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              <span className="text-[13px] leading-none">{isDark ? "☀️" : "🌙"}</span>
              <span className="hidden sm:inline">{isDark ? "亮版" : "暗版"}</span>
              <span className="sm:hidden">{isDark ? "亮" : "暗"}</span>
            </button>

            <button 
              onClick={()=>setAboutOpen(v=>!v)} 
              className="mono text-[11px] font-bold border-[2px] rounded-full px-3 md:px-4 py-1.5 flex items-center gap-1 themed-transition"
              style={{
                background: isDark ? "var(--card)" : "#FFFFFF",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              關於這個實驗 <span>↗</span>
            </button>
          </div>
        </div>
      </header>

      {/* About collapsible */}
      {aboutOpen && (
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8 py-4">
          <div 
            className="border-[2px] rounded-[16px] p-5 mono text-[12px] leading-relaxed themed-transition"
            style={cardStyle}
          >
            這是一個對「把簡單問題複雜化」的語言觀察工具。所有產出皆為演算法生成的諷刺創作與虛構戲仿，非真實人物言論。靈感來自政治語言如何透過抽象名詞、框架疊加與廊帶串聯，把一句話說成一場宇宙。
          </div>
        </div>
      )}

      {/* Title Section */}
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8 pt-6 md:pt-10 pb-6">
        <div className="flex flex-wrap items-start gap-4">
          <h1 className="font-black tracking-[-0.04em] leading-[0.85] text-[44px] md:text-[72px] lg:text-[92px]">
            <span>伯洋體</span><span>產</span><span className="outlined">生器</span>
          </h1>
          <div className="flex items-center gap-2 mt-2 md:mt-4">
            <div 
              className="border-[2px] rounded-full px-3 py-1 mono font-bold text-[12px] themed-transition"
              style={{ background: "var(--lime)", borderColor: "var(--border)", color: "#111" }}
            >v2.3</div>
            <div 
              className="border-[2px] rounded-full px-3 py-1 mono text-[11px] font-bold themed-transition"
              style={cardStyle}
            >BETA</div>
          </div>
        </div>
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:items-center gap-3">
          <div className="text-[20px] md:text-[28px] font-bold leading-tight">
            把一句話，說成<span className="inline-block border-[2px] rounded-[8px] px-2 mx-1 rotate-[-1deg] themed-transition" style={{ background: "var(--lime)", borderColor: "var(--border)", color: "#111" }}>一場宇宙</span>。
          </div>
          <div className="mono text-[11px] tracking-widest opacity-60 border-l-2 pl-3 ml-0 md:ml-4" style={{ borderColor: "var(--border)" }}>政治語言觀察 x 諷刺創作</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8 pb-16 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5 md:gap-6 items-start">

        {/* INPUT Card */}
        <div 
          className={`border-[2px] rounded-[20px] overflow-hidden themed-transition ${activeTab === "01" ? "" : "lg:col-span-2"}`}
          style={{
            ...cardStyle,
            boxShadow: isDark ? `0 0 0 1px var(--border)` : `6px 6px 0px var(--shadow)`
          }}
        >
          {/* Tabs */}
          <div 
            className="flex gap-2 p-3 border-b-[2px] themed-transition"
            style={{ background: "var(--card-2)", borderColor: "var(--border)" }}
          >
            {[
              { id:"01", label:"論述生成" },
              { id:"02", label:"回覆模擬" },
              { id:"03", label:"句型拆解" },
            ].map(tab=> (
              <button
                key={tab.id}
                onClick={()=>{
                  const next = tab.id as any;
                  if (next === "01" && activeTab === "01") {
                    handleGenerate();
                  }
                  setActiveTab(next);
                }}
                className="mono text-[12px] font-bold border-[2px] rounded-full px-4 py-2 transition flex items-center gap-2 themed-transition"
                style={{
                  background: activeTab===tab.id ? "var(--text)" : "var(--card)",
                  color: activeTab===tab.id ? "var(--bg)" : "var(--text)",
                  borderColor: "var(--border)",
                }}
              >
                <span className="opacity-60">{tab.id}</span> {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "02" ? <ReplyPanel /> : activeTab === "03" ? <DecodePanel /> : (
            <div className="p-5 md:p-7">
              {/* Labels */}
              <div className="flex justify-between items-center mono text-[10px] tracking-[0.14em] font-bold opacity-60 mb-4">
                <span>INPUT / 輸入原料</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full inline-block" style={{ background: "var(--lime)", border: "1px solid var(--border)" }}></span> LIVE</span>
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-[22px] md:text-[26px] font-black">今天想談什麼？</h2>
                <span 
                  className="mono text-[11px] border-[2px] rounded-full px-3 py-0.5 font-bold -rotate-1 themed-transition"
                  style={{ background: "var(--lime-light)", borderColor: "var(--border)", color: "#111" }}
                >不必太嚴肅</span>
              </div>

              <div className="relative">
                <input
                  id="topic-input"
                  value={topic}
                  onChange={e=>setTopic(e.target.value)}
                  placeholder="例如：颱風假"
                  className="w-full border-[2px] rounded-[14px] px-4 py-4 pr-12 text-[18px] font-bold focus:outline-none transition themed-transition"
                  style={{
                    ...inputStyle,
                    boxShadow: "none",
                  }}
                  onFocus={e=> {
                    e.currentTarget.style.background = "var(--card)";
                    if(!isDark) e.currentTarget.style.boxShadow = `4px 4px 0px var(--shadow)`;
                  }}
                  onBlur={e=>{
                    e.currentTarget.style.background = "var(--input-bg)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 mono text-[11px] opacity-40">{topic.length}字</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {QUICK_TAGS.map(tag=>(
                  <button
                    key={tag}
                    onPointerDown={(e)=>{
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.setAttribute('data-pointer','1');
                      btn.textContent = `${tag} ✓`;
                      try { window.location.hash = `tag-${tag}-${Date.now()}`; } catch {}
                    }}
                    onClick={(e)=>{
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.setAttribute('data-clicked', String(Date.now()));
                      btn.style.transform = 'scale(0.95)';
                      try { window.location.hash = `tag-${tag}-${Date.now()}`; } catch {}
                      setLastClickedTag(tag);
                      const inputEl = document.getElementById('topic-input') as HTMLInputElement | null;
                      if (inputEl) {
                        inputEl.value = tag;
                        inputEl.setAttribute('data-filled', tag);
                      }
                      setTopic(tag);
                      handleGenerate(tag);
                      window.scrollBy(0, 1);
                      setTimeout(()=>window.scrollBy(0,-1), 50);
                    }}
                    className="mono text-[12px] font-bold border-[2px] rounded-full px-3 py-1.5 transition themed-transition"
                    style={{
                      background: (topic===tag || lastClickedTag===tag) ? "var(--text)" : "var(--card)",
                      color: (topic===tag || lastClickedTag===tag) ? (isDark ? "var(--lime)" : "var(--lime)") : "var(--text)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {lastClickedTag===tag ? `${tag} ✓` : tag}
                  </button>
                ))}
              </div>

              {/* Patterns */}
              <div className="mt-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-black text-[16px]">選一種伯洋體句型</h3>
                  <span className="mono text-[11px] opacity-60">16種不同的繞法</span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {visiblePatterns.map(p=>(
                    <button
                      key={p.id}
                      onClick={()=>{ setSelectedPattern(p.id); if(p.id==="abcd") setShowCustom(true); }}
                      className="text-left border-[2px] rounded-[14px] p-4 transition-all themed-transition hover:-translate-y-[1px]"
                      style={{
                        background: selectedPattern===p.id ? "var(--lime)" : "var(--card)",
                        borderColor: "var(--border)",
                        color: selectedPattern===p.id ? "#111" : "var(--text)",
                        boxShadow: selectedPattern===p.id 
                          ? (isDark ? `0 0 0 1px var(--border)` : `3px 3px 0px var(--shadow)`)
                          : (isDark ? `0 0 0 1px var(--border)` : `3px 3px 0px var(--shadow)`),
                      }}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="font-black text-[14px] leading-tight">{p.name}</div>
                        {selectedPattern===p.id && <div className="h-5 w-5 bg-black text-[#D4FF00] rounded-full flex items-center justify-center text-[12px]">✓</div>}
                      </div>
                      <div className="mono text-[11px] mt-1 leading-snug line-clamp-2" style={{ opacity: 0.7 }}>{p.desc}</div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={()=>setExpanded(v=>!v)}
                  className="mt-3 w-full border-[2px] border-dashed rounded-[12px] py-2.5 mono text-[12px] font-bold themed-transition"
                  style={{
                    background: "var(--card-2)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                >
                  {expanded ? "收起句型 −12" : "更多句型 +12"}
                </button>

                {/* Formula */}
                <div 
                  className="mt-4 rounded-[12px] p-3 flex items-start gap-3 border-[2px] themed-transition"
                  style={{ background: "var(--formula-bg)", borderColor: "var(--border)", color: "var(--formula-text)" }}
                >
                  <div className="mono text-[10px] opacity-60 mt-0.5">公式</div>
                  <div className="mono text-[12px] font-bold leading-snug">{currentPatternObj.formula}</div>
                </div>
              </div>

              {/* Abstraction */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-black text-[14px] mono">抽象濃度</h3>
                  <div 
                    className="mono text-[12px] font-bold rounded-full px-3 py-1 themed-transition"
                    style={{ background: "var(--text)", color: "var(--bg)" }}
                  >
                    {abstraction}% · {abstractionLabel}
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={abstraction}
                  onChange={e=>setAbstraction(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between mono text-[10px] opacity-60 mt-1">
                  <span>還聽得懂</span>
                  <span>進入平行宇宙</span>
                </div>
              </div>

              {/* Custom ABCD */}
              <div className="mt-6 border-[2px] rounded-[14px] overflow-hidden themed-transition" style={{ borderColor: "var(--border)" }}>
                <button
                  onClick={()=>setShowCustom(v=>!v)}
                  className="w-full flex justify-between items-center p-4 transition themed-transition"
                  style={{ background: "var(--card-2)", color: "var(--text)" }}
                >
                  <span className="mono text-[12px] font-bold">自己配方：自訂A、B、C、D +</span>
                  <span 
                    className="border-[2px] rounded-full h-6 w-6 flex items-center justify-center font-bold themed-transition"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                  >{showCustom ? "−" : "+"}</span>
                </button>
                {showCustom && (
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t-[2px] themed-transition" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                    {[
                      { k:"A", label:"A 基礎認知", ph:"例如：資訊落差" },
                      { k:"B", label:"B 風險評估", ph:"例如：標準模糊" },
                      { k:"C", label:"C 治理機制", ph:"例如：對齊機制" },
                      { k:"D", label:"D 社會韌性", ph:"例如：共榮願景" },
                    ].map(f=>(
                      <div key={f.k}>
                        <div className="mono text-[10px] font-bold opacity-60 mb-1">{f.label}</div>
                        <input
                          value={(customABCD as any)[f.k]}
                          onChange={e=>setCustomABCD({...customABCD, [f.k]: e.target.value})}
                          placeholder={f.ph}
                          className="w-full border-[2px] rounded-[10px] px-3 py-2 text-[13px] font-bold focus:outline-none themed-transition"
                          style={inputStyle}
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2 mono text-[10px] opacity-50">僅在「ABCD因果接龍」時完整套用，其他句型會作為關鍵變項穿插。</div>
                  </div>
                )}
              </div>

              <button
                onClick={()=>handleGenerate()}
                className="mt-6 w-full border-[2px] rounded-[14px] py-4 font-black text-[18px] tracking-tight flex items-center justify-center gap-2 themed-transition active:scale-[0.99]"
                style={{ 
                  background: isDark ? "var(--text)" : "#111", 
                  color: isDark ? "#111" : "var(--lime)",
                  borderColor: "var(--border)",
                  boxShadow: isDark ? `0 0 0 1px var(--border)` : `6px 6px 0px var(--shadow)`
                }}
              >
                製造一篇論述 <span style={{ color: isDark ? "#111" : "#fff" }}>↗</span>
              </button>
            </div>
          )}
        </div>

        {/* OUTPUT Card */}
        {activeTab === "01" && (
        <div
          className="border-[2px] rounded-[20px] overflow-hidden lg:sticky lg:top-[88px] themed-transition"
          style={{ 
            ...cardStyle,
            boxShadow: isDark ? `0 0 0 1px var(--border)` : `6px 6px 0px var(--shadow)`
          }}
        >
          <div className="p-5 md:p-7">
            <div className="flex justify-between items-center mono text-[10px] tracking-[0.14em] font-bold opacity-60">
              <span>OUTPUT / 新鮮出爐的論述</span>
              <span 
                className="rounded-full px-2.5 py-1 text-[9px] themed-transition"
                style={{ background: "var(--text)", color: "var(--bg)" }}
              >虛構戲仿</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 mono text-[11px]">
              <span 
                className="border-[2px] rounded-full px-3 py-1 font-bold themed-transition"
                style={{ background: "var(--card-2)", borderColor: "var(--border)" }}
              >{essayMeta.pattern} • {essayMeta.topic}</span>
              <span 
                className="border-[2px] rounded-full px-3 py-1 font-bold themed-transition"
                style={{ background: "var(--lime)", borderColor: "var(--border)", color: "#111" }}
              >NO.{String(essayMeta.no).padStart(3,"0")}</span>
            </div>

            <div className="mt-6 relative">
              <div className="absolute -top-6 -left-1 text-[72px] font-black leading-none select-none themed-transition" style={{ opacity: isDark ? 0.15 : 0.1 }}>“</div>
              <div className="relative font-black text-[19px] md:text-[22px] leading-[1.6] whitespace-pre-wrap">
                {essay.split("\n\n").map((para, i)=>(
                  <p key={i} className="mb-6 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2">
              <button 
                onClick={handleCopy} 
                className="border-[2px] rounded-full py-2.5 mono text-[12px] font-bold transition themed-transition active:scale-[0.97]"
                style={cardStyle}
              >
                {copied ? "已複製 ✓" : "複製"}
              </button>
              <button 
                onClick={handleRandom} 
                className="border-[2px] rounded-full py-2.5 mono text-[12px] font-bold transition themed-transition active:scale-[0.97]"
                style={{ background: "var(--card-2)", borderColor: "var(--border)", color: "var(--text)" }}
              >
                隨機一篇
              </button>
              <button 
                onClick={handleMoreAbstract} 
                className="border-[2px] rounded-full py-2.5 mono text-[12px] font-bold transition themed-transition active:scale-[0.97]"
                style={{ background: "var(--lime)", borderColor: "var(--border)", color: "#111" }}
              >
                再抽象一點
              </button>
            </div>

            <div 
              className="mt-6 border-[2px] rounded-[12px] p-4 themed-transition"
              style={{ background: "var(--card-2)", borderColor: "var(--border)" }}
            >
              <div className="mono text-[10px] font-bold opacity-60 mb-2">生成參數</div>
              <div className="flex flex-wrap gap-2 mono text-[11px]">
                <span className="border rounded-full px-2.5 py-1 themed-transition" style={{ background: "var(--card)", borderColor: "var(--border)" }}>主題: {topic}</span>
                <span className="border rounded-full px-2.5 py-1 themed-transition" style={{ background: "var(--card)", borderColor: "var(--border)" }}>句型: {currentPatternObj.name}</span>
                <span className="border rounded-full px-2.5 py-1 themed-transition" style={{ background: "var(--card)", borderColor: "var(--border)" }}>抽象: {abstraction}%</span>
                <span className="border rounded-full px-2.5 py-1 themed-transition" style={{ background: "var(--card)", borderColor: "var(--border)" }}>字數: {essay.replace(/\s/g,"").length}</span>
              </div>
            </div>

            <div className="mt-4 mono text-[10px] leading-relaxed opacity-60 border-t border-dashed pt-4" style={{ borderColor: "var(--border)" }}>
              免責聲明：模板生成的諷刺創作，非本人言論。所有產出皆為虛構戲仿，請勿用於指控特定個人。靈感來自對空話政治學的觀察，目的是拆解「把簡單問題複雜化」的語言機制。
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t-[2px] themed-transition" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between gap-3 mono text-[11px]">
          <div className="opacity-60">© 2025 空話製造研究所 THE RHETORIC LAB · 模板生成的諷刺創作，非本人言論</div>
          <div className="flex gap-4">
            <span className="font-bold">Boyangti v2.3</span>
            <span className="opacity-60">把一句話，說成一場宇宙。</span>
          </div>
        </div>
      </div>
    </div>
  );
}
