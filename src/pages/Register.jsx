import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { handleRegister } from "../helper/Auth.helper";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <main className="relative flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Background radial glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
            Join{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Propella
            </span>{" "}
            and boost your productivity
          </p>

          <div className="mt-8 space-y-4">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />

            <Button
              onClick={() => handleRegister(username, email, password, navigate)}
              className="w-full mt-2 py-6 text-lg rounded-xl"
            >
              Register
            </Button>
          </div>

          <p className="text-sm text-center mt-6 text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Bottom grid for style */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[90%] h-48 bg-grid-gray-200 dark:bg-grid-gray-800 [mask-image:linear-gradient(to_top,white,transparent)] dark:[mask-image:linear-gradient(to_top,black,transparent)]" />
    </main>
  );
};

export default Register;
