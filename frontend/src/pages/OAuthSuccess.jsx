import { useEffect, useRef } from "react";

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
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const role = params.get("role");

    const selectedRole = localStorage.getItem("selectedRole");

    if (!token) {
      alert("Google login failed.");
      window.location.replace("/login");
      return;
    }

    const payload = parseJwt(token);

    if (!payload) {
      alert("Invalid token.");
      window.location.replace("/login");
      return;
    }

    // Role mismatch
    if (
      selectedRole &&
      role &&
      selectedRole !== role
    ) {
      localStorage.removeItem("selectedRole");

      alert(
        `This Google account belongs to a ${role}. Please select the correct role.`
      );

      window.location.replace("/login");
      return;
    }

    const user = {
      username: payload.sub,
      email: payload.email || "",
      role: role || payload.role,
    };

    localStorage.setItem("jwtToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("username", user.username);

    localStorage.removeItem("selectedRole");

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