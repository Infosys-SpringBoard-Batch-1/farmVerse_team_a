import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];

    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    return JSON.parse(window.atob(base64));
  } catch (error) {
    console.error("JWT Parse Error:", error);
    return null;
  }
}

export default function OAuthSuccess() {
  const navigate = useNavigate();

  const hasRun = useRef(false);

  useEffect(() => {
    // Prevent React StrictMode from running twice
    if (hasRun.current) return;
    hasRun.current = true;

    console.log("========== OAUTH SUCCESS ==========");

    // If token already exists, don't process again
    if (localStorage.getItem("jwtToken")) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (user.role === "ADMIN") {
        window.location.replace("/admin/dashboard");
      } else {
        window.location.replace("/farmer/dashboard");
      }

      return;
    }

    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (!token) {
      console.error("No token in URL");
      window.location.replace("/login");
      return;
    }

    const payload = parseJwt(token);

    if (!payload) {
      console.error("Invalid JWT");
      window.location.replace("/login");
      return;
    }

    const user = {
      username: payload.sub,
      email: payload.email || "",
      role: payload.role,
    };

    localStorage.setItem("jwtToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("username", user.username);

    console.log("JWT Saved");
    console.log(user);

    if (user.role === "ADMIN") {
      window.location.replace("/admin/dashboard");
    } else {
      window.location.replace("/farmer/dashboard");
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "22px",
        fontWeight: "600",
      }}
    >
      Signing you in...
    </div>
  );
}