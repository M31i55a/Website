import { motion, AnimatePresence } from 'framer-motion';
import useParallax from '../hooks/useParallax'; // Custom hook for parallax effect
import whiteLogo from '../assets/ARBC new LW_01.png'; // Logo image

// Stagger container for child animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger entry
      staggerDirection: 1, // Forward for entry
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1, // Stagger exit (faster)
      staggerDirection: -1, // Reverse for exit (p then h1)
    },
  },
};

// Variants for individual elements
const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Start below and invisible
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }, // Fade-in
  },
  exit: {
    opacity: 0,
    y: 20, // Slide down on exit
    transition: { duration: 0.3, ease: 'easeIn' }, // Fade-out (faster)
  },
};

function Home() {
  // Use different depths for layered parallax effect
  const h1Parallax = useParallax(0.2); // Stronger movement for h1
  const pParallax = useParallax(0.1); // Subtler movement for p

  return (
    <AnimatePresence>
      <motion.div
        className="bg-[#191919] bg-[url('/src/assets/Background-rOK.png')] bg-cover bg-center min-w-full min-h-screen"
        key="home-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* <motion.h1
          variants={itemVariants}
          animate={{ x: h1Parallax.x, y: h1Parallax.y }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          Welcome to the Home Page.
        </motion.h1>
        <motion.p
          variants={itemVariants}
          animate={{ x: pParallax.x, y: pParallax.y }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          This is the homepage of our website. Explore the other pages using the navigation bar above.
        </motion.p> */}
        <div className="pl-[5.86vw] pr-[5.86vw] pt-[5.86vh] pb-[5.86vh] home_content absolute top-0 left-0 w-[100%] h-[100%]  grid grid-cols-12 grid-rows-12">
          <div className="logo col-span-4 row-span-2 flex flex-start items-center opacity-0">Logo</div>
          <div className="descriptive_image mr-[5.86vw] pl-[0rem] pr-[4rem] pt-[8rem] pb-[7rem] col-span-8 row-span-11 flex flex-col justify-center items-start">
            <img src={whiteLogo} alt="Logo" className=" aspect-[30/20] h-auto xl:w-[400px]" />
          </div>
          <div className="description col-span-4 row-span-9 flex flex-col justify-end items-left text-left leading-[calc(1.5*150/2560*100vw]">
            <div className="description_head text-2xl font-thin mb-3 w-[80%]">
              <div className="font-rockwell"> AFRICANS  RISING {"\n"} BUSINESS  CONSULTING</div>
            </div>
            <div className="description_body font-thin text-[#7C7C7C]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates qui harum vero impedit! Aliquam debitis doloribus modi iste eum distinctio reiciendis nisi ratione maiores omnis. Inventore voluptas assumenda possimus sapiente, facilis aperiam vero aliquam harum quidem</div>
          </div>
          
          <div className="home_footer col-span-12 row-span-1 flex justify-center items-center">
            <div className="load loader--style4 rotate-180 translate-x-[15px] translate-y-[-7px]" title="3">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="50px"
                height="23px"
                viewBox="0 0 24 24"
                style={{ enableBackground: "new 0 0 50 50" }}
                xmlSpace="preserve"
              >
                <rect x="0" y="0" width="8" height="4" fill="#fff">
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="scale"
                    values="1,1; 1,3; 1,1"
                    begin="0s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="15" y="0" width="8" height="4" fill="#fff">
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="scale"
                    values="1,1; 1,3; 1,1"
                    begin="0.2s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="30" y="0" width="8" height="4" fill="#fff">
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="scale"
                    values="1,1; 1,3; 1,1"
                    begin="0.4s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>
            </div>

            <div className="scroll_text ml-2">SCROLL</div>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}

export default Home;