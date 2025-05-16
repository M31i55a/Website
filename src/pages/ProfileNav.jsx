import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // helper for class merging, or use clsx if preferred
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const members = [
  {
    id: 1,
    name: "Walt Disney",
    role: "Admin",
    image: "https://source.unsplash.com/random/400x400?sig=1",
    description:
      "Vestibulum at eros felis. Integer faucibus dui felis, sit amet facilisis nunc sollicitudin quis. Nullam velit nibh, pretium a semper ut, accumsan sed erat. Phasellus convallis hendrerit nisi id cursus."
  },
  {
    id: 2,
    name: "Ada Lovelace",
    role: "Creative",
    image: "https://source.unsplash.com/random/400x400?sig=2",
    description:
      "Phasellus sodales lorem sit amet ligula bibendum sollicitudin a non orci. Ut diam diam, bibendum a fringilla tempus, fringilla ut diam."
  },
  {
    id: 3,
    name: "Nikola Tesla",
    role: "Designer",
    image: "https://source.unsplash.com/random/400x400?sig=3",
    description:
      "Curabitur vel sem nibh. Mauris dignissim convallis nisl eget gravida. Proin ac neque eu purus."
  }
];

const ProfileNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col justify-between w-60 py-10 pl-6 relative">
        <div className="space-y-6">
          {members.map((member, index) => (
            <div key={member.id} className="flex space-x-3 items-center">
              <div className="flex flex-col items-center space-y-1">
                <button
                  onClick={() => handleChange(index)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    activeIndex === index
                      ? "bg-orange-500 text-white font-bold"
                      : "bg-gray-700 text-gray-300"
                  )}
                >
                  {index + 1}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-0.5 bg-orange-500"></div>
                <span
                  className={cn(
                    "text-sm",
                    activeIndex === index ? "text-orange-500" : "text-gray-400"
                  )}
                >
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center mt-10 space-y-2 relative">
          <div className="w-0.5 h-8 bg-gray-500 absolute top-0"></div>
          <span className="text-sm text-gray-400 mt-8">Members</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={members[activeIndex].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-10 max-w-5xl px-10"
          >
            <div className="flex items-center gap-10">
              <div className="relative w-64 h-64 overflow-hidden rounded-full bg-orange-500">
                <img
                  src={members[activeIndex].image}
                  alt={members[activeIndex].name}
                  className="absolute bottom-0 w-full object-cover grayscale"
                />
              </div>

              <div className="max-w-xl">
                <h2 className="text-3xl font-light">
                  {members[activeIndex].name.split(" ")[0]} <br />
                  <span className="font-bold">
                    {members[activeIndex].name.split(" ")[1] || ""}
                  </span>
                </h2>
                <p className="text-sm text-orange-500 mt-2">
                  {members[activeIndex].role}
                </p>
                <p className="mt-4 text-gray-300">
                  {members[activeIndex].description}
                </p>
              </div>
            </div>

            <div className="flex justify-center w-full mt-6">
              <div className="flex space-x-4 text-orange-500 text-xl">
                {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border border-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
                  >
                    <Icon />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileNav;
