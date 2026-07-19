import { useEffect, useState } from "react";

function FarmerForm({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || "",
        username: initialData.username || "",
        email: initialData.email || "",
        password: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.username.trim() ||
      !formData.email.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!isEdit && !formData.password.trim()) {
      alert("Password is required.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-green-700">
        {isEdit ? "Edit Farmer" : "Add Farmer"}
      </h2>

      {/* Full Name */}

      <div>
        <label className="block mb-2 font-medium">
          Full Name
        </label>

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Enter full name"
        />
      </div>

      {/* Username */}

      <div>
        <label className="block mb-2 font-medium">
          Username
        </label>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          disabled={isEdit}
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none disabled:bg-gray-100"
          placeholder="Enter username"
        />
      </div>

      {/* Email */}

      <div>
        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Enter email"
        />
      </div>

      {/* Password */}

      <div>
        <label className="block mb-2 font-medium">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
          placeholder={
            isEdit
              ? "Leave blank to keep current password"
              : "Enter password"
          }
        />
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
        >
          {isEdit ? "Update Farmer" : "Add Farmer"}
        </button>
      </div>
    </form>
  );
}

export default FarmerForm;