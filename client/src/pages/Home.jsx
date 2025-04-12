import React from 'react';
import { Link2, Menu, X, ArrowRight, Zap, Shield, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Hero Section */}
      <div className="h-[85vh] relative overflow-hidden bg-gradient-to-tr from-blue-800 via-purple-800 to-pink-800">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-900/20 to-purple-900/20 backdrop-blur-[100px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Shorten URLs with</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
                Power and Precision
              </span>
            </h1>
            <p className="mt-6 max-w-md mx-auto text-base text-blue-200 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
              Transform long, unwieldy URLs into clean, memorable links. Track performance, manage campaigns, and boost your online presence with LinkSnip.
            </p>
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
              <div className="rounded-md shadow">
                <button
                  className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-blue-700 bg-white hover:bg-gray-100 transition-colors duration-300 md:text-lg md:px-12 cursor-pointer"
                  onClick={() => navigate("/create")}
                >
                  Start Shortening
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mt-8 flex justify-center space-x-6 text-sm text-blue-200">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>Secure & Fast</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                <span>Instant Links</span>
              </div>
              <div className="flex items-center">
                <LineChart className="h-5 w-5 mr-2" />
                <span>Analytics</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Powerful Features for Modern Link Management
            </h2>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Feature icon={<Zap className="h-6 w-6" />} title="Lightning Fast" desc="Generate short links instantly with our optimized infrastructure." />
            <Feature icon={<Shield className="h-6 w-6" />} title="Secure & Reliable" desc="Enterprise-grade security with 99.9% uptime guarantee." />
            <Feature icon={<LineChart className="h-6 w-6" />} title="Analytics" desc="Detailed insights and tracking for every shortened link." />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Start shortening URLs today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <button
               onClick={() => navigate("/create")}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 cursor-pointer"
            >
              Get started
              <Link2 className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature Component
function Feature({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-gray-400">{desc}</p>
    </div>
  );
}

export default Home;
