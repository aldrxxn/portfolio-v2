import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Description() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Lock scroll pada body selama animasi horizontal berlangsung
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      // Set up ScrollTrigger untuk horizontal scroll
      gsap.to(containerRef.current, {
        xPercent: -200, // Pindahkan kontainer 100% ke kiri untuk efek scroll horizontal //panjang container
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // Mengatur panjang animasi scroll //kecepatan
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onEnter: () => (body.style.overflow = 'hidden'), // Lock scroll vertikal
          onLeave: () => (body.style.overflow = 'auto'),   // Unlock scroll vertikal saat meninggalkan section
          onLeaveBack: () => (body.style.overflow = 'auto') // Unlock saat kembali ke atas
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert(); // Bersihkan konteks GSAP saat komponen di-unmount
      body.style.overflow = 'auto'; // Pastikan scroll vertikal diaktifkan kembali
    };
  }, []);

  return (
    <div ref={sectionRef} className="h-screen overflow-hidden relative">
      <div
        ref={containerRef}
        className="flex gap-10 whitespace-nowrap px-10 h-full items-center"
      >
        <p className="text-[7.5vw] uppercase text-center leading-none">
          Hi, I'm Andrian Tambunan, a backend developer intern at Telkom Indonesia.
        </p>
      </div>
    </div>
  );
}
