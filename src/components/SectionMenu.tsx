import { useEffect, useId, useRef, useState } from 'react';
import { content, type SectionId } from '../content/content';

interface Props {
  onOpen: (id: SectionId, trigger: HTMLElement) => void;
}

/** Menu teks alternatif di pojok adegan — membuka lima bagian yang sama dengan objek. */
export function SectionMenu({ onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const first = wrapRef.current?.querySelector<HTMLButtonElement>('.menu__item');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div className="menu" ref={wrapRef}>
      <button
        ref={toggleRef}
        type="button"
        className="tool-btn"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        {content.site.controls.menu}
      </button>
      <div id={listId} className="menu__panel" hidden={!open}>
        <p className="menu__title">{content.site.controls.menuTitle}</p>
        <ul>
          {content.sectionOrder.map((id) => (
            <li key={id}>
              <button
                type="button"
                className="menu__item"
                aria-haspopup="dialog"
                onClick={() => {
                  setOpen(false);
                  if (toggleRef.current) onOpen(id, toggleRef.current);
                }}
              >
                <span>{content.sections[id].label}</span>
                <small>{content.sections[id].description}</small>
              </button>
            </li>
          ))}
        </ul>
        <p className="menu__note">
          {content.site.disclaimer}
          {content.site.contacts.map((c) => (
            <span key={c.label} className="menu__contact">
              {c.label}: {c.href ? <a href={c.href}>{c.value}</a> : c.value}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
