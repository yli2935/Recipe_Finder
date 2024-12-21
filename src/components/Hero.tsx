import React, { useState, useCallback, useEffect } from "react";
import { BsGiftFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { FadeRight, FadeLeft } from "../utils/animation";
import { Meals } from "../types/SafeRecipe";
import { useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";

const Hero: React.FC = () => {
  const [trigger, setTrigger] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // State to control animation re-trigger
  const [isImageVisible, setImageVisible] = useState(false); // Control image visibility
  const navigate = useNavigate();

  const resetTrigger = useCallback(() => {
    setTrigger(false);
  }, []);

  const { data, isLoading, error } = useFetchData<Meals>(
    `https://www.themealdb.com/api/json/v1/1/random.php`,
    { method: "GET" },
    {},
    trigger,
    resetTrigger,
    500
  );

  useEffect(() => {
    setTrigger(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setImageVisible(true); // Show image once loading is complete
    }
  }, [isLoading]);

  const handleSurpriseClick = () => {
    setImageVisible(false); // Hide the image before fetching new data
    setTrigger(true); // Trigger data fetch
    setAnimationKey((prevKey) => prevKey + 1); // Update key to re-trigger animation
  };

  return (
    <>
      <section>
        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
          {/* ______ Info ______ */}
          <div className="flex flex-col justify-center py-8 md:py-0 mt-20 md:mt-0 relative z-10">
            <div className="text-center md:text-left space-y-6 lg:max-w-[400px]">
              <motion.h1
                key={animationKey}
                variants={FadeRight(0.6)}
                initial="hidden"
                animate="visible"
                className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-normal font-averia"
              >
                {isLoading
                  ? "Fetching a random recipe..."
                  : data?.meals?.[0]?.strMeal || "No recipe found."}
              </motion.h1>

              <motion.p
                variants={FadeRight(0.9)}
                key={animationKey + 3}
                initial="hidden"
                animate="visible"
                className="text-2xl tracking-wide text-neutral-500"
              >
                {data?.meals?.[0]?.strCategory}, {data?.meals?.[0]?.strArea}
              </motion.p>

              <div className="flex justify-center md:justify-start">
                <motion.button
                  key={animationKey + 1}
                  variants={FadeRight(1)}
                  initial="hidden"
                  animate="visible"
                  className="btn flex items-center gap-2"
                  onClick={handleSurpriseClick}
                >
                  <span>
                    <BsGiftFill className="text-xl" />
                  </span>
                  Surprise Me!
                </motion.button>
              </div>

            </div>
          </div>

          {/* ______ Image ______ */}
          <div className="flex justify-center items-center">
            {isImageVisible && (
              <motion.img
                key={animationKey + 2}
                variants={FadeLeft(1)}
                initial={{ opacity: 0, x: 200, rotate: 75 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                src={data?.meals?.[0]?.strMealThumb}
                alt="Hero Image"
                className="w-[350px] md:w-[550px] drop-shadow border-[12px] border-white rounded-lg mt-20"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
