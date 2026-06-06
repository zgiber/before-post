// UI strings live here. Title is a 3-part structure: plain, accent, plain.
// The DOM renderer in app.js wraps the `accent` piece in <em>.
const ui = {
  en: {
    title: { before: "Pause Before You ", accent: "Post", after: "" },
    sub: "Spread signal, not noise.",
    footer: "A quick guide to keeping your feed constructive and drama-free.",
    step: "Step {n} of {m}",
    stampSubmit: "✓ SUBMIT",
    stampPause: "⏸ PAUSE",
    stampCancel: "✕ CANCEL",
    restart: "↩ Start over",
    back: "← Go back",
  },
  hu: {
    title: { before: "Gondold meg, ", accent: "mielőtt", after: " posztolsz" },
    sub: "Adj értéket, ne zajt.",
    footer:
      "Egy gyors útmutató, hogy a feedeed konstruktív és dráma-mentes maradjon.",
    step: "{n}. lépés / {m}",
    stampSubmit: "✓ POSZTOLJ",
    stampPause: "⏸ VÁRJ",
    stampCancel: "✕ TÖRÖLD",
    restart: "↩ Kezdd újra",
    back: "← Vissza",
  },
};

const trees = {
  en: {
    start: {
      question:
        "Does this post contain political content, or opinions about politicians, parties, or policies?",
      hint: "This includes elections, laws, government decisions, and social justice debates.",
      choices: [
        { label: "✅ No, it's not political", style: "yes", next: "personal_attack" },
        { label: "⚠️ Yes, it's political", style: "warn", next: "political_check" },
      ],
    },
    political_check: {
      question:
        "Are you sharing a verified fact, or your own opinion / reaction?",
      hint: "Facts can be checked and sourced. Opinions are personal interpretations — and tend to invite debate.",
      choices: [
        { label: "📰 A verified, sourced fact", style: "neutral", next: "sourced" },
        { label: "💬 My opinion or reaction", style: "warn", next: "opinion_outcome" },
      ],
    },
    sourced: {
      question:
        "Could a reasonable person on the opposite side feel attacked, mocked, or insulted by this post?",
      hint: "Imagine your most politically different friend reading it. Would it make them feel disrespected?",
      choices: [
        { label: "No, it's respectful", style: "yes", next: "constructive" },
        { label: "Probably yes", style: "no", next: "antagonise_outcome" },
      ],
    },
    personal_attack: {
      question:
        "Does this post criticise, mock, or call out a specific real person by name?",
      hint: "Includes celebrities, politicians, colleagues, or anyone identifiable.",
      choices: [
        { label: "No, it's not about a person", style: "yes", next: "emotional_state" },
        { label: "Yes, it names someone", style: "no", next: "attack_check" },
      ],
    },
    attack_check: {
      question:
        "Is the criticism based on their public actions and accompanied by evidence?",
      hint: "Constructive critique of public figures is fair. Personal attacks and mockery rarely add value.",
      choices: [
        { label: "Yes, factual and evidenced", style: "neutral", next: "emotional_state" },
        { label: "No, more of an attack or rant", style: "no", next: "attack_outcome" },
      ],
    },
    emotional_state: {
      question: "What's your emotional state right now?",
      hint: "Posts drafted in anger, frustration, or outrage often land differently than intended.",
      choices: [
        { label: "😌 Calm and measured", style: "yes", next: "constructive" },
        { label: "😤 Frustrated or angry", style: "warn", next: "anger_check" },
        { label: "😢 Upset or reactive", style: "no", next: "anger_outcome" },
      ],
    },
    anger_check: {
      question:
        "Have you re-read this post after stepping away for at least 10 minutes?",
      hint: "A short pause often reveals a sharper, calmer version of what you actually want to say.",
      choices: [
        { label: "Yes, I reviewed it later", style: "yes", next: "constructive" },
        { label: "No, posting in the moment", style: "no", next: "cool_down_outcome" },
      ],
    },
    constructive: {
      question:
        "Does this post add something useful — insight, a resource, a genuine question, or positive news?",
      hint: "Content that informs, connects, or uplifts tends to serve your audience better than venting.",
      choices: [
        { label: "Yes, it adds value", style: "yes", next: "final_check" },
        { label: "Not really — just venting", style: "warn", next: "vent_outcome" },
      ],
    },
    final_check: {
      question:
        "Would you be comfortable if your employer, family, or anyone you respect saw this post?",
      hint: "The internet is long. Once it's out, it's out.",
      choices: [
        { label: "Yes, completely fine", style: "yes", next: "submit_outcome" },
        { label: "I'd rather they didn't", style: "no", next: "privacy_outcome" },
      ],
    },
    submit_outcome: {
      outcome: true,
      type: "submit",
      title: "Looks good — go ahead and post it.",
      body: "Your post passed the check. It's calm, constructive, and something you can stand behind. Post with confidence.",
    },
    opinion_outcome: {
      outcome: true,
      type: "cancel",
      title: "Consider sitting this one out.",
      body: "Political opinions on social media rarely change minds — they mostly invite conflict. Ask yourself: is there a more constructive way to express this, or a better venue for this conversation?",
    },
    antagonise_outcome: {
      outcome: true,
      type: "cancel",
      title: "Hold off on this one.",
      body: "Even factual posts can be framed in ways that antagonise. Try rewriting it so your political opposite could still read it without feeling dismissed. If that's impossible, it may not be worth posting.",
    },
    attack_outcome: {
      outcome: true,
      type: "cancel",
      title: "Don't post this.",
      body: "Personal attacks — even on public figures — tend to reflect more on the poster than the target. If you have a genuine point to make, strip the emotion and stick to facts.",
    },
    anger_outcome: {
      outcome: true,
      type: "pause",
      title: "Step away first.",
      body: "Posting from a reactive emotional state almost always leads to regret. Write it if you need to get it out — but save it as a draft and come back in an hour. You might surprise yourself.",
    },
    cool_down_outcome: {
      outcome: true,
      type: "pause",
      title: "Take 10 minutes before posting.",
      body: "You're not wrong for feeling this way — but posting right now increases the risk of saying something you'll want to delete later. Set a timer, do something else, then re-read with fresh eyes.",
    },
    vent_outcome: {
      outcome: true,
      type: "cancel",
      title: "This might not need an audience.",
      body: "Venting publicly can feel cathartic in the moment but often attracts pile-ons or drains your own energy. Consider a private journal, a close friend, or simply not posting.",
    },
    privacy_outcome: {
      outcome: true,
      type: "cancel",
      title: "If you'd hide it, don't share it.",
      body: "That instinct is worth listening to. Posts that pass the 'would I be fine if anyone saw this?' test are the ones you can post without anxiety. Revise or skip this one.",
    },
  },
  hu: {
    start: {
      question:
        "A posztod politikai tartalmú, vagy politikusokról, pártokról, közpolitikáról fejez ki véleményt?",
      hint: "Ide tartoznak a választások, törvények, kormánydöntések és társadalmi viták is.",
      choices: [
        { label: "✅ Nem, nem politikai", style: "yes", next: "personal_attack" },
        { label: "⚠️ Igen, politikai témájú", style: "warn", next: "political_check" },
      ],
    },
    political_check: {
      question:
        "Ellenőrzött tényt osztasz meg, vagy a saját véleményedet / reakciódat?",
      hint: "A tények utánanézhetők és forrásokkal alátámaszthatók. A vélemények személyes értelmezések — és általában vitát szülnek.",
      choices: [
        { label: "📰 Ellenőrzött, forrással alátámasztott tény", style: "neutral", next: "sourced" },
        { label: "💬 A saját véleményem vagy reakcióm", style: "warn", next: "opinion_outcome" },
      ],
    },
    sourced: {
      question:
        "Érezheti-e úgy egy ellentétes nézetet valló, ésszerű személy, hogy a posztod megtámadja, kigúnyolja vagy megsérti őt?",
      hint: "Képzeld el, hogy a leginkább politikailag különböző ismerősöd olvassa. Tiszteletlennek érezné?",
      choices: [
        { label: "Nem, tiszteletteljes a posztom", style: "yes", next: "constructive" },
        { label: "Lehetséges", style: "no", next: "antagonise_outcome" },
      ],
    },
    personal_attack: {
      question:
        "A poszt kritizál, kigúnyol vagy nevén nevez konkrét, valós személyt?",
      hint: "Ide tartoznak hírességek, politikusok, kollégák vagy bármely azonosítható személy.",
      choices: [
        { label: "Nem, nem valós személyről szól", style: "yes", next: "emotional_state" },
        { label: "Igen, megnevez valakit", style: "no", next: "attack_check" },
      ],
    },
    attack_check: {
      question:
        "A kritika az illető nyilvános cselekedetein alapul, és bizonyítékkal is alátámasztott?",
      hint: "Közszereplők konstruktív bírálata jogos. A személyes támadások és gúnyolódás ritkán adnak hozzá bármit.",
      choices: [
        { label: "Igen, tényszerű és bizonyított", style: "neutral", next: "emotional_state" },
        // Intentionally softer than EN: people don't self-report as attackers.
        { label: "Nem tudom, csak valahol olvastam", style: "no", next: "attack_outcome" },
      ],
    },
    emotional_state: {
      question: "Milyen érzelmi állapotban vagy most?",
      hint: "A dühből, frusztrációból vagy felháborodásból írt posztok gyakran másképp hatnak, mint szántuk.",
      choices: [
        { label: "😌 Nyugodt és megfontolt", style: "yes", next: "constructive" },
        { label: "😤 Frusztrált vagy mérges", style: "warn", next: "anger_check" },
        { label: "😢 Felzaklatott vagy sértett", style: "no", next: "anger_outcome" },
      ],
    },
    anger_check: {
      question: "Újraolvastad a posztot egy legalább 10 perces szünet után?",
      hint: "Egy rövid szünet után sokszor egy élesebb, nyugodtabb változat kerül elő abból, amit valójában mondani akarsz.",
      choices: [
        { label: "Igen, vártam és újraolvastam", style: "yes", next: "constructive" },
        { label: "Nem, ebben a pillanatban posztolnék", style: "no", next: "cool_down_outcome" },
      ],
    },
    constructive: {
      question:
        "Nyújt a posztod valami hasznosat — betekintést, forrást, valódi kérdést vagy pozitív hírt?",
      hint: "A tájékoztató, összekötő vagy felemelő tartalom általában jobban szolgálja a közönséget, mint a panaszkodás.",
      choices: [
        { label: "Igen, értéket ad", style: "yes", next: "final_check" },
        { label: "Nem igazán — főként panasz", style: "warn", next: "vent_outcome" },
      ],
    },
    final_check: {
      question:
        "Kényelmetlenül éreznéd-e magad, ha a családod, munkáltatód vagy egy általad tisztelt személy látná ezt a posztot?",
      hint: "Az internet hosszú. Ha egyszer kint van, kint van.",
      choices: [
        { label: "Nem, teljesen rendben van", style: "yes", next: "submit_outcome" },
        { label: "Inkább ne lássák", style: "no", next: "privacy_outcome" },
      ],
    },
    submit_outcome: {
      outcome: true,
      type: "submit",
      title: "Rendben van — nyugodtan posztolhatsz.",
      body: "A posztod átment az ellenőrzésen. Nyugodt, konstruktív, és ki is állhatsz mellette. Posztolj magabiztosan.",
    },
    opinion_outcome: {
      outcome: true,
      type: "cancel",
      title: "Fontold meg, hogy kihagyod ezt.",
      body: "A politikai vélemények a közösségi médiában ritkán változtatnak meg bárkit — főleg csak konfliktust szülnek. Kérdezd meg magadtól: van-e konstruktívabb mód ennek kifejezésére, vagy jobb helyszín erre a beszélgetésre?",
    },
    antagonise_outcome: {
      outcome: true,
      type: "cancel",
      title: "Várj ezzel.",
      body: "Még a tényszerű posztok is keretezhetők úgy, hogy provokálnak. Próbáld átírni úgy, hogy egy ellentétes nézetű személy is el tudja olvasni anélkül, hogy lesöpörtnek érezné magát. Ha ez lehetetlen, talán nem érdemes posztolni.",
    },
    attack_outcome: {
      outcome: true,
      type: "cancel",
      title: "Ne poszolj.",
      body: "A személyes támadások — még közszereplőkkel szemben is — általában többet mondanak a posztolóról, mint a célpontról. Ha valódi mondanivalód van, hagyd el az érzelmeket és ragaszkodj a tényekhez.",
    },
    anger_outcome: {
      outcome: true,
      type: "pause",
      title: "Először végy egy nagy levegőt.",
      body: "Sértett, vagy zaklatott érzelmi állapotból posztolni szinte mindig megbánáshoz vezet. Írd le, ha ki kell adnod magadból — de mentsd el vázlatként, és egy óra múlva térj vissza. Lehet, hogy meglepődsz.",
    },
    cool_down_outcome: {
      outcome: true,
      type: "pause",
      title: "Várj 10 percet, mielőtt posztolsz.",
      body: "Nem vagy rossz, amiért így érzel — de most posztolni növeli annak kockázatát, hogy olyat mondj, amit később törölni akarsz. Állíts be egy időzítőt, csinálj valami mást, majd friss szemmel olvasd újra.",
    },
    vent_outcome: {
      outcome: true,
      type: "cancel",
      title: "Ennek talán nem kell közönség.",
      body: "A nyilvános panaszkodás pillanatnyilag felszabadítónak tűnhet, de sokszor negatív reakciókat vonz, vagy lemeríti a saját energiádat. Fontold meg a naplóírást, kérdezz meg egy közeli barátot, vagy egyszerűen hagyd ki a posztolást.",
    },
    privacy_outcome: {
      outcome: true,
      type: "cancel",
      title: "Ha elrejtenéd, ne oszd meg.",
      body: "Érdemes hallgatni erre az ösztönre. Azok a posztok, amelyek átmennek a 'rendben lenne, ha bárki látná?' teszten, azok amelyeket szorongás nélkül posztolhatsz. Írd át vagy hagyd ki ezt.",
    },
  },
};
