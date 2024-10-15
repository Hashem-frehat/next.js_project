"use client";
import React, { useState } from "react";
import { Home, Settings, User, Mail } from "lucide-react";
import { UserDashboard } from "../admincomponents/users";
import { ProductsPage } from "../admincomponents/addproduct";
import { ContactUsDashboard } from "../admincomponents/contactus";
import { Transaction } from "../admincomponents/transaction";
// Placeholder components for demonstration
const HomePage = () => <div className="p-4">Home Page Content</div>;
const SettingsPage = () => <div className="p-4">Settings Page Content</div>;
const Layout = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", name: "Products", icon: Home, component: UserDashboard },
    { id: "profile", name: "Profile", icon: User, component: ProductsPage },
    {
      id: "requests",
      name: "Requests",
      icon: Mail,
      component: ContactUsDashboard,
    },
    { id: "payments", name: "Payments", icon: Mail, component: Transaction },
    { id: "plantForm", name: "PlantForm", icon: Mail, component: SettingsPage },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || HomePage;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">My App</h2>
          <nav>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center w-full p-2 mt-2 rounded-md transition-colors duration-200 ${
                  activeTab === tab.id ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                <tab.icon className="mr-2" size={20} />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default Layout;
