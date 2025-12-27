const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTH9gq6ptkqryPgtuhemcssiajxyx1NTU_8t1neQsvNFgGP8o7vj1JFQWK8C4Vs3XE-x5-eZql-pPep/pub?output=csv";
const localExperiments = [];
const experiments = [];
let container, filterSubject, filterGrade, searchInput, modal, modalBody, closeModal;
let viewDiscovery, viewUpload, viewTools;
let btnHome, btnTools, btnUpload, btnLogo, btnInspire;
let btnDownloadPdf, btnAddFavorites, formUpload;
let btnStart, btnStop, btnReset, stopwatchDisplay;
let btnThemeToggle, profileModal, btnProfile, btnSaveProfile, profileNameInput;
let timerInterval;
let startTime;
let elapsed = 0;
let recognition;
let countDownMode = false;
function init() {
    console.log("MINT-App: Initialisiere DOM Elemente...");
    container = document.getElementById('experiments-container');
    filterSubject = document.getElementById('filter-subject');
    filterGrade = document.getElementById('filter-grade');
    searchInput = document.getElementById('search-input');

    modal = document.getElementById('detail-modal');
    modalBody = document.getElementById('modal-body');
    closeModal = document.querySelector('#detail-modal .close-modal');

    viewDiscovery = document.getElementById('view-discovery');
    viewUpload = document.getElementById('view-upload');
    viewTools = document.getElementById('view-tools');

    btnHome = document.getElementById('btn-home');
    btnTools = document.getElementById('btn-tools');
    btnUpload = document.getElementById('btn-upload');
    btnLogo = document.getElementById('btn-logo');
    btnInspire = document.getElementById('btn-inspire');

    btnThemeToggle = document.getElementById('btn-theme-toggle');
    profileModal = document.getElementById('profile-modal');
    btnProfile = document.getElementById('btn-profile');
    btnSaveProfile = document.getElementById('save-profile');
    profileNameInput = document.getElementById('profile-name');

    // These are local to init mostly
    const pwaBanner = document.getElementById('pwa-banner');
    const btnPwaClose = document.getElementById('btn-pwa-close');
    const btnPwaHelp = document.getElementById('btn-pwa-help');
    const btnShowHelp = document.getElementById('btn-show-help');
    const helpModal = document.getElementById('help-modal');
    const closeHelp = document.getElementById('close-help');

    // 2. State & Initial Render
    loadFavorites();
    loadProfile();
    loadTheme();
    renderExperiments(experiments);

    // 3. Event Listeners (Safe implementation)
    const safeAddListener = (el, event, handler) => {
        if (el) el.addEventListener(event, handler);
        else console.warn("Element missing for listener:", event);
    };

    if (pwaBanner && !localStorage.getItem('pwa-banner-dismissed')) {
        pwaBanner.style.display = 'block';
    }

    safeAddListener(btnPwaClose, 'click', () => {
        pwaBanner.style.display = 'none';
        localStorage.setItem('pwa-banner-dismissed', 'true');
    });

    safeAddListener(btnPwaHelp, 'click', () => {
        if (helpModal) helpModal.classList.add('active');
    });

    safeAddListener(btnShowHelp, 'click', () => {
        if (helpModal) helpModal.classList.add('active');
    });

    safeAddListener(closeHelp, 'click', () => {
        if (helpModal) helpModal.classList.remove('active');
    });

    // Close buttons for other modals
    safeAddListener(document.getElementById('close-profile'), 'click', () => {
        if (profileModal) profileModal.classList.remove('active');
    });

    safeAddListener(closeModal, 'click', () => {
        if (modal) modal.classList.remove('active');
    });

    // Lightbox open/close helpers
    window.openLightbox = function(url) {
        try {
            const lb = document.getElementById('lightbox');
            const lbImg = document.getElementById('lightbox-img');
            const lbOpen = document.getElementById('lightbox-open-tab');
            lbImg.src = url;
            lbOpen.href = url;
            lb.setAttribute('aria-hidden', 'false');
            lb.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        } catch (err) { console.warn('Lightbox error', err); window.open(url, '_blank'); }
    }

    window.closeLightbox = function() {
        const lb = document.getElementById('lightbox');
        if (!lb) return;
        document.getElementById('lightbox-img').src = '';
        lb.setAttribute('aria-hidden', 'true');
        lb.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Navigation
    safeAddListener(btnHome, 'click', () => switchView('discovery'));
    safeAddListener(btnLogo, 'click', () => switchView('discovery'));
    safeAddListener(btnTools, 'click', () => switchView('tools'));
    safeAddListener(btnUpload, 'click', () => switchView('upload'));

    safeAddListener(btnInspire, 'click', () => {
        const randomExp = experiments[Math.floor(Math.random() * experiments.length)];
        openModal(randomExp);
    });

    // Global Modal Close (Consolidated)
    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) modal.classList.remove('active');
        if (profileModal && e.target === profileModal) profileModal.classList.remove('active');
        if (helpModal && e.target === helpModal) helpModal.classList.remove('active');

        // Click outside image in lightbox closes it
        const lb = document.getElementById('lightbox');
        if (lb && e.target === lb) closeLightbox();
    });

    // Lightbox close button
    safeAddListener(document, 'click', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('lightbox-close')) closeLightbox();
    });

    // Keyboard ESC closes lightbox
    safeAddListener(document, 'keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // Sub-Handlers
    safeAddListener(filterSubject, 'change', filterExperiments);
    safeAddListener(filterGrade, 'change', filterExperiments);
    safeAddListener(searchInput, 'input', filterExperiments);

    safeAddListener(document.getElementById('btn-cancel-upload'), 'click', () => switchView('discovery'));
    safeAddListener(document.getElementById('btn-add-favorites'), 'click', toggleFavorite);

    safeAddListener(document.getElementById('btn-download-pdf'), 'click', () => {
        alert("Dies ist eine Demo.\nIn der Vollversion würde hier ein PDF erstellt.");
        window.print();
    });

    const formBtn = document.getElementById('btn-open-form');
    safeAddListener(formBtn, 'click', () => {
        const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdhTwZrjMyORTLlA0UGaeZLdJDnCTz0E5wsLT1NJCY1iVOSTA/viewform";
        if (formUrl === "https://docs.google.com/forms/") {
            alert("Bitte fügen Sie erst Ihren Google Forms Link in script.js ein!");
        } else {
            window.open(formUrl, '_blank');
        }
    });

    // Tools Handlers
    safeAddListener(document.getElementById('btn-start'), 'click', startTimer);
    safeAddListener(document.getElementById('btn-stop'), 'click', stopTimer);
    safeAddListener(document.getElementById('btn-reset'), 'click', resetTimer);

    document.querySelectorAll('.btn-preset').forEach(btn => {
        btn.addEventListener('click', () => {
            resetTimer();
            elapsed = parseInt(btn.dataset.time) * 1000;
            updateTimerDisplay();
        });
    });

    safeAddListener(document.getElementById('btn-convert'), 'click', convertUnits);
    setupVoiceControl();

    safeAddListener(btnThemeToggle, 'click', toggleTheme);
    safeAddListener(btnProfile, 'click', () => {
        if (profileModal) profileModal.classList.add('active');
    });
    safeAddListener(btnSaveProfile, 'click', saveProfile);
}

