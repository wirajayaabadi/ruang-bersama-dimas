import { useEffect, useState, type RefObject } from 'react';

/** true selama elemen terlihat di viewport — dipakai untuk menghentikan animasi suasana saat adegan tidak tampak. */
export function useInView(ref: RefObject<Element>) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}
