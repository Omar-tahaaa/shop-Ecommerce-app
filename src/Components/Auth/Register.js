import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { validateForm } from "./ValidateForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";

import "./auth.scss";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
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
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
          formData.confirmPassword
        );
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        setRegisterError("failed to create account");
      }
    }
  }

  return (
    <div className="formBody">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3 className="create-acc">CREATE ACCOUNT</h3>
        {registerError && (
          <p className="text-center mt-2 mb-2 text-danger">{registerError}</p>
        )}
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>
        <button class="red" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "SIGN UP"}
        </button>
        <p className="footerLine">
          Have already an account? <Link to={"/login"}>Login here</Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default Register;
