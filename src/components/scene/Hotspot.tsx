import type { SceneLayout, ViewBox } from '../../config/layout';
import { content, type SectionId } from '../../content/content';

interface Props {
  sectionId: SectionId;
  layout: SceneLayout;
  vb: ViewBox;
  box: { x: number; y: number; w: number; h: number };
  active: boolean;
  onActivate: (id: SectionId | null) => void;
  onOpen: (id: SectionId, trigger: HTMLElement) => void;
}

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/**
 * Tombol HTML yang menempel di atas objek SVG (koordinat relatif terhadap
 * pembungkus adegan yang sama). Label selalu terlihat — tidak bergantung hover.
 */
export function Hotspot({ sectionId, layout, vb, box, active, onActivate, onOpen }: Props) {
  const label = layout.labels[sectionId];
  const meta = content.sections[sectionId];

  return (
    <button
      type="button"
      className={`hotspot${active ? ' is-active' : ''}`}
      data-section={sectionId}
      aria-haspopup="dialog"
      aria-label={`${meta.label} — ${meta.description}`}
      style={{ left: pct(box.x - vb.x, vb.w), top: pct(box.y - vb.y, vb.h), width: pct(box.w, vb.w), height: pct(box.h, vb.h) }}
      onPointerEnter={() => onActivate(sectionId)}
      onPointerLeave={() => onActivate(null)}
      onFocus={() => onActivate(sectionId)}
      onBlur={() => onActivate(null)}
      onClick={(e) => onOpen(sectionId, e.currentTarget)}
    >
      <span
        className="hotspot__label"
        aria-hidden="true"
        style={{ left: pct(label.x - box.x, box.w), top: pct(label.y - box.y, box.h) }}
      >
        <span className="hotspot__dot" />
        {meta.label}
      </span>
    </button>
  );
}
