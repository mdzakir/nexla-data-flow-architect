import React from "react";
import { Zap, Database, GitBranch } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-purple-50 to-primary-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-primary-600 rounded-2xl shadow-lg">
              <GitBranch className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent mb-6">
            Nexla
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            AI-Powered Orchestration for Your Data Flows
          </p>

          <div className="flex justify-center space-x-8 mb-16">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Database className="w-5 h-5" />
              <span>Connect</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Zap className="w-5 h-5" />
              <span>Transform</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <GitBranch className="w-5 h-5" />
              <span>Orchestrate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
