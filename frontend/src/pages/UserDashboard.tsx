import React from 'react';
import { Apple, Calendar, Dumbbell, HeartPulse, Pill, Scan, User } from 'lucide-react';
import AiChatBubble from '../components/AiChatBubble';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UserDashboard: React.FC = () => {
  const patient = {
    name: 'Sita Devi',
    age: 26,
    pregnancyWeek: 22,
    trimester: 'Second Trimester',
    risk: 'Low Risk' as 'Low Risk' | 'Medium Risk' | 'High Risk',
  };

  const healthMetrics = {
    bloodPressure: '120/80',
    hemoglobin: '11.5 g/dL',
    weight: '60 kg',
  };

  const patientHistory: Array<{
    date: string;
    bloodPressure: number; // systolic for the graph + table
    hemoglobin: number;
    doctor: string;
  }> = [
    { date: '10 Jan', bloodPressure: 118, hemoglobin: 10.8, doctor: 'Dr. Sharma' },
    { date: '28 Jan', bloodPressure: 120, hemoglobin: 11.0, doctor: 'Dr. Mehta' },
    { date: '12 Feb', bloodPressure: 119, hemoglobin: 11.2, doctor: 'Dr. Sharma' },
    { date: '25 Feb', bloodPressure: 121, hemoglobin: 11.3, doctor: 'Dr. Mehta' },
    { date: '05 Mar', bloodPressure: 117, hemoglobin: 11.5, doctor: 'Dr. Sharma' },
  ];

  const medicines = [
    { name: 'Iron Tablet', dosage: '1 tablet after lunch', time: '2:00 PM' },
    { name: 'Folic Acid', dosage: '1 tablet morning', time: '9:00 AM' },
  ];

  const medicalHistory = [
    { date: '10 Jan 2025', condition: 'Mild Anemia', doctor: 'Dr. Sharma' },
    { date: '28 Jan 2025', condition: 'Low Blood Pressure', doctor: 'Dr. Mehta' },
  ];

  const medications = [
    { name: 'Iron Tablet', dosage: '1 tablet daily', time: 'After Lunch' },
    { name: 'Folic Acid', dosage: '1 tablet daily', time: 'Morning' },
  ];

  const usgRecords = [
    { date: '12 Jan 2025', result: 'Normal fetal growth' },
    { date: '18 Feb 2025', result: 'Normal heartbeat detected' },
  ];

  const nutritionDiet = [
    'Iron rich foods (spinach, lentils)',
    'Drink at least 3L water daily',
    'Eat fruits and vegetables',
  ];

  const exercise = ['20 minute walking daily', 'Light prenatal yoga', 'Breathing exercises'];

  const visits = [
    { date: '10 Jan 2025', doctor: 'Dr. Sharma', purpose: 'Routine Checkup' },
    { date: '12 Feb 2025', doctor: 'Dr. Mehta', purpose: 'Blood test review' },
  ];

  const riskBadgeClass =
    patient.risk === 'Low Risk'
      ? 'bg-green-50 text-green-700 ring-green-200'
      : patient.risk === 'Medium Risk'
        ? 'bg-yellow-50 text-yellow-800 ring-yellow-200'
        : 'bg-red-50 text-red-700 ring-red-200';

  return (
    <div className="h-full p-6 md:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              MAAAi Dashboard
            </h1>
            <p className="text-gray-500">Your pregnancy overview, records, and reminders.</p>
          </div>
          <div className="inline-flex items-center gap-2">
            <span className="text-sm text-gray-500">Risk</span>
            <span
              className={[
                'inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ring-1 ring-inset',
                riskBadgeClass,
              ].join(' ')}
            >
              {patient.risk}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Patient Information */}
          <section className="bg-white shadow rounded-xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-teal-50 text-teal-700">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Patient Information</h2>
                  <p className="text-sm text-gray-500">Basic profile details</p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Name</span>
                <span className="text-sm font-semibold text-gray-900">{patient.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Age</span>
                <span className="text-sm font-semibold text-gray-900">{patient.age}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Pregnancy Week</span>
                <span className="text-sm font-semibold text-gray-900">
                  Week {patient.pregnancyWeek}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Trimester</span>
                <span className="text-sm font-semibold text-gray-900">{patient.trimester}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Risk Level</span>
                <span
                  className={[
                    'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
                    riskBadgeClass,
                  ].join(' ')}
                >
                  {patient.risk}
                </span>
              </div>
            </div>
          </section>

          {/* Health Metrics */}
          <section className="bg-white shadow rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-rose-50 text-rose-700">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Health Metrics</h2>
                <p className="text-sm text-gray-500">Latest measurements</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-lg border border-gray-100 p-4">
                <div className="text-sm text-gray-500">Blood Pressure</div>
                <div className="mt-1 text-xl font-semibold text-gray-900">
                  {healthMetrics.bloodPressure}
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 p-4">
                <div className="text-sm text-gray-500">Hemoglobin</div>
                <div className="mt-1 text-xl font-semibold text-gray-900">
                  {healthMetrics.hemoglobin}
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 p-4">
                <div className="text-sm text-gray-500">Weight</div>
                <div className="mt-1 text-xl font-semibold text-gray-900">
                  {healthMetrics.weight}
                </div>
              </div>
            </div>
          </section>

          {/* Medicine Reminder */}
          <section className="bg-white shadow rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-indigo-50 text-indigo-700">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Medicine Reminders</h2>
                <p className="text-sm text-gray-500">Today’s schedule</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {medicines.map((m) => (
                <div
                  key={`${m.name}-${m.time}`}
                  className="flex items-start justify-between gap-4 rounded-lg border border-gray-100 p-4"
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                    <div className="mt-1 text-sm text-gray-500">{m.dosage}</div>
                  </div>
                  <div className="shrink-0 text-sm font-semibold text-gray-900">{m.time}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Patient Records</h2>
              <p className="text-sm text-gray-500">Clinical notes, guidance, and follow-ups</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Medical History */}
            <section className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-rose-50 text-rose-700">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Medical History</h3>
                  <p className="text-sm text-gray-500">Conditions & notes</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {medicalHistory.map((item, index) => (
                  <div
                    key={`${item.date}-${item.condition}-${index}`}
                    className="rounded-lg border border-gray-100 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold text-gray-900">{item.condition}</div>
                      <div className="shrink-0 text-xs font-semibold text-gray-700">
                        {item.date}
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">{item.doctor}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Medications */}
            <section className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-indigo-50 text-indigo-700">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Medications</h3>
                  <p className="text-sm text-gray-500">Current prescriptions</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {medications.map((m, index) => (
                  <div
                    key={`${m.name}-${m.time}-${index}`}
                    className="rounded-lg border border-gray-100 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                      <div className="shrink-0 text-xs font-semibold text-gray-700">{m.time}</div>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">{m.dosage}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* USG Records */}
            <section className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-amber-50 text-amber-700">
                  <Scan className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">USG Records</h3>
                  <p className="text-sm text-gray-500">Ultrasound summaries</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {usgRecords.map((u, index) => (
                  <div key={`${u.date}-${index}`} className="rounded-lg border border-gray-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold text-gray-900">USG Result</div>
                      <div className="shrink-0 text-xs font-semibold text-gray-700">{u.date}</div>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">{u.result}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Nutrition & Diet */}
            <section className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-emerald-50 text-emerald-700">
                  <Apple className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Nutrition & Diet</h3>
                  <p className="text-sm text-gray-500">Daily recommendations</p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {nutritionDiet.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-teal-500" aria-hidden="true" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Exercise */}
            <section className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-sky-50 text-sky-700">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Exercise</h3>
                  <p className="text-sm text-gray-500">Safe routine suggestions</p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {exercise.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-teal-500" aria-hidden="true" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Visits & Followups */}
            <section className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-violet-50 text-violet-700">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Visits & Followups</h3>
                  <p className="text-sm text-gray-500">Appointments & purpose</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {visits.map((v, index) => (
                  <div
                    key={`${v.date}-${v.doctor}-${index}`}
                    className="rounded-lg border border-gray-100 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold text-gray-900">{v.purpose}</div>
                      <div className="shrink-0 text-xs font-semibold text-gray-700">{v.date}</div>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">{v.doctor}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-teal-50 text-teal-700">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Blood Pressure Trend</h2>
              <p className="text-sm text-gray-500">Systolic blood pressure over time</p>
            </div>
          </div>

          <div className="mt-5 h-[300px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patientHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bloodPressure"
                  stroke="#14b8a6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      <AiChatBubble />
    </div>
  );
};

export default UserDashboard;
