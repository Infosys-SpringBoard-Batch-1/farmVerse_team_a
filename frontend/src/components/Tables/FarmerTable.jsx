import { FaEdit, FaTrash } from "react-icons/fa";

function FarmerTable({
  farmers,
  onEdit,
  onDelete,
}) {
  if (!farmers || farmers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No Farmers Found
        </h2>

        <p className="text-gray-500 mt-2">
          Click <strong>Add Farmer</strong> to create your first farmer.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      <table className="min-w-full">

        <thead className="bg-green-700 text-white">

          <tr>

            <th className="px-6 py-4 text-left">
              Full Name
            </th>

            <th className="px-6 py-4 text-left">
              Username
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {farmers.map((farmer, index) => (

            <tr
              key={farmer.username}
              className={`border-b ${
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50"
              } hover:bg-green-50 transition`}
            >

              <td className="px-6 py-4 font-medium">
                {farmer.fullName}
              </td>

              <td className="px-6 py-4">
                {farmer.username}
              </td>

              <td className="px-6 py-4">
                {farmer.email}
              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(farmer)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(farmer)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default FarmerTable;