import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAllCrops } from "../../services/crop";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEdit } from "react-icons/fa";

export default function ViewAllCrops() {

    const navigate = useNavigate();

    const [crops, setCrops] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCrops();
    }, []);

    const loadCrops = async () => {

        try {

            const response = await getAllCrops();

            setCrops(response);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

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

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-green-700 mb-6"
            >
                <FaArrowLeft />
                Back
            </button>

            <h1 className="text-4xl font-bold text-green-700 mb-8">
                All Crops
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {crops.map((crop) => (

                    <div
                        key={crop.cropId}
                        className="bg-white rounded-xl shadow-lg border overflow-hidden"
                    >

                        <img
                            src={`https://loremflickr.com/600/400/${crop.cropName}`}
                            alt={crop.cropName}
                            className="w-full h-52 object-cover"
                        />

                        <div className="p-5">

                            <h2 className="text-2xl font-bold text-green-700">
                                {crop.cropName}
                            </h2>

                            <p><strong>Farm:</strong> {crop.farmName}</p>

                            <p><strong>Type:</strong> {crop.cropType}</p>

                            <p><strong>Quantity:</strong> {crop.quantity}</p>

                            <div className="grid grid-cols-2 gap-2 mt-5">

                                <button
                                    onClick={() => navigate(`/crop/${crop.cropId}`)}
                                    className="bg-blue-600 text-white rounded-lg py-2 flex justify-center items-center gap-2"
                                >
                                    <FaEye />
                                    View
                                </button>

                                <button
                                    onClick={() => navigate(`/crop/edit/${crop.cropId}`)}
                                    className="bg-yellow-500 text-white rounded-lg py-2 flex justify-center items-center gap-2"
                                >
                                    <FaEdit />
                                    Edit
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </DashboardLayout>

    );

}