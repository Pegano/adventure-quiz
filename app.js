'use strict';
/* ============================================================
   Adventure Quiz — Malaysia & Borneo
   app.js  — complete game logic + data
   ============================================================ */

// ══════════════════════════════════════════════════════════════
//  LANGUAGE
// ══════════════════════════════════════════════════════════════

let LANG = localStorage.getItem('quiz_lang') || 'nl';

const UI_STRINGS = {
  en: {
    gameSubtitle:      'Malaysia & Borneo Explorer',
    chooseExplorer:    'Choose your explorer',
    namePlaceholder:   'Enter your name…',
    startBtn:          'Start Adventure! 🚀',
    continueAs:        'Continue as:',
    mapRainforest:     'Rainforest',
    modeAnimalTitle:   'Spot the Animal',
    modeAnimalDesc:    "Identify Borneo's amazing wildlife",
    modeExploreTitle:  'Explore Malaysia',
    modeExploreDesc:   'Test your geography knowledge',
    modeMatchTitle:    'Match & Memory',
    modeMatchDesc:     'Pair animals with their habitats',
    modeSpeedTitle:    'Speed Round',
    modeSpeedDesc:     '60 seconds — answer as many as you can!',
    btnBack:           '← Back',
    btnCorrect:        '✅ Correct',
    btnWrong:          '❌ Incorrect',
    btnNext:           'Next →',
    btnBackMenu:       'Back to Menu',
    matchTitle:        'Match & Memory',
    matchHint:         'Tap an animal, then tap its habitat to match!',
    matchDoneResult:   'All pairs matched!',
    matchLeft:         n => `${n} left`,
    speedScoreLbl:     'Score',
    speedStreakLbl:     'Streak',
    speedResultsTitle: 'Speed Round Complete!',
    statScore:         'Score',
    statCorrect:       'Correct',
    statStreak:        'Best Streak',
    achievementsTitle: '🏅 Achievements',
    toastNoName:       'Please enter your name 🌴',
    toastStreakBonus:  n => `🔥 Streak bonus! +${n} pts`,
    toastBadge:        name => `🏅 Badge unlocked: ${name}!`,
    toastRoundDone:    n => `🎉 Round complete! You scored ${n} pts`,
    animalLabel:       'What animal is this?',
    animalStatement:   name => `"This is a ${name}"`,
    fbAnimalCorrect:   'Correct! +10 points',
    fbAnimalWrong:     name => `Incorrect — it's a ${name}`,
    fbExploreCorrect:  'Correct! +10 points',
    fbExploreWrong:    ans => `Wrong — the answer was: ${ans}`,
    funFact:           'Fun fact:',
    didYouKnow:        'Did you know?',
    questionOf:        (n, t) => `Question ${n} of ${t}`,
    matchPerfect:      n => `Perfect match! +${n} pts total 🌟`,
    matchDone:         (m, p) => `Matched all pairs! ${m} mistake${m !== 1 ? 's' : ''}. +${p} pts`,
    pts:               'pts',
    badges:            'badges',
  },
  nl: {
    gameSubtitle:      'Maleisië & Borneo Verkenner',
    chooseExplorer:    'Kies je verkenner',
    namePlaceholder:   'Voer je naam in…',
    startBtn:          'Start Avontuur! 🚀',
    continueAs:        'Ga verder als:',
    mapRainforest:     'Regenwoud',
    modeAnimalTitle:   'Herken het Dier',
    modeAnimalDesc:    'Herken Borneo\'s bijzondere dieren',
    modeExploreTitle:  'Ontdek Maleisië',
    modeExploreDesc:   'Test je geografiekennis',
    modeMatchTitle:    'Koppel & Geheugen',
    modeMatchDesc:     'Koppel dieren aan hun leefgebied',
    modeSpeedTitle:    'Snelle Ronde',
    modeSpeedDesc:     '60 seconden — beantwoord zoveel mogelijk!',
    btnBack:           '← Terug',
    btnCorrect:        '✅ Juist',
    btnWrong:          '❌ Onjuist',
    btnNext:           'Volgende →',
    btnBackMenu:       'Terug naar Menu',
    matchTitle:        'Koppel & Geheugen',
    matchHint:         'Tik een dier, dan zijn leefgebied om te koppelen!',
    matchDoneResult:   'Alle paren gekoppeld!',
    matchLeft:         n => `${n} over`,
    speedScoreLbl:     'Score',
    speedStreakLbl:     'Reeks',
    speedResultsTitle: 'Snelle Ronde Voltooid!',
    statScore:         'Score',
    statCorrect:       'Goed',
    statStreak:        'Beste Reeks',
    achievementsTitle: '🏅 Prestaties',
    toastNoName:       'Voer je naam in 🌴',
    toastStreakBonus:  n => `🔥 Reeksbonus! +${n} punten`,
    toastBadge:        name => `🏅 Prestatie behaald: ${name}!`,
    toastRoundDone:    n => `🎉 Ronde klaar! Je scoorde ${n} punten`,
    animalLabel:       'Welk dier is dit?',
    animalStatement:   name => `"Dit is een ${name}"`,
    fbAnimalCorrect:   'Juist! +10 punten',
    fbAnimalWrong:     name => `Onjuist — dit is een ${name}`,
    fbExploreCorrect:  'Juist! +10 punten',
    fbExploreWrong:    ans => `Fout — het antwoord was: ${ans}`,
    funFact:           'Weetje:',
    didYouKnow:        'Wist je dat?',
    questionOf:        (n, t) => `Vraag ${n} van ${t}`,
    matchPerfect:      n => `Perfect! +${n} punten totaal 🌟`,
    matchDone:         (m, p) => `Alle paren! ${m} fout${m !== 1 ? 'en' : ''}. +${p} punten`,
    pts:               'punten',
    badges:            'badges',
  },
};

function ui(key, ...args) {
  const strings = UI_STRINGS[LANG] || UI_STRINGS.nl;
  const val = strings[key] !== undefined ? strings[key] : (UI_STRINGS.nl[key] || key);
  return typeof val === 'function' ? val(...args) : val;
}

function renderLang() {
  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === LANG);
  });
  document.documentElement.lang = LANG;

  // Update elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const attr = el.dataset.i18nAttr;
    const val = ui(key);
    if (attr) el.setAttribute(attr, val);
    else el.textContent = val;
  });
}

// ══════════════════════════════════════════════════════════════
//  DATA
// ══════════════════════════════════════════════════════════════

const AVATARS = ['🦁', '🦊', '🐼', '🐯', '🦋', '🦅', '🐸', '🐬'];

