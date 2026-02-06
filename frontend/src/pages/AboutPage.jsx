import React from "react";
import Card from "../components/ui/Card";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32">
      <h1 className="text-5xl font-bold mb-12 tracking-tight text-white">
        About ScreenPulse
      </h1>

      <div className="grid gap-12 text-gray-400 leading-relaxed text-lg font-light">
        
        {/* Intro Section */}
        <section>
          <p className="mb-6">
            ScreenPulse was built with one clear mission:{" "}
            <span className="text-white font-normal">
              to make peer-to-peer screen sharing instant, simple, and secure.
            </span>
          </p>

          <p>
            In a world full of heavy video conferencing platforms, ScreenPulse
            focuses on doing one thing extremely well — sharing your screen with
            anyone, using just a link. No sign-ups, no downloads, no unnecessary
            complexity.
          </p>
        </section>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8">
            <strong className="text-white block mb-3 text-xl font-medium">
              Privacy First
            </strong>
            <p className="text-sm text-gray-500">
              Your screen stream stays between you and your peer. ScreenPulse is
              powered by WebRTC, enabling direct P2P connections without routing
              your content through servers.
            </p>
          </Card>

          <Card className="p-8">
            <strong className="text-white block mb-3 text-xl font-medium">
              Lightweight & Open
            </strong>
            <p className="text-sm text-gray-500">
              ScreenPulse is designed to be fast, minimal, and transparent. The
              project is open for learning, contributions, and customization —
              built with modern web technologies.
            </p>
          </Card>
        </div>

        {/* Closing Section */}
        <section>
          <p>
            Whether you're collaborating with teammates, helping a friend, or
            presenting something quickly, ScreenPulse makes screen sharing as
            smooth as it should be.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
