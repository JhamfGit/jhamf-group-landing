import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    radius: number;
    color: string;
    vx: number;
    vy: number;
    layer: number; // 0 = detailed/front, 1 = background/slow
}

const InteractiveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Colors based on brand (Azure, Neon Cyan, Neon Purple)
        const colors = ['#007FFF', '#00F0FF', '#7B2CBF'];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = window.innerWidth < 768 ? 40 : 80;

            for (let i = 0; i < particleCount; i++) {
                const layer = Math.random() > 0.7 ? 1 : 0; // 30% background particles
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + (layer === 0 ? 1 : 0.5),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    vx: (Math.random() - 0.5) * (layer === 0 ? 0.5 : 0.2),
                    vy: (Math.random() - 0.5) * (layer === 0 ? 0.5 : 0.2),
                    layer
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((p, i) => {
                // Movement
                p.x += p.vx;
                p.y += p.vy;

                // Mouse interaction (Parallax/Repulsion)
                // Calculate distance to mouse
                const dx = mouseRef.current.x - canvas.width / 2;
                const dy = mouseRef.current.y - canvas.height / 2;

                // Gentle parallax drift based on mouse position from center
                const parallaxX = dx * (p.layer === 0 ? 0.02 : 0.005);
                const parallaxY = dy * (p.layer === 0 ? 0.02 : 0.005);

                // Screen wrap
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                const displayX = p.x - parallaxX;
                const displayY = p.y - parallaxY;

                ctx.beginPath();
                ctx.arc(displayX, displayY, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                // Add glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;

                ctx.globalAlpha = p.layer === 0 ? 0.8 : 0.3;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;

                // Connecting lines (only for front layer and close particles)
                if (p.layer === 0) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const p2 = particles[j];
                        if (p2.layer !== 0) continue;

                        const p2DisplayX = p2.x - parallaxX;
                        const p2DisplayY = p2.y - parallaxY;

                        const dist = Math.hypot(displayX - p2DisplayX, displayY - p2DisplayY);

                        if (dist < 150) {
                            ctx.beginPath();
                            ctx.strokeStyle = p.color; // Gradient or simple color
                            ctx.globalAlpha = 1 - dist / 150;
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(displayX, displayY);
                            ctx.lineTo(p2DisplayX, p2DisplayY);
                            ctx.stroke();
                            ctx.globalAlpha = 1;
                        }
                    }
                }
            });

            animationFrameId = requestAnimationFrame(drawParticles);
        };

        // Listeners
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        // Init
        resizeCanvas();
        drawParticles();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
};

export default InteractiveBackground;
