'use strict';
/* ============================================================
   Adventure Quiz — Malaysia & Borneo
   app.js  — complete game logic + data
   ============================================================ */

// ══════════════════════════════════════════════════════════════
//  DATA
// ══════════════════════════════════════════════════════════════

const AVATARS = ['🦁', '🦊', '🐼', '🐯', '🦋', '🦅', '🐸', '🐬'];

const ANIMALS = [
  { id:'orangutan',      name:'Orangutan',            emoji:'🦧', bg:'#3d2100',
    fact:'Orangutans share 97% of their DNA with humans. They are the only great apes found in Asia and are critically endangered.' },
  { id:'tapir',          name:'Malayan Tapir',         emoji:'🐾', bg:'#1a2a1a',
    fact:'The Malayan Tapir is the largest of four tapir species. Its black-and-white coat breaks up its outline in dappled jungle light — and it swims brilliantly!' },
  { id:'proboscis',      name:'Proboscis Monkey',      emoji:'🐒', bg:'#2a1f0a',
    fact:'The male Proboscis Monkey has an enormous nose that amplifies its honking calls. It\'s found only in Borneo — and it\'s an excellent swimmer!' },
  { id:'pygmy_elephant', name:'Borneo Pygmy Elephant', emoji:'🐘', bg:'#1a2a2a',
    fact:'Borneo\'s pygmy elephants are the smallest elephants in Asia — about 30% smaller than mainland Asian elephants. They\'re also noticeably more gentle.' },
  { id:'sun_bear',       name:'Sun Bear',              emoji:'🐻', bg:'#2a1500',
    fact:'Sun Bears are the world\'s smallest bears. Their extraordinary tongues (up to 25 cm!) are perfect for scooping honey out of beehives.' },
  { id:'clouded_leopard',name:'Clouded Leopard',       emoji:'🐆', bg:'#2a200a',
    fact:'Clouded Leopards have the longest canine teeth relative to body size of any wild cat, giving them an almost saber-toothed appearance.' },
  { id:'hornbill',       name:'Rhinoceros Hornbill',   emoji:'🦜', bg:'#001a0a',
    fact:'The Rhinoceros Hornbill is Sarawak\'s state bird. The upturned "horn" on its beak — called a casque — resonates its calls through the rainforest.' },
  { id:'firefly',        name:'Firefly',               emoji:'✨', bg:'#000a1a',
    fact:'Thousands of fireflies near Kampung Kuantan, Malaysia, flash in perfect synchrony — entire mangrove trees pulsing like living Christmas lights!' },
  { id:'crocodile',      name:'Saltwater Crocodile',   emoji:'🐊', bg:'#0a1a0a',
    fact:'The Saltwater Crocodile is the world\'s largest living reptile. Adults can exceed 6 metres in length and are known to swim far out to sea.' },
  { id:'cobra',          name:'King Cobra',            emoji:'🐍', bg:'#1a1a00',
    fact:'The King Cobra is the world\'s longest venomous snake, reaching up to 5.5 metres. It\'s also the only snake species that builds a nest for its eggs.' },
  { id:'pitcher',        name:'Pitcher Plant',         emoji:'🌿', bg:'#001a00',
    fact:'Borneo\'s Nepenthes rajah is the world\'s largest carnivorous plant. Its pitcher can hold up to 3.5 litres of digestive liquid!' },
  { id:'colugo',         name:'Colugo',                emoji:'🦇', bg:'#0a0a1a',
    fact:'The Colugo — or "flying lemur" — doesn\'t actually fly or belong to lemurs. It glides between trees using a parachute-like membrane of skin.' },
  { id:'slow_loris',     name:'Slow Loris',            emoji:'🌙', bg:'#100a1a',
    fact:'The Slow Loris is the world\'s only venomous primate. It licks venom from arm glands and mixes it with saliva, coating its teeth for a painful bite.' },
  { id:'pangolin',       name:'Pangolin',              emoji:'🦔', bg:'#1a0a00',
    fact:'When threatened, a Pangolin rolls into a tight armoured ball. Its scales are made of keratin — the same material as your fingernails.' },
  { id:'flying_fox',     name:'Giant Flying Fox',      emoji:'🦇', bg:'#0a0010',
    fact:'The Giant Flying Fox has a wingspan of up to 1.7 metres — one of the world\'s largest bats. It\'s a vital pollinator of rainforest trees.' },
  { id:'sea_turtle',     name:'Green Sea Turtle',      emoji:'🐢', bg:'#00151a',
    fact:'Sabah\'s Turtle Islands are a protected nesting sanctuary. Green Sea Turtles can live over 80 years and return to the exact beach where they were born.' },
  { id:'binturong',      name:'Binturong',             emoji:'🐈', bg:'#150a05',
    fact:'The Binturong — also called "bearcat" — smells like popcorn! The scent comes from a compound in its urine used for scent-marking territory.' },
  { id:'macaque',        name:'Long-tailed Macaque',   emoji:'🐵', bg:'#1a1000',
    fact:'Long-tailed Macaques in Malaysia have been observed using stone tools to crack open shellfish — one of the clearest examples of primate tool use in the wild.' },
  { id:'fiddler_crab',   name:'Fiddler Crab',          emoji:'🦀', bg:'#001510',
    fact:'Male Fiddler Crabs wave their one enormous claw to attract females. The enlarged claw can weigh up to half the crab\'s total body weight!' },
  { id:'hornbill2',      name:'Wreathed Hornbill',     emoji:'🐦', bg:'#0a1500',
    fact:'Male Wreathed Hornbills carry dozens of fruits in their gullet to pass through the tree wall to their partner, who is sealed inside a hollow tree during nesting.' },
];

const GEO_QUESTIONS = [
  { q:'How many times larger is Malaysia than the Netherlands?',
    opts:['About 2×','About 3×','About 10×'], ans:1,
    fact:'Malaysia (330,000 km²) is roughly 3× the size of the Netherlands (41,500 km²). Despite the difference in size, their populations are similar!' },
  { q:'What is the capital city of Malaysia?',
    opts:['Georgetown','Johor Bahru','Kuala Lumpur'], ans:2,
    fact:'"Kuala Lumpur" means "muddy confluence" in Malay — named where two muddy rivers met. It grew from a tiny tin-mining settlement in the 1850s.' },
  { q:'Which is the highest mountain in Borneo and all of Malaysia?',
    opts:['Mount Kinabalu','Mount Mulu','Mount Trus Madi'], ans:0,
    fact:'Mount Kinabalu (4,095 m) is a UNESCO World Heritage Site. Around 40,000 people attempt the summit each year — but only experienced climbers reach the top!' },
  { q:'Approximately how old is the Borneo rainforest?',
    opts:['10 million years','65 million years','130 million years'], ans:2,
    fact:'At ~130 million years old, the Borneo rainforest is one of the oldest on Earth — far older than the Amazon. It predates the extinction of the dinosaurs.' },
  { q:'How many floors does the Petronas Twin Towers have?',
    opts:['66 floors','88 floors','102 floors'], ans:1,
    fact:'The towers have 88 floors — an auspicious number in Chinese culture. They held the title of world\'s tallest buildings from 1998 to 2004.' },
  { q:'What is the official language of Malaysia?',
    opts:['English','Bahasa Malaysia','Mandarin'], ans:1,
    fact:'Bahasa Malaysia is the national language — but most Malaysians also speak English. In daily life many mix both into "Manglish"!' },
  { q:'Which sea lies to the east of Borneo?',
    opts:['Java Sea','South China Sea','Celebes Sea'], ans:2,
    fact:'The Celebes Sea separates Borneo from the Philippines. Named after the island of Celebes (now called Sulawesi) in Indonesia.' },
  { q:'What is Malaysia\'s national animal?',
    opts:['Orangutan','Malayan Tiger','Sun Bear'], ans:1,
    fact:'The critically endangered Malayan Tiger appears on Malaysia\'s coat of arms. Fewer than 200 are estimated to remain in the wild.' },
  { q:'What currency is used in Malaysia?',
    opts:['Ringgit','Rupiah','Baht'], ans:0,
    fact:'"Ringgit" means "jagged" in Malay, recalling the serrated edges of old Spanish silver coins once used as currency across Southeast Asia.' },
  { q:'Malaysia is divided into how many states?',
    opts:['11 states','13 states','16 states'], ans:1,
    fact:'Malaysia has 13 states and 3 federal territories. East Malaysia (Sabah & Sarawak) is separated from Peninsular Malaysia by the South China Sea.' },
  { q:'What percentage of Malaysia is covered by rainforest?',
    opts:['~35%','~55%','~65%'], ans:2,
    fact:'Around 65% of Malaysia is rainforest — one of the highest proportions in the world. Malaysia has pledged to protect at least 50% of its land as forest forever.' },
  { q:'The Strait of Malacca separates Malaysia from which country?',
    opts:['Thailand','Indonesia','Philippines'], ans:1,
    fact:'The Strait of Malacca between the Malay Peninsula and Sumatra is one of the world\'s most important shipping lanes — carrying around 25% of global trade.' },
  { q:'How many UNESCO World Heritage Sites does Malaysia have?',
    opts:['2 sites','4 sites','7 sites'], ans:1,
    fact:'Malaysia has 4 UNESCO sites: Gunung Mulu NP, Kinabalu Park, George Town, and Melaka (the last two as the "Historic Cities of the Straits of Malacca").' },
  { q:'What is the longest river in Malaysia?',
    opts:['Rajang River','Kinabatangan River','Pahang River'], ans:0,
    fact:'The Rajang River in Sarawak (563 km) is Malaysia\'s longest. The Kinabatangan is more famous for wildlife — it\'s the best place to spot wild orangutans from a boat!' },
  { q:'Borneo is shared between which countries?',
    opts:['Malaysia & Indonesia','Malaysia, Indonesia & Brunei','Malaysia, Indonesia & Philippines'], ans:1,
    fact:'Borneo is the world\'s 3rd-largest island, split between Malaysia (Sabah & Sarawak), Indonesia (Kalimantan, ~73%), and the tiny sultanate of Brunei.' },
];

