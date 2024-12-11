import { motion } from "framer-motion";
import { features } from "../components/WelcomePage/data";
import FeatureCard from "../components/WelcomePage/Features";

export default function WelcomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.main
      className="flex overflow-hidden flex-col items-end bg-[#0A6EA9] h-screen p-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
    >
      <div className="w-full flex items-center justify-center flex-col pt-20">
        <h1 className="text-4xl font-bold text-center text-[#FFFFFF]">
          WELCOME TO BRIGHTMART
        </h1>
        <p className="text-center text-[#DBEBFC] w-[300px]">
          where you illuminate your shopping experience.
        </p>
      </div>

      <section className="self-stretch mt-20 ">
        <div className="flex gap-5 max-md:flex-col">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
            >
              <FeatureCard
                icon={feature.icon}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </section>

      <button
        className="px-3 py-3 mt-14 text-xl font-extrabold text-center text-[#DBEBFC] bg-[#34BCF4] rounded-2xl hover:scale-105 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
        onClick={() => (window.location.href = "auth/signUp")}
      >
        Start Shopping
      </button>
    </motion.main>
  );
}
