import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import '../Loading.css';

// Particle component for background animation
const Particle = ({ id }) => {
  const randomX = (id * 37) % 100; // Generate consistent random values
  const randomY = (id * 53) % 100;
  const randomDelay = (id * 29) % 2;

  return (
    <motion.div
      className="particle"
      initial={{ x: `${randomX}vw`, y: `${randomY}vh`, opacity: 0 }}
      animate={{
        x: `${randomX + (Math.random() - 0.5) * 20}vw`,
        y: `${randomY + (Math.random() - 0.5) * 20}vh`,
        opacity: [0, 0.5, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: randomDelay,
        ease: 'easeInOut',
      }}
    />
  );
};

function Loading() {
  const controls = useAnimation();
  const circleControls = useAnimation();
  const secondaryCircleControls = useAnimation();

  // Counter animation using motion values
  const counterValue = useMotionValue(0);
  const springValue = useSpring(counterValue, { stiffness: 100, damping: 20 });
  const counterText = useTransform(springValue, (value) => `${Math.round(value)}%`);

  // Loading animation sequence
  useEffect(() => {
    const sequence = async () => {
      // Animate loading bar and counter to 100% over 2.5s
      counterValue.set(100); // Gradually increment counterValue
      await controls.start({
        width: '100%',
        transition: { duration: 2.5, ease: 'easeInOut' },
      });

      // Animate primary SVG circle stroke
      await circleControls.start({
        strokeDashoffset: 0,
        transition: { duration: 2.5, ease: 'easeInOut' },
      });

      // Animate secondary SVG circle rotation
      await secondaryCircleControls.start({
        rotate: [0, 360],
        transition: { duration: 2.5, repeat: Infinity, ease: 'linear' },
      });

      // Zoom out, blur, fade out, and change background
      await controls.start({
        scale: 0.5,
        opacity: 0,
        filter: 'blur(10px)',
        backgroundColor: '#000000',
        transition: { duration: 0.5, ease: 'easeIn' },
      });
    };

    sequence();
  }, [controls, circleControls, secondaryCircleControls, counterValue]);

  // Generate 10 particles
  const particles = Array.from({ length: 10 }, (_, i) => <Particle key={i} id={i} />);

  return (
    <motion.div
      className="loading-container"
      initial={{ opacity: 1, scale: 1, filter: 'blur(0px)', backgroundColor: '#222' }}
      animate={controls}
    >
      {particles}
      <div className="loading-content">
        {/* Loading Bar */}
        <div className="loading-bar-container">
          <motion.div
            className="loading-bar"
            initial={{ width: '0%' }}
            animate={controls}
          />
        </div>

        {/* Counter */}
        <motion.span className="loading-counter">
          {counterText}
        </motion.span>

        {/* SVG Circles */}
        <svg className="loading-circle" width="100" height="100">
          {/* Primary Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#007bff"
            strokeWidth="10"
            initial={{ strokeDasharray: '283', strokeDashoffset: '283' }}
            animate={circleControls}
            className="primary-circle"
          />
          {/* Secondary Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="#00c4ff"
            strokeWidth="5"
            animate={secondaryCircleControls}
            className="secondary-circle"
          />
        </svg>
      </div>
    </motion.div>
  );
}

export default Loading;