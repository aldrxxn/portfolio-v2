'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import Intro from '@/components/Intro';
import Description from '@/components/Description';
import Section from '@/components/Section';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
      <Intro />
      <Description />
      <Section />
    </main>
  );
}
