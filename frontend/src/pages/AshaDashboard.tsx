import React from 'react';
import { 
  Users, AlertTriangle, Activity, CheckCircle, 
  Plus, FileText, List, RefreshCw, User 
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend 
} from 'recharts';

const stats = {
  totalPatients: 42,
  highRisk: 5,
  mediumRisk: 12,
  lowRisk: 25
};

const recentPatients = [
  { id: 1, name: 'Radha Sharma', age: 26, village: 'Rampur', riskLevel: 'High Risk', lastCheckup: '2023-10-24' },
  { id: 2, name: 'Sita Devi', age: 30, village: 'Rampur', riskLevel: 'Medium Risk', lastCheckup: '2023-10-22' },
  { id: 3, name: 'Geeta Patel', age: 24, village: 'Shivnagar', riskLevel: 'Low Risk', lastCheckup: '2023-10-20' },
  { id: 4, name: 'Meena Kumari', age: 28, village: 'Shivnagar', riskLevel: 'Low Risk', lastCheckup: '2023-10-18' },
  { id: 5, name: 'Sunita Verma', age: 32, village: 'Rampur', riskLevel: 'High Risk', lastCheckup: '2023-10-15' },
];

const chartData = [
  { name: 'Low Risk', value: stats.lowRisk, color: '#10b981' }, 
  { name: 'Medium Risk', value: stats.mediumRisk, color: '#f59e0b' }, 
  { name: 'High Risk', value: stats.highRisk, color: '#ef4444' }, 
];

const StatCard = ({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-slate-100 flex items-center gap-5">
    <div className={`p-4 rounded-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

const RiskBadge = ({ level }: { level: string }) => {
  let colorClass = "bg-slate-100 text-slate-800";
  if (level === 'High Risk') colorClass = "bg-red-50 text-red-600 border border-red-100";
  if (level === 'Medium Risk') colorClass = "bg-amber-50 text-amber-600 border border-amber-100";
  if (level === 'Low Risk') colorClass = "bg-emerald-50 text-emerald-600 border border-emerald-100";

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
      {level}
    </span>
  );
};

const ActionButton = ({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) => (
  <button className={`flex flex-col items-center justify-center p-4 rounded-2xl border border-transparent transition-all duration-200 gap-3 w-full h-full ${color}`}>
    <div className="opacity-90">{icon}</div>
    <span className="text-sm font-medium text-center">{label}</span>
  </button>
);

const AshaDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">ASHA Worker Dashboard</h1>
            <p className="text-slate-500 mt-1">MAAAi Monitoring</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
            <div className="bg-teal-100 p-2 rounded-full text-teal-700">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Pushpa Devi</p>
              <p className="text-xs text-slate-500 font-medium">Region: Rampur Block</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard 
            title="Total Registered Patients" 
            value={stats.totalPatients} 
            icon={<Users size={24} />} 
            color="bg-blue-50 text-blue-600" 
          />
          <StatCard 
            title="High Risk Pregnancies" 
            value={stats.highRisk} 
            icon={<AlertTriangle size={24} />} 
            color="bg-red-50 text-red-600" 
          />
          <StatCard 
            title="Medium Risk Pregnancies" 
            value={stats.mediumRisk} 
            icon={<Activity size={24} />} 
            color="bg-amber-50 text-amber-600" 
          />
          <StatCard 
            title="Low Risk Pregnancies" 
            value={stats.lowRisk} 
            icon={<CheckCircle size={24} />} 
            color="bg-emerald-50 text-emerald-600" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Patients & Actions) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ActionButton 
                  icon={<Plus size={24} />} 
                  label="Register New Patient" 
                  color="bg-teal-50 text-teal-700 hover:bg-teal-100 hover:border-teal-200" 
                />
                <ActionButton 
                  icon={<FileText size={24} />} 
                  label="Conduct Health Survey" 
                  color="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-200" 
                />
                <ActionButton 
                  icon={<List size={24} />} 
                  label="View All Patients" 
                  color="bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-200" 
                />
                <ActionButton 
                  icon={<RefreshCw size={24} />} 
                  label="Sync Data" 
                  color="bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-200" 
                />
              </div>
            </div>

            {/* Recent Patients */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                <h2 className="text-lg font-bold text-slate-800">Recent Patients</h2>
                <button className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
                  View all →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                      <th className="p-4 font-semibold">Patient Name</th>
                      <th className="p-4 font-semibold">Age</th>
                      <th className="p-4 font-semibold">Village</th>
                      <th className="p-4 font-semibold">Risk Level</th>
                      <th className="p-4 font-semibold">Last Checkup</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    {recentPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-semibold text-slate-800">{patient.name}</td>
                        <td className="p-4 text-slate-600">{patient.age} yrs</td>
                        <td className="p-4 text-slate-600">{patient.village}</td>
                        <td className="p-4">
                          <RiskBadge level={patient.riskLevel} />
                        </td>
                        <td className="p-4 text-slate-500">{patient.lastCheckup}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>

          {/* Right Column (Charts) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Risk Distribution</h2>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontWeight: 600 }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ fontSize: '14px', fontWeight: 500, color: '#475569' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-500 text-center">
                  Total of <span className="font-bold text-slate-800">{stats.totalPatients}</span> patients currently being monitored.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AshaDashboard;
