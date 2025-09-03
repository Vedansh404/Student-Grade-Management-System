import { useState } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";
const URL =
  "https://student-grade-management-system-production-ab81.up.railway.app";
export default function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const allowedTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only .csv or .xlsx files are allowed!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ File uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("❌ File upload failed!");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-200 transition">
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <UploadCloud className="w-5 h-5 text-blue-600" />
        <span className="text-gray-700">
          {file ? file.name : "Choose file..."}
        </span>
      </label>

      <button
        type="submit"
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow transition"
      >
        Upload
      </button>
    </div>
  );
}
