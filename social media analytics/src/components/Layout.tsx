import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BarChart2, Users, TrendingUp, Activity } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <BarChart2 className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Social Media Analytics</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600">
                  <Users className="h-5 w-5 mr-1" />
                  Top Users
                </Link>
                <Link to="/trending" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600">
                  <TrendingUp className="h-5 w-5 mr-1" />
                  Trending
                </Link>
                <Link to="/feed" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600">
                  <Activity className="h-5 w-5 mr-1" />
                  Feed
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}