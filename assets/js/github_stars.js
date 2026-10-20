(() => {
    const elements = Array.from(document.querySelectorAll('[data-github-stars]'));
    const repos = new Set(elements.map(element => element.dataset.githubStars));

    repos.forEach(async repo => {
        const update = count => {
            elements.filter(element => element.dataset.githubStars === repo)
                .forEach(element => { element.textContent = ` ★ ${count.toLocaleString()}`; });
        };
        const cacheKey = `github-stars:${repo}`;
        try {
            const cached = JSON.parse(localStorage.getItem(cacheKey));
            if (cached && Number.isInteger(cached.count) && cached.count >= 0) {
                update(cached.count);
                if (Date.now() - cached.timestamp < 3600000) return;
            }
        } catch (_) { /* Storage may be unavailable. */ }

        try {
            const response = await fetch(`https://api.github.com/repos/${repo}`);
            if (!response.ok) return;
            const data = await response.json();
            if (!Number.isInteger(data.stargazers_count) || data.stargazers_count < 0) return;
            update(data.stargazers_count);
            try {
                localStorage.setItem(cacheKey, JSON.stringify({
                    count: data.stargazers_count, timestamp: Date.now()
                }));
            } catch (_) { /* The count still displays without storage. */ }
        } catch (_) { /* Keep the original Code link when GitHub is unavailable. */ }
    });
})();
