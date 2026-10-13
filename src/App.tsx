import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { InfoDialog } from './components/InfoDialog';
import { Scene } from './components/scene/Scene';
import { SectionMenu } from './components/SectionMenu';
import { AspirationForm } from './components/sections/AspirationForm';
import { ActionsSection, JourneySection, ProfileSection, VisionSection } from './components/sections/Sections';
import { layouts, MOBILE_QUERY } from './config/layout';
import { motion, motionCssVars } from './config/motion';
import { content, type SectionId } from './content/content';
import { useMediaQuery, usePrefersReducedMotion } from './hooks/useMediaQuery';

type Phase = 'enter' | 'open' | 'exit';

function SectionBody({ id }: { id: SectionId }) {
  switch (id) {
    case 'profile':
      return <ProfileSection />;
    case 'vision':
      return <VisionSection />;
    case 'actions':
      return <ActionsSection />;
    case 'journey':
      return <JourneySection />;
    case 'aspiration':
      return <AspirationForm />;
  }
}

export default function App() {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const reducedMotion = usePrefersReducedMotion();
  const layout = layouts[isMobile ? 'mobile' : 'desktop'];

  const [openId, setOpenId] = useState<SectionId | null>(null);
  const [phase, setPhase] = useState<Phase>('enter');
  const [hintActive, setHintActive] = useState(false);

  const appRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const fallbackFocusRef = useRef<HTMLHeadingElement>(null);
  const restoreFocus = useRef(false);
  const timers = useRef<{ close?: number; hint?: number; raf?: number }>({});

  // ---- Panel --------------------------------------------------------------
  const openSection = useCallback((id: SectionId, trigger: HTMLElement) => {
    window.clearTimeout(timers.current.close);
    triggerRef.current = trigger;
    setOpenId(id); // hanya satu panel terbuka; membuka yang lain menggantikannya
    setPhase('enter');
    cancelAnimationFrame(timers.current.raf ?? 0);
    // dua frame agar transisi CSS dari keadaan 'enter' benar-benar berjalan
    timers.current.raf = requestAnimationFrame(() => {
      timers.current.raf = requestAnimationFrame(() => setPhase('open'));
    });
  }, []);

  const closeSection = useCallback(() => {
    setPhase('exit');
    window.clearTimeout(timers.current.close);
    timers.current.close = window.setTimeout(
      () => {
        restoreFocus.current = true;
        setOpenId(null);
      },
      reducedMotion ? 0 : motion.panel.exitMs,
    );
  }, [reducedMotion]);

  // Adegan menjadi inert selama panel terbuka; fokus kembali ke pemicu setelah menutup.
  useEffect(() => {
    const app = appRef.current;
    if (!app) return;
    app.inert = openId !== null;
    if (openId === null && restoreFocus.current) {
      restoreFocus.current = false;
      const t = triggerRef.current;
      if (t && t.isConnected) t.focus();
      else fallbackFocusRef.current?.focus();
    }
  }, [openId]);

  // ---- Petunjuk -----------------------------------------------------------
  const runHint = useCallback(() => {
    window.clearTimeout(timers.current.hint);
    setHintActive(false);
    requestAnimationFrame(() => setHintActive(true));
    timers.current.hint = window.setTimeout(() => setHintActive(false), motion.hint.durationMs);
  }, []);

  useEffect(() => {
    if (!motion.hint.autoOnLoad) return;
    const t = window.setTimeout(runHint, motion.hint.autoDelayMs);
    return () => window.clearTimeout(t);
  }, [runHint]);

  useEffect(() => {
    const t = timers.current;
    return () => {
      window.clearTimeout(t.close);
      window.clearTimeout(t.hint);
      cancelAnimationFrame(t.raf ?? 0);
    };
  }, []);

  const s = content.site;
  const ambientPaused =
    !motion.ambient.enabled || reducedMotion || (motion.ambient.pauseWhenPanelOpen && openId !== null);

  return (
    <div className="page" style={motionCssVars() as CSSProperties}>
      <main className="app" ref={appRef}>
        {/* Identitas tetap ada untuk pembaca layar & mesin pencari, tanpa tampil di layar. */}
        <h1 ref={fallbackFocusRef} tabIndex={-1} className="visually-hidden">
          {s.title} — {s.candidateName}, {s.candidateRole}
        </h1>
        <p className="visually-hidden">
          {s.intro} {s.sceneHint}.
        </p>

        <Scene
          layout={layout}
          hintActive={hintActive}
          paused={ambientPaused}
          onOpen={openSection}
          toolbar={
            <>
              <button type="button" className="tool-btn" onClick={runHint}>
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                  <path
                    d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {s.controls.hint}
              </button>
              <SectionMenu onOpen={openSection} />
            </>
          }
        />
      </main>

      {openId && (
        <InfoDialog
          open={phase !== 'exit'}
          phase={phase}
          windowTitle={content.sections[openId].windowTitle}
          title={content.sections[openId].label}
          titleId={`dialog-title-${openId}`}
          onClose={closeSection}
        >
          <SectionBody key={openId} id={openId} />
        </InfoDialog>
      )}
    </div>
  );
}