const MATCH_PAIRS = [
  { a:'🦧 Orangutan',          b:'🌴 Rainforest canopy',   id:1 },
  { a:'🐒 Proboscis Monkey',   b:'🌊 Mangrove forest',     id:2 },
  { a:'🐢 Green Sea Turtle',   b:'🏖️ Sandy beaches',       id:3 },
  { a:'🐻 Sun Bear',           b:'🌿 Tropical forest',     id:4 },
  { a:'🦜 Rhinoceros Hornbill',b:'🌳 Old-growth trees',    id:5 },
  { a:'🐊 Saltwater Crocodile',b:'🏞️ Rivers & estuaries', id:6 },
  { a:'🐾 Malayan Tapir',      b:'💧 Riverbank jungle',    id:7 },
  { a:'🌿 Pitcher Plant',      b:'⛰️ Mountain slopes',     id:8 },
  { a:'✨ Firefly',            b:'🌙 Mangrove rivers',     id:9 },
  { a:'🦇 Giant Flying Fox',   b:'🌅 Fruiting forest',    id:10 },
];

const ACHIEVEMENTS = [
  { id:'rookie',        icon:'🌱', name:'Jungle Rookie',   desc:'Answer 10 questions',              check: p => p.totalAnswered >= 10 },
  { id:'animal_expert', icon:'🦁', name:'Animal Expert',   desc:'Get 20 animal questions right',    check: p => p.animalCorrect >= 20 },
  { id:'explorer',      icon:'🗺️', name:'Explorer',        desc:'Play all 15 geography questions',  check: p => p.geoPlayed >= 15 },
  { id:'streak_master', icon:'🔥', name:'Streak Master',   desc:'5 correct answers in a row',       check: p => p.bestStreak >= 5 },
  { id:'speed_demon',   icon:'⚡', name:'Speed Demon',     desc:'Score 100 pts in Speed Round',     check: p => p.bestSpeedScore >= 100 },
  { id:'memory_master', icon:'🧩', name:'Memory Master',   desc:'Complete Match & Memory mode',     check: p => p.matchCompleted >= 1 },
  { id:'all_rounder',   icon:'🌟', name:'All-Rounder',     desc:'Play all 4 game modes',            check: p => (p.modesPlayed||[]).length >= 4 },
  { id:'champion',      icon:'🏆', name:'Champion',        desc:'Reach 500 total points',           check: p => p.totalScore >= 500 },
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
    seenGeo: [],        // indices of geo questions seen
    seenAnimal: [],     // indices of animal questions seen
  };
}