const ANIMALS = [
  { id:'orangutan',      name:'Orangutan',            name_nl:'Orang-oetan',          emoji:'🦧', bg:'#3d2100',
    fact:'Orangutans share 97% of their DNA with humans. They are the only great apes found in Asia and are critically endangered.',
    fact_nl:'Orang-oetans delen 97% van hun DNA met mensen. Ze zijn de enige mensapen in Azië en staan ernstig bedreigd.' },
  { id:'tapir',          name:'Malayan Tapir',         name_nl:'Maleise Tapir',         emoji:'🐾', bg:'#1a2a1a',
    fact:'The Malayan Tapir is the largest of four tapir species. Its black-and-white coat breaks up its outline in dappled jungle light — and it swims brilliantly!',
    fact_nl:'De Maleise tapir is de grootste van vier tapirsoorten. Zijn zwart-witte vacht doorbreekt zijn silhouet in het gevlekte jungelicht — en hij zwemt uitstekend!' },
  { id:'proboscis',      name:'Proboscis Monkey',      name_nl:'Neusaap',               emoji:'🐒', bg:'#2a1f0a',
    fact:'The male Proboscis Monkey has an enormous nose that amplifies its honking calls. It\'s found only in Borneo — and it\'s an excellent swimmer!',
    fact_nl:'De mannelijke neusaap heeft een enorme neus die zijn roepen versterkt. Hij leeft alleen op Borneo — en is een uitstekende zwemmer!' },
  { id:'pygmy_elephant', name:'Borneo Pygmy Elephant', name_nl:'Borneo Dwergolifant',   emoji:'🐘', bg:'#1a2a2a',
    fact:'Borneo\'s pygmy elephants are the smallest elephants in Asia — about 30% smaller than mainland Asian elephants. They\'re also noticeably more gentle.',
    fact_nl:'De dwergolifanten van Borneo zijn de kleinste olifanten in Azië — ongeveer 30% kleiner dan vastelandse Aziatische olifanten. Ze zijn ook merkbaar vredelievender.' },
  { id:'sun_bear',       name:'Sun Bear',              name_nl:'Maleise Honingbeer',    emoji:'🐻', bg:'#2a1500',
    fact:'Sun Bears are the world\'s smallest bears. Their extraordinary tongues (up to 25 cm!) are perfect for scooping honey out of beehives.',
    fact_nl:'Maleise honingberen zijn de kleinste beren ter wereld. Hun buitengewone tongen (tot 25 cm!) zijn perfect voor het scheppen van honing uit bijenkorven.' },
  { id:'clouded_leopard',name:'Clouded Leopard',       name_nl:'Nevelpanter',           emoji:'🐆', bg:'#2a200a',
    fact:'Clouded Leopards have the longest canine teeth relative to body size of any wild cat, giving them an almost saber-toothed appearance.',
    fact_nl:'Nevelpanters hebben de langste hoektanden ten opzichte van hun lichaamsgrootte van alle wilde katachtigen — bijna als sabeltanden.' },
  { id:'hornbill',       name:'Rhinoceros Hornbill',   name_nl:'Neushoornhoornvogel',   emoji:'🦜', bg:'#001a0a',
    fact:'The Rhinoceros Hornbill is Sarawak\'s state bird. The upturned "horn" on its beak — called a casque — resonates its calls through the rainforest.',
    fact_nl:'De neushoornhoornvogel is de staatsvogel van Sarawak. De omgekrulde "hoorn" op zijn snavel — een casque genaamd — laat zijn roepen door het regenwoud resoneren.' },
  { id:'firefly',        name:'Firefly',               name_nl:'Vuurvliegje',           emoji:'✨', bg:'#000a1a',
    fact:'Thousands of fireflies near Kampung Kuantan, Malaysia, flash in perfect synchrony — entire mangrove trees pulsing like living Christmas lights!',
    fact_nl:'Duizenden vuurvliegjes bij Kampung Kuantan flikkeren in perfecte synchronie — hele mangrovebomen pulseren als levende kerstlampjes!' },
  { id:'crocodile',      name:'Saltwater Crocodile',   name_nl:'Zoutwaterkrokodil',     emoji:'🐊', bg:'#0a1a0a',
    fact:'The Saltwater Crocodile is the world\'s largest living reptile. Adults can exceed 6 metres in length and are known to swim far out to sea.',
    fact_nl:'De zoutwaterkrokodil is het grootste levende reptiel ter wereld. Volwassenen kunnen meer dan 6 meter worden en staan bekend om hun verre zeereizen.' },
  { id:'cobra',          name:'King Cobra',            name_nl:'Koningscobra',          emoji:'🐍', bg:'#1a1a00',
    fact:'The King Cobra is the world\'s longest venomous snake, reaching up to 5.5 metres. It\'s also the only snake species that builds a nest for its eggs.',
    fact_nl:'De koningscobra is de langste gifslang ter wereld, tot 5,5 meter. Het is ook de enige slangensoort die een nest bouwt voor haar eieren.' },
  { id:'pitcher',        name:'Pitcher Plant',         name_nl:'Bekerplant',            emoji:'🌿', bg:'#001a00',
    fact:'Borneo\'s Nepenthes rajah is the world\'s largest carnivorous plant. Its pitcher can hold up to 3.5 litres of digestive liquid!',
    fact_nl:'Borneo\'s Nepenthes rajah is de grootste vleesetende plant ter wereld. Haar beker kan tot 3,5 liter verteringsvloeistof bevatten!' },
  { id:'colugo',         name:'Colugo',                name_nl:'Colugo',                emoji:'🦇', bg:'#0a0a1a',
    fact:'The Colugo — or "flying lemur" — doesn\'t actually fly or belong to lemurs. It glides between trees using a parachute-like membrane of skin.',
    fact_nl:'De colugo — ook wel "vliegende maki" — vliegt niet echt en is geen echte maki. Hij zweeft tussen bomen met een parachuteachtig huidvlies.' },
  { id:'slow_loris',     name:'Slow Loris',            name_nl:'Trage Lori',            emoji:'🌙', bg:'#100a1a',
    fact:'The Slow Loris is the world\'s only venomous primate. It licks venom from arm glands and mixes it with saliva, coating its teeth for a painful bite.',
    fact_nl:'De trage lori is het enige giftige primaat ter wereld. Het likt gif van armklieren en mengt dit met speeksel om zijn tanden te bedekken voor een pijnlijke beet.' },
  { id:'pangolin',       name:'Pangolin',              name_nl:'Schubdier',             emoji:'🦔', bg:'#1a0a00',
    fact:'When threatened, a Pangolin rolls into a tight armoured ball. Its scales are made of keratin — the same material as your fingernails.',
    fact_nl:'Als een schubdier wordt bedreigd, rolt het op tot een gepantserde bal. Zijn schubben zijn gemaakt van keratine — hetzelfde materiaal als je vingernagels.' },
  { id:'flying_fox',     name:'Giant Flying Fox',      name_nl:'Reuzen-vleerhond',      emoji:'🦇', bg:'#0a0010',
    fact:'The Giant Flying Fox has a wingspan of up to 1.7 metres — one of the world\'s largest bats. It\'s a vital pollinator of rainforest trees.',
    fact_nl:'De reuzen-vleerhond heeft een vleugelspanwijdte tot 1,7 meter — een van \'s werelds grootste vleermuizen. Hij is een onmisbare bestuiver van regenwoudbomen.' },
  { id:'sea_turtle',     name:'Green Sea Turtle',      name_nl:'Groene Zeeschildpad',   emoji:'🐢', bg:'#00151a',
    fact:'Sabah\'s Turtle Islands are a protected nesting sanctuary. Green Sea Turtles can live over 80 years and return to the exact beach where they were born.',
    fact_nl:'Sabah\'s Turtle Islands zijn een beschermd broedgebied. Groene zeeschildpadden worden ouder dan 80 jaar en keren terug naar het exacte strand waar ze zijn geboren.' },
  { id:'binturong',      name:'Binturong',             name_nl:'Binturong',             emoji:'🐈', bg:'#150a05',
    fact:'The Binturong — also called "bearcat" — smells like popcorn! The scent comes from a compound in its urine used for scent-marking territory.',
    fact_nl:'De binturong — ook wel "beerkat" — ruikt naar popcorn! De geur komt van een stof in zijn urine, gebruikt voor territoriummarkering.' },
  { id:'macaque',        name:'Long-tailed Macaque',   name_nl:'Langstaartige Makaak',  emoji:'🐵', bg:'#1a1000',
    fact:'Long-tailed Macaques in Malaysia have been observed using stone tools to crack open shellfish — one of the clearest examples of primate tool use in the wild.',
    fact_nl:'Langstaartige makaken in Maleisië gebruiken stenen als gereedschap om schelpdieren te kraken — een van de duidelijkste voorbeelden van gereedschapgebruik bij primaten in het wild.' },
  { id:'fiddler_crab',   name:'Fiddler Crab',          name_nl:'Wenkkrab',              emoji:'🦀', bg:'#001510',
    fact:'Male Fiddler Crabs wave their one enormous claw to attract females. The enlarged claw can weigh up to half the crab\'s total body weight!',
    fact_nl:'Mannelijke wenkkrabben zwaaien met hun enorme schaar om vrouwtjes aan te trekken. De vergrote schaar kan tot de helft van het totale lichaamsgewicht wegen!' },
  { id:'hornbill2',      name:'Wreathed Hornbill',     name_nl:'Kranshoornvogel',       emoji:'🐦', bg:'#0a1500',
    fact:'Male Wreathed Hornbills carry dozens of fruits in their gullet to pass through the tree wall to their partner, who is sealed inside a hollow tree during nesting.',
    fact_nl:'Mannelijke kranshoornvogels dragen tientallen vruchten in hun keel om aan hun partner te geven, die tijdens het nestelen opgesloten zit in een holle boom.' },
];

const GEO_QUESTIONS = [
  { q:'How many times larger is Malaysia than the Netherlands?',
    q_nl:'Hoe veel keer groter is Maleisië dan Nederland?',
    opts:['About 2×','About 3×','About 10×'], opts_nl:['Ongeveer 2×','Ongeveer 3×','Ongeveer 10×'], ans:1,
    fact:'Malaysia (330,000 km²) is roughly 3× the size of the Netherlands (41,500 km²). Despite the difference in size, their populations are similar!',
    fact_nl:'Maleisië (330.000 km²) is ruwweg 3× zo groot als Nederland (41.500 km²). Ondanks het verschil in grootte zijn hun bevolkingen vergelijkbaar!' },
  { q:'What is the capital city of Malaysia?',
    q_nl:'Wat is de hoofdstad van Maleisië?',
    opts:['Georgetown','Johor Bahru','Kuala Lumpur'], opts_nl:['Georgetown','Johor Bahru','Kuala Lumpur'], ans:2,
    fact:'"Kuala Lumpur" means "muddy confluence" in Malay — named where two muddy rivers met. It grew from a tiny tin-mining settlement in the 1850s.',
    fact_nl:'"Kuala Lumpur" betekent "modderige samenvloeiing" in het Maleis — vernoemd naar waar twee modderige rivieren samenkwamen. De stad groeide uit een kleine tinmijnplaats in de jaren 1850.' },
  { q:'Which is the highest mountain in Borneo and all of Malaysia?',
    q_nl:'Welke is de hoogste berg op Borneo en in heel Maleisië?',
    opts:['Mount Kinabalu','Mount Mulu','Mount Trus Madi'], opts_nl:['Mount Kinabalu','Mount Mulu','Mount Trus Madi'], ans:0,
    fact:'Mount Kinabalu (4,095 m) is a UNESCO World Heritage Site. Around 40,000 people attempt the summit each year — but only experienced climbers reach the top!',
    fact_nl:'Mount Kinabalu (4.095 m) is een UNESCO Werelderfgoed. Elk jaar proberen zo\'n 40.000 mensen de top te bereiken — maar alleen ervaren bergbeklimmers halen het!' },
  { q:'Approximately how old is the Borneo rainforest?',
    q_nl:'Hoe oud is het regenwoud van Borneo bij benadering?',
    opts:['10 million years','65 million years','130 million years'], opts_nl:['10 miljoen jaar','65 miljoen jaar','130 miljoen jaar'], ans:2,
    fact:'At ~130 million years old, the Borneo rainforest is one of the oldest on Earth — far older than the Amazon. It predates the extinction of the dinosaurs.',
    fact_nl:'Met ~130 miljoen jaar is het regenwoud van Borneo een van de oudste op aarde — veel ouder dan het Amazonegebied. Het dateert van vóór het uitsterven van de dinosauriërs.' },
  { q:'How many floors does the Petronas Twin Towers have?',
    q_nl:'Hoeveel verdiepingen heeft de Petronas Twin Towers?',
    opts:['66 floors','88 floors','102 floors'], opts_nl:['66 verdiepingen','88 verdiepingen','102 verdiepingen'], ans:1,
    fact:'The towers have 88 floors — an auspicious number in Chinese culture. They held the title of world\'s tallest buildings from 1998 to 2004.',
    fact_nl:'De torens hebben 88 verdiepingen — een geluksgetal in de Chinese cultuur. Ze hielden de titel van hoogste gebouwen ter wereld van 1998 tot 2004.' },
  { q:'What is the official language of Malaysia?',
    q_nl:'Wat is de officiële taal van Maleisië?',
    opts:['English','Bahasa Malaysia','Mandarin'], opts_nl:['Engels','Bahasa Maleisisch','Mandarijn'], ans:1,
    fact:'Bahasa Malaysia is the national language — but most Malaysians also speak English. In daily life many mix both into "Manglish"!',
    fact_nl:'Bahasa Maleisisch is de nationale taal — maar de meeste Maleisiërs spreken ook Engels. In het dagelijks leven mengen velen beiden tot "Manglish"!' },
  { q:'Which sea lies to the east of Borneo?',
    q_nl:'Welke zee ligt ten oosten van Borneo?',
    opts:['Java Sea','South China Sea','Celebes Sea'], opts_nl:['Javazee','Zuid-Chinese Zee','Celebeszee'], ans:2,
    fact:'The Celebes Sea separates Borneo from the Philippines. Named after the island of Celebes (now called Sulawesi) in Indonesia.',
    fact_nl:'De Celebeszee scheidt Borneo van de Filippijnen. Vernoemd naar het eiland Celebes (nu Sulawesi) in Indonesië.' },
  { q:'What is Malaysia\'s national animal?',
    q_nl:'Wat is het nationale dier van Maleisië?',
    opts:['Orangutan','Malayan Tiger','Sun Bear'], opts_nl:['Orang-oetan','Maleise Tijger','Maleise Honingbeer'], ans:1,
    fact:'The critically endangered Malayan Tiger appears on Malaysia\'s coat of arms. Fewer than 200 are estimated to remain in the wild.',
    fact_nl:'De ernstig bedreigde Maleise tijger staat op het wapenschild van Maleisië. Naar schatting zijn er nog geen 200 in het wild.' },
  { q:'What currency is used in Malaysia?',
    q_nl:'Welke munteenheid wordt gebruikt in Maleisië?',
    opts:['Ringgit','Rupiah','Baht'], opts_nl:['Ringgit','Rupia','Baht'], ans:0,
    fact:'"Ringgit" means "jagged" in Malay, recalling the serrated edges of old Spanish silver coins once used as currency across Southeast Asia.',
    fact_nl:'"Ringgit" betekent "gekarteld" in het Maleis, verwijzend naar de gekartelde randen van oude Spaanse zilvermunten die vroeger in heel Zuidoost-Azië werden gebruikt.' },
  { q:'Malaysia is divided into how many states?',
    q_nl:'In hoeveel staten is Maleisië verdeeld?',
    opts:['11 states','13 states','16 states'], opts_nl:['11 staten','13 staten','16 staten'], ans:1,
    fact:'Malaysia has 13 states and 3 federal territories. East Malaysia (Sabah & Sarawak) is separated from Peninsular Malaysia by the South China Sea.',
    fact_nl:'Maleisië heeft 13 staten en 3 federale territoria. Oost-Maleisië (Sabah & Sarawak) is gescheiden van het Schiereiland Maleisië door de Zuid-Chinese Zee.' },
  { q:'What percentage of Malaysia is covered by rainforest?',
    q_nl:'Welk percentage van Maleisië is bedekt met regenwoud?',
    opts:['~35%','~55%','~65%'], opts_nl:['~35%','~55%','~65%'], ans:2,
    fact:'Around 65% of Malaysia is rainforest — one of the highest proportions in the world. Malaysia has pledged to protect at least 50% of its land as forest forever.',
    fact_nl:'Ongeveer 65% van Maleisië is regenwoud — een van de hoogste percentages ter wereld. Maleisië heeft toegezegd ten minste 50% van zijn land voor altijd als bos te beschermen.' },
  { q:'The Strait of Malacca separates Malaysia from which country?',
    q_nl:'De Straat van Malakka scheidt Maleisië van welk land?',
    opts:['Thailand','Indonesia','Philippines'], opts_nl:['Thailand','Indonesië','Filippijnen'], ans:1,
    fact:'The Strait of Malacca between the Malay Peninsula and Sumatra is one of the world\'s most important shipping lanes — carrying around 25% of global trade.',
    fact_nl:'De Straat van Malakka tussen het Schiereiland Maleisië en Sumatra is een van de belangrijkste scheepvaartroutes ter wereld — goed voor circa 25% van de wereldhandel.' },
  { q:'How many UNESCO World Heritage Sites does Malaysia have?',
    q_nl:'Hoeveel UNESCO Werelderfgoedsites heeft Maleisië?',
    opts:['2 sites','4 sites','7 sites'], opts_nl:['2 sites','4 sites','7 sites'], ans:1,
    fact:'Malaysia has 4 UNESCO sites: Gunung Mulu NP, Kinabalu Park, George Town, and Melaka (the last two as the "Historic Cities of the Straits of Malacca").',
    fact_nl:'Maleisië heeft 4 UNESCO-sites: Gunung Mulu NP, Kinabalu Park, George Town en Melaka (de laatste twee als "Historische Steden van de Straat van Malakka").' },
  { q:'What is the longest river in Malaysia?',
    q_nl:'Wat is de langste rivier van Maleisië?',
    opts:['Rajang River','Kinabatangan River','Pahang River'], opts_nl:['Rajangrivier','Kinabatanganrivier','Pahangrivier'], ans:0,
    fact:'The Rajang River in Sarawak (563 km) is Malaysia\'s longest. The Kinabatangan is more famous for wildlife — it\'s the best place to spot wild orangutans from a boat!',
    fact_nl:'De Rajangrivier in Sarawak (563 km) is Maleisië\'s langste. De Kinabatangan is beroemder vanwege dierenleven — de beste plek om wilde orang-oetans vanuit een boot te spotten!' },
  { q:'Borneo is shared between which countries?',
    q_nl:'Borneo is verdeeld tussen welke landen?',
    opts:['Malaysia & Indonesia','Malaysia, Indonesia & Brunei','Malaysia, Indonesia & Philippines'],
    opts_nl:['Maleisië & Indonesië','Maleisië, Indonesië & Brunei','Maleisië, Indonesië & Filippijnen'], ans:1,
    fact:'Borneo is the world\'s 3rd-largest island, split between Malaysia (Sabah & Sarawak), Indonesia (Kalimantan, ~73%), and the tiny sultanate of Brunei.',
    fact_nl:'Borneo is het 3e grootste eiland ter wereld, verdeeld tussen Maleisië (Sabah & Sarawak), Indonesië (Kalimantan, ~73%) en het kleine sultanaat Brunei.' },
];

const MATCH_PAIRS = [
  { a:'🦧 Orangutan',          a_nl:'🦧 Orang-oetan',            b:'🌴 Rainforest canopy',   b_nl:'🌴 Regenwoudkruin',    id:1 },
  { a:'🐒 Proboscis Monkey',   a_nl:'🐒 Neusaap',                b:'🌊 Mangrove forest',     b_nl:'🌊 Mangrovebos',       id:2 },
  { a:'🐢 Green Sea Turtle',   a_nl:'🐢 Groene Zeeschildpad',    b:'🏖️ Sandy beaches',       b_nl:'🏖️ Zandstranden',     id:3 },
  { a:'🐻 Sun Bear',           a_nl:'🐻 Maleise Honingbeer',     b:'🌿 Tropical forest',     b_nl:'🌿 Tropisch bos',      id:4 },
  { a:'🦜 Rhinoceros Hornbill',a_nl:'🦜 Neushoornhoornvogel',   b:'🌳 Old-growth trees',    b_nl:'🌳 Oerbomen',          id:5 },
  { a:'🐊 Saltwater Crocodile',a_nl:'🐊 Zoutwaterkrokodil',     b:'🏞️ Rivers & estuaries', b_nl:'🏞️ Rivieren & delta\'s',id:6 },
  { a:'🐾 Malayan Tapir',      a_nl:'🐾 Maleise Tapir',          b:'💧 Riverbank jungle',    b_nl:'💧 Rivieroeverjungel', id:7 },
  { a:'🌿 Pitcher Plant',      a_nl:'🌿 Bekerplant',             b:'⛰️ Mountain slopes',     b_nl:'⛰️ Berghellingen',    id:8 },
  { a:'✨ Firefly',            a_nl:'✨ Vuurvliegje',            b:'🌙 Mangrove rivers',     b_nl:'🌙 Mangroverivieren',  id:9 },
  { a:'🦇 Giant Flying Fox',   a_nl:'🦇 Reuzen-vleerhond',       b:'🌅 Fruiting forest',    b_nl:'🌅 Vruchtengevend bos',id:10 },
];

