const HeroGlobalStyles = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.2); }
          }
  
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(2deg); }
            50% { transform: translateY(-20px) rotate(0deg); }
            75% { transform: translateY(-10px) rotate(-2deg); }
          }
  
          .floating-cube {
            position: absolute;
            border-radius: 10%;
            transform-style: preserve-3d;
            animation: float 15s ease-in-out infinite;
            backdrop-filter: blur(8px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            transition: opacity 0.3s ease;
          }
  
          @media (prefers-reduced-motion: reduce) {
            .floating-cube,
            [class*='animate-'] {
              animation: none !important;
              transition: none !important;
            }
          }
        `,
    }}
  />
);

export default HeroGlobalStyles;
