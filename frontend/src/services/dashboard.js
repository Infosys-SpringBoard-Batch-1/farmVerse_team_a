import api from "./api";

export async function getAdminDashboard() {
  try {
    const response = await api.get("/admin/dashboard");

    return {
      status: "ok",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error.response?.data?.message ||
        "Unable to load dashboard data",
    };
  }
}