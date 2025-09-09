import LandingHero from "../components/landing/LandingHero"
import LandingNavbar from "../components/landing/LandingNavbar"
import LandingFeature from "../components/landing/LandingFeature"
import LandingFooter from "../components/landing/LandingFooter"

const Home = () => {
  return (
    <>
      <LandingNavbar/>
      <LandingHero/>
      <LandingFeature/>
      <LandingFooter/>
    </>
  )
}

export default Home