/* Rendering */
function renderExperiments(data) {
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<p class="no-results">Keine Experimente gefunden.</p>';
        return;
    }

    const favorites = getFavorites();

    data.forEach(exp => {
        const isFav = favorites.includes(exp.id);
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openModal(exp);

        let safetyHtml = '';
        if (exp.safety) {
            safetyHtml = `<span class="tag danger">⚠️ ${exp.safety}</span>`;
        }

        const isVideo = exp.image && (exp.image.includes('youtube.com') || exp.image.includes('youtu.be') || exp.image.endsWith('.mp4'));

        card.innerHTML = `
            <div class="card-image" style="background-image: url('${getDirectMediaUrl(exp.image)}')">
                ${isFav ? '<div class="fav-icon">❤️</div>' : ''}
                ${isVideo ? '<div class="video-indicator">▶️</div>' : ''}
            </div>
            <div class="card-content">
                <div class="tags">
                    <span class="tag">${exp.subject}</span>
                    <span class="tag grade">Kl. ${exp.grade}</span>
                    ${safetyHtml}
                </div>
                <h3>${exp.title}</h3>
                <div class="card-meta">
                    <span>⏱ ${exp.duration}</span>
                    <span>Mehr Details →</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

let currentExpId = null;

function openModal(exp) {
    currentExpId = exp.id;
    const favorites = getFavorites();
    const isFav = favorites.includes(exp.id);

    const favBtn = document.getElementById('btn-add-favorites');
    favBtn.textContent = isFav ? "💔 Entfernen" : "❤️ Merken";

    const materialsHtml = exp.materials.map(m => `<li>${m}</li>`).join('');

    // Interactive Checklists
    const stepsHtml = exp.steps.map((s, i) => `
        <div style="margin-bottom:0.7rem; display: flex; gap: 0.8rem; align-items: flex-start;">
            <input type="checkbox" id="step-${i}" style="margin-top: 6px; transform: scale(1.2); cursor: pointer;">
            <label for="step-${i}" style="cursor: pointer;"><strong>${i + 1}.</strong> ${s}</label>
        </div>
    `).join('');

    const directImg = exp.image ? getDirectMediaUrl(exp.image) : '';
    const imageHtml = exp.image ? `
        <div class="image-wrapper" style="position:relative;">
            <img src="${directImg}" alt="Media" id="modal-img" style="width:100%; border-radius:12px; margin-bottom:1rem; object-fit: cover; max-height: 400px; cursor: zoom-in;" 
                onclick="openLightbox('${directImg || exp.image}')"
                onerror="this.style.display='none'; document.getElementById('img-error').style.display='block';">
            <div id="img-error" style="display:none; background: #334155; padding: 2rem; border-radius: 12px; text-align: center; margin-bottom: 1rem;">
                <p style="margin-bottom: 1rem;">🖼️ Bild kann nicht geladen werden.<br><small>(Häufig bei Safari/Mac oder Privat-Modus)</small></p>
                <button class="btn-primary" onclick="openLightbox('${directImg || exp.image}')">Bild öffnen ↗</button>
                <a href="${exp.image}" target="_blank" class="tag" style="background: var(--primary); text-decoration: none; display: inline-block; margin-left:0.5rem;">Original prüfen ↗</a>
            </div>
        </div>
    ` : '';

    const videoHtml = getMediaHtml(exp.video);

    modalBody.innerHTML = `
        <div class="detail-media">
            ${videoHtml}
            ${imageHtml}
        </div>
        <div class="detail-header">
            <div class="tags" style="margin-bottom:1rem">
                <span class="tag">${exp.subject}</span>
                <span class="tag grade">Klasse ${exp.grade}</span>
                <span class="tag danger">${exp.danger}</span>
            </div>
            <h2 class="detail-title">${exp.title}</h2>
            <p style="color:var(--text-muted); font-size:1.1rem">${exp.description}</p>
        </div>
        <div class="detail-section">
            <h3>🔬 Materialien</h3>
            <ul class="materials-list">
                ${materialsHtml}
            </ul>
        </div>

        <div class="detail-section">
            <h3>📝 Durchführung</h3>
            <div style="color:var(--text-main); line-height:1.8">
                ${stepsHtml}
            </div>
        </div>
    `;
    modal.classList.add('active');
}

/* Media Helpers */
function getDirectMediaUrl(url) {
    if (!url || typeof url !== 'string') return 'https://via.placeholder.com/600x400?text=Kein+Bild';

    // Handle multiple URLs (take the first one)
    const firstUrl = url.split(',')[0].trim();

    // Google Drive: Convert share link to direct link
    if (firstUrl.includes('drive.google.com')) {
        const idMatch = firstUrl.match(/\/d\/([a-zA-Z0-9_-]{25,})/) || firstUrl.match(/id=([a-zA-Z0-9_-]{25,})/);
        if (idMatch) {
            // Using the /thumbnail endpoint which is much more reliable in Safari/Mobile
            const finalUrl = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
            console.log("MINT-App Drive-Info: Bild-ID erkannt:", idMatch[1]);
            return finalUrl;
        }
    }

    // YouTube Thumbnail
    if (firstUrl.includes('youtube.com') || firstUrl.includes('youtu.be')) {
        const idMatch = firstUrl.match(/(?:v=|\/|be\/)([^&?/ ]+)/);
        if (idMatch) return `https://img.youtube.com/vi/${idMatch[1]}/maxresdefault.jpg`;
    }

    return firstUrl;
}

function getMediaHtml(url) {
    if (!url || typeof url !== 'string') return '';

    // Split for multiple URLs
    const firstUrl = url.split(',')[0].trim();

    // YouTube Embed
    if (firstUrl.includes('youtube.com') || firstUrl.includes('youtu.be')) {
        const idMatch = firstUrl.match(/(?:v=|\/|be\/)([^&?/ ]+)/);
        if (idMatch) {
            return `<div class="video-container"><iframe src="https://www.youtube.com/embed/${idMatch[1]}" frameborder="0" allowfullscreen></iframe></div>`;
        }
    }

    // Direct Video (mp4, etc)
    const lowerUrl = firstUrl.toLowerCase();
    if (lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.mov') || lowerUrl.endsWith('.webm')) {
        return `<video controls style="width:100%; border-radius:12px; margin-bottom:1rem;"><source src="${firstUrl}" type="video/mp4"></video>`;
    }

    // Google Drive Video detection
    if (firstUrl.includes('drive.google.com')) {
        const idMatch = firstUrl.match(/\/d\/([a-zA-Z0-9_-]{25,})/) || firstUrl.match(/id=([a-zA-Z0-9_-]{25,})/);
        // If it looks like a video link or explicitly contains viewing keywords
        if (idMatch && (lowerUrl.includes('video') || lowerUrl.includes('mov') || lowerUrl.includes('mp4') || lowerUrl.includes('preview'))) {
            return `<div class="video-container"><iframe src="https://drive.google.com/file/d/${idMatch[1]}/preview" frameborder="0" allowfullscreen></iframe></div>`;
        }
    }

    // Fallback to Image (only if it looks like a link)
    if (firstUrl.startsWith('http')) {
        return `<img src="${getDirectMediaUrl(firstUrl)}" alt="Media" style="width:100%; border-radius:12px; margin-bottom:1rem; object-fit: cover; max-height: 400px;" onerror="this.style.display='none'">`;
    }

    return '';
}

