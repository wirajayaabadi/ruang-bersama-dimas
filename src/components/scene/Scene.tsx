import { useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import {
  fitViewBox,
  interactiveObjects,
  objectBox,
  placementTransform,
  type ObjectKey,
  type SceneLayout,
  type ViewBox,
} from '../../config/layout';
import { motion } from '../../config/motion';
import { content, type SectionId } from '../../content/content';
import { useInView } from '../../hooks/useInView';
import { ActionBook } from './objects/ActionBook';
import { AspirationBox } from './objects/AspirationBox';
import { Background } from './objects/Background';
import { Plant, SceneWindow } from './objects/Decorations';
import { CatWalker, SleepingCat } from './objects/Cat';
import { DimasFigure } from './objects/Dimas';
import { EaglePerch } from './objects/Eagle';
import { Bookshelf, Chair, Desk, DeskLamp } from './objects/Furniture';
import { JourneyFrames } from './objects/JourneyFrames';
import { ProfileFrame } from './objects/ProfileFrame';
import { VisionBoard } from './objects/VisionBoard';
import { Hotspot } from './Hotspot';

interface Props {
  layout: SceneLayout;
  hintActive: boolean;
  paused: boolean;
  onOpen: (id: SectionId, trigger: HTMLElement) => void;
  toolbar?: ReactNode;
}

/** Urutan gambar (belakang → depan). `section` menandai objek interaktif. */
const DRAW_ORDER: { key: ObjectKey; id: string; section?: SectionId }[] = [
  { key: 'window', id: 'scene-decorations-window' },
  { key: 'bookshelf', id: 'scene-furniture-bookshelf' },
  { key: 'eaglePerch', id: 'scene-decorations-eagle' },
  { key: 'visionBoard', id: 'scene-vision-board', section: 'vision' },
  { key: 'journeyFrames', id: 'scene-journey-frame', section: 'journey' },
  { key: 'chair', id: 'scene-furniture-chair' },
  { key: 'desk', id: 'scene-furniture-desk' },
  { key: 'profileFrame', id: 'scene-profile', section: 'profile' },
  { key: 'actionBook', id: 'scene-action-book', section: 'actions' },
  { key: 'deskLamp', id: 'scene-furniture-lamp' },
  { key: 'dimas', id: 'scene-dimas' },
  { key: 'aspirationBox', id: 'scene-aspiration-box', section: 'aspiration' },
  { key: 'plant', id: 'scene-decorations-plant' },
];

function renderArt(key: ObjectKey) {
  switch (key) {
    case 'window':
      return <SceneWindow />;
    case 'bookshelf':
      return <Bookshelf />;
    case 'visionBoard':
      return <VisionBoard />;
    case 'journeyFrames':
      return <JourneyFrames />;
    case 'chair':
      return <Chair />;
    case 'desk':
      return <Desk />;
    case 'profileFrame':
      return <ProfileFrame photo={content.profile.photo} placeholderLabel={content.profile.photoPlaceholderLabel} />;
    case 'actionBook':
      return <ActionBook />;
    case 'deskLamp':
      return <DeskLamp />;
    case 'aspirationBox':
      return <AspirationBox />;
    case 'plant':
      return <Plant />;
    case 'eaglePerch':
      return <EaglePerch />;
    case 'dimas':
      return <DimasFigure />;
  }
}

const HALO_PAD = 12;

/** Ukuran elemen (px) — dipakai untuk menyesuaikan viewBox dengan rasio layar. */
function useElementSize(ref: RefObject<HTMLElement>) {
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

export function Scene({ layout, hintActive, paused, onOpen, toolbar }: Props) {
  const [activeId, setActiveId] = useState<SectionId | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef);
  const size = useElementSize(frameRef);
  // Adegan mengisi seluruh layar: area konten selalu utuh, dinding & lantai diperpanjang mengikuti rasio layar.
  const vb: ViewBox = fitViewBox(layout, size.w, size.h);

  const classes = ['scene', `scene--${layout.name}`];
  if (paused || !inView) classes.push('scene--paused');
  if (hintActive) classes.push('scene--hint');

  return (
    <div ref={frameRef} className={classes.join(' ')}>
      <svg
        className="scene__svg"
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={content.site.sceneAriaLabel}
        focusable="false"
      >
        <Background layout={layout} vb={vb} />
        {DRAW_ORDER.map(({ key, id, section }) => {
          const transform = placementTransform(layout.placements[key]);
          if (!section) {
            return (
              <g key={key} id={id} className="obj obj--static" transform={transform}>
                {renderArt(key)}
              </g>
            );
          }
          const box = objectBox(layout, key);
          const s = layout.placements[key].s ?? 1;
          const state = activeId === section ? ' is-active' : '';
          return (
            <g key={key} id={id} className={`obj obj--interactive${state}`} data-section={section} transform={transform}>
              <rect
                className="obj__halo"
                x={-HALO_PAD / s}
                y={-HALO_PAD / s}
                width={box.w / s + (HALO_PAD * 2) / s}
                height={box.h / s + (HALO_PAD * 2) / s}
                rx={22 / s}
              />
              <g className="obj__art">{renderArt(key)}</g>
            </g>
          );
        })}

        {/* Kucing di karpet (paling depan): yang berjalan di belakang, yang tidur di depan */}
        <g id="scene-decorations-cats">
          {layout.walkingCats.map((cat, i) => {
            // waktu jalan satu arah; 84% siklus untuk berjalan, sisanya berhenti & berbalik di ujung
            const oneWayMs = ((cat.toX - cat.x) / motion.ambient.catSpeed) * 1000;
            return <CatWalker key={`walk-${i}`} {...cat} cycleMs={Math.round((oneWayMs * 2) / 0.84)} />;
          })}
          {layout.sleepingCats.map((cat, i) => (
            <g key={`sleep-${i}`} transform={`translate(${cat.x} ${cat.y}) scale(${cat.s})`}>
              <SleepingCat variant={cat.variant} />
            </g>
          ))}
        </g>
      </svg>

      <div className="scene__hotspots">
        {content.sectionOrder.map((sectionId) => (
          <Hotspot
            key={sectionId}
            sectionId={sectionId}
            layout={layout}
            vb={vb}
            box={objectBox(layout, interactiveObjects[sectionId])}
            active={activeId === sectionId}
            onActivate={setActiveId}
            onOpen={onOpen}
          />
        ))}
      </div>

      {/* Balon kata Dimas — HTML agar teks terbaca; muncul seirama lambaian tangan */}
      <div
        className={`scene__bubble scene__bubble--${layout.dimasBubble.placement}`}
        aria-hidden="true"
        style={{
          left: `${((layout.dimasBubble.x - vb.x) / vb.w) * 100}%`,
          top: `${((layout.dimasBubble.y - vb.y) / vb.h) * 100}%`,
        }}
      >
        {content.site.greeting}
      </div>

      {toolbar && <div className="scene__toolbar">{toolbar}</div>}
    </div>
  );
}
