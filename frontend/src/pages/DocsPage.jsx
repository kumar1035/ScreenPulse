import React from "react";
import Card from "../components/ui/Card";

const DocsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32">
      <h1 className="text-5xl font-bold mb-4 tracking-tight text-white">
        Documentation
      </h1>

      <p className="text-xl text-gray-500 font-light mb-16">
        Everything you need to know about using ScreenPulse for instant
        peer-to-peer screen sharing.
      </p>

      <div className="space-y-16">
        
        {/* Getting Started */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-primary"></div>
            <h2 className="text-2xl font-semibold text-white">
              Getting Started
            </h2>
          </div>

          <p className="text-gray-400 mb-6 leading-relaxed">
            ScreenPulse requires no installation. It works directly inside any
            modern browser that supports WebRTC.  
            The peer-to-peer architecture ensures fast, secure, and low-latency
            screen streaming.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Chrome", "Firefox", "Safari", "Edge"].map((browser) => (
              <div
                key={browser}
                className="p-4 rounded-xl bg-surface border border-white/5 text-center text-sm text-gray-400"
              >
                {browser}
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-primary"></div>
            <h2 className="text-2xl font-semibold text-white">
              How ScreenPulse Works
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed">
            ScreenPulse creates a direct WebRTC connection between two users.
            Once a room link is generated, you can share it with anyone to start
            streaming your screen instantly — without uploads or server storage.
          </p>
        </section>

        {/* Troubleshooting */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-primary"></div>
            <h2 className="text-2xl font-semibold text-white">
              Troubleshooting
            </h2>
          </div>

          <Card className="p-8 border-l-4 border-l-primary/50">
            <h3 className="font-semibold text-white mb-2 text-lg">
              Screen share permission denied
            </h3>

            <p className="text-gray-400 font-light leading-relaxed">
              Modern operating systems require explicit permission to record
              your screen.
              <br />
              <br />

              <strong className="text-white">On macOS:</strong> Go to{" "}
              <span className="text-gray-300">
                System Preferences → Security & Privacy → Screen Recording
              </span>{" "}
              and ensure your browser is enabled. You may need to restart the
              browser.
              <br />
              <br />

              <strong className="text-white">On Windows:</strong> Make sure your
              browser has permission to capture the screen and no other app is
              blocking screen recording.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default DocsPage;
