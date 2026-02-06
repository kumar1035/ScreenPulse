import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/LOGO.png";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-background py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          {/* Branding */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
              <img
                src={Logo}
                alt="ScreenPulse Logo"
                className="w-6 h-6 object-contain"
              />
              <h3 className="font-semibold text-lg tracking-tight text-white">
                ScreenPulse
              </h3>
            </div>

            <p className="text-sm text-gray-500 font-light">
              One link. Instant screen sharing. <br />
              Peer-to-peer • Secure • Fast.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href="https://github.com/yourusername/screenpulse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-500 hover:text-white transition-colors"
            >
              GitHub
            </a>

            <Link
              to="/about"
              className="text-sm font-medium text-gray-500 hover:text-white transition-colors"
            >
              About
            </Link>

            <Link
              to="/privacy"
              className="text-sm font-medium text-gray-500 hover:text-white transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono">
          <span>© {new Date().getFullYear()} ScreenPulse</span>
          <span>No Logs • Privacy First • WebRTC Powered</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
