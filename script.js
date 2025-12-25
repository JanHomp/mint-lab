/* Mock Data */
const experiments = [
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
    {
        id: 3,
        title: "DNA-Extraktion aus Erdbeeren",
        subject: "Biologie",
        grade: "8-10",
        duration: "medium",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600",
        description: "Sichtbarmachung des Erbguts mit einfachen Haushaltsmitteln.",
        materials: ["Erdbeeren", "Gefrierbeutel", "Spülmittel", "Salz", "Isopropanol (eiskalt)", "Kaffeefilter"],
        steps: [
            "Erdbeeren im Beutel zermatschen.",
            "Extraktionspuffer (Wasser, Spülmittel, Salz) hinzugeben.",
            "Gemisch filtern.",
            "Vorsichtig mit eiskaltem Alkohol überschichten und DNA-Fäden beobachten."
        ]
    },
    {
        id: 4,
        title: "Bau eines Elektromotors",
        subject: "Technik",
        grade: "8-10",
        duration: "long",
        image: "https://images.unsplash.com/photo-1555660239-16a75aefd688?auto=format&fit=crop&q=80&w=600",
        description: "Verständnis der Lorentzkraft durch den Bau eines einfachen Gleichstrommotors.",
        materials: ["Kupferlackdraht", "1.5V Batterie", "Starker Neodym-Magnet", "Sicherheitsnadeln", "Klebeband"],
        steps: [
            "Wickeln Sie den Draht zu einer Spule.",
            "Schleifen Sie die Enden des Lacks ab (einseitig nur zur Hälfte!).",
            "Bauen Sie die Lager aus Sicherheitsnadeln auf die Batterie.",
            "Platzieren Sie den Magneten und setzen Sie die Spule ein."
        ]
    },
    {
        id: 5,
        title: "Rotkohl-Indikator",
        subject: "Chemie",
        grade: "5-7",
        duration: "short",
        image: "https://images.unsplash.com/photo-1629738072895-320d75b31df5?auto=format&fit=crop&q=80&w=600",
        description: "Untersuchung von Säuren und Basen im Haushalt mit einem natürlichen Indikator.",
        safety: "Vorsicht heiß!",
        materials: ["Rotkohl", "Heißes Wasser", "Zitronensaft", "Natron", "Essig", "Waschpulver"],
        steps: [
            "Rotkohl klein schneiden und mit heißem Wasser übergießen (Sud ziehen lassen).",
            "Den lila Saft in mehrere Gläser füllen.",
            "Verschiedene Haushaltsmittel zugeben und Farbveränderung beobachten (Rot=Sauer, Grün/Gelb=Basisch)."
        ]
    },
    {
        id: 6,
        title: "Nicht-Newtonsches Fluid",
        subject: "Physik",
        grade: "5-7",
        duration: "short",
        image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=600",
        description: "Maisstärke und Wasser – fest oder flüssig? Ein Spaß für die Hände.",
        materials: ["Maisstärke", "Wasser", "Schüssel", "Lebensmittelfarbe"],
        steps: [
            "Mischen Sie 2 Teile Maisstärke mit 1 Teil Wasser.",
            "Langsam rühren: Es ist flüssig.",
            "Schnell draufschlagen: Es wird hart wie Stein.",
            "Diskutieren Sie die Viskosität."
        ]
    },
    {
        id: 7,
        title: "Osmose mit Gummibärchen",
        subject: "Biologie",
        grade: "5-7",
        duration: "long",
        image: "https://images.unsplash.com/photo-1582170364964-75896b025bae?auto=format&fit=crop&q=80&w=600",
        description: "Warum platzen Kirschen im Regen? Wir testen es mit Gummibärchen.",
        materials: ["Gummibärchen", "Wasser", "Salzwasser", "Zuckerwasser", "3 Gläser"],
        steps: [
            "Legen Sie je ein Gummibärchen in Wasser, Salzwasser und Zuckerwasser.",
            "Warten Sie (am besten über Nacht).",
            "Vergleichen Sie die Größe: Das Wasser-Bärchen wird riesig (hypotonisch), das Salzwasser-Bärchen schrumpft (hypertonisch)."
        ]
    },
    {
        id: 8,
        title: "Brückenbau aus Papier",
        subject: "Technik",
        grade: "5-7",
        duration: "medium",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80&w=600",
        description: "Wer baut die stabilste Brücke aus nur einem Blatt Papier?",
        materials: ["DIN A4 Papier", "Klebestreifen", "Bücher als Stützen", "Münzen als Gewichte"],
        steps: [
            "Falten Sie das Papier (Zick-Zack, Röhren, etc.).",
            "Legen Sie es zwischen zwei Bücher.",
            "Stapeln Sie Münzen darauf, bis sie einstürzt."
        ]

    },
    {
        id: 9,
        title: "Lavalampe selber bauen",
        subject: "Chemie",
        grade: "5-7",
        duration: "short",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600",
        description: "Dichteunterschiede und chemische Reaktionen in Aktion.",
        materials: ["Glas", "Wasser", "Öl", "Lebensmittelfarbe", "Brausetablette"],
        steps: [
            "Glas zu 1/4 mit Wasser füllen.",
            "Lebensmittelfarbe zum Wasser geben.",
            "Rest mit Öl auffüllen (warten bis getrennt).",
            "Brausetablette einwerfen und beobachten."
        ]
    },
    {
        id: 10,
        title: "Kartoffel-Batterie",
        subject: "Physik",
        grade: "8-10",
        duration: "medium",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600",
        description: "Elektrizität aus Gemüse – ähnlich wie die Zitrone, aber mit Stärke.",
        materials: ["3 Kartoffeln", "Kupfermünzen", "Verzinkte Nägel", "Kabel", "LED"],
        steps: [
            "Stecken Sie je einen Kupfernagel und einen verzinkten Nagel in jede Kartoffel.",
            "Verbinden Sie diese in Reihe (Kupfer an Zink).",
            "Schließen Sie die LED an (Polung beachten!)."
        ]
    }
];

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

    // Account & Theme
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
    loadProfile(); // NEW: Load Profile
    loadTheme();   // NEW: Load Theme

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

    // Upload Form Handler
    document.getElementById('upload-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page reload
        // ... previous logic ...
        alert("Experiment hochgeladen! (Mock)");
        switchView('discovery');
    });

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
    } catch (e) {
        alert("Fehler beim Starten der App: " + e.message);
        console.error(e);
    }
});
