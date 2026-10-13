import { content, type GalleryItem, type SectionId } from '../../content/content';
import { AvatarStandalone } from '../scene/objects/Avatar';

/** Label "Konten contoh" — hanya tampil untuk bagian yang tercantum di `site.sampleSections`. */
export function SampleBadge({ section }: { section: SectionId }) {
  if (!content.site.sampleSections.includes(section)) return null;
  return (
    <p className="sample-badge">
      <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false">
        <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 5.5v5.5M10 13.6v.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {content.site.sampleBadge}
    </p>
  );
}

export function ProfileSection() {
  const p = content.profile;
  return (
    <div className="section section--profile">
      <SampleBadge section="profile" />
      <div className="profile-head">
        <figure className="profile-photo">
          {p.photo ? (
            <img src={p.photo} alt={p.photoAlt} />
          ) : (
            <AvatarStandalone label={`${p.photoPlaceholderLabel} — avatar ilustrasi`} className="profile-photo__svg" />
          )}
          {!p.photo && <figcaption>{p.photoPlaceholderLabel}</figcaption>}
        </figure>
        <div>
          <p className="profile-head__greeting">{p.heading}</p>
          <p className="profile-head__role">{content.site.candidateRole}</p>
          <dl className="facts">
            {p.facts.map((f) => (
              <div key={f.label} className="facts__row">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            {content.site.contacts.map((c) => (
              <div key={c.label} className="facts__row">
                <dt>{c.label}</dt>
                <dd>{c.href ? <a href={c.href}>{c.value}</a> : c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <h3>{p.motivationTitle}</h3>
      {p.motivation.map((para, i) => (
        <p key={i}>{para}</p>
      ))}

      <h3>{p.valuesTitle}</h3>
      <ul className="value-list">
        {p.values.map((v) => (
          <li key={v.title}>
            <strong>{v.title}</strong>
            <span>{v.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VisionSection() {
  const v = content.vision;
  return (
    <div className="section section--vision">
      <SampleBadge section="vision" />
      <h3>{v.visionTitle}</h3>
      <blockquote className="vision-quote">
        <p>{v.vision}</p>
      </blockquote>
      <h3>{v.missionTitle}</h3>
      <ol className="mission-list">
        {v.missions.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ol>
    </div>
  );
}

export function ActionsSection() {
  const a = content.actions;
  return (
    <div className="section section--actions">
      <SampleBadge section="actions" />
      <p className="section__intro">{a.intro}</p>
      <div className="programs">
        {a.programs.map((prog, i) => (
          <article key={prog.title} className="program">
            <header className="program__head">
              <span className="program__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{prog.title}</h3>
            </header>
            <h4>{a.labels.goal}</h4>
            <p>{prog.goal}</p>
            <h4>{a.labels.firstSteps}</h4>
            <ol>
              {prog.firstSteps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <h4>{a.labels.indicators}</h4>
            <ul className="check-list">
              {prog.indicators.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

export function JourneySection() {
  const j = content.journey;
  // Galeri hanya tampil bila sudah ada foto dokumentasi.
  const photos = j.gallery.filter((g): g is GalleryItem & { src: string } => Boolean(g.src));
  return (
    <div className="section section--journey">
      <SampleBadge section="journey" />
      <p className="section__intro">{j.intro}</p>
      {photos.length > 0 && (
        <>
          <h3>{j.galleryTitle}</h3>
          <ul className="gallery">
            {photos.map((g) => (
              <li key={g.src}>
                <figure>
                  <img src={g.src} alt={g.alt} loading="lazy" />
                  <figcaption>{g.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </>
      )}
      <h3>{j.experienceTitle}</h3>
      <ol className="timeline">
        {j.experience.map((e, i) => (
          <li key={i}>
            <span className="timeline__period">{e.period}</span>
            <strong>{e.role}</strong>
            <span>{e.summary}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
