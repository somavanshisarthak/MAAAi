import React from 'react';
import { StatsCards } from '../components/dashboard/StatsCards';
import { PatientTable } from '../components/dashboard/PatientTable';
import { PregnancyCharts } from '../components/dashboard/PregnancyCharts';
import MLRiskPredictor from '../components/dashboard/MLRiskPredictor';

const DoctorDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Panel 1 — Patient Overview */}
      <section>
        <StatsCards />
      </section>

      {/* Panel 2 — ML Risk Predictor */}
      <section>
        <MLRiskPredictor />
      </section>

      {/* Panel 3 — Recent Patients Table (Now full width) */}
      <section className="flex flex-col h-full">
        <PatientTable />
      </section>

      {/* Panel 4 — Pregnancy Monitoring Charts */}
      <section>
        <PregnancyCharts />
      </section>
    </div>
  );
};

export default DoctorDashboard;
