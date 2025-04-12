import React from "react";

const About = () => {
  return (
    <div className="bg-gray-950 min-h-screen py-16 px-4 text-white">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-white">About Our Service</h1>
          <p className="mt-2 text-gray-400 text-base">
            A modern link management solution built for performance, simplicity, and privacy.
          </p>
        </header>

        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-300 text-base space-y-1">
            <li>🔗 Shorten long, messy URLs into neat and trackable links.</li>
            <li>🎯 Create custom aliases to personalize your links.</li>
            <li>⏳ Set expiration dates to keep your links fresh and secure.</li>
            <li>📈 Track performance with built-in analytics.</li>
            <li>🔒 We respect your privacy—no unnecessary data collection.</li>
          </ul>
        </section>

        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Built for Developers & Creators</h2>
          <p className="text-gray-300 text-base">
            Whether you're sharing a link on social media, integrating with your marketing stack, or just want a cleaner way to share URLs—our platform is for you. Built with performance-first technologies and privacy at its core.
          </p>
        </section>

        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">What’s Next?</h2>
          <p className="text-gray-300 text-base">
            We’re working on:
          </p>
          <ul className="list-disc list-inside text-gray-300 text-base space-y-1">
            <li>📊 Analytics dashboard to monitor clicks and performance</li>
            <li>🧪 A/B testing for links</li>
            <li>🔗 Link categorization and team collaboration features</li>
            <li>📱 Mobile-friendly UI and QR code scanning</li>
          </ul>
        </section>

        <footer className="text-center pt-8 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} LinkSnip — All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default About;
