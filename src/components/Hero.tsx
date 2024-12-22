import React, { useState, useCallback, useEffect } from "react";
import { BsGiftFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { FadeRight, FadeLeft, FadeUp } from "../utils/animation";
import { Meals } from "../types/SafeRecipe";
import { useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { FaBowlFood } from "react-icons/fa6";
import Container from "./Container";
import EmptyState from "../components/EmptyState";

const Hero: React.FC = () => {
  const [trigger, setTrigger] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isImageVisible, setImageVisible] = useState(false);
  const navigate = useNavigate();

  const resetTrigger = useCallback(() => {
    setTrigger(false);
  }, []);

  const { data, isLoading, error } = useFetchData<Meals>(
    "https://www.themealdb.com/api/json/v1/1/random.php",
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
      setImageVisible(true);
    }
  }, [isLoading]);

  const handleSurpriseClick = () => {
    setImageVisible(false);
    setTrigger(true);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  // ----------------------
  // 1) Handle errors first
  // ----------------------
  if (error) {
    return (
      <Container>
        <motion.div
          variants={FadeUp(0.5)}
          initial="hidden"
          animate="visible"
        >
          <EmptyState
            title="Something went wrong"
            subtitle={error}
          />
        </motion.div>
      </Container>
    );
  }

  // --------------------------------------------
  // 2) Handle the scenario where no data is found
  // --------------------------------------------
  const meal = data?.meals?.[0];
  if (!isLoading && !meal) {
    return (
      <Container>
        <motion.div
          variants={FadeUp(0.5)}
          initial="hidden"
          animate="visible"
        >
          <EmptyState
            title="No recipe found"
            subtitle="Try again or check your connection."
          />
        </motion.div>
      </Container>
    );
  }

  return (
    <>
      <section>
        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[640px] relative">
          {/* ______ Info ______ */}
          <div className="flex flex-col justify-center py-8 md:py-0 mt-20 md:mt-0 relative z-20">
            <div className="text-center md:text-left space-y-6 lg:max-w-[400px] mt-20">
              <motion.h1
                key={animationKey}
                variants={FadeRight(0.6)}
                initial="hidden"
                animate="visible"
                className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-normal font-averia"
              >
                {isLoading
                  ? "Fetching a random recipe..."
                  : meal?.strMeal || "No recipe found."}
              </motion.h1>

              <motion.p
                variants={FadeRight(0.9)}
                key={animationKey + 3}
                initial="hidden"
                animate="visible"
                className="text-2xl tracking-wide text-neutral-500"
              >
                {meal?.strCategory}, {meal?.strArea}
              </motion.p>

              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
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

                <div className="flex justify-center md:justify-start">
                  <motion.button
                    key={animationKey + 1}
                    variants={FadeRight(1)}
                    initial="hidden"
                    animate="visible"
                    className="btn flex items-center gap-2"
                    onClick={() => navigate(`/listings/${meal?.idMeal}`)}
                  >
                    <span>
                      <FaBowlFood className="text-xl" />
                    </span>
                    Know more
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* ______ Image ______ */}
          <div className="flex justify-center items-center mt-10">
            {isImageVisible && (
              <motion.img
                key={animationKey + 2}
                variants={FadeLeft(1)}
                initial={{ opacity: 0, x: 200, rotate: 75 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                src={meal?.strMealThumb}
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
