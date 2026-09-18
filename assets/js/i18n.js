(function () {
    var storageKey = 'site-lang';
    var supportedLanguages = ['en', 'zh'];
    var currentLanguage;

    function getStoredLanguage() {
        try {
            var storedLanguage = localStorage.getItem(storageKey);
            return supportedLanguages.indexOf(storedLanguage) !== -1 ? storedLanguage : 'en';
        } catch (error) {
            return 'en';
        }
    }

    function storeLanguage(language) {
        try {
            localStorage.setItem(storageKey, language);
        } catch (error) {
            // The switch still works for the current page when storage is unavailable.
        }
    }

    function updateDocumentTitle(language) {
        var html = document.documentElement;
        var pageTitle = html.getAttribute(language === 'zh' ? 'data-title-zh' : 'data-title-en');
        var siteTitle = html.getAttribute('data-site-title');

        if (pageTitle && siteTitle) {
            document.title = pageTitle + ' - ' + siteTitle;
        } else if (pageTitle) {
            document.title = pageTitle;
        }
    }

    function updateToggle(language) {
        var buttons = document.querySelectorAll('[data-language]');
        for (var index = 0; index < buttons.length; index += 1) {
            var button = buttons[index];
            var isActive = button.getAttribute('data-language') === language;
            button.classList.toggle('lang-toggle-active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        }
    }

    function applyLanguage(language) {
        var selectedLanguage = supportedLanguages.indexOf(language) !== -1 ? language : 'en';
        var html = document.documentElement;

        currentLanguage = selectedLanguage;
        html.className = html.className.replace(/(?:^|\s)lang-active-(?:en|zh)(?=\s|$)/g, '').trim();
        html.classList.add('lang-active-' + selectedLanguage);
        html.setAttribute('lang', selectedLanguage === 'zh' ? 'zh-CN' : 'en');
        updateDocumentTitle(selectedLanguage);
        updateToggle(selectedLanguage);
    }

    window.setSiteLanguage = function (language) {
        storeLanguage(language);
        applyLanguage(language);
    };

    applyLanguage(getStoredLanguage());

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            updateToggle(currentLanguage);
        });
    }
})();