// ══════════════════════════════════════════════════════════════
//  MAIN APP
// ══════════════════════════════════════════════════════════════

const App = (() => {
  let player = null;
  let allPlayers = [];
  let selectedAvatar = AVATARS[0];

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
    label.textContent = 'Continue as:';
    container.innerHTML = '';
    container.appendChild(label);

    allPlayers.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'saved-player-btn';
      btn.innerHTML = `
        <span class="saved-player-emoji">${p.avatar}</span>
        <div class="saved-player-info">
          <div class="saved-player-name">${p.name}</div>
          <div class="saved-player-sub">⭐ ${p.totalScore} pts · ${p.achievements.length} badges</div>
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
    if (!name) { showToast('Please enter your name 🌴'); return; }

    allPlayers = loadAllPlayers();
    let existing = allPlayers.find(p => p.name === name);
    if (existing) {
      player = existing;
      // update avatar if changed
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
      newlyEarned.forEach(a => showToast(`🏅 Badge unlocked: ${a.name}!`, 3000));
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
        <div class="ach-name">${a.name}</div>
        <div class="ach-desc">${a.desc}</div>
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
      el.title = a.name;
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

  function nextAnimalQ() {
    $('animal-feedback').classList.add('hidden');
    $('animal-buttons').style.display = '';
    $('animal-card').classList.remove('correct-glow','wrong-glow');

    const animal = _animalPool[_animalIdx % _animalPool.length];
    const isCorrect = Math.random() < 0.5;
    let displayName;
    if (isCorrect) {
      displayName = animal.name;
    } else {
      // pick a different animal name
      const others = _animalPool.filter(a => a.id !== animal.id);
      displayName = others[Math.floor(Math.random() * others.length)].name;
    }

    _animalQ = { animal, displayName, answer: isCorrect };

    $('animal-emoji').textContent = animal.emoji;
    $('animal-label').textContent = 'What animal is this?';
    $('animal-statement').textContent = `"This is a ${displayName}"`;

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
      if (bonus) { _animalPts += bonus; showToast(`🔥 Streak bonus! +${bonus} pts`); }
      player.animalCorrect++;
      addScore(pts + bonus);
      $('animal-pts').textContent = _animalPts;
      player.bestStreak = Math.max(player.bestStreak, _animalStreak);
    } else {
      _animalStreak = 0;
    }

    const actualAnimal = _animalQ.animal;
    const fb = $('animal-feedback');
    $('animal-fb-icon').textContent  = isRight ? '✅' : '❌';
    $('animal-fb-result').textContent = isRight
      ? `Correct! +10 points`
      : `Incorrect — it's a ${actualAnimal.name}`;
    $('animal-fb-result').className = 'fb-result ' + (isRight ? 'correct' : 'wrong');
    $('animal-fb-fact').innerHTML = `🌿 <strong>Fun fact:</strong> ${actualAnimal.fact}`;
    fb.classList.remove('hidden');

    checkAchievements();
    persistPlayer();
  }

  function nextAnimal() {
    _animalIdx++;
    if (_animalIdx >= ANIMAL_ROUND) {
      // round complete — show summary toast and go menu
      showToast(`🎉 Round complete! You scored ${_animalPts} pts`);
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

    $('explore-qnum').textContent = `Question ${(_exploreIdx % EXPLORE_ROUND) + 1} of ${EXPLORE_ROUND}`;
    $('explore-q').textContent = q.q;

    const opts = $('explore-opts');
    opts.innerHTML = '';
    q.opts.forEach((opt, i) => {
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

  function answerExplore(chosen, btn, opts) {
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
      if (bonus) showToast(`🔥 Streak bonus! +${bonus} pts`);
      addScore(10 + bonus);
      $('explore-pts').textContent = _explorePts;
      player.bestStreak = Math.max(player.bestStreak, _exploreStreak);
    } else {
      _exploreStreak = 0;
    }

    $('explore-qcard').style.display = 'none';
    const fb = $('explore-feedback');
    $('explore-fb-icon').textContent  = isRight ? '✅' : '❌';
    $('explore-fb-result').textContent = isRight ? 'Correct! +10 points' : `Wrong — the answer was: ${_exploreQ.opts[_exploreQ.ans]}`;
    $('explore-fb-result').className = 'fb-result ' + (isRight ? 'correct' : 'wrong');
    $('explore-fb-fact').innerHTML = `🌍 <strong>Did you know?</strong> ${_exploreQ.fact}`;
    fb.classList.remove('hidden');

    checkAchievements();
    persistPlayer();
  }

  function nextExplore() {
    _exploreIdx++;
    if (_exploreIdx >= EXPLORE_ROUND) {
      showToast(`🎉 Round complete! You scored ${_explorePts} pts`);
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

  function startMatch() {
    _matchSelected = null;
    _matchPairs    = 0;
    _matchMistakes = 0;
    _matchPts      = 0;

    // Pick 4 pairs for this round
    const chosen = shuffle(MATCH_PAIRS).slice(0, 4);
    _matchTotal   = chosen.length;

    $('match-done').classList.add('hidden');
    $('match-left').textContent = `${_matchTotal} left`;

    const tiles = [];
    chosen.forEach(pair => {
      tiles.push({ text: pair.a, pairId: pair.id, type: 'animal' });
      tiles.push({ text: pair.b, pairId: pair.id, type: 'habitat' });
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
      // deselect
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
      // correct match
      [a, b].forEach(t => t.classList.add('matched'));
      _matchPairs++;
      _matchPts += 10;
      addScore(10);
      $('match-left').textContent = `${_matchTotal - _matchPairs} left`;
      if (_matchPairs === _matchTotal) finishMatch();
    } else {
      // wrong
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
    $('match-score-txt').textContent =
      perfect
        ? `Perfect match! +${_matchPts} pts total 🌟`
        : `Matched all pairs! ${_matchMistakes} mistake${_matchMistakes !== 1 ? 's' : ''}. +${_matchPts} pts`;

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
  const CIRCUMFERENCE = 2 * Math.PI * 26; // r=26

  function startSpeed() {
    _speedScore  = 0;
    _speedStreak = 0;
    _speedBestStreak = 0;
    _speedCorrect = 0;
    _speedSec    = 60;
    _speedAnswering = false;
    _speedPool   = shuffle([...GEO_QUESTIONS, ...GEO_QUESTIONS]).slice(0, 40); // 40 questions pool
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

    $('speed-q').textContent = q.q;
    const opts = $('speed-opts');
    opts.innerHTML = '';

    // Shuffle options but track correct index
    const indices = shuffle([0, 1, 2]);
    indices.forEach(i => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.textContent = q.opts[i];
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
      el.innerHTML = `<div class="new-badge-icon">${b.icon}</div><div class="new-badge-name">${b.name}</div>`;
      badgesEl.appendChild(el);
    });

    showScreen('speed-results');
  }

  // ══════════════════════════════════════════════════════════
  //  INIT
  // ══════════════════════════════════════════════════════════
  function init() {
    initProfileScreen();
    showScreen('profile');

    // Allow pressing Enter in name input
    $('name-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') startGame();
    });

    // Go back to profile from header player button
    $('header-player-btn').onclick = () => {
      clearInterval(_speedTimer);
      initProfileScreen();
      showScreen('profile');
    };
  }

  // public interface
  return {
    init,
    showScreen,
    startGame,
    startMode,
    goMenu,
    // Animal
    answerAnimal,
    nextAnimal,
    // Explore
    nextExplore,
    // Match — no direct calls needed (tile clicks handle it)
    // Speed — no direct calls needed
    // Achievements
    showAchievements,
    hideAchievements,
  };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
