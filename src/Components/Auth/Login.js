import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";

import "./auth.scss";
import { MdLock } from "react-icons/md";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setLoading(false);
      navigate("/cart");
    } catch (error) {
      setLoading(false);
      setLoginError("invalid credationals");
    }
  }

  return (
    <div className="formBody">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Login</h3>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="red" type="submit" disabled={loading}>
          {loading ? (
            "Logging in..."
          ) : (
            <>
              <MdLock className="icon" /> LOG IN
            </>
          )}
        </button>

        <p className="footerLine">
          Not registered? <Link to={"/register"}>Create an account</Link>{" "}
        </p>

        {loginError && <div className="footerLine">{loginError}</div>}
      </form>
    </div>
  );
}

export default Login;
