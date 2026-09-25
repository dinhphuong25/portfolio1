"use client";

import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import HighlightsSection from "@/components/HighlightsSection";
import AboutSection from "@/components/AboutSection";
import ExperienceCards from "@/components/ExperienceCards";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideoCallModal from "@/components/VideoCallModal";
import Reveal from "@/components/Reveal";

export default function HomeClient() {
  const [showVideoCall, setShowVideoCall] = useState(false);

  return (
    <>
      <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6 lg:pr-6">
        <article className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden relative border border-slate-400 dark:border-slate-600">
          <Reveal direction="down">
            <ProfileHeader
              onMessage={() => {
                window.location.href = "/contact";
              }}
            />
          </Reveal>

          <Reveal direction="up" delay={200}>
            <AboutSection />
          </Reveal>

          <Reveal direction="up" delay={300}>
            <ExperienceCards />
          </Reveal>

          <Reveal direction="up" delay={350}>
            <TestimonialsSection />
          </Reveal>
        </article>
      </div>

      <VideoCallModal isOpen={showVideoCall} onClose={() => setShowVideoCall(false)} />
    </>
  );
}

