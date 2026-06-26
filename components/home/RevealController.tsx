"use client";
import { useEffect } from 'react';

/**
 * Adds `.is-in` to [data-reveal], .th-cap, .th-line, and .th-hero elements as
 * they scroll into view — driving the CSS reveals and threshold-line crossings.
 * Honors prefers-reduced-motion: when set, everything is shown immediately and
 * no observer runs (the CSS @media block already renders the resting state).
 */
export default function RevealController() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal], .th-cap, .th-line, .th-hero')
    );
    if (!targets.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
