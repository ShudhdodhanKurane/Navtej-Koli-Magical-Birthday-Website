/* ============================================================
   Navtej Birthday Website — All Interactive Features
   ============================================================ */

(function () {
    'use strict';

    /* ===========================================
       1. WELCOME SCREEN — Typewriter + Enter
    =========================================== */
    const welcomeScreen = document.getElementById('welcome-screen');
    const enterBtn = document.getElementById('enter-btn');
    const welcomeName = document.getElementById('welcome-name');
    const fullName = 'Navtej Koli ✨';

    // Typewriter effect
    let charIdx = 0;
    function typeWriter() {
        if (charIdx < fullName.length) {
            welcomeName.textContent += fullName.charAt(charIdx);
            charIdx++;
            setTimeout(typeWriter, 120);
        }
    }
    setTimeout(typeWriter, 800);

    // Enter button
    enterBtn.addEventListener('click', function () {
        welcomeScreen.classList.add('hidden');
        document.body.style.overflow = '';
        startParticles();
        startFloatingHearts();
    });

    // Prevent scrolling while welcome is visible
    document.body.style.overflow = 'hidden';

    /* ===========================================
       2. STAR PARTICLES (Canvas)
    =========================================== */
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrameId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createParticles() {
        particles = [];
        const count = Math.min(Math.floor(window.innerWidth * 0.15), 200);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2.5 + 0.5,
                speedY: Math.random() * 0.3 + 0.05,
                speedX: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.7 + 0.3,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinklePhase: Math.random() * Math.PI * 2
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
            p.twinklePhase += p.twinkleSpeed;
            const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.twinklePhase));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();

            // Subtle glow
            if (p.size > 1.5) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(162, 155, 254, ${alpha * 0.15})`;
                ctx.fill();
            }

            p.y -= p.speedY;
            p.x += p.speedX;
            if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;
        }
        animFrameId = requestAnimationFrame(drawParticles);
    }

    function startParticles() {
        createParticles();
        drawParticles();
    }

    /* ===========================================
       3. FLOATING HEARTS
    =========================================== */
    const heartsContainer = document.getElementById('floating-hearts');
    const heartEmojis = ['💖', '💗', '💝', '💕', '❤️', '💜', '🤍', '✨'];
    let heartsInterval;

    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
        heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }

    function startFloatingHearts() {
        heartsInterval = setInterval(createHeart, 1200);
    }

    /* ===========================================
       4. BIRTHDAY COUNTDOWN
    =========================================== */
    const countDays = document.getElementById('count-days');
    const countHours = document.getElementById('count-hours');
    const countMinutes = document.getElementById('count-minutes');
    const countSeconds = document.getElementById('count-seconds');
    const countdownMsg = document.getElementById('countdown-message');
    const birthdayAge = document.getElementById('birthday-age');
    const ageText = document.getElementById('age-text');
    const aboutAge = document.getElementById('about-age');

    const birthYear = 2010;
    const birthMonth = 10; // October (1-indexed)
    const birthDay = 21;

    function getNextBirthday() {
        const now = new Date();
        let year = now.getFullYear();
        let bday = new Date(year, birthMonth - 1, birthDay, 0, 0, 0);
        // If birthday already passed this year, target next year
        if (now > bday) {
            // Check if today IS the birthday
            if (now.getDate() === birthDay && now.getMonth() === birthMonth - 1) {
                return { date: bday, isToday: true };
            }
            bday = new Date(year + 1, birthMonth - 1, birthDay, 0, 0, 0);
        }
        return { date: bday, isToday: false };
    }

    function calculateAge() {
        const now = new Date();
        let age = now.getFullYear() - birthYear;
        const monthDiff = now.getMonth() - (birthMonth - 1);
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDay)) {
            age--;
        }
        return age;
    }

    function getOrdinal(n) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    function updateCountdown() {
        const { date: target, isToday } = getNextBirthday();
        const now = new Date();
        const age = calculateAge();

        // Update age displays
        const ordinalAge = getOrdinal(age);
        if (birthdayAge) birthdayAge.textContent = ordinalAge;
        if (ageText) ageText.textContent = age;
        if (aboutAge) aboutAge.textContent = age;

        if (isToday) {
            countDays.textContent = '🎂';
            countHours.textContent = '🎉';
            countMinutes.textContent = '🥳';
            countSeconds.textContent = '🎊';
            countdownMsg.textContent = '🎂 TODAY IS THE DAY! HAPPY BIRTHDAY NAVTEJ! 🎂';
            countdownMsg.style.color = '#ffeaa7';
            countdownMsg.style.fontSize = '1.3rem';
            return;
        }

        const diff = target - now;
        if (diff <= 0) {
            // Birthday moment reached!
            countDays.textContent = '🎂';
            countHours.textContent = '🎉';
            countMinutes.textContent = '🥳';
            countSeconds.textContent = '🎊';
            countdownMsg.textContent = '🎂 HAPPY BIRTHDAY NAVTEJ! 🎂';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countDays.textContent = String(days).padStart(2, '0');
        countHours.textContent = String(hours).padStart(2, '0');
        countMinutes.textContent = String(minutes).padStart(2, '0');
        countSeconds.textContent = String(seconds).padStart(2, '0');

        if (days === 0 && hours === 0) {
            countdownMsg.textContent = '🔥 Just minutes away! The magic is about to begin! 🔥';
        } else if (days === 0) {
            countdownMsg.textContent = '✨ TODAY! Just a few hours until the birthday! ✨';
        } else if (days === 1) {
            countdownMsg.textContent = '🌟 TOMORROW is the big day! Get ready! 🌟';
        } else {
            countdownMsg.textContent = '✨ The most magical day is almost here… ✨';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ===========================================
       5. SCROLL ANIMATIONS (Intersection Observer)
    =========================================== */
    function setupScrollAnimations() {
        const sections = document.querySelectorAll('.section-padding');
        const timelineItems = document.querySelectorAll('.timeline-item');

        const sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        sections.forEach(function (s) { sectionObserver.observe(s); });

        const timelineObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(function (item) { timelineObserver.observe(item); });
    }
    setupScrollAnimations();

    /* ===========================================
       6. BIRTHDAY CAKE — Blow & Relight
    =========================================== */
    const blowBtn = document.getElementById('blow-btn');
    const relightBtn = document.getElementById('relight-btn');
    const cakeMessage = document.getElementById('cake-message');
    const flames = document.querySelectorAll('.flame');

    blowBtn.addEventListener('click', function () {
        flames.forEach(function (flame, i) {
            setTimeout(function () {
                flame.classList.add('blown');
            }, i * 150);
        });
        blowBtn.style.display = 'none';
        relightBtn.style.display = 'inline-flex';
        cakeMessage.textContent = '🎉 You made a wish! May all your dreams come true, Navtej! 🎉';

        // Trigger mini confetti
        triggerConfetti(80);
    });

    relightBtn.addEventListener('click', function () {
        flames.forEach(function (flame) {
            flame.classList.remove('blown');
        });
        relightBtn.style.display = 'none';
        blowBtn.style.display = 'inline-flex';
        cakeMessage.textContent = '';
    });

    /* ===========================================
       7. WISH UPON A STAR
    =========================================== */
    const wishInput = document.getElementById('wish-input');
    const wishBtn = document.getElementById('wish-btn');
    const wishSky = document.getElementById('wish-sky');
    let wishCount = 0;

    wishBtn.addEventListener('click', sendWish);
    wishInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') sendWish();
    });

    function sendWish() {
        const text = wishInput.value.trim();
        if (!text) {
            wishInput.focus();
            return;
        }
        // Remove hint
        const hint = wishSky.querySelector('.wish-sky-hint');
        if (hint) hint.remove();

        const starItem = document.createElement('div');
        starItem.className = 'wish-star-item';
        starItem.textContent = '⭐ ' + text;
        wishSky.appendChild(starItem);

        wishInput.value = '';
        wishInput.focus();
        wishCount++;
    }

    /* ===========================================
       8. MEMORY MATCH GAME
    =========================================== */
    const gameBoard = document.getElementById('game-board');
    const gameMoves = document.getElementById('game-moves');
    const gameScore = document.getElementById('game-score');
    const gameBest = document.getElementById('game-best');
    const restartBtn = document.getElementById('restart-btn');
    const gameMessage = document.getElementById('game-message');

    const gameEmojis = ['🎂', '🎁', '🎈', '🎉', '🌟', '💖', '🎵', '🎊'];
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let gameActive = true;
    let bestScore = localStorage.getItem('navtej_best_score') || null;

    if (bestScore) gameBest.textContent = bestScore;

    function shuffleArray(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function createGame() {
        gameBoard.innerHTML = '';
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        gameActive = true;
        gameMoves.textContent = '0';
        gameScore.textContent = '0';
        gameMessage.textContent = '';

        const deck = shuffleArray([...gameEmojis, ...gameEmojis]);

        deck.forEach(function (emoji, index) {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.setAttribute('role', 'gridcell');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', 'Card ' + (index + 1));
            card.dataset.emoji = emoji;

            const face = document.createElement('span');
            face.className = 'card-face';
            face.textContent = emoji;

            const back = document.createElement('span');
            back.className = 'card-back';
            back.textContent = '❓';

            card.appendChild(face);
            card.appendChild(back);

            card.addEventListener('click', function () { flipCard(card); });
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    flipCard(card);
                }
            });

            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    function flipCard(card) {
        if (!gameActive) return;
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        if (flippedCards.length >= 2) return;

        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            gameMoves.textContent = moves;
            gameActive = false;

            const [c1, c2] = flippedCards;
            if (c1.dataset.emoji === c2.dataset.emoji) {
                // Match!
                setTimeout(function () {
                    c1.classList.add('matched');
                    c2.classList.add('matched');
                    matchedPairs++;
                    gameScore.textContent = matchedPairs;
                    flippedCards = [];
                    gameActive = true;

                    if (matchedPairs === gameEmojis.length) {
                        gameMessage.textContent = '🎉 Amazing! You matched all pairs in ' + moves + ' moves!';
                        if (!bestScore || moves < parseInt(bestScore)) {
                            bestScore = moves;
                            localStorage.setItem('navtej_best_score', moves);
                            gameBest.textContent = moves;
                            gameMessage.textContent += ' 🏆 NEW BEST!';
                        }
                        triggerConfetti(60);
                    }
                }, 400);
            } else {
                // No match
                setTimeout(function () {
                    c1.classList.remove('flipped');
                    c2.classList.remove('flipped');
                    flippedCards = [];
                    gameActive = true;
                }, 900);
            }
        }
    }

    restartBtn.addEventListener('click', createGame);
    createGame();

    /* ===========================================
       9. SURPRISE GIFT REVEAL
    =========================================== */
    const giftBox = document.getElementById('gift-box');
    const openGiftBtn = document.getElementById('open-gift-btn');
    const giftMessage = document.getElementById('gift-message');
    let giftOpened = false;

    function openGift() {
        if (giftOpened) return;
        giftOpened = true;
        giftBox.classList.add('opened');
        openGiftBtn.style.display = 'none';

        setTimeout(function () {
            giftMessage.classList.add('show');
            triggerConfetti(150);
        }, 600);
    }

    openGiftBtn.addEventListener('click', openGift);
    giftBox.addEventListener('click', openGift);
    giftBox.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGift(); }
    });

    /* ===========================================
       10. CONFETTI SYSTEM
    =========================================== */
    const confettiCanvas = document.getElementById('confetti-canvas');
    const confettiCtx = confettiCanvas.getContext('2d');
    let confettiPieces = [];
    let confettiAnimId;

    function resizeConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    resizeConfetti();
    window.addEventListener('resize', resizeConfetti);

    function triggerConfetti(count) {
        count = count || 100;
        for (let i = 0; i < count; i++) {
            confettiPieces.push({
                x: Math.random() * confettiCanvas.width,
                y: -10 - Math.random() * 50,
                w: Math.random() * 10 + 4,
                h: Math.random() * 6 + 2,
                color: ['#fd79a8', '#6c5ce7', '#ffeaa7', '#00b894', '#e17055', '#a29bfe', '#ff9f43', '#55efc4'][Math.floor(Math.random() * 8)],
                speedY: Math.random() * 3 + 2,
                speedX: (Math.random() - 0.5) * 4,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                opacity: 1
            });
        }
        if (!confettiAnimId) animateConfetti();
    }

    function animateConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        for (let i = confettiPieces.length - 1; i >= 0; i--) {
            const p = confettiPieces[i];
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotSpeed;
            p.speedY += 0.05; // gravity
            p.opacity -= 0.003;

            if (p.y > confettiCanvas.height + 20 || p.opacity <= 0) {
                confettiPieces.splice(i, 1);
                continue;
            }

            confettiCtx.save();
            confettiCtx.translate(p.x, p.y);
            confettiCtx.rotate((p.rotation * Math.PI) / 180);
            confettiCtx.globalAlpha = Math.max(0, p.opacity);
            confettiCtx.fillStyle = p.color;
            confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            confettiCtx.restore();
        }

        if (confettiPieces.length > 0) {
            confettiAnimId = requestAnimationFrame(animateConfetti);
        } else {
            confettiAnimId = null;
        }
    }

    /* ===========================================
       11. BROTHERHOOD QUOTES CAROUSEL
    =========================================== */
    const quoteCards = document.querySelectorAll('.quote-card');
    const quotePrev = document.getElementById('quote-prev');
    const quoteNext = document.getElementById('quote-next');
    const quoteDots = document.getElementById('quote-dots');
    let currentQuote = 0;
    let quoteAutoInterval;

    // Create dots
    quoteCards.forEach(function (_, i) {
        const dot = document.createElement('span');
        dot.className = 'quote-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', function () { goToQuote(i); });
        quoteDots.appendChild(dot);
    });

    function goToQuote(idx) {
        quoteCards[currentQuote].classList.remove('active');
        quoteDots.children[currentQuote].classList.remove('active');
        currentQuote = (idx + quoteCards.length) % quoteCards.length;
        quoteCards[currentQuote].classList.add('active');
        quoteDots.children[currentQuote].classList.add('active');
    }

    quotePrev.addEventListener('click', function () {
        goToQuote(currentQuote - 1);
        resetAutoQuote();
    });

    quoteNext.addEventListener('click', function () {
        goToQuote(currentQuote + 1);
        resetAutoQuote();
    });

    function resetAutoQuote() {
        clearInterval(quoteAutoInterval);
        quoteAutoInterval = setInterval(function () {
            goToQuote(currentQuote + 1);
        }, 5000);
    }
    resetAutoQuote();

    /* ===========================================
       12. BIRTHDAY WISHES WALL (localStorage)
    =========================================== */
    const wallName = document.getElementById('wall-name');
    const wallMessage = document.getElementById('wall-message');
    const postWishBtn = document.getElementById('post-wish-btn');
    const wishesWall = document.getElementById('wishes-wall');
    const WALL_KEY = 'navtej_birthday_wishes';

    function getWishes() {
        try {
            return JSON.parse(localStorage.getItem(WALL_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveWish(wish) {
        const wishes = getWishes();
        wishes.unshift(wish);
        localStorage.setItem(WALL_KEY, JSON.stringify(wishes));
    }

    function renderWishes() {
        const wishes = getWishes();
        wishesWall.innerHTML = '';
        if (wishes.length === 0) {
            wishesWall.innerHTML = '<p style="color:var(--text-muted);text-align:center;grid-column:1/-1;font-style:italic;">No wishes yet — be the first! 💌</p>';
            return;
        }
        wishes.forEach(function (w) {
            const card = document.createElement('div');
            card.className = 'wall-wish-card';
            card.innerHTML =
                '<p class="wish-author">💝 ' + escapeHtml(w.name) + '</p>' +
                '<p class="wish-text">' + escapeHtml(w.message) + '</p>' +
                '<p class="wish-time">' + w.time + '</p>';
            wishesWall.appendChild(card);
        });
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    postWishBtn.addEventListener('click', function () {
        const name = wallName.value.trim() || 'Anonymous';
        const message = wallMessage.value.trim();
        if (!message) {
            wallMessage.focus();
            return;
        }
        const wish = {
            name: name,
            message: message,
            time: new Date().toLocaleString()
        };
        saveWish(wish);
        renderWishes();
        wallName.value = '';
        wallMessage.value = '';
        triggerConfetti(30);
    });

    renderWishes();

    /* ===========================================
       13. MUSIC TOGGLE
    =========================================== */
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', function () {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<i class="bi bi-music-note-beamed"></i>';
            musicBtn.title = 'Play Music';
        } else {
            bgMusic.play().then(function () {
                isPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
                musicBtn.title = 'Pause Music';
            }).catch(function () {
                // Audio play blocked by browser
                musicBtn.innerHTML = '<i class="bi bi-music-note-beamed"></i>';
            });
        }
    });

    /* ===========================================
       14. BACK TO TOP
    =========================================== */
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 600) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ===========================================
       15. PHOTO GALLERY LIGHTBOX
    =========================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const img = item.querySelector('img');
            const placeholder = item.querySelector('.gallery-placeholder');
            const caption = item.dataset.caption || '';

            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = caption;
            } else if (placeholder) {
                // For placeholder — show a gradient preview
                lightboxImg.src = '';
                lightboxImg.alt = 'Photo placeholder — replace with your real photo!';
            }
            lightboxCaption.textContent = caption || 'Replace this placeholder with a real photo!';
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    /* ===========================================
       16. SMOOTH SCROLL for Anchor Links
    =========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

})();