const ACHIEVEMENTS = [
  { id:'rookie',        icon:'🌱', name:'Jungle Rookie',   name_nl:'Junglebegin',        desc:'Answer 10 questions',             desc_nl:'Beantwoord 10 vragen',            check: p => p.totalAnswered >= 10 },
  { id:'animal_expert', icon:'🦁', name:'Animal Expert',   name_nl:'Dierenexpert',       desc:'Get 20 animal questions right',   desc_nl:'Beantwoord 20 dierenvragen goed', check: p => p.animalCorrect >= 20 },
  { id:'explorer',      icon:'🗺️', name:'Explorer',        name_nl:'Ontdekker',          desc:'Play all 15 geography questions', desc_nl:'Speel alle 15 geografievragen',   check: p => p.geoPlayed >= 15 },
  { id:'streak_master', icon:'🔥', name:'Streak Master',   name_nl:'Reeksmeester',       desc:'5 correct answers in a row',      desc_nl:'5 juiste antwoorden op een rij',  check: p => p.bestStreak >= 5 },
  { id:'speed_demon',   icon:'⚡', name:'Speed Demon',     name_nl:'Snelheidsdemon',     desc:'Score 100 pts in Speed Round',    desc_nl:'Scoor 100 punten in Snelle Ronde',check: p => p.bestSpeedScore >= 100 },
  { id:'memory_master', icon:'🧩', name:'Memory Master',   name_nl:'Geheugenmeester',    desc:'Complete Match & Memory mode',    desc_nl:'Voltooi de Koppel & Geheugen-modus', check: p => p.matchCompleted >= 1 },
  { id:'all_rounder',   icon:'🌟', name:'All-Rounder',     name_nl:'Veelzijdige Speler', desc:'Play all 4 game modes',           desc_nl:'Speel alle 4 spelmodi',           check: p => (p.modesPlayed||[]).length >= 4 },
  { id:'champion',      icon:'🏆', name:'Champion',        name_nl:'Kampioen',           desc:'Reach 500 total points',          desc_nl:'Bereik 500 totaalpunten',         check: p => p.totalScore >= 500 },
];

// ══════════════════════════════════════════════════════════════
//  UTILITIES
// ══════════════════════════════════════════════════════════════

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function $(id) { return document.getElementById(id); }

function showToast(msg, duration = 2500) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.add('hidden'), duration);
}

// ══════════════════════════════════════════════════════════════
//  STORAGE
// ══════════════════════════════════════════════════════════════

const STORAGE_KEY = 'adventurequiz_v1';

function loadAllPlayers() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveAllPlayers(players) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

function createPlayer(name, avatar) {
  return {
    name,
    avatar,
    totalScore: 0,
    totalAnswered: 0,
    animalCorrect: 0,
    geoPlayed: 0,
    bestStreak: 0,
    bestSpeedScore: 0,
    matchCompleted: 0,
    modesPlayed: [],
    achievements: [],
    seenGeo: [],
    seenAnimal: [],
  };
}

// ══════════════════════════════════════════════════════════════
//  MAIN APP
// ══════════════════════════════════════════════════════════════

