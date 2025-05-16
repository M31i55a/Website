import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Curtains, Plane } from 'curtainsjs';
import html2canvas from 'html2canvas';
import DynamicBackground from './components/DynamicBackground';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/Service1';
import Blog from './pages/Service2';
import Portfolio from './pages/Portofolio';
import Loading from './pages/Loading';
import './App.css';

// Define page order for navigation
const pages = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/portfolio', name: 'Portfolio', component: Portfolio },
];

// Animation variants for navigation direction
const pageVariants = {
  next: {
    initial: { x: '100%' }, // Enter from right
    animate: { x: 0 }, // Slide to center
    exit: { x: '-100%' }, // Exit to left
  },
  previous: {
    initial: { x: '-100%' }, // Enter from left
    animate: { x: 0 }, // Slide to center
    exit: { x: '100%' }, // Exit to right
  },
};

// Debounce function to limit scroll event frequency
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [direction, setDirection] = useState('next'); // Default direction

  // Handle scroll navigation
  useEffect(() => {
    const handleWheel = debounce((event) => {
      if (isNavigating) return; // Prevent multiple transitions
      setIsNavigating(true);

      const currentIndex = pages.findIndex((page) => page.path === location.pathname);
      let nextIndex;

      if (event.deltaY > 0) {
        // Scroll down: go to next page, right-to-left
        setDirection('next');
        nextIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0; // Loop to first page
      } else {
        // Scroll up: go to previous page, left-to-right
        setDirection('previous');
        nextIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1; // Loop to last page
      }

      navigate(pages[nextIndex].path);

      // Reset navigating state after transition
      setTimeout(() => setIsNavigating(false), 500); // Match transition duration
    }, 100); // Debounce delay

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [location.pathname, navigate, isNavigating]);

  // Handle click navigation
  useEffect(() => {
    const handleNavClick = (event) => {
      if (isNavigating) return; // Prevent multiple transitions
      setIsNavigating(true);

      const targetPath = event.currentTarget.getAttribute('href');
      const currentIndex = pages.findIndex((page) => page.path === location.pathname);
      const targetIndex = pages.findIndex((page) => page.path === targetPath);

      // Set direction based on page order
      if (targetIndex > currentIndex) {
        setDirection('next'); // Next page: right-to-left
      } else if (targetIndex < currentIndex) {
        setDirection('previous'); // Previous page: left-to-right
      }

      // Reset navigating state after transition
      setTimeout(() => setIsNavigating(false), 500); // Match transition duration
    };

    // Add click listeners to nav links
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach((link) => link.addEventListener('click', handleNavClick));

    return () => {
      navLinks.forEach((link) => link.removeEventListener('click', handleNavClick));
    };
  }, [location.pathname, isNavigating]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants[direction]}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="page bg-[#191919] bg-[url('/src/assets/Background-rOK.png')] bg-cover bg-center min-w-full min-h-screen"
      >
        <DynamicBackground />

        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/portfolio" element={<Portfolio />} />
          {/* <Route path='/ProfileNav' element={<ProfileNav />} /> */}
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
//         <AnimatedRoutes />
//       </div>
//     </Router>
//   );
// }

// ... (other imports and code remain unchanged)

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading (replace with actual asset loading if needed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3-second loading simulation
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loading key="loading" />
          ) : (
            <>
              <Navbar />
              <AnimatedRoutes />
            </>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}


export default App;