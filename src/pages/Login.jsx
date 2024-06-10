import loginImg from "../assets/Images/login.png"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Discover the wisdom of the stars."
      description2="Astrology insights to guide your journey."
      image={loginImg}
      formType="login"
    />
  );
}

export default Login
