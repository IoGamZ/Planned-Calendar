import { useEffect, useRef } from "react";

export const PlexusBackground = () => {
    const canvasRef = useRef(null);
    const isDarkModeRef = useRef(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        const handleResize = () => {
            window.dispatchEvent(new Event("plexusRefresh"));
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

// =======================================================
// THEME CHANGE
// =======================================================

        const handleThemeChange = (event) => {
            isDarkModeRef.current = event.detail.isDarkMode;
        };
        window.addEventListener("themeChange", handleThemeChange);

// =======================================================
// CANVAS VARIABLES
// =======================================================

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrameId;

// =======================================================
// RESIZE CANVAS
// =======================================================

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            const dpr = window.devicePixelRatio || 1;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0 , 0);
        };
        resizeCanvas();

// =======================================================
// PLEXUS PARTICLES
// =======================================================

        let particles = Array.from( { length: 100 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,

            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,

            radius: Math.random() * 2 + 1,
        }));

        const refreshParticles = () => { particles = Array.from( { length: 100 }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,

                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,

                radius:Math.random() * 2 + 1,
        }));};
        window.addEventListener("plexusRefresh", refreshParticles);

// =======================================================
// PLEXUS COLORS
// =======================================================

        // Lead gray: rgb(185, 189, 193)
        const plexusGray = {r: 185, g: 189, b: 193,};
        const darkParticle = plexusGray;
        const lightParticle = plexusGray;
        const darkLine = plexusGray;
        const lightLine = plexusGray;
        
        let particleColor = {
            r: isDarkModeRef.current
                ? darkParticle.r
                : lightParticle.r,
            g: isDarkModeRef.current
                ? darkParticle.g
                : lightParticle.g,
            b: isDarkModeRef.current
                ? darkParticle.b
                : lightParticle.b,
        };

        let lineColor = {
            r: isDarkModeRef.current
                ? darkLine.r
                : lightLine.r,
            g: isDarkModeRef.current
                ? darkLine.g
                : lightLine.g,
            b: isDarkModeRef.current
                ? darkLine.b
                : lightLine.b,
        };

// =======================================================
// COLOR INTERPOLATION
// =======================================================

        const lerp = (
            start,
            end,
            amount
        ) => {
            return ( start + (end - start) * amount
        );};

// =======================================================
// RENDER
// =======================================================

        const render = () => {ctx.clearRect(0,0,width,height);
            const dark = isDarkModeRef.current;
            const targetParticle = dark
                ? darkParticle
                : lightParticle;

            const targetLine = dark
                ? darkLine
                : lightLine;

// ---------------------------------------------------
// Smooth particle color transition
// ---------------------------------------------------

            particleColor.r = lerp(particleColor.r, targetParticle.r, 0.08);
            particleColor.g = lerp(particleColor.g, targetParticle.g, 0.08);
            particleColor.b = lerp(particleColor.b, targetParticle.b, 0.08);

// ---------------------------------------------------
// Smooth line color transition
// ---------------------------------------------------

            lineColor.r = lerp( lineColor.r, targetLine.r, 0.08);
            lineColor.g = lerp( lineColor.g, targetLine.g, 0.08);
            lineColor.b = lerp( lineColor.b, targetLine.b, 0.08);
            const particleColorString = `rgb(
                ${particleColor.r},
                ${particleColor.g},
                ${particleColor.b}
            )`;
            const lineColorString = `${lineColor.r}, ${lineColor.g}, ${lineColor.b}`;

// ===================================================
// PARTICLES
// ===================================================

            particles.forEach((particle, index) => {
                // Move particle
                particle.x +=
                    particle.vx;
                particle.y +=
                    particle.vy;

                // Bounce horizontally
                if (particle.x <= 0 || particle.x >= width){
                    particle.vx *= -1;
                }

                // Bounce vertically
                if (particle.y <= 0 || particle.y >= height){
                    particle.vy *= -1;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColorString;
                ctx.fill();

                // Draw connections
                for ( 
                    let nextIndex =index + 1;
                    nextIndex < particles.length;
                    nextIndex++
                    ) {
                        const nextParticle =
                            particles[nextIndex];
                        const dx = particle.x - nextParticle.x;
                        const dy = particle.y - nextParticle.y;
                        const distance = Math.sqrt( dx * dx + dy * dy );
                        const maxDistance = 110;
                        if ( distance < maxDistance){
                            const opacity = 1 - distance / maxDistance;
                            ctx.beginPath();
                            ctx.moveTo( particle.x, particle.y);
                            ctx.lineTo( nextParticle.x, nextParticle.y);
                            ctx.lineWidth = 0.6;
                            ctx.strokeStyle = `rgba( ${lineColorString}, ${opacity * 0.45})`;
                            ctx.stroke();
                        }
                    }
                });

            animationFrameId = requestAnimationFrame( render );

        };
        render();

        // RESIZE LISTENER
        window.addEventListener( "resize", resizeCanvas);

        // CLEANUP
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("plexusRefresh", refreshParticles);
            window.removeEventListener("themeChange", handleThemeChange);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

// =========================================================
// RENDER
// =========================================================

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-transparent">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"/>
        </div>
    );
};
