import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {
  const navigate = useNavigate();
  return (
    <main className='relative flex flex-col items-center justify-center text-center py-28 px-6 bg-gradient-to-b dark:bg-gradient-to-t from-gray-100 to-white dark:from-gray-900 dark:to-gray-950'>
      <div className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]' />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='max-w-3xl'
      >
        <h1 className='text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
          Propel your{" "}
          <span className='text-blue-600 dark:text-blue-400'>productivity</span>
        </h1>
        <p className='mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
          Welcome to{" "}
          <span className='font-semibold text-gray-900 dark:text-white'>
            Propella
          </span>{" "}
          — the platform designed to help you streamline tasks, organize
          priorities, and reach goals faster than ever.
        </p>

        <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            onClick={() => navigate("/register")}
            size='lg'
            className='rounded-2xl px-6 py-6 text-lg'
          >
            Get Started
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
          <Button
            onClick={() => navigate("/login")}
            size='lg'
            variant='outline'
            className='rounded-2xl px-6 py-6 text-lg'
          >
            Learn More
          </Button>
        </div>
      </motion.div>

      <div className='absolute -bottom-20 left-1/2 -translate-x-1/2 w-[90%] h-48 bg-grid-gray-200 dark:bg-grid-gray-800 [mask-image:linear-gradient(to_top,white,transparent)] dark:[mask-image:linear-gradient(to_top,black,transparent)]' />
    </main>
  );
};

export default LandingHero;
