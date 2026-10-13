import { useEffect, useRef, type ReactNode } from 'react';
import { content } from '../content/content';

interface Props {
  /** true saat dialog terlihat/masuk; false saat sedang keluar. */
  open: boolean;
  /** 'enter' → frame awal transisi, 'open' → terlihat, 'exit' → sedang menutup. */
  phase: 'enter' | 'open' | 'exit';
  windowTitle: string;
  title: string;
  titleId: string;
  onClose: () => void;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Panel informasi modal.
 * - Escape & tombol tutup menutup panel; klik backdrop juga menutup, klik di dalam panel tidak.
 * - Fokus dibatasi di dalam dialog (Tab/Shift+Tab berputar).
 * - Konten di luar dialog dibuat `inert` oleh App.
 */
export function InfoDialog({ open, phase, windowTitle, title, titleId, onClose, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Fokus awal ke tombol tutup.
  useEffect(() => {
    if (open) closeRef.current?.focus({ preventScroll: true });
  }, [open, titleId]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;
      if (!panelRef.current.contains(activeEl)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div className="dialog-root" data-phase={phase}>
      <div className="dialog-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="dialog__titlebar">
          <span className="dialog__window-title" aria-hidden="true">
            <span className="dialog__dots">
              <i />
              <i />
              <i />
            </span>
            {windowTitle}
          </span>
          <button ref={closeRef} type="button" className="dialog__close" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
            <span className="visually-hidden">{content.site.controls.close}</span>
          </button>
        </div>
        <div className="dialog__body">
          <h2 id={titleId} className="dialog__title">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}
