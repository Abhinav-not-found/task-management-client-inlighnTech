import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png"
import logoDark from "../../assets/logoDark.png"
import { ModeToggle } from "../ui/mode-toggle"
import { useTheme } from "@/components/ui/theme-provider"
import { Button } from "../ui/button"

const LandingNavbar = () => {
  const { theme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 md:px-12">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg">
        <img
          src={theme === "dark" ? logoDark : logo}
          alt="logo"
          className="h-7 w-7"
        />
        <span className="hidden sm:inline-block">Propella</span>
      </Link>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <Button
          variant="default"
          size="sm"
          className="rounded-lg"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </header>
  )
}

export default LandingNavbar
