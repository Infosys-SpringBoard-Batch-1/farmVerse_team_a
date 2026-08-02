import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getCropById, updateCrop } from "../../services/crop";

export default function EditCrop() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        cropName: "",
        cropType: "",
        quantity: "",
        sowingDate: "",
        harvestDate: ""
    });

    useEffect(() => {
        loadCrop();
    }, []);

    const loadCrop = async () => {

        try {

            const response = await getCropById(id);

            const crop = response.crop;

            setForm({
                cropName: crop.cropName,
                cropType: crop.cropType,
                quantity: crop.quantity,
                sowingDate: crop.sowingDate,
                harvestDate: crop.harvestDate
            });

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateCrop(id, form);

            alert("Crop updated successfully.");

            navigate(-1);

        } catch (err) {

            console.log(err);

            alert("Failed to update crop.");

        }

    };

    if (loading) {

        return (
            <DashboardLayout>
                <div className="text-center py-20">
                    Loading...
                </div>
            </DashboardLayout>
        );

    }

    return (

        <DashboardLayout>

            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-green-700 mb-8">
                    Edit Crop
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        name="cropName"
                        value={form.cropName}
                        onChange={handleChange}
                        placeholder="Crop Name"
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        name="cropType"
                        value={form.cropType}
                        onChange={handleChange}
                        placeholder="Crop Type"
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="date"
                        name="sowingDate"
                        value={form.sowingDate}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="date"
                        name="harvestDate"
                        value={form.harvestDate}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                    >
                        Update Crop
                    </button>

                </form>

            </div>

        </DashboardLayout>

    );

}