import React, { useState, useEffect } from 'react';
import { Baby, Moon, HeartPulse, Droplets, Shield, Syringe, CheckSquare, Square } from 'lucide-react';

const careTips = [
  {
    title: "Exclusive Breastfeeding",
    description: "Exclusive breastfeeding for the first 6 months is crucial for immunity and growth.",
    icon: <Droplets className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Warmth & Comfort",
    description: "Keep the baby warm and maintain regular skin-to-skin contact.",
    icon: <HeartPulse className="w-6 h-6 text-rose-500" />
  },
  {
    title: "Hygiene",
    description: "Maintain strict hygiene while handling the baby to prevent infections.",
    icon: <Shield className="w-6 h-6 text-emerald-500" />
  },
  {
    title: "Kangaroo Mother Care ",
    description: "Evidence-based method of care for preterm and low birth weight (LBW) babies, involving skin-to-skin contact between the mother (or caregiver) and the baby.",
    icon: <Moon className="w-6 h-6 text-indigo-500" />
  },
  {
    title: "Pediatric Checkups",
    description: "Regular pediatric checkups and monitor baby's weight and feeding patterns.",
    icon: <Baby className="w-6 h-6 text-teal-500" />
  }
];

const initialVaccines = [
  { id: "vcf-1", name: "BCG", age: "At Birth" },
  { id: "vcf-2", name: "OPV", age: "At Birth" },
  { id: "vcf-3", name: "Hepatitis B", age: "At Birth" },
  { id: "vcf-4", name: "DPT", age: "6 Weeks" },
  { id: "vcf-5", name: "Polio", age: "6 Weeks" },
  { id: "vcf-6", name: "Measles", age: "9 Months" }
];

const BabyCare: React.FC = () => {
  const [completedVaccines, setCompletedVaccines] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('vaccination_checklist');
    if (saved) {
      try {
        setCompletedVaccines(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse vaccination checklist", e);
      }
    }
  }, []);

  const toggleVaccine = (id: string) => {
    let newCompleted: string[];
    if (completedVaccines.includes(id)) {
      newCompleted = completedVaccines.filter(vId => vId !== id);
    } else {
      newCompleted = [...completedVaccines, id];
    }
    setCompletedVaccines(newCompleted);
    localStorage.setItem('vaccination_checklist', JSON.stringify(newCompleted));
  };

  return (
    <div className="min-h-full bg-slate-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Baby Care & Vaccination Tracker</h1>
          <p className="text-slate-500 mt-2">Essential post-birth guidance and immunization checklist.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Post-Birth Baby Care Tips */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <Baby className="w-6 h-6 text-teal-600" />
              Post-Birth Baby Care Tips
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {careTips.map((tip, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-slate-50 rounded-xl shrink-0">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800">{tip.title}</h3>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vaccination Checklist */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <Syringe className="w-6 h-6 text-indigo-600" />
              Vaccination Checklist
            </h2>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <span className="font-semibold text-slate-700">Track Progress</span>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {completedVaccines.length} / {initialVaccines.length} Completed
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {initialVaccines.map((vaccine) => {
                  const isCompleted = completedVaccines.includes(vaccine.id);
                  return (
                    <div
                      key={vaccine.id}
                      onClick={() => toggleVaccine(vaccine.id)}
                      className={`p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-colors ${isCompleted ? 'bg-indigo-50/30' : 'hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-4">
                        <button
                          className={`shrink-0 focus:outline-none transition-colors ${isCompleted ? 'text-indigo-600' : 'text-slate-300 hover:text-indigo-400'}`}
                        >
                          {isCompleted ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                        </button>
                        <div>
                          <p className={`font-semibold transition-colors ${isCompleted ? 'text-indigo-900 line-through opacity-70' : 'text-slate-800'}`}>
                            {vaccine.name}
                          </p>
                          <p className="text-sm text-slate-500 font-medium">{vaccine.age}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BabyCare;
