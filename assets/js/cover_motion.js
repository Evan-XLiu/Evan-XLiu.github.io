(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches || !window.IntersectionObserver || !window.ResizeObserver) return;

    // The source is a seamless 12-column wall of task clips.
    const columns = 12;
    const zoom = 2.5;
    const tilt = -5 * Math.PI / 180;

    document.querySelectorAll('[data-cover-motion]').forEach((cover) => {
        const video = cover.querySelector('video');
        const canvas = cover.querySelector('canvas');
        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return;

        let width = 0;
        let height = 0;
        let pixelRatio = 1;
        let elapsed = 26;
        let previousTime;
        let animationFrame = 0;
        let visible = false;

        function draw(time) {
            animationFrame = 0;
            if (width && height && video.readyState >= 2 && video.videoWidth && video.videoHeight) {
                elapsed += previousTime === undefined ? 0 : Math.min(time - previousTime, 100) / 1000;
                previousTime = time;

                const wallWidth = width * zoom;
                const tileWidth = wallWidth / columns;
                const wallHeight = wallWidth * video.videoHeight / video.videoWidth;
                const offsetX = elapsed * tileWidth * 0.16 % wallWidth;
                const offsetY = elapsed * tileWidth * 0.09 % wallHeight;
                const radius = Math.hypot(width, height) / 2 + 2;
                const left = offsetX - Math.ceil((offsetX + radius) / wallWidth) * wallWidth;
                const top = offsetY - Math.ceil((offsetY + radius) / wallHeight) * wallHeight;

                context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
                context.translate(width / 2, height / 2);
                context.rotate(tilt);
                for (let y = top; y < radius; y += wallHeight) {
                    for (let x = left; x < radius; x += wallWidth) {
                        context.drawImage(video, x, y, wallWidth + 1, wallHeight + 1);
                    }
                }
                canvas.hidden = false;
            }
            if (visible && !motionPreference.matches) {
                animationFrame = requestAnimationFrame(draw);
            }
        }

        function updatePlayback() {
            if (visible && !motionPreference.matches) {
                video.play().catch(() => {});
                if (!animationFrame) animationFrame = requestAnimationFrame(draw);
                return;
            }
            video.pause();
            cancelAnimationFrame(animationFrame);
            animationFrame = 0;
            previousTime = undefined;
        }

        new ResizeObserver(([entry]) => {
            ({ width, height } = entry.contentRect);
            pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.round(width * pixelRatio);
            canvas.height = Math.round(height * pixelRatio);
            if (visible && !animationFrame && !motionPreference.matches) draw(performance.now());
        }).observe(cover);

        new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            updatePlayback();
        }).observe(cover);

        motionPreference.addEventListener('change', updatePlayback);
    });
})();
