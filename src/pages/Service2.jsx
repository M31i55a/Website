import { motion, AnimatePresence } from 'framer-motion';
import blackLogo from '../assets/ARBC new LW_01.png';
import { Canvas, useFrame } from '@react-three/fiber'; // 3D rendering library
import { OrbitControls } from '@react-three/drei'; // Helper for 3D controls
import { useRef } from 'react';


const CubeWithParallax = () => {
  const meshRef = useRef(); // Reference to the cube mesh

  // Update the cube's rotation based on mouse movement
  useFrame(({ mouse }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = mouse.y * Math.PI *0.05; // Rotate on X-axis
      meshRef.current.rotation.y = mouse.x * Math.PI *0.05;// Rotate on Y-axis
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3, 3, 3]} /> {/* Cube dimensions: 3x3x3 */}
      <meshStandardMaterial color="#999" />
    </mesh>
  );
};

// Stagger container for child animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

// Variants for individual elements
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.5, ease: 'easeIn' },
  },
};

function Blog() {
  return (
    <AnimatePresence>
      <motion.div
        className="bg-[#191919] bg-[url('/src/assets/Background-rOK.png')] bg-cover bg-center min-w-full min-h-screen"
        key="blog-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* <motion.h1 variants={itemVariants}>Blog</motion.h1>
        <motion.p variants={itemVariants}>
          Read our latest articles and updates. Stay informed with our blog posts on various topics.
        </motion.p> */}

          <div className="pl-[5.86vw] pr-[5.86vw] pt-[5.86vh] pb-[5.86vh] home_content absolute top-0 left-0 w-[100%] h-[100%]  grid grid-cols-12 grid-rows-12">
                    <div className="logo col-span-4 row-span-2 flex flex-start items-center ">
                      <img src={blackLogo} alt="logo" className='w-[5rem]'/>
                    </div>
                    <div className="descriptive_image col-span-8 row-span-11 flex flex-col justify-center items-center ">
                  <Canvas 
                          style={{ height: '100%', width: '100%' }}
                          camera={{ 
                            position: [4, 4, 4],
                            fov: 50,
                            near: 0.1,
                            far: 1000,
                          }}
                        >
                        <ambientLight intensity={0.65} />
                        <directionalLight position={[1, 2, 3]} intensity={8} />
                        <CubeWithParallax />
                        {/* Add orbit controls */}
                        <OrbitControls enableZoom={false} />
                      </Canvas>
                  </div>
                  <div className="description col-span-4 row-span-9 flex flex-col justify-end items-left text-left leading-[calc(1.5*150/2560*100vw]">
                    <div className="bdescription_head font-thin mb-3 w-[80%]">
                      <div className="font-rockwell text-7xl">CREATIVE</div>
                      <div className="font-gilroy text-md font-bold mt-2">SERVICES</div>
                      <div className="services_list mt-2">
                      <ul>
                        <li>UI/UX Design</li>
                        <li>Graphic Design 2D/3D</li>
                        <li>Video Prod & Advertising Spot</li>
                        <li>Street marketing</li>
                      </ul>
                  </div>
                    </div>
                    {/* <div className="border-2 border-green-500 description_body font-thin text-[#7C7C7C]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates qui harum vero impedit! Aliquam debitis doloribus modi iste eum distinctio reiciendis nisi ratione maiores omnis. Inventore voluptas assumenda possimus sapiente, facilis aperiam vero aliquam harum quidem</div> */}
                  </div>
                  
                  <div className="home_footer col-span-12 row-span-1 flex flex-col justify-center items-center opacity-0">Footer</div>
                </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Blog;