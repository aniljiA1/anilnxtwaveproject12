// src/pages/Login/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAttachMoney } from "react-icons/md";
import { loginUser } from "../../services/profileApi";
import { useAppContext } from "../../context/AppContext";
import Button from "../../components/common/Button";
import { ROUTES } from "../../utils/constants";
import "./Login.css";

const INITIAL_FORM = { email: "", password: "" };

const validate = ({ email, password }) => {
  const errors = {};
  if (!email.trim()) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";
  return errors;
};

const Login = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    try {
      const data = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });
      console.log("Login response:", data);

      // Response: { users: [{ id, email, name, ... }] }
      const users = data?.users || data?.get_user_id || [];
      if (!users.length) throw new Error("Invalid email or password");

      const user = users[0];
      login({
        userId: user.id,
        email: user.email || form.email,
      });
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      console.error("Login error:", err);
      setApiError(err.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="login-hero-icon">
          <MdAttachMoney />
        </div>
        <h1 className="login-hero-title">Money Matters</h1>
        <p className="login-hero-subtitle">
          Track your income and expenses. Get insights into your spending habits
          and take control of your financial future.
        </p>
      </div>
      <div className="login-form-section">
        <div className="login-form-card">
          <h2 className="login-form-title">Welcome back 👋</h2>
          <p className="login-form-subtitle">
            Sign in to your account to continue
          </p>

          <div
            style={{
              background: "var(--primary-light)",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              color: "var(--primary)",
              marginBottom: 8,
            }}
          >
            <strong>Test:</strong> &nbsp; email: <code>jane.doe@gmail.com</code>{" "}
            &nbsp;|&nbsp; password: <code>janedoe@123</code>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="login-form-group">
              <label className="login-form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`login-form-input${errors.email ? " error" : ""}`}
                placeholder="jane.doe@gmail.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="login-form-error">{errors.email}</span>
              )}
            </div>
            <div className="login-form-group">
              <label className="login-form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`login-form-input${errors.password ? " error" : ""}`}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="login-form-error">{errors.password}</span>
              )}
            </div>
            {apiError && <p className="login-api-error">{apiError}</p>}
            <Button type="submit" fullWidth disabled={isLoading} size="lg">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
