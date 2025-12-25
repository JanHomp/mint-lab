/* Configuration */
// ERSETZEN SIE DIESEN LINK MIT IHREM GOOGLE SHEETS "WEB VERÖFFENTLICHEN" -> "CSV" LINK
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTH9gq6ptkqryPgtuhemcssiajxyx1NTU_8t1neQsvNFgGP8o7vj1JFQWK8C4Vs3XE-x5-eZql-pPep/pub?output=csv";

/* Local/Fallback Data */
const localExperiments = [
    {
        id: 1,
        title: "Elefantenzahnpasta",
        subject: "Chemie",
        grade: "8-10",
        duration: "short",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
        description: "Ein klassisches Experiment zur Katalyse, bei dem Wasserstoffperoxid rasant zersetzt wird und riesige Schaummengen erzeugt.",
        safety: "Schutzbrille!",
        materials: ["Wasserstoffperoxid (30%)", "Kaliumiodid oder Hefe", "Spülmittel", "Messzylinder", "Lebensmittelfarbe"],
        steps: [
            "Stellen Sie den Messzylinder auf eine wasserfeste Unterlage.",
            "Geben Sie 50ml Wasserstoffperoxid und einen Spritzer Spülmittel hinein.",
            "Fügen Sie Lebensmittelfarbe für den Effekt hinzu.",
            "Geben Sie den Katalysator (in Wasser gelöstes Kaliumiodid oder Hefe) schnell hinzu und treten Sie zurück."
        ]
    },
    {
        id: 2,
        title: "Die Zitronenbatterie",
        subject: "Physik",
        grade: "5-7",
        duration: "medium",
        image: "https://images.unsplash.com/photo-1581093458791-9f302e6831d7?auto=format&fit=crop&q=80&w=600",
        description: "Wie man mit Früchten Strom erzeugt. Eine Einführung in elektrochemische Zellen.",
        materials: ["3-4 Zitronen", "Kupfermünzen oder -nägel", "Verzinkte Nägel", "Krokodilklemmen", "LED-Diode"],
        steps: [
            "Rollen Sie die Zitronen etwas, um den Saftfluss im Inneren zu fördern.",
            "Stecken Sie in jede Zitrone einen Kupfernagel und einen verzinkten Nagel (Abstand!).",
            "Verbinden Sie den Pluspol (Kupfer) der einen Zitrone mit dem Minuspol (Zink) der nächsten.",
            "Schließen Sie den Stromkreis mit der LED."
        ]
    },
    // ... (Weitere Beispiele gekürzt für Code-Überblick, bleiben im Fallback erhalten)
];

// Active State
let experiments = [...localExperiments]; // Start with local data

/* State & DOM Elements */
// DOM Elements (assigned in init)
let container, filterSubject, filterGrade, searchInput, modal, modalBody, closeModal;
let viewDiscovery, viewUpload, viewTools;
let btnHome, btnTools, btnUpload, btnLogo, btnInspire;
let btnDownloadPdf, btnAddFavorites, formUpload;
let btnStart, btnStop, btnReset, stopwatchDisplay;
let btnThemeToggle, profileModal, btnProfile, btnSaveProfile, profileNameInput;

// Stopwatch vars
let timerInterval;
let startTime;
let elapsed = 0;
// Voice Control
let recognition;
let countDownMode = false;

