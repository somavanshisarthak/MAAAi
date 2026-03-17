import React from 'react';
import { HeartPulse, Baby, Shield, CheckCircle2 } from 'lucide-react';

const careTips = [
  "Ensure proper rest and nutrition for the mother",
  "Maintain hygiene to prevent infections",
  "Monitor bleeding and seek medical help if excessive",
  "Encourage breastfeeding within the first hour after birth",
  "Regular postnatal checkups"
];

const newbornTips = [
  "Exclusive breastfeeding for the first 6 months",
  "Keep the baby warm",
  "Maintain proper hygiene",
  "Monitor baby's weight and feeding"
];

const vaccinationSchedule = [
  { vaccine: "BCG", age: "At Birth" },
  { vaccine: "OPV", age: "At Birth" },
  { vaccine: "Hepatitis B", age: "At Birth" },
  { vaccine: "DPT", age: "6 Weeks" },
  { vaccine: "Polio", age: "6 Weeks" },
  { vaccine: "Measles", age: "9 Months" }
];

const PatientCare: React.FC = () => {
  return (
    <div className="min-h-full bg-slate-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Post-Birth Care & Vaccination Guide</h1>
          <p className="text-slate-500 mt-2">Essential guidelines for maternal and newborn health.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Post-Birth Care Tips */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                <HeartPulse size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Post-Birth Care</h2>
            </div>
            <ul className="space-y-4">
              {careTips.map((tip, index) => (
                <li key={index} className="flex flex-row items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 font-medium">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newborn Care */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Baby size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Newborn Care</h2>
            </div>
            <ul className="space-y-4">
              {newbornTips.map((tip, index) => (
                <li key={index} className="flex flex-row items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 font-medium">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Vaccination Schedule */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Shield size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Vaccination Schedule</h2>
          </div>
          
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold border-b border-slate-100">Vaccine</th>
                  <th className="p-4 font-semibold border-b border-slate-100">Age</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {vaccinationSchedule.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-semibold text-slate-800">{item.vaccine}</td>
                    <td className="p-4 text-slate-600 font-medium">{item.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PatientCare;
