import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Users, Activity, FileText, Menu, X, HeartPulse, Baby } from 'lucide-react';
import userPic from "../assets/user_pic.png";

/**
 * DashboardLayout
 * Includes a sidebar navigation and a top header.
 * Scales fluidly on desktops and collapses smoothly on mobile devices.
 */
export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const role = localStorage.getItem("role") || "doctor";
  const patient = {
    name: "Sita Devi",
    age: 26,
    height: "160 cm",
    weight: "60 kg",
    bloodGroup: "O+",
    trimester: "Second Trimester",
    image: userPic,
  };

  const doctorMenu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/doctor-dashboard" },
    { label: "Patients", icon: Users, path: "/patients" },
    { label: "Risk Predictions", icon: Activity, path: "#" },
    { label: "Visit Records", icon: FileText, path: "#" },
  ];

  const ashaMenu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/asha-dashboard" },
    { label: "Assigned Patients", icon: Users, path: "/patients" },
    { label: "Submit Survey", icon: FileText, path: "/patient-survey" },
    { label: "Patient Care", icon: HeartPulse, path: "/patient-care" },
  ];

  const patientMenu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/user-dashboard" },
    { label: "My Records", icon: FileText, path: "#" },
    { label: "Health Tips", icon: Activity, path: "#" },
    { label: "Baby Care", icon: Baby, path: "/baby-care" },
  ];

  let menuItems = doctorMenu;

  if (role === "asha") {
    menuItems = ashaMenu;
  }

  if (role === "patient") {
    menuItems = patientMenu;
  }

  const getHeaderTitle = () => {
    if (role === "doctor") return "Welcome, Dr. Smith";
    if (role === "asha") return "ASHA Worker Dashboard";
    if (role === "patient") return `Welcome, ${patient.name}`;
    return "Dashboard";
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-gray-50 selection:bg-teal-200 overflow-hidden">
      
      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-20 md:hidden transition-opacity"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col shadow-lg md:shadow-sm transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-xl font-bold text-teal-700 tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6" /> MAAAi
          </h1>
          <button 
            onClick={closeMobileMenu} 
            className="md:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            item.path === "#" ? (
              <button
                key={index}
                type="button"
                onClick={closeMobileMenu}
                className="w-full flex items-center justify-start gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-xl transition-all font-medium"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ) : (
              <Link
                key={index}
                to={item.path}
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-xl transition-all font-medium"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
        <header className="bg-white px-4 md:px-8 py-4 border-b border-gray-200 flex items-center justify-between shadow-sm sticky top-0 z-10 w-full">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 line-clamp-1">
              {getHeaderTitle()}
            </h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className="hidden md:flex gap-3 mr-4">
              <button className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors">
                Add Patient
              </button>
              <button className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors">
                Record Visit
              </button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm">
                Run Prediction
              </button>
            </div>
            {role === "patient" && (
              <Link to="/profile">
                <img
                  src={patient.image}
                  alt="profile"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-teal-200 flex-shrink-0"
                />
              </Link>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