/* Initialization */
function init() {
    // Assign DOM Elements
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

    // Restore missing assignments
    btnThemeToggle = document.getElementById('btn-theme-toggle');
    profileModal = document.getElementById('profile-modal');
    btnProfile = document.getElementById('btn-profile');
    btnSaveProfile = document.getElementById('save-profile');
    profileNameInput = document.getElementById('profile-name');

    // Cancel Upload
    document.getElementById('btn-cancel-upload').addEventListener('click', () => {
        switchView('discovery');
    });

    renderExperiments(experiments);
    loadFavorites();
    loadProfile(); // Re-enabled
    loadTheme();

    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
    }

    // Event Listeners
    filterSubject.addEventListener('change', filterExperiments);
    filterGrade.addEventListener('change', filterExperiments);
    searchInput.addEventListener('input', filterExperiments);

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
        if (e.target === profileModal) {
            profileModal.classList.remove('active');
        }
    });

    // Close profile modal
    document.getElementById('close-profile').addEventListener('click', () => {
        profileModal.classList.remove('active');
    });

    // Navigation
    btnHome.addEventListener('click', () => switchView('discovery'));
    btnLogo.addEventListener('click', () => switchView('discovery'));
    btnTools.addEventListener('click', () => switchView('tools'));
    btnUpload.addEventListener('click', () => switchView('upload'));

    // Inspire Me
    btnInspire.addEventListener('click', () => {
        const randomExp = experiments[Math.floor(Math.random() * experiments.length)];
        openModal(randomExp);
    });

    // Favorites Handler
    document.getElementById('btn-add-favorites').addEventListener('click', toggleFavorite);

    // PDF Handler (Mock)
    document.getElementById('btn-download-pdf').addEventListener('click', () => {
        alert("Dies ist eine Demo.\nIn der Vollversion würde hier ein PDF erstellt.");
        window.print(); // Simple fallback
    });

    // Upload Handler (Redirect to Google Form)
    const formBtn = document.getElementById('btn-open-form');
    if (formBtn) {
        formBtn.addEventListener('click', () => {
            // TODO: REPLACE WITH YOUR GOOGLE FORM LINK
            const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdhTwZrjMyORTLlA0UGaeZLdJDnCTz0E5wsLT1NJCY1iVOSTA/viewform";
            if (formUrl === "https://docs.google.com/forms/") {
                alert("Bitte fügen Sie erst Ihren Google Forms Link in script.js ein!");
            } else {
                window.open(formUrl, '_blank');
            }
        });
    }

    // Stopwatch Handlers
    document.getElementById('btn-start').addEventListener('click', startTimer);
    document.getElementById('btn-stop').addEventListener('click', stopTimer);
    document.getElementById('btn-reset').addEventListener('click', resetTimer);

    // Timer Presets
    document.querySelectorAll('.btn-preset').forEach(btn => {
        btn.addEventListener('click', () => {
            resetTimer();
            const sec = parseInt(btn.dataset.time);
            elapsed = sec * 1000;
            countDownMode = true; // Flag for countdown behavior if we wanted to implement real countdown logic
            // For now, just setting the time to show it works as a preset or start point
            updateTimerDisplay();
            // Optional: Auto-start? Let's just set it for now.
        });
    });

    // Converter Handler
    document.getElementById('btn-convert').addEventListener('click', convertUnits);

    // Voice Handler
    setupVoiceControl();

    // Theme Handler
    btnThemeToggle.addEventListener('click', toggleTheme);

    // Profile Handler
    btnProfile.addEventListener('click', () => {
        profileModal.classList.add('active');
    });
    btnSaveProfile.addEventListener('click', saveProfile);
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

        card.innerHTML = `
            <div class="card-image" style="background-image: url('${exp.image}')">
                ${isFav ? '<div style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.6); padding:5px; border-radius:50%">❤️</div>' : ''}
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

    modalBody.innerHTML = `
        <div class="detail-header">
            <div class="tags" style="margin-bottom:1rem">
                <span class="tag">${exp.subject}</span>
                <span class="tag grade">Klasse ${exp.grade}</span>
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
            title: "Jans Super-Experiment",
            subject: "Magie",
            grade: "13+",
            duration: "∞",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format", // Reuse an image or better one
            description: "Ein geheimes Experiment, das nur erscheint, wenn man den Meister ruft. 🧙‍♂️✨",
            materials: ["Kaffee", "Geduld", "Code", "Magie"],
            steps: [
                "Einen Kaffee kochen.",
                "Einen epischen Code schreiben.",
                "Sich zurücklehnen und genießen."
            ],
            safety: "Vorsicht: Extrem cool!"
        });
        // Make it rain confetti logic could go here if we had a library, 
        // for now a special alert or visual is enough in the card.
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

    document.getElementById('stopwatch-display').textContent =
        `${pad(m)}:${pad(s)}:${pad(ms)}`;
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

    if (viewName === 'discovery') {
        viewDiscovery.style.display = 'block';
        btnHome.classList.add('active');
        renderExperiments(experiments); // Re-render to ensure view is correct
    } else if (viewName === 'upload') {
        viewUpload.style.display = 'block';
        btnUpload.classList.add('active');
    } else if (viewName === 'tools') {
        viewTools.style.display = 'block';
        btnTools.classList.add('active');
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
    if (name) {
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
        btnThemeToggle.textContent = '🌙';
    } else {
        btnThemeToggle.textContent = '☀️';
    }
}


// Start
/* Voice Control Logic */
function setupVoiceControl() {
    const btnVoice = document.getElementById('btn-voice');

    // Check support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        btnVoice.style.display = 'none'; // Not supported
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log("Voice Command:", command);

        // Show visual feedback instead of alert
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

        btnVoice.classList.remove('listening');
    };

    recognition.onend = () => {
        btnVoice.classList.remove('listening');
    };

    recognition.onerror = (e) => {
        console.error(e);
        btnVoice.classList.remove('listening');

        if (e.error === 'not-allowed') {
            alert("⚠️ Mikrofon-Zugriff verweigert.\n\nDa diese App lokal läuft (ohne Server), blockiert der Browser das eventuell. Auf einem Webserver würde es funktionieren.");
        } else if (e.error === 'network') {
            alert("⚠️ Netzwerk/Sicherheits-Fehler.\n\nSpracherkennung benötigt oft eine sichere HTTPS-Verbindung.");
        }
    };

    btnVoice.addEventListener('click', () => {
        try {
            recognition.start();
            btnVoice.classList.add('listening');
        } catch (e) {
            console.log(e);
        }
    });
}

// Start
document.addEventListener('DOMContentLoaded', () => {
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
    const lines = text.split('\n');
    const result = [];

    // Skip Header (Line 0)
    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        if (!row) continue;

        const clean = row.map(val => val.replace(/^"|"$/g, '').trim());

        // Automatische Erkennung: Wo steht das 'x'?
        let offset = -1;
        if (clean[0] && clean[0].toLowerCase() === 'x') {
            offset = 0; // Kein Zeitstempel, 'x' steht ganz vorne (Spalte A)
        } else if (clean[1] && clean[1].toLowerCase() === 'x') {
            offset = 1; // Zeitstempel in A, 'x' steht in Spalte B
        }

        // Wenn kein 'x' gefunden wurde, ignorieren wir die Zeile
        if (offset === -1) continue;

        result.push({
            id: 'cloud-' + i,
            title: clean[offset + 1],
            subject: clean[offset + 2],
            grade: clean[offset + 3],
            duration: clean[offset + 4],
            image: clean[offset + 5] || 'https://via.placeholder.com/600',
            description: clean[offset + 6],
            materials: clean[offset + 7] ? clean[offset + 7].split(',').map(s => s.trim()) : [],
            steps: clean[offset + 8] ? clean[offset + 8].split(',').map(s => s.trim()) : [],
            safety: clean[offset + 9] || ''
        });
    }
    return result;
}
