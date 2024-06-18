import signupImg from "../assets/Images/signup.png"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join the Astrowala Community and Unlock Your Cosmic Potential"
      description1="Explore the ancient wisdom of astrology for a brighter future."
      // description2="Courses to guide your journey of self-discovery and personal growth."
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup
