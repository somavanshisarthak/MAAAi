import React, { useMemo, useState } from "react";
import userPic from "../assets/user_pic.png";

type PatientProfile = {
  name: string;
  age: number;
  height: string;
  weight: string;
  bloodGroup: string;
  trimester: string;
  image: string;
};

const Profile: React.FC = () => {
  const initialPatient = useMemo<PatientProfile>(
    () => ({
      name: "Sita Devi",
      age: 26,
      height: "160 cm",
      weight: "60 kg",
      bloodGroup: "O+",
      trimester: "Second Trimester",
      image: userPic,
    }),
    []
  );

  const [patient, setPatient] = useState<PatientProfile>(initialPatient);
  const [draft, setDraft] = useState<PatientProfile>(initialPatient);
  const [isEditing, setIsEditing] = useState(false);

  const startEdit = () => {
    setDraft(patient);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(patient);
    setIsEditing(false);
  };

  const saveEdit = () => {
    setPatient(draft);
    setIsEditing(false);
  };

  return (
    <div className="w-full h-full p-4 md:p-8 flex items-start justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center relative border border-gray-50">
        
        {/* Action Buttons */}
        {!isEditing ? (
          <button
            onClick={startEdit}
            className="absolute top-6 right-6 text-sm font-semibold text-teal-600 hover:text-teal-700 transition"
          >
            Edit
          </button>
        ) : (
          <div className="absolute top-6 right-6 flex items-center gap-3">
            <button
              onClick={cancelEdit}
              className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={saveEdit}
              className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition"
            >
              Save
            </button>
          </div>
        )}

        {/* Profile Image */}
        <div className="flex justify-center mb-5 mt-2">
          <img
            src={patient.image}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-teal-50 object-cover shadow-sm"
          />
        </div>

        {/* Name & Trimester */}
        <div className="mb-8">
          {!isEditing ? (
            <>
              <h1 className="text-2xl font-bold text-gray-800">{patient.name}</h1>
              <p className="text-teal-600 font-medium text-sm mt-1">{patient.trimester}</p>
            </>
          ) : (
            <div className="space-y-3 px-4">
              <input
                value={draft.name}
                onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                className="w-full text-center text-xl font-bold text-gray-800 border-b-2 border-teal-100 focus:border-teal-500 focus:outline-none bg-transparent px-2 py-1"
                placeholder="Name"
              />
              <input
                value={draft.trimester}
                onChange={(e) => setDraft((p) => ({ ...p, trimester: e.target.value }))}
                className="w-full text-center text-sm font-medium text-teal-600 border-b-2 border-teal-100 focus:border-teal-500 focus:outline-none bg-transparent px-2 py-1"
                placeholder="Trimester"
              />
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Age */}
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Age</span>
            {!isEditing ? (
              <span className="text-lg font-semibold text-gray-800">{patient.age} yrs</span>
            ) : (
              <input
                value={String(draft.age)}
                onChange={(e) =>
                  setDraft((p) => ({
                    ...p,
                    age: Number(e.target.value.replace(/[^\d]/g, "")) || 0,
                  }))
                }
                className="w-full text-center text-base font-semibold text-gray-800 border-b border-gray-300 focus:border-teal-500 focus:outline-none bg-transparent"
              />
            )}
          </div>

          {/* Blood Group */}
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Blood Group</span>
            {!isEditing ? (
              <span className="text-lg font-semibold text-gray-800">{patient.bloodGroup}</span>
            ) : (
              <input
                value={draft.bloodGroup}
                onChange={(e) => setDraft((p) => ({ ...p, bloodGroup: e.target.value }))}
                className="w-full text-center text-base font-semibold text-gray-800 border-b border-gray-300 focus:border-teal-500 focus:outline-none bg-transparent"
              />
            )}
          </div>

          {/* Height */}
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Height</span>
            {!isEditing ? (
              <span className="text-lg font-semibold text-gray-800">{patient.height}</span>
            ) : (
              <input
                value={draft.height}
                onChange={(e) => setDraft((p) => ({ ...p, height: e.target.value }))}
                className="w-full text-center text-base font-semibold text-gray-800 border-b border-gray-300 focus:border-teal-500 focus:outline-none bg-transparent"
              />
            )}
          </div>

          {/* Weight */}
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Weight</span>
            {!isEditing ? (
              <span className="text-lg font-semibold text-gray-800">{patient.weight}</span>
            ) : (
              <input
                value={draft.weight}
                onChange={(e) => setDraft((p) => ({ ...p, weight: e.target.value }))}
                className="w-full text-center text-base font-semibold text-gray-800 border-b border-gray-300 focus:border-teal-500 focus:outline-none bg-transparent"
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
