document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('vtransfer_lang') || 'en';
    setLanguage(savedLang);

    // Setup event listeners for language switcher
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});

function setLanguage(lang) {
    localStorage.setItem('vtransfer_lang', lang);
    document.documentElement.lang = lang;
    
    // Update active state in UI
    document.querySelectorAll('.lang-option').forEach(option => {
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Update current language display (if exists)
    const currentLangDisplay = document.querySelector('.current-lang-text');
    if (currentLangDisplay) {
        const langNames = {
            'en': 'EN',
            'ru': 'RU',
            'fr': 'FR'
        };
        currentLangDisplay.innerText = langNames[lang];
    }

    applyTranslations(lang);
}

function applyTranslations(lang) {
    if (typeof translations === 'undefined') {
        console.error('Translations not loaded');
        return;
    }

    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getNestedValue(dict, key);
        
        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.placeholder) el.placeholder = translation;
            } else if (el.tagName === 'OPTGROUP' || el.tagName === 'OPTION') {
                // For options, we might want to translate the text content
                el.textContent = translation;
            } else {
                // Replace HTML or text based on needs
                // Using innerHTML only if it contains tags, otherwise textContent for safety
                if (translation.includes('<')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        }
    });

    // Translate attributes like title or aria-label if needed
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const attrConfig = el.getAttribute('data-i18n-attr').split(':');
        if (attrConfig.length === 2) {
            const attr = attrConfig[0];
            const key = attrConfig[1];
            const translation = getNestedValue(dict, key);
            if (translation) {
                el.setAttribute(attr, translation);
            }
        }
    });
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj);
}