/* Filtering */
function filterExperiments() {
    const subject = filterSubject.value;
    const grade = filterGrade.value;
    const query = searchInput.value.toLowerCase();

    const filtered = experiments.filter(exp => {
        const matchSubject = subject === 'all' || exp.subject === subject;
        const matchGrade = grade === 'all' || exp.grade === grade;
        const matchSearch = exp.title.toLowerCase().includes(query) ||
            exp.description.toLowerCase().includes(query) ||
            exp.subject.toLowerCase().includes(query) ||
            exp.materials && exp.materials.some(m => m.toLowerCase().includes(query)); // Search ingredients too

        return matchSubject && matchGrade && matchSearch;
    });

    // EASTER EGG: Jan
    if (query === 'jan' || query === 'jan h') {
        filtered.unshift({
            id: 999,
            title: "Jans Kaffee-Experiment",
            subject: "Coden",
            grade: "10",
            duration: "∞",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRANyDARzgt1I0rys74T21KunpTEqrvc8b13Q&s", 
            description: "Kaffee ist lecker",
            materials: ["Kaffee", "Zeit", "Code"],
            steps: [
                "Einen Kaffee machen.",
                "Code schreiben.",
            ],
            safety: "⚠️ Vorsicht, heißer Kaffee!",
            danger: "⚠️ Vorsicht, heißer Kaffee!"
        });
        

    renderExperiments(filtered);
}

    if (query === 'david' || query === 'david h') {
        filtered.unshift({
            id: 999,
            title: "Davids Siebträger-Experiment",
            subject: "Barista",
            grade: "9",
            duration: "∞",
            image: "https://img.ccnull.de/1090000/preview/1094003_17b5a157fde2c2d9f3e67b53e68e607c.jpg", // Reuse an image or better one
            description: "Ohne Kaffe läuft hier nichts.",
            materials: ["Kaffee", "Geduld", "Code"],
            steps: [
                "Einen Kaffee machen.",
                "Code schreiben (ohne KI).",
                "Kaffe."
            ],
            safety: "⚠️ Heißer Kaffee!",
            danger: "⚠️ Vorsicht, heißer Kaffee!"
        });
        if (query === 'david' || query === 'david h') {
        }
    }

    renderExperiments(filtered);
}

/* Favorites Logic */
function getFavorites() {
    return JSON.parse(localStorage.getItem('mint_favorites') || '[]');
}

function loadFavorites() {
    // Just ensures setup, actual render happens in renderExperiments
}

function toggleFavorite() {
    if (!currentExpId) return;

    let favorites = getFavorites();
    if (favorites.includes(currentExpId)) {
        favorites = favorites.filter(id => id !== currentExpId);
        document.getElementById('btn-add-favorites').textContent = "❤️ Merken";
    } else {
        favorites.push(currentExpId);
        document.getElementById('btn-add-favorites').textContent = "💔 Entfernen";
    }

    localStorage.setItem('mint_favorites', JSON.stringify(favorites));
    renderExperiments(experiments); // Re-render to show hearts on cards
}

