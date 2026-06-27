const BIRTHDAY_DATE = '2026-06-27T00:00:00';
const SURPRISE_ONE_MESSAGES = [
    'Your smile makes ordinary moments feel golden.',
    'You are loved more than words can neatly hold.',
    'Every memory with you is a little treasure.',
    'May today wrap you in warmth, laughter, and magic.',
    'You make the world softer just by being in it.',
    'Here is to dreams that bloom beautifully this year.',
    'You deserve every bright thing coming your way.',
    'This is only the first surprise. More joy awaits.'
];
const SURPRISE_TWO_GIFTS = [
    {
        title: 'Golden Smile',
        wish: 'May your smile keep turning simple days into unforgettable ones.'
    },
    {
        title: 'Sweet Memory',
        wish: 'May this year bring memories soft enough to keep forever.'
    },
    {
        title: 'Little Bloom',
        wish: 'May every dream you carry bloom in the prettiest way.'
    },
    {
        title: 'Warm Hug',
        wish: 'May you feel loved, seen, and celebrated in every season.'
    },
    {
        title: 'Bright Spark',
        wish: 'May your happiness glow louder than every worry.'
    },
    {
        title: 'Next Chapter',
        wish: 'May the days ahead surprise you with beautiful little miracles.'
    }
];
const SURPRISE_THREE_STAR_MESSAGES = [
    'A tiny star for your brightest smile.',
    'May this wish find you whenever you need warmth.',
    'You make the night feel less dark.',
    'A soft reminder: you are deeply loved.',
    'May laughter follow you everywhere.',
    'This star carries a hug just for you.',
    'Your kindness glows quietly and beautifully.',
    'May every dream get a little closer.',
    'You are someone worth celebrating fully.',
    'A wish for peaceful mornings and golden evenings.',
    'May your heart feel light today.',
    'You turn moments into memories.',
    'A sparkle for every brave thing you do.',
    'May happiness surprise you often.',
    'You deserve gentle days and loud joy.',
    'A wish for health, wonder, and calm.',
    'Your presence is its own kind of magic.',
    'May love meet you in small details.',
    'A star for every reason you are special.',
    'May this year bloom beautifully for you.',
    'You are a rare and lovely light.',
    'May your smile return to you multiplied.',
    'A little courage for every new chapter.',
    'May your dreams feel welcome here.',
    'You are cherished beyond ordinary words.',
    'A wish for comfort on tired days.',
    'May good news arrive like starlight.',
    'Your joy matters more than you know.',
    'A sparkle for the childlike wonder in you.',
    'May your heart stay soft and strong.',
    'You make ordinary days feel meaningful.',
    'A wish for sweet surprises ahead.',
    'May you always find reasons to glow.',
    'You are loved in every quiet way.',
    'A star for the memories still waiting.',
    'May your world feel tender and bright.',
    'You carry beauty into every room.',
    'A wish for dreams that choose you back.',
    'May today become a forever memory.',
    'The sky saved this final sparkle for you.'
];

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('stars-canvas');
    const button = document.querySelector('.journey-button');
    const landingPage = document.querySelector('.landing-page');
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingProgress = document.querySelector('.loading-progress');
    const nextSection = document.getElementById('next-section');
    const countdownModule = document.querySelector('[data-countdown-module]');
    const countdownContent = document.querySelector('.countdown-content');
    const celebrationContent = document.querySelector('.celebration-content');
    const celebrationCanvas = document.getElementById('celebration-canvas');
    const surpriseEntryButton = document.querySelector('[data-open-surprise-one]');
    const surpriseOne = document.getElementById('surprise-one');
    const envelopeStage = document.querySelector('[data-envelope-stage]');
    const openedCountElement = document.querySelector('[data-opened-count]');
    const totalCountElement = document.querySelector('[data-total-count]');
    const nextSurpriseButton = document.querySelector('[data-next-surprise]');
    const surpriseTwo = document.getElementById('surprise-two');
    const giftStage = document.querySelector('[data-gift-stage]');
    const giftOpenedCountElement = document.querySelector('[data-gift-opened-count]');
    const giftTotalCountElement = document.querySelector('[data-gift-total-count]');
    const nextModuleButton = document.querySelector('[data-next-module]');
    const surpriseThree = document.getElementById('surprise-three');
    const starStage = document.querySelector('[data-star-stage]');
    const starCollectedCountElement = document.querySelector('[data-star-collected-count]');
    const starTotalCountElement = document.querySelector('[data-star-total-count]');
    const nextStarModuleButton = document.querySelector('[data-next-star-module]');
    const starPopup = document.querySelector('[data-star-popup]');
    const starPopupText = document.querySelector('[data-star-popup-text]');
    const starPopupClose = document.querySelector('[data-star-popup-close]');
    const countdownValues = {
        days: document.querySelector('[data-count-value="days"]'),
        hours: document.querySelector('[data-count-value="hours"]'),
        minutes: document.querySelector('[data-count-value="minutes"]'),
        seconds: document.querySelector('[data-count-value="seconds"]')
    };

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stars = [];
    let animationId = null;

    const resizeCanvas = () => {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(window.innerWidth * pixelRatio);
        canvas.height = Math.floor(window.innerHeight * pixelRatio);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const createStars = () => {
        const area = window.innerWidth * window.innerHeight;
        const count = Math.min(180, Math.max(80, Math.floor(area / 8500)));
        stars.length = 0;

        for (let i = 0; i < count; i += 1) {
            stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: Math.random() * 1.6 + 0.35,
                alpha: Math.random() * 0.7 + 0.22,
                twinkle: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.018 + 0.006,
                drift: Math.random() * 0.08 + 0.025
            });
        }
    };

    const drawStars = () => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        stars.forEach((star) => {
            if (!reducedMotion) {
                star.twinkle += star.speed;
                star.y += star.drift;

                if (star.y > window.innerHeight + 6) {
                    star.y = -6;
                    star.x = Math.random() * window.innerWidth;
                }
            }

            const glow = star.alpha + Math.sin(star.twinkle) * 0.24;
            const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 6);
            gradient.addColorStop(0, `rgba(255, 249, 220, ${Math.max(0.15, glow)})`);
            gradient.addColorStop(0.38, `rgba(245, 201, 107, ${Math.max(0.04, glow * 0.28)})`);
            gradient.addColorStop(1, 'rgba(245, 201, 107, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 6, 0, Math.PI * 2);
            ctx.fill();
        });

        if (!reducedMotion) {
            animationId = requestAnimationFrame(drawStars);
        }
    };

    const bootStars = () => {
        if (animationId) cancelAnimationFrame(animationId);
        resizeCanvas();
        createStars();
        drawStars();
    };

    window.addEventListener('resize', bootStars, { passive: true });
    bootStars();

    let countdownInterval = null;
    let countdownStarted = false;
    let celebrationAnimationId = null;
    let celebrationStarted = false;
    let lastFireworkTime = 0;
    let lastConfettiTime = 0;
    let surpriseOneStarted = false;
    let surpriseTwoStarted = false;
    let surpriseThreeStarted = false;
    const openedEnvelopeIndexes = new Set();
    const openedGiftIndexes = new Set();
    const collectedStarIndexes = new Set();
    const celebrationParticles = [];
    const celebrationCtx = celebrationCanvas ? celebrationCanvas.getContext('2d') : null;
    const birthdayTime = new Date(BIRTHDAY_DATE).getTime();
    const celebrationPalette = ['#f5c96b', '#ff6f9f', '#7ee7ff', '#fff8f3', '#b69cff'];

    const formatTimePart = (value) => String(value).padStart(2, '0');

    const updateCountdownValue = (key, value) => {
        const element = countdownValues[key];
        const formattedValue = formatTimePart(value);

        if (!element || element.textContent === formattedValue) return;

        element.textContent = formattedValue;
        element.classList.remove('is-changing');
        element.offsetHeight;
        element.classList.add('is-changing');
    };

    const resizeCelebrationCanvas = () => {
        if (!celebrationCanvas || !celebrationCtx) return;

        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const bounds = celebrationCanvas.getBoundingClientRect();
        celebrationCanvas.width = Math.floor(bounds.width * pixelRatio);
        celebrationCanvas.height = Math.floor(bounds.height * pixelRatio);
        celebrationCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const createParticle = (config) => {
        celebrationParticles.push({
            x: config.x,
            y: config.y,
            vx: config.vx,
            vy: config.vy,
            size: config.size || 4,
            color: config.color || celebrationPalette[0],
            gravity: config.gravity || 0.04,
            drag: config.drag || 0.99,
            rotation: config.rotation || 0,
            spin: config.spin || 0,
            life: config.life || 80,
            maxLife: config.life || 80,
            shape: config.shape || 'circle'
        });
    };

    const createConfettiBurst = (x, y, amount = 54) => {
        for (let i = 0; i < amount; i += 1) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5.5 + 2.2;

            createParticle({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: Math.random() * 7 + 4,
                color: celebrationPalette[Math.floor(Math.random() * celebrationPalette.length)],
                gravity: 0.075,
                drag: 0.985,
                rotation: Math.random() * Math.PI,
                spin: (Math.random() - 0.5) * 0.28,
                life: Math.random() * 45 + 90,
                shape: 'confetti'
            });
        }
    };

    const createFirework = (x, y, amount = 72) => {
        const color = celebrationPalette[Math.floor(Math.random() * celebrationPalette.length)];

        for (let i = 0; i < amount; i += 1) {
            const angle = (Math.PI * 2 * i) / amount;
            const speed = Math.random() * 3.4 + 1.4;

            createParticle({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 2.5 + 1.2,
                color,
                gravity: 0.025,
                drag: 0.982,
                life: Math.random() * 34 + 62,
                shape: 'spark'
            });
        }
    };

    const createSparkles = (amount = 10) => {
        const width = celebrationCanvas ? celebrationCanvas.clientWidth : window.innerWidth;
        const height = celebrationCanvas ? celebrationCanvas.clientHeight : window.innerHeight;

        for (let i = 0; i < amount; i += 1) {
            createParticle({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                size: Math.random() * 2.4 + 1,
                color: celebrationPalette[Math.floor(Math.random() * celebrationPalette.length)],
                gravity: 0,
                drag: 0.995,
                life: Math.random() * 42 + 34,
                shape: 'sparkle'
            });
        }
    };

    const drawCelebrationParticle = (particle) => {
        if (!celebrationCtx) return;

        const opacity = Math.max(particle.life / particle.maxLife, 0);
        celebrationCtx.save();
        celebrationCtx.globalAlpha = opacity;
        celebrationCtx.translate(particle.x, particle.y);
        celebrationCtx.rotate(particle.rotation);
        celebrationCtx.fillStyle = particle.color;
        celebrationCtx.shadowColor = particle.color;
        celebrationCtx.shadowBlur = particle.shape === 'confetti' ? 4 : 14;

        if (particle.shape === 'confetti') {
            celebrationCtx.fillRect(-particle.size / 2, -particle.size / 3, particle.size, particle.size * 0.58);
        } else if (particle.shape === 'sparkle') {
            celebrationCtx.beginPath();
            celebrationCtx.moveTo(0, -particle.size * 2.4);
            celebrationCtx.lineTo(particle.size * 0.7, 0);
            celebrationCtx.lineTo(0, particle.size * 2.4);
            celebrationCtx.lineTo(-particle.size * 0.7, 0);
            celebrationCtx.closePath();
            celebrationCtx.fill();
        } else {
            celebrationCtx.beginPath();
            celebrationCtx.arc(0, 0, particle.size, 0, Math.PI * 2);
            celebrationCtx.fill();
        }

        celebrationCtx.restore();
    };

    const animateCelebration = (timestamp = 0) => {
        if (!celebrationCanvas || !celebrationCtx) return;

        const width = celebrationCanvas.clientWidth;
        const height = celebrationCanvas.clientHeight;
        celebrationCtx.clearRect(0, 0, width, height);

        if (!reducedMotion) {
            if (timestamp - lastFireworkTime > 1050) {
                createFirework(Math.random() * width * 0.76 + width * 0.12, Math.random() * height * 0.38 + height * 0.12);
                lastFireworkTime = timestamp;
            }

            if (timestamp - lastConfettiTime > 1600) {
                createConfettiBurst(Math.random() * width, height * 0.12, 34);
                lastConfettiTime = timestamp;
            }

            createSparkles(3);
        }

        for (let i = celebrationParticles.length - 1; i >= 0; i -= 1) {
            const particle = celebrationParticles[i];
            particle.vx *= particle.drag;
            particle.vy = particle.vy * particle.drag + particle.gravity;
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += particle.spin;
            particle.life -= 1;

            drawCelebrationParticle(particle);

            if (particle.life <= 0 || particle.y > height + 80) {
                celebrationParticles.splice(i, 1);
            }
        }

        celebrationAnimationId = requestAnimationFrame(animateCelebration);
    };

    const startCelebrationEffects = () => {
        if (celebrationStarted || !celebrationCanvas || !celebrationCtx) return;
        celebrationStarted = true;

        resizeCelebrationCanvas();
        createConfettiBurst(celebrationCanvas.clientWidth * 0.5, celebrationCanvas.clientHeight * 0.22, 120);
        createFirework(celebrationCanvas.clientWidth * 0.28, celebrationCanvas.clientHeight * 0.28, 84);
        createFirework(celebrationCanvas.clientWidth * 0.72, celebrationCanvas.clientHeight * 0.24, 84);
        createSparkles(48);
        celebrationAnimationId = requestAnimationFrame(animateCelebration);
    };

    const updateSurpriseProgress = () => {
        const openedCount = openedEnvelopeIndexes.size;
        const totalCount = SURPRISE_ONE_MESSAGES.length;

        if (openedCountElement) openedCountElement.textContent = String(openedCount);
        if (totalCountElement) totalCountElement.textContent = String(totalCount);

        if (nextSurpriseButton && openedCount === totalCount) {
            nextSurpriseButton.disabled = false;
            nextSurpriseButton.classList.add('is-unlocked');
        }
    };

    const openEnvelope = (buttonElement, index) => {
        if (!buttonElement || openedEnvelopeIndexes.has(index)) return;

        openedEnvelopeIndexes.add(index);
        buttonElement.classList.add('is-opened');
        buttonElement.disabled = true;
        buttonElement.setAttribute('aria-label', `Opened envelope ${index + 1}`);
        updateSurpriseProgress();
    };

    const createEnvelopeElement = (message, index) => {
        const envelopeButton = document.createElement('button');
        envelopeButton.className = 'envelope-card';
        envelopeButton.type = 'button';
        envelopeButton.setAttribute('aria-label', `Open envelope ${index + 1}`);

        const envelope = document.createElement('span');
        envelope.className = 'envelope';

        const letter = document.createElement('span');
        letter.className = 'envelope-letter';
        letter.textContent = message;

        const body = document.createElement('span');
        body.className = 'envelope-body';

        const flap = document.createElement('span');
        flap.className = 'envelope-flap';

        const seal = document.createElement('span');
        seal.className = 'envelope-seal';

        envelope.append(letter, body, flap, seal);
        envelopeButton.appendChild(envelope);

        envelopeButton.addEventListener('click', () => openEnvelope(envelopeButton, index));
        return envelopeButton;
    };

    const renderSurpriseOne = () => {
        if (!envelopeStage || surpriseOneStarted) return;
        surpriseOneStarted = true;
        envelopeStage.innerHTML = '';

        SURPRISE_ONE_MESSAGES.forEach((message, index) => {
            envelopeStage.appendChild(createEnvelopeElement(message, index));
        });

        updateSurpriseProgress();
    };

    const showSurpriseOne = () => {
        if (!surpriseOne) return;

        renderSurpriseOne();
        if (nextSection) {
            nextSection.classList.remove('is-active');
            nextSection.setAttribute('aria-hidden', 'true');
        }
        surpriseOne.classList.add('is-active');
        surpriseOne.setAttribute('aria-hidden', 'false');
    };

    const updateGiftProgress = () => {
        const openedCount = openedGiftIndexes.size;
        const totalCount = SURPRISE_TWO_GIFTS.length;

        if (giftOpenedCountElement) giftOpenedCountElement.textContent = String(openedCount);
        if (giftTotalCountElement) giftTotalCountElement.textContent = String(totalCount);

        if (nextModuleButton && openedCount === totalCount) {
            nextModuleButton.disabled = false;
            nextModuleButton.classList.add('is-unlocked');
        }
    };

    const openGift = (giftElement, index) => {
        if (!giftElement || openedGiftIndexes.has(index)) return;

        openedGiftIndexes.add(index);
        giftElement.classList.add('is-opened');
        giftElement.setAttribute('aria-label', `Opened gift ${index + 1}`);
        const trigger = giftElement.querySelector('.gift-box-button');
        if (trigger) trigger.disabled = true;
        updateGiftProgress();
    };

    const createPlaceholder = (className, label) => {
        const placeholder = document.createElement('div');
        placeholder.className = `gift-placeholder ${className}`;

        const icon = document.createElement('span');
        icon.className = 'gift-placeholder-icon';
        icon.setAttribute('aria-hidden', 'true');

        const text = document.createElement('span');
        text.textContent = label;

        placeholder.append(icon, text);
        return placeholder;
    };

    const createGiftElement = (gift, index) => {
        const article = document.createElement('article');
        article.className = 'gift-card';
        article.setAttribute('aria-label', `Gift ${index + 1}`);

        const boxButton = document.createElement('button');
        boxButton.className = 'gift-box-button';
        boxButton.type = 'button';
        boxButton.setAttribute('aria-label', `Open gift ${index + 1}`);

        const box = document.createElement('span');
        box.className = 'gift-box';
        box.setAttribute('aria-hidden', 'true');

        const lid = document.createElement('span');
        lid.className = 'gift-lid';

        const body = document.createElement('span');
        body.className = 'gift-body';

        const ribbonVertical = document.createElement('span');
        ribbonVertical.className = 'gift-ribbon gift-ribbon-vertical';

        const ribbonHorizontal = document.createElement('span');
        ribbonHorizontal.className = 'gift-ribbon gift-ribbon-horizontal';

        const bow = document.createElement('span');
        bow.className = 'gift-bow';

        box.append(lid, body, ribbonVertical, ribbonHorizontal, bow);
        boxButton.appendChild(box);
        boxButton.addEventListener('click', () => openGift(article, index));

        const reveal = document.createElement('div');
        reveal.className = 'gift-reveal';

        const title = document.createElement('h3');
        title.textContent = gift.title;

        const mediaGrid = document.createElement('div');
        mediaGrid.className = 'gift-media-grid';
        mediaGrid.append(
            createPlaceholder('photo-placeholder', 'Photo placeholder'),
            createPlaceholder('video-placeholder', 'Video placeholder'),
            createPlaceholder('voice-placeholder', 'Voice recording placeholder')
        );

        const flower = document.createElement('div');
        flower.className = 'flower-animation';
        flower.setAttribute('aria-hidden', 'true');
        for (let i = 0; i < 8; i += 1) {
            const petal = document.createElement('span');
            petal.className = 'flower-petal';
            flower.appendChild(petal);
        }
        const flowerCenter = document.createElement('span');
        flowerCenter.className = 'flower-center';
        flower.appendChild(flowerCenter);

        const wish = document.createElement('p');
        wish.className = 'gift-wish';
        wish.textContent = gift.wish;

        const cute = document.createElement('div');
        cute.className = 'cute-animation';
        cute.setAttribute('aria-hidden', 'true');
        cute.textContent = '\u2661';

        reveal.append(title, mediaGrid, flower, wish, cute);
        article.append(boxButton, reveal);
        return article;
    };

    const renderSurpriseTwo = () => {
        if (!giftStage || surpriseTwoStarted) return;
        surpriseTwoStarted = true;
        giftStage.innerHTML = '';

        SURPRISE_TWO_GIFTS.forEach((gift, index) => {
            giftStage.appendChild(createGiftElement(gift, index));
        });

        updateGiftProgress();
    };

    const showSurpriseTwo = () => {
        if (!surpriseTwo) return;

        renderSurpriseTwo();
        if (surpriseOne) {
            surpriseOne.classList.remove('is-active');
            surpriseOne.setAttribute('aria-hidden', 'true');
        }
        surpriseTwo.classList.add('is-active');
        surpriseTwo.setAttribute('aria-hidden', 'false');
    };

    const updateStarProgress = () => {
        const collectedCount = collectedStarIndexes.size;
        const totalCount = SURPRISE_THREE_STAR_MESSAGES.length;

        if (starCollectedCountElement) starCollectedCountElement.textContent = String(collectedCount);
        if (starTotalCountElement) starTotalCountElement.textContent = String(totalCount);

        if (nextStarModuleButton && collectedCount === totalCount) {
            nextStarModuleButton.disabled = false;
            nextStarModuleButton.classList.add('is-unlocked');
        }
    };

    const showStarPopup = (message) => {
        if (!starPopup || !starPopupText) return;

        starPopupText.textContent = message;
        starPopup.classList.add('is-active');
        starPopup.setAttribute('aria-hidden', 'false');
    };

    const hideStarPopup = () => {
        if (!starPopup) return;

        starPopup.classList.remove('is-active');
        starPopup.setAttribute('aria-hidden', 'true');
    };

    const collectStar = (starButton, index) => {
        if (!starButton || collectedStarIndexes.has(index)) return;

        collectedStarIndexes.add(index);
        starButton.classList.add('is-collected');
        starButton.disabled = true;
        starButton.setAttribute('aria-label', `Collected star ${index + 1}`);
        showStarPopup(SURPRISE_THREE_STAR_MESSAGES[index]);
        updateStarProgress();
    };

    const createSkyStar = (message, index) => {
        const starButton = document.createElement('button');
        const size = Math.random() * 10 + 12;
        const left = Math.random() * 92 + 4;
        const top = Math.random() * 76 + 12;
        const delay = Math.random() * 3.5;
        const duration = Math.random() * 2.6 + 2.2;

        starButton.className = 'sky-star';
        starButton.type = 'button';
        starButton.setAttribute('aria-label', `Collect star ${index + 1}`);
        starButton.style.setProperty('--star-left', `${left}%`);
        starButton.style.setProperty('--star-top', `${top}%`);
        starButton.style.setProperty('--star-size', `${size}px`);
        starButton.style.setProperty('--star-delay', `${delay}s`);
        starButton.style.setProperty('--star-duration', `${duration}s`);

        const starCore = document.createElement('span');
        starCore.className = 'sky-star-core';
        starCore.setAttribute('aria-hidden', 'true');
        starButton.appendChild(starCore);

        starButton.addEventListener('click', () => collectStar(starButton, index));
        return starButton;
    };

    const renderSurpriseThree = () => {
        if (!starStage || surpriseThreeStarted) return;
        surpriseThreeStarted = true;
        starStage.innerHTML = '';

        SURPRISE_THREE_STAR_MESSAGES.forEach((message, index) => {
            starStage.appendChild(createSkyStar(message, index));
        });

        updateStarProgress();
    };

    const showSurpriseThree = () => {
        if (!surpriseThree) return;

        renderSurpriseThree();
        if (surpriseTwo) {
            surpriseTwo.classList.remove('is-active');
            surpriseTwo.setAttribute('aria-hidden', 'true');
        }
        surpriseThree.classList.add('is-active');
        surpriseThree.setAttribute('aria-hidden', 'false');
    };

    const switchToCelebrationMode = () => {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }

        updateCountdownValue('days', 0);
        updateCountdownValue('hours', 0);
        updateCountdownValue('minutes', 0);
        updateCountdownValue('seconds', 0);

        if (countdownModule) countdownModule.classList.add('is-celebrating');
        if (countdownContent) countdownContent.setAttribute('aria-hidden', 'true');
        if (celebrationContent) celebrationContent.setAttribute('aria-hidden', 'false');
        startCelebrationEffects();
    };

    const tickCountdown = () => {
        if (!Number.isFinite(birthdayTime)) {
            switchToCelebrationMode();
            return;
        }

        const difference = birthdayTime - Date.now();

        if (difference <= 0) {
            switchToCelebrationMode();
            return;
        }

        const totalSeconds = Math.floor(difference / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        updateCountdownValue('days', days);
        updateCountdownValue('hours', hours);
        updateCountdownValue('minutes', minutes);
        updateCountdownValue('seconds', seconds);
    };

    const startCountdownModule = () => {
        if (countdownStarted) return;
        countdownStarted = true;

        if (countdownModule) countdownModule.classList.remove('is-celebrating');
        if (countdownContent) countdownContent.setAttribute('aria-hidden', 'false');
        if (celebrationContent) celebrationContent.setAttribute('aria-hidden', 'true');

        tickCountdown();

        if (birthdayTime > Date.now()) {
            countdownInterval = setInterval(tickCountdown, 1000);
        }
    };

    const startJourney = () => {
        if (!button || !landingPage || !loadingScreen || !nextSection) return;
        if (button.disabled) return;

        button.disabled = true;
        button.classList.add('is-clicked');
        landingPage.classList.add('is-hidden');

        setTimeout(() => {
            loadingScreen.classList.add('is-active');
            loadingScreen.setAttribute('aria-hidden', 'false');
            nextSection.setAttribute('aria-hidden', 'true');

            if (loadingBar) loadingBar.setAttribute('aria-valuenow', '0');
            if (loadingProgress) {
                loadingProgress.style.animation = 'none';
                loadingProgress.offsetHeight;
                loadingProgress.style.animation = '';
            }
        }, 420);

        setTimeout(() => {
            if (loadingBar) loadingBar.setAttribute('aria-valuenow', '100');
            loadingScreen.classList.add('is-leaving');
        }, 4420);

        setTimeout(() => {
            loadingScreen.classList.remove('is-active', 'is-leaving');
            loadingScreen.setAttribute('aria-hidden', 'true');
            nextSection.classList.add('is-active');
            nextSection.setAttribute('aria-hidden', 'false');
            startCountdownModule();
        }, 5120);
    };

    if (button) {
        button.addEventListener('click', startJourney);
    }

    if (surpriseEntryButton) {
        surpriseEntryButton.addEventListener('click', showSurpriseOne);
    }

    if (nextSurpriseButton) {
        nextSurpriseButton.addEventListener('click', () => {
            if (nextSurpriseButton.disabled) return;
            showSurpriseTwo();
        });
    }

    if (nextModuleButton) {
        nextModuleButton.addEventListener('click', () => {
            if (nextModuleButton.disabled) return;
            showSurpriseThree();
        });
    }

    if (starPopupClose) {
        starPopupClose.addEventListener('click', hideStarPopup);
    }

    if (starPopup) {
        starPopup.addEventListener('click', (event) => {
            if (event.target === starPopup) hideStarPopup();
        });
    }

    window.addEventListener('resize', resizeCelebrationCanvas, { passive: true });
});
