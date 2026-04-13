document.addEventListener('DOMContentLoaded', () => {
    // Check for saved language or browser language
    const browserLang = navigator.language ? navigator.language.split('-')[0] : 'en';
    const supportedLangs = ['en', 'fr', 'ru'];
    const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
    
    const savedLang = localStorage.getItem('vtransfer_lang') || defaultLang;
    
    // Initial application
    setLanguage(savedLang);

    // Setup event listeners for language switcher
    // Using event delegation to be safer
    document.addEventListener('click', (e) => {
        const option = e.target.closest('.lang-option');
        if (option) {
            e.preventDefault();
            const lang = option.getAttribute('data-lang');
            if (lang) {
                setLanguage(lang);
            }
        }
    });
});

function setLanguage(lang) {
    if (!lang) return;
    
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

    // Update current language display
    const currentLangDisplay = document.querySelector('.current-lang-text');
    const currentFlagImg = document.getElementById('current-flag');
    
    const langConfig = {
        'en': { text: 'EN', flag: 'gb' },
        'ru': { text: 'RU', flag: 'ru' },
        'fr': { text: 'FR', flag: 'fr' }
    };

    if (langConfig[lang]) {
        if (currentLangDisplay) currentLangDisplay.innerText = langConfig[lang].text;
        if (currentFlagImg) {
            currentFlagImg.src = `https://flagcdn.com/w40/${langConfig[lang].flag}.png`;
            currentFlagImg.alt = langConfig[lang].text;
        }
    }

    applyTranslations(lang);
}

function applyTranslations(lang) {
    // Handle potential late loading of translations.js
    const translationsObj = window.translations;
    
    if (typeof translationsObj === 'undefined' || !translationsObj[lang]) {
        console.warn(`Translations for "${lang}" not ready... retrying`);
        setTimeout(() => applyTranslations(lang), 100);
        return;
    }

    const dict = translationsObj[lang];

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getNestedValue(dict, key);
        
        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.placeholder) el.placeholder = translation;
            } else if (el.tagName === 'OPTGROUP' || el.tagName === 'OPTION') {
                el.textContent = translation;
            } else {
                // Determine if we should use innerHTML or textContent
                if (translation.includes('<')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        }
    });

    // Update all elements with data-i18n-attr (for tooltips, labels, etc)
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
    if (!obj || !path) return null;
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj);
}