const App = (() => {
  let player = null;
  let allPlayers = [];
  let selectedAvatar = AVATARS[0];

  // ── Language ────────────────────────────────────────────────
  function setLang(l) {
    LANG = l;
    localStorage.setItem('quiz_lang', l);
    renderLang();
    // Re-render any dynamic parts that are currently visible
    renderSavedPlayers();
  }

  // ── Screen management ──────────────────────────────────────
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = $('screen-' + name);
    if (el) el.classList.add('active');
    const needsHeader = name !== 'profile';
    $('header').classList.toggle('hidden', !needsHeader);
  }

  // ── Profile screen ─────────────────────────────────────────
  function initProfileScreen() {
    const grid = $('avatar-grid');
    grid.innerHTML = '';
    AVATARS.forEach((av, i) => {
      const btn = document.createElement('button');
      btn.className = 'avatar-btn' + (i === 0 ? ' chosen' : '');
      btn.textContent = av;
      btn.onclick = () => {
        selectedAvatar = av;
        grid.querySelectorAll('.avatar-btn').forEach(b => b.classList.remove('chosen'));
        btn.classList.add('chosen');
      };
      grid.appendChild(btn);
    });
    renderSavedPlayers();
  }

  function renderSavedPlayers() {
    allPlayers = loadAllPlayers();
    const container = $('saved-players-list');
    if (!allPlayers.length) { container.innerHTML = ''; return; }

    const label = document.createElement('p');
    label.className = 'saved-list-label';
    label.textContent = ui('continueAs');
    container.innerHTML = '';
    container.appendChild(label);

    allPlayers.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'saved-player-btn';
      btn.innerHTML = `
        <span class="saved-player-emoji">${p.avatar}</span>
        <div class="saved-player-info">
          <div class="saved-player-name">${p.name}</div>
          <div class="saved-player-sub">⭐ ${p.totalScore} ${ui('pts')} · ${p.achievements.length} ${ui('badges')}</div>
        </div>
      `;
      btn.onclick = () => loadPlayer(p.name);
      container.appendChild(btn);
    });
  }

  function loadPlayer(name) {
    allPlayers = loadAllPlayers();
    const p = allPlayers.find(x => x.name === name);
    if (!p) return;
    player = p;
    enterGame();
  }

  function startGame() {
    const name = $('name-input').value.trim();
    if (!name) { showToast(ui('toastNoName')); return; }

    allPlayers = loadAllPlayers();
    let existing = allPlayers.find(p => p.name === name);
    if (existing) {
      player = existing;
      player.avatar = selectedAvatar;
    } else {
      player = createPlayer(name, selectedAvatar);
      allPlayers.push(player);
    }
    saveAllPlayers(allPlayers);
    enterGame();
  }

  function enterGame() {
    updateHeader();
    updateMapProgress();
    renderBadgeStrip();
    showScreen('menu');
  }

  // ── Header ─────────────────────────────────────────────────
  function updateHeader() {
    $('header-avatar').textContent = player.avatar;
    $('header-name').textContent   = player.name;
    $('header-score').textContent  = player.totalScore;
  }

  // ── Score ──────────────────────────────────────────────────
  function addScore(pts) {
    player.totalScore += pts;
    $('header-score').textContent = player.totalScore;
    persistPlayer();
  }

  function persistPlayer() {
    allPlayers = loadAllPlayers();
    const idx = allPlayers.findIndex(p => p.name === player.name);
    if (idx >= 0) allPlayers[idx] = player; else allPlayers.push(player);
    saveAllPlayers(allPlayers);
  }

  function trackMode(mode) {
    player.modesPlayed = [...new Set([...(player.modesPlayed || []), mode])];
  }

  // ── Map progress ────────────────────────────────────────────
  function updateMapProgress() {
    const score = player.totalScore;
    if (score >= 40)  { $('map-dot-1').classList.add('active','unlocked'); }
    if (score >= 120) { $('map-dot-2').classList.add('active','unlocked'); }
  }

  // ── Achievements ────────────────────────────────────────────
  function achName(a) { return LANG === 'nl' ? (a.name_nl || a.name) : a.name; }
  function achDesc(a) { return LANG === 'nl' ? (a.desc_nl || a.desc) : a.desc; }

  function checkAchievements() {
    const newlyEarned = [];
    ACHIEVEMENTS.forEach(a => {
      if (!player.achievements.includes(a.id) && a.check(player)) {
        player.achievements.push(a.id);
        newlyEarned.push(a);
      }
    });
    if (newlyEarned.length) {
      persistPlayer();
      newlyEarned.forEach(a => showToast(ui('toastBadge', achName(a)), 3000));
      renderBadgeStrip();
    }
    return newlyEarned;
  }

  function showAchievements() {
    const grid = $('achievements-grid');
    grid.innerHTML = '';
    ACHIEVEMENTS.forEach(a => {
      const earned = player && player.achievements.includes(a.id);
      const card = document.createElement('div');
      card.className = 'ach-card' + (earned ? ' earned' : '');
      card.innerHTML = `
        <div class="ach-icon">${a.icon}</div>
        <div class="ach-name">${achName(a)}</div>
        <div class="ach-desc">${achDesc(a)}</div>
      `;
      grid.appendChild(card);
    });
    $('overlay-achievements').classList.remove('hidden');
  }

  function hideAchievements(e) {
    if (!e || e.target === $('overlay-achievements')) {
      $('overlay-achievements').classList.add('hidden');
    }
  }

  function renderBadgeStrip() {
    if (!player) return;
    const strip = $('badge-strip');
    strip.innerHTML = '';
    ACHIEVEMENTS.forEach(a => {
      const earned = player.achievements.includes(a.id);
      const el = document.createElement('div');
      el.className = 'badge-mini' + (earned ? ' earned' : '');
      el.textContent = a.icon;
      el.title = achName(a);
      strip.appendChild(el);
    });
  }

  // ── Mode dispatcher ─────────────────────────────────────────
  function startMode(mode) {
    trackMode(mode);
    if      (mode === 'animal')  startAnimal();
    else if (mode === 'explore') startExplore();
    else if (mode === 'match')   startMatch();
    else if (mode === 'speed')   startSpeed();
  }

  function goMenu() {
    clearInterval(_speedTimer);
    updateMapProgress();
    renderBadgeStrip();
    showScreen('menu');
  }

  // ════════════════════════════════════════════════════════════
  //  MODE 1 — SPOT THE ANIMAL
  // ════════════════════════════════════════════════════════════

  let _animalQ   = null;
  let _animalPts = 0;
  let _animalIdx = 0;
  let _animalPool= [];
  let _animalStreak = 0;
  const ANIMAL_ROUND = 10;

  function startAnimal() {
    _animalPts = 0;
    _animalIdx = 0;
    _animalStreak = 0;
    _animalPool = shuffle(ANIMALS);
    $('animal-pts').textContent = '0';
    showScreen('animal');
    nextAnimalQ();
  }

  function animalName(a) { return LANG === 'nl' ? (a.name_nl || a.name) : a.name; }
  function animalFact(a) { return LANG === 'nl' ? (a.fact_nl || a.fact) : a.fact; }

  function nextAnimalQ() {
    $('animal-feedback').classList.add('hidden');
    $('animal-buttons').style.display = '';
    $('animal-card').classList.remove('correct-glow','wrong-glow');

    const animal = _animalPool[_animalIdx % _animalPool.length];
    const isCorrect = Math.random() < 0.5;
    let displayName;
    if (isCorrect) {
      displayName = animalName(animal);
    } else {
      const others = _animalPool.filter(a => a.id !== animal.id);
      displayName = animalName(others[Math.floor(Math.random() * others.length)]);
    }

    _animalQ = { animal, displayName, answer: isCorrect };

    // Show image if available (gif preferred, jpg fallback), else show emoji
    const emojiEl = $('animal-emoji');
    emojiEl.innerHTML = '';
    emojiEl.classList.remove('has-gif');
    const img = document.createElement('img');
    img.alt = animalName(animal);
    img.className = 'animal-gif';
    img.onerror = function() {
      if (img.src.endsWith('.gif')) {
        img.src = `gifs/${animal.id}.jpg`;
      } else {
        emojiEl.innerHTML = '';
        emojiEl.textContent = animal.emoji;
        emojiEl.classList.remove('has-gif');
      }
    };
    img.onload = () => emojiEl.classList.add('has-gif');
    img.src = `gifs/${animal.id}.gif`;
    emojiEl.appendChild(img);

    $('animal-label').textContent     = ui('animalLabel');
    $('animal-statement').textContent = ui('animalStatement', displayName);

    const prog = ((_animalIdx % ANIMAL_ROUND) / ANIMAL_ROUND) * 100;
    $('animal-prog').style.width = prog + '%';

    player.totalAnswered++;
    persistPlayer();
  }

  function answerAnimal(userSaysCorrect) {
    const isRight = (userSaysCorrect === _animalQ.answer);
    const card = $('animal-card');
    card.classList.add(isRight ? 'correct-glow' : 'wrong-glow');
    $('animal-buttons').style.display = 'none';

    if (isRight) {
      const pts = 10;
      _animalPts += pts;
      _animalStreak++;
      const bonus = _animalStreak > 0 && _animalStreak % 3 === 0 ? 5 : 0;
      if (bonus) { _animalPts += bonus; showToast(ui('toastStreakBonus', bonus)); }
      player.animalCorrect++;
      addScore(pts + bonus);
      $('animal-pts').textContent = _animalPts;
      player.bestStreak = Math.max(player.bestStreak, _animalStreak);
    } else {
      _animalStreak = 0;
    }

    const actualAnimal = _animalQ.animal;
    const fb = $('animal-feedback');
    $('animal-fb-icon').textContent   = isRight ? '✅' : '❌';
    $('animal-fb-result').textContent = isRight
      ? ui('fbAnimalCorrect')
      : ui('fbAnimalWrong', animalName(actualAnimal));
    $('animal-fb-result').className = 'fb-result ' + (isRight ? 'correct' : 'wrong');
    $('animal-fb-fact').innerHTML = `🌿 <strong>${ui('funFact')}</strong> ${animalFact(actualAnimal)}`;
    fb.classList.remove('hidden');

    checkAchievements();
    persistPlayer();
  }

  function nextAnimal() {
    _animalIdx++;
    if (_animalIdx >= ANIMAL_ROUND) {
      showToast(ui('toastRoundDone', _animalPts));
      goMenu();
      return;
    }
    nextAnimalQ();
  }

  // ════════════════════════════════════════════════════════════
  //  MODE 2 — EXPLORE MALAYSIA
  // ════════════════════════════════════════════════════════════

  let _exploreQ   = null;
  let _explorePts = 0;
  let _exploreIdx = 0;
  let _explorePool= [];
  let _exploreStreak = 0;
  const EXPLORE_ROUND = 10;

  function geoQ(q)    { return LANG === 'nl' ? (q.q_nl    || q.q)    : q.q; }
  function geoOpts(q) { return LANG === 'nl' ? (q.opts_nl || q.opts) : q.opts; }
  function geoFact(q) { return LANG === 'nl' ? (q.fact_nl || q.fact) : q.fact; }

  function startExplore() {
    _explorePts = 0;
    _exploreIdx = 0;
    _exploreStreak = 0;
    _explorePool = shuffle(GEO_QUESTIONS);
    $('explore-pts').textContent = '0';
    showScreen('explore');
    nextExploreQ();
  }

  function nextExploreQ() {
    $('explore-feedback').classList.add('hidden');
    $('explore-qcard').style.display = '';

    const q = _explorePool[_exploreIdx % _explorePool.length];
    _exploreQ = q;

    $('explore-qnum').textContent = ui('questionOf', (_exploreIdx % EXPLORE_ROUND) + 1, EXPLORE_ROUND);
    $('explore-q').textContent = geoQ(q);

    const opts = $('explore-opts');
    opts.innerHTML = '';
    geoOpts(q).forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.textContent = opt;
      btn.onclick = () => answerExplore(i, btn, opts);
      opts.appendChild(btn);
    });

    const prog = ((_exploreIdx % EXPLORE_ROUND) / EXPLORE_ROUND) * 100;
    $('explore-prog').style.width = prog + '%';

    player.totalAnswered++;
    player.geoPlayed = Math.min((player.geoPlayed || 0) + 1, GEO_QUESTIONS.length);
    persistPlayer();
  }

  function answerExplore(chosen, _btn, opts) {
    opts.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
    const isRight = chosen === _exploreQ.ans;

    opts.querySelectorAll('.opt-btn').forEach((b, i) => {
      if (i === _exploreQ.ans) b.classList.add('correct-opt');
      else if (i === chosen && !isRight) b.classList.add('wrong-opt');
    });

    if (isRight) {
      _explorePts += 10;
      _exploreStreak++;
      const bonus = _exploreStreak > 0 && _exploreStreak % 3 === 0 ? 5 : 0;
      if (bonus) showToast(ui('toastStreakBonus', bonus));
      addScore(10 + bonus);
      $('explore-pts').textContent = _explorePts;
      player.bestStreak = Math.max(player.bestStreak, _exploreStreak);
    } else {
      _exploreStreak = 0;
    }

    $('explore-qcard').style.display = 'none';
    const fb = $('explore-feedback');
    $('explore-fb-icon').textContent   = isRight ? '✅' : '❌';
    $('explore-fb-result').textContent = isRight
      ? ui('fbExploreCorrect')
      : ui('fbExploreWrong', geoOpts(_exploreQ)[_exploreQ.ans]);
    $('explore-fb-result').className = 'fb-result ' + (isRight ? 'correct' : 'wrong');
    $('explore-fb-fact').innerHTML = `🌍 <strong>${ui('didYouKnow')}</strong> ${geoFact(_exploreQ)}`;
    fb.classList.remove('hidden');

    checkAchievements();
    persistPlayer();
  }

  function nextExplore() {
    _exploreIdx++;
    if (_exploreIdx >= EXPLORE_ROUND) {
      showToast(ui('toastRoundDone', _explorePts));
      goMenu();
      return;
    }
    nextExploreQ();
  }

  // ════════════════════════════════════════════════════════════
  //  MODE 3 — MATCH & MEMORY
  // ════════════════════════════════════════════════════════════

  let _matchSelected = null;
  let _matchPairs    = 0;
  let _matchTotal    = 0;
  let _matchMistakes = 0;
  let _matchPts      = 0;

  function pairA(p) { return LANG === 'nl' ? (p.a_nl || p.a) : p.a; }
  function pairB(p) { return LANG === 'nl' ? (p.b_nl || p.b) : p.b; }

  function startMatch() {
    _matchSelected = null;
    _matchPairs    = 0;
    _matchMistakes = 0;
    _matchPts      = 0;

    const chosen = shuffle(MATCH_PAIRS).slice(0, 4);
    _matchTotal   = chosen.length;

    $('match-done').classList.add('hidden');
    $('match-title-el').textContent = ui('matchTitle');
    $('match-left').textContent = ui('matchLeft', _matchTotal);

    const tiles = [];
    chosen.forEach(pair => {
      tiles.push({ text: pairA(pair), pairId: pair.id, type: 'animal' });
      tiles.push({ text: pairB(pair), pairId: pair.id, type: 'habitat' });
    });

    const grid = $('match-grid');
    grid.innerHTML = '';
    shuffle(tiles).forEach(t => {
      const el = document.createElement('div');
      el.className = 'match-tile';
      el.textContent = t.text;
      el.dataset.pairId = t.pairId;
      el.dataset.type   = t.type;
      el.onclick = () => matchTileTap(el);
      grid.appendChild(el);
    });

    player.totalAnswered++;
    persistPlayer();
    showScreen('match');
  }

  function matchTileTap(el) {
    if (el.classList.contains('matched')) return;

    if (!_matchSelected) {
      _matchSelected = el;
      el.classList.add('selected');
      return;
    }

    if (_matchSelected === el) {
      el.classList.remove('selected');
      _matchSelected = null;
      return;
    }

    const a = _matchSelected;
    const b = el;
    a.classList.remove('selected');
    _matchSelected = null;

    const sameId   = a.dataset.pairId === b.dataset.pairId;
    const diffType = a.dataset.type   !== b.dataset.type;

    if (sameId && diffType) {
      [a, b].forEach(t => t.classList.add('matched'));
      _matchPairs++;
      _matchPts += 10;
      addScore(10);
      $('match-left').textContent = ui('matchLeft', _matchTotal - _matchPairs);
      if (_matchPairs === _matchTotal) finishMatch();
    } else {
      _matchMistakes++;
      [a, b].forEach(t => {
        t.classList.add('shake');
        t.addEventListener('animationend', () => t.classList.remove('shake'), { once: true });
      });
    }
  }

  function finishMatch() {
    player.matchCompleted = (player.matchCompleted || 0) + 1;
    const perfect = _matchMistakes === 0;
    if (perfect) { _matchPts += 20; addScore(20); }
    $('match-score-txt').textContent = perfect
      ? ui('matchPerfect', _matchPts)
      : ui('matchDone', _matchMistakes, _matchPts);

    $('match-done-result').textContent = ui('matchDoneResult');

    checkAchievements();
    persistPlayer();
    setTimeout(() => $('match-done').classList.remove('hidden'), 400);
  }

  // ════════════════════════════════════════════════════════════
  //  MODE 4 — SPEED ROUND
  // ════════════════════════════════════════════════════════════

  let _speedTimer = null;
  let _speedSec   = 60;
  let _speedScore = 0;
  let _speedStreak= 0;
  let _speedBestStreak = 0;
  let _speedCorrect = 0;
  let _speedPool  = [];
  let _speedIdx   = 0;
  let _speedAnswering = false;
  const CIRCUMFERENCE = 2 * Math.PI * 26;

  function startSpeed() {
    _speedScore  = 0;
    _speedStreak = 0;
    _speedBestStreak = 0;
    _speedCorrect = 0;
    _speedSec    = 60;
    _speedAnswering = false;
    _speedPool   = shuffle([...GEO_QUESTIONS, ...GEO_QUESTIONS]).slice(0, 40);
    _speedIdx    = 0;

    $('speed-score').textContent  = '0';
    $('speed-streak').textContent = '0';
    $('speed-timer').textContent  = '60';
    $('speed-ring').style.strokeDashoffset = '0';
    $('speed-ring').classList.remove('urgent');

    showScreen('speed');
    nextSpeedQ();
    clearInterval(_speedTimer);
    _speedTimer = setInterval(tickSpeed, 1000);
  }

  function tickSpeed() {
    _speedSec--;
    $('speed-timer').textContent = _speedSec;
    const offset = CIRCUMFERENCE * (1 - _speedSec / 60);
    $('speed-ring').style.strokeDashoffset = offset;
    if (_speedSec <= 10) $('speed-ring').classList.add('urgent');
    if (_speedSec <= 0)  endSpeed();
  }

  function nextSpeedQ() {
    if (_speedIdx >= _speedPool.length) {
      _speedPool = shuffle([...GEO_QUESTIONS, ...GEO_QUESTIONS]).slice(0, 40);
      _speedIdx = 0;
    }
    const q = _speedPool[_speedIdx++];

    $('speed-q').textContent = geoQ(q);
    const opts = $('speed-opts');
    opts.innerHTML = '';

    const options = geoOpts(q);
    const indices = shuffle([0, 1, 2]);
    indices.forEach(i => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.textContent = options[i];
      btn.onclick = () => answerSpeed(i === q.ans, btn, opts);
      opts.appendChild(btn);
    });
  }

  function answerSpeed(correct, btn, opts) {
    if (_speedAnswering) return;
    _speedAnswering = true;
    opts.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);

    btn.classList.add(correct ? 'flash-correct' : 'flash-wrong');

    if (correct) {
      _speedStreak++;
      _speedCorrect++;
      _speedBestStreak = Math.max(_speedBestStreak, _speedStreak);
      const bonus = _speedStreak > 0 && _speedStreak % 3 === 0 ? 5 : 0;
      _speedScore += 10 + bonus;
      $('speed-score').textContent  = _speedScore;
      $('speed-streak').textContent = _speedStreak;
      player.totalAnswered++;
    } else {
      _speedStreak = 0;
      $('speed-streak').textContent = '0';
      player.totalAnswered++;
    }

    setTimeout(() => {
      _speedAnswering = false;
      nextSpeedQ();
    }, 350);
  }

  function endSpeed() {
    clearInterval(_speedTimer);

    player.bestSpeedScore = Math.max(player.bestSpeedScore || 0, _speedScore);
    player.bestStreak     = Math.max(player.bestStreak || 0, _speedBestStreak);
    addScore(_speedScore);

    const newBadges = checkAchievements();
    persistPlayer();

    $('res-score').textContent   = _speedScore;
    $('res-correct').textContent = _speedCorrect;
    $('res-streak').textContent  = _speedBestStreak;

    const badgesEl = $('res-new-badges');
    badgesEl.innerHTML = '';
    newBadges.forEach(b => {
      const el = document.createElement('div');
      el.className = 'new-badge-item';
      el.innerHTML = `<div class="new-badge-icon">${b.icon}</div><div class="new-badge-name">${achName(b)}</div>`;
      badgesEl.appendChild(el);
    });

    showScreen('speed-results');
  }

  // ══════════════════════════════════════════════════════════
  //  INIT
  // ══════════════════════════════════════════════════════════
  function init() {
    renderLang();
    initProfileScreen();
    showScreen('profile');

    $('name-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') startGame();
    });

    $('header-player-btn').onclick = () => {
      clearInterval(_speedTimer);
      initProfileScreen();
      showScreen('profile');
    };
  }

  return {
    init,
    showScreen,
    startGame,
    startMode,
    goMenu,
    setLang,
    answerAnimal,
    nextAnimal,
    nextExplore,
    showAchievements,
    hideAchievements,
  };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
