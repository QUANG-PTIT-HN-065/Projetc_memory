// src/pages/Login.tsx
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import SakuraCanvas from "./components/SakuraCanvas";

export default function Login() {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length !== 8) {
      setError("Mật khẩu phải đúng 8 ký tự.");
      return;
    }

    const success = login(password);

    if (success) {
      navigate("/home", { replace: true });
    } else {
      setError("Mật khẩu không chính xác.");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        padding: "0px",
      }}
    >
      {/* Background Sakura */}
      <SakuraCanvas />

      {/* Overlay tối nhẹ để dễ đọc */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          padding: "0px",
        }}
      />

      {/* Form Login */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "360px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "20px",
            padding: "36px 32px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
            color: "#fff",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              margin: "0 0 8px",
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            🌸 Welcome
          </h1>

          <p
            style={{
              textAlign: "center",
              marginBottom: "28px",
              fontSize: "14px",
              opacity: 0.9,
            }}
          >
            Nhập mật khẩu để truy cập website
          </p>

          <input
            type="password"
            placeholder="Nhập mật khẩu 8 ký tự"
            value={password}
            maxLength={8}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              outline: "none",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <p
              style={{
                color: "#fecaca",
                fontSize: "13px",
                marginTop: "10px",
                marginBottom: "0",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #f9a8d4 100%)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(236,72,153,0.35)",
            }}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
