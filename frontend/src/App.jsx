import React from "react";
import Upload from "./components/Upload";
import File from "./components/Files";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-md">
          📊 Student Grade Management System
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Easily upload, manage, and track student grades
        </p>
      </header>

      {/* Upload Section */}
      <section className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Upload Files (.csv / .xlsx)
        </h2>
        <Upload />
      </section>

      {/* Files Section */}
      <section className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
        <File />
      </section>
    </div>
  );
};

export default App;
