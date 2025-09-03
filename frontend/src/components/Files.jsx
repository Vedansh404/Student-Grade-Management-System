import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
const URL =
  "https://student-grade-management-system-production-ab81.up.railway.app";
export default function Files() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedRows, setEditedRows] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/files`).then((res) => setFiles(res.data));
  }, []);

  const handleSelect = async (id) => {
    if (selectedFile && selectedFile._id === id && isModalOpen) {
      setIsModalOpen(false);
      setSelectedFile(null);
      return;
    }

    const res = await axios.get(`${URL}/file/${id}`);
    const rowsWithPercentage = res.data.rows.map((row) => {
      const marks = parseFloat(row.Marks_Obtained) || 0;
      const total = parseFloat(row.Total_Marks) || 0;
      const percentage =
        total > 0 ? ((marks / total) * 100).toFixed(2) : "0.00";
      return { ...row, percentage };
    });

    setSelectedFile(res.data);
    setEditedRows(rowsWithPercentage);
    setIsModalOpen(true);
  };

  const handleChange = (rowIndex, col, value) => {
    const updatedRows = [...editedRows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [col]: value };

    if (col === "Marks_Obtained" || col === "Total_Marks") {
      const marks = parseFloat(updatedRows[rowIndex].Marks_Obtained) || 0;
      const total = parseFloat(updatedRows[rowIndex].Total_Marks) || 0;
      updatedRows[rowIndex].percentage =
        total > 0 ? ((marks / total) * 100).toFixed(2) : "0.00";
    }

    setEditedRows(updatedRows);
  };

  const handleDelete = (rowIndex) => {
    setEditedRows(editedRows.filter((_, i) => i !== rowIndex));
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    const rowsToSave = editedRows.map(({ percentage, ...rest }) => rest);

    await axios.put(`${URL}/file/${selectedFile._id}`, {
      rows: rowsToSave,
    });

    alert("✅ Changes saved successfully!");
    setSelectedFile({ ...selectedFile, rows: editedRows });
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Uploaded Files</h1>
      <ul className="space-y-3">
        {files.map((f) => (
          <li
            key={f._id}
            className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg shadow-sm"
          >
            <button
              onClick={() => handleSelect(f._id)}
              className="text-blue-600 font-semibold hover:underline"
            >
              {f.filename}
            </button>
            <div className="text-gray-500 text-sm">
              Uploaded: {dayjs(f.updatedAt).format("DD-MM-YYYY, hh:mm A")}
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && selectedFile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-6xl w-full">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedFile.filename}
              </h2>
              <button
                className="text-red-500 font-bold text-lg"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <p className="mb-2 text-gray-600">
              👥 Total Students: <b>{editedRows.length}</b>
            </p>

            <div className="overflow-auto max-h-96 border rounded-lg">
              <table className="table-auto border-collapse w-full">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    {selectedFile.columns.map((col, i) => (
                      <th key={i} className="border px-3 py-2 text-left">
                        {col}
                      </th>
                    ))}
                    <th className="border px-3 py-2">Percentage</th>
                    <th className="border px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {editedRows.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 transition border-b"
                    >
                      {selectedFile.columns.map((col, j) => (
                        <td key={j} className="px-3 py-2">
                          <input
                            type="text"
                            value={row[col] || ""}
                            onChange={(e) =>
                              handleChange(i, col, e.target.value)
                            }
                            className="border rounded-md px-2 py-1 w-full text-sm"
                          />
                        </td>
                      ))}
                      <td className="px-3 py-2 text-center font-semibold text-blue-600">
                        {row.percentage}%
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={() => handleDelete(i)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm shadow"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow font-medium"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg shadow font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
