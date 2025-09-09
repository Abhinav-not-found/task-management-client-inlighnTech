import { Facebook, Twitter, Github, Linkedin } from "lucide-react"

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Propella</h3>
          <p className="mt-4 text-sm text-gray-400">
            Propel your productivity with a platform built to keep you moving forward.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">Integrations</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between border-t border-gray-700 pt-6">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Propella. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-white"><Facebook size={18} /></a>
          <a href="#" className="hover:text-white"><Twitter size={18} /></a>
          <a href="#" className="hover:text-white"><Linkedin size={18} /></a>
          <a href="#" className="hover:text-white"><Github size={18} /></a>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter
