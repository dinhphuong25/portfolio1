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
        <article className="glass-premium rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-xl border border-slate-200/80 dark:border-slate-800">
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