/* Stopwatch Logic */
function startTimer() {
    if (timerInterval) return;
    startTime = Date.now() - elapsed;
    timerInterval = setInterval(updateTimerDisplay, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    elapsed = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const time = timerInterval ? Date.now() - startTime : elapsed;
    elapsed = time;

    const ms = Math.floor((time % 1000) / 10);
    const s = Math.floor((time / 1000) % 60);
    const m = Math.floor((time / (1000 * 60)) % 60);

    const display = document.getElementById('stopwatch-display');
    if (display) {
        display.textContent = `${pad(m)}:${pad(s)}:${pad(ms)}`;
    }
}

function pad(n) {
    return n < 10 ? '0' + n : n;
}

/* Converter Logic */
function convertUnits() {
    const input = parseFloat(document.getElementById('conv-input').value);
    const type = document.getElementById('conv-type').value;
    const outputField = document.getElementById('conv-output');

    if (isNaN(input)) {
        outputField.value = "---";
        return;
    }

    let result = 0;
    switch (type) {
        case 'c-f': result = (input * 9 / 5) + 32; break;
        case 'f-c': result = (input - 32) * 5 / 9; break;
        case 'kg-lbs': result = input * 2.20462; break;
        case 'm-ft': result = input * 3.28084; break;
    }

    outputField.value = result.toFixed(2);
}

/* Navigation */
function switchView(viewName) {
    // Hide all
    viewDiscovery.style.display = 'none';
    viewUpload.style.display = 'none';
    viewTools.style.display = 'none';

    // Reset nav
    btnHome.classList.remove('active');
    btnUpload.classList.remove('active');
    btnTools.classList.remove('active');
    btnHome.removeAttribute('aria-current');
    btnUpload.removeAttribute('aria-current');
    btnTools.removeAttribute('aria-current');

    if (viewName === 'discovery') {
        viewDiscovery.style.display = 'block';
        btnHome.classList.add('active');
        btnHome.setAttribute('aria-current', 'page');
        renderExperiments(experiments); // Re-render to ensure view is correct
    } else if (viewName === 'upload') {
        viewUpload.style.display = 'block';
        btnUpload.classList.add('active');
        btnUpload.setAttribute('aria-current', 'page');
    } else if (viewName === 'tools') {
        viewTools.style.display = 'block';
        btnTools.classList.add('active');
        btnTools.setAttribute('aria-current', 'page');
    }
}

/* User Profile & Theme */
function saveProfile() {
    const name = profileNameInput.value;
    if (name) {
        localStorage.setItem('mint_username', name);
        // Update greeting in future if we had a greeting element
        alert("Profil gespeichert! Hallo, " + name);
        profileModal.classList.remove('active');
    }
}

function loadProfile() {
    const name = localStorage.getItem('mint_username');
    if (name && profileNameInput) {
        profileNameInput.value = name;
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('mint_theme', isLight ? 'light' : 'dark');
    btnThemeToggle.textContent = isLight ? '🌙' : '☀️';
}

function loadTheme() {
    const theme = localStorage.getItem('mint_theme');
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        if (btnThemeToggle) btnThemeToggle.textContent = '🌙';
    } else {
        if (btnThemeToggle) btnThemeToggle.textContent = '☀️';
    }
}


// Start
/* Voice Control Logic */
function setupVoiceControl() {
    let btnVoice;
    try {
        btnVoice = document.getElementById('btn-voice');
        if (!btnVoice) return; // Button missing — nothing to do

        // Check support
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            btnVoice.style.display = 'none'; // Not supported
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'de-DE';
        recognition.continuous = true;
        recognition.interimResults = false;

        let isListening = false;

        recognition.onresult = (event) => {
            // Get the last result
            const lastResultIndex = event.results.length - 1;
            const command = event.results[lastResultIndex][0].transcript.toLowerCase();
            console.log("Voice Command:", command);

            // Visual feedback
            const originalTitle = btnVoice.title;
            btnVoice.title = "Erkannt: " + command;
            setTimeout(() => btnVoice.title = originalTitle, 2000);

            if (command.includes('start') || command.includes('los')) {
                startTimer();
            } else if (command.includes('stopp') || command.includes('halt')) {
                stopTimer();
            } else if (command.includes('zurück') || command.includes('reset')) {
                resetTimer();
            }
            // Note: We don't remove 'listening' class here anymore for continuous mode
        };

        recognition.onend = () => {
            isListening = false;
            btnVoice.classList.remove('listening');
        };

        recognition.onerror = (e) => {
            console.error(e);
            isListening = false;
            btnVoice.classList.remove('listening');

            if (e.error === 'not-allowed') {
                alert("⚠️ Mikrofon-Zugriff verweigert.\n\nSpracherkennung benötigt oft eine sichere HTTPS-Verbindung.");
            } else if (e.error === 'network') {
                alert("⚠️ Netzwerk/Sicherheits-Fehler.\n\nSpracherkennung benötigt oft eine sichere HTTPS-Verbindung.");
            }
        };

        btnVoice.addEventListener('click', () => {
            try {
                if (!isListening) {
                    recognition.start();
                    isListening = true;
                    btnVoice.classList.add('listening');
                } else {
                    recognition.stop();
                    isListening = false;
                    btnVoice.classList.remove('listening');
                }
            } catch (e) {
                console.log(e);
            }
        });
    } catch (e) {
        console.warn('Voice control init error', e);
        if (btnVoice) btnVoice.style.display = 'none';
    }
}    

// Start
document.addEventListener('DOMContentLoaded', () => {
    console.log("MINT-App Version: 2.1 (Cache-Bypass)");
    try {
        init();
        fetchExperiments(); // Load from Cloud
    } catch (e) {
        alert("Fehler beim Starten der App: " + e.message);
        console.error(e);
    }
});

/* Google Sheets CSV Logic */
function fetchExperiments() {
    if (!SHEET_URL || SHEET_URL.includes("docs.google.com/spreadsheets/d/e/2PACX...")) {
        console.warn("No Sheet URL set, using local data.");
        return;
    }

    fetch(SHEET_URL)
        .then(response => response.text())
        .then(csvText => {
            const cloudExperiments = parseCSV(csvText);
            if (cloudExperiments.length > 0) {
                experiments = cloudExperiments; // Overwrite local
                renderExperiments(experiments);
                console.log("Loaded " + experiments.length + " experiments from Cloud!");
            }
        })
        .catch(err => {
            console.error("Cloud Fetch Error (using fallback):", err);
            // Fallback remains active
        });
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    // Header Zeile finden - WICHTIG: Korrekte Trennung bei leeren Feldern
    const headers = splitCSVLine(lines[0]).map(h => h.toLowerCase());

    // Spalten-Indizes finden
    const idx = {
        freigabe: headers.findIndex(h => h.includes('freigabe')),
        titel: headers.findIndex(h => h.includes('titel')),
        fach: headers.findIndex(h => h.includes('fach')),
        klasse: headers.findIndex(h => h.includes('klasse')),
        dauer: headers.findIndex(h => h.includes('dauer')),
        bild: headers.findIndex(h => h.includes('bild')),
        video: headers.findIndex(h => h.includes('video')),
        desc: headers.findIndex(h => h.includes('beschreibung')),
        material: headers.findIndex(h => h.includes('material')),
        schritte: headers.findIndex(h => h.includes('schritte')),
        sicherheit: headers.findIndex(h => h.includes('sicherheit'))
    };

    console.log("MINT-App Spalten-Mapping:", idx);

    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const row = splitCSVLine(lines[i]);
        if (row.length < 2) continue;

        // Nur importieren, wenn Freigabe 'x' ist
        if (idx.freigabe === -1 || !row[idx.freigabe] || row[idx.freigabe].toLowerCase() !== 'x') continue;

        result.push({
            id: 'cloud-' + i,
            title: row[idx.titel] || 'Unbekanntes Experiment',
            subject: row[idx.fach] || 'Allgemein',
            grade: row[idx.klasse] || '-',
            duration: row[idx.dauer] || '-',
            image: idx.bild !== -1 ? row[idx.bild] : '',
            video: idx.video !== -1 ? row[idx.video] : '',
            description: row[idx.desc] || '',
            materials: (idx.material !== -1 && row[idx.material]) ? row[idx.material].split(',').map(s => s.trim()) : [],
            steps: (idx.schritte !== -1 && row[idx.schritte]) ? row[idx.schritte].split(',').map(s => s.trim()) : [],
            safety: idx.sicherheit !== -1 ? row[idx.sicherheit] : ''
        });
    }
    return result;
}

// Helfer für korrektes CSV-Splitting (auch bei leeren Feldern)
function splitCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim().replace(/^"|"$/g, ''));
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim().replace(/^"|"$/g, ''));
    return result;
}
 