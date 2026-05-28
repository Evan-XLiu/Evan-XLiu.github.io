document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("network-background-canvas")) {
        return;
    }

    var body = document.body;
    if (!body) {
        return;
    }

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    if (!context) {
        return;
    }

    var viewportWidth = 0;
    var viewportHeight = 0;
    var particles = [];
    var pointer = {
        x: null,
        y: null,
        max: 20000
    };
    var particleCount = 99;
    var lineColor = "0,0,0";
    var frameHandle = null;

    canvas.id = "network-background-canvas";
    canvas.setAttribute("aria-hidden", "true");
    body.appendChild(canvas);

    function resizeCanvas() {
        viewportWidth = window.innerWidth || document.documentElement.clientWidth || body.clientWidth;
        viewportHeight = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;
        canvas.width = viewportWidth;
        canvas.height = viewportHeight;
    }

    function createParticles() {
        particles = [];
        for (var index = 0; index < particleCount; index += 1) {
            particles.push({
                x: Math.random() * viewportWidth,
                y: Math.random() * viewportHeight,
                xa: 2 * Math.random() - 1,
                ya: 2 * Math.random() - 1,
                max: 6000
            });
        }
    }

    function drawFrame() {
        context.clearRect(0, 0, viewportWidth, viewportHeight);

        particles.forEach(function (particle, particleIndex) {
            particle.x += particle.xa;
            particle.y += particle.ya;
            particle.xa *= particle.x > viewportWidth || particle.x < 0 ? -1 : 1;
            particle.ya *= particle.y > viewportHeight || particle.y < 0 ? -1 : 1;

            context.fillRect(particle.x - 0.5, particle.y - 0.5, 1, 1);

            for (var nextIndex = particleIndex + 1; nextIndex < particles.length + 1; nextIndex += 1) {
                var other = nextIndex === particles.length ? pointer : particles[nextIndex];
                if (other.x === null || other.y === null) {
                    continue;
                }

                var offsetX = particle.x - other.x;
                var offsetY = particle.y - other.y;
                var distance = offsetX * offsetX + offsetY * offsetY;

                if (distance >= other.max) {
                    continue;
                }

                if (other === pointer && distance >= other.max / 2) {
                    particle.x -= 0.03 * offsetX;
                    particle.y -= 0.03 * offsetY;
                }

                var ratio = (other.max - distance) / other.max;
                context.beginPath();
                context.lineWidth = ratio / 2;
                context.strokeStyle = "rgba(" + lineColor + "," + (ratio + 0.2) + ")";
                context.moveTo(particle.x, particle.y);
                context.lineTo(other.x, other.y);
                context.stroke();
            }
        });

        frameHandle = window.requestAnimationFrame(drawFrame);
    }

    function refreshScene() {
        resizeCanvas();
        createParticles();
    }

    window.addEventListener("resize", refreshScene);
    window.addEventListener("mousemove", function (event) {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
    });
    window.addEventListener("mouseout", function () {
        pointer.x = null;
        pointer.y = null;
    });
    window.addEventListener("pagehide", function () {
        if (frameHandle !== null) {
            window.cancelAnimationFrame(frameHandle);
        }
    });

    refreshScene();
    frameHandle = window.requestAnimationFrame(drawFrame);
});
