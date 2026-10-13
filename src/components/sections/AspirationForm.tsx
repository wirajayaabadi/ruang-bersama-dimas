import { useRef, useState, type FormEvent } from 'react';
import { content } from '../../content/content';

type Errors = Partial<Record<'category' | 'message', string>>;

/** Susun tautan mailto berisi aspirasi untuk dibuka di aplikasi email pengunjung. */
function buildMailto(name: string, category: string, message: string) {
  const { email, subjectPrefix, anonymousName } = content.aspiration.delivery;
  const subject = `${subjectPrefix} — ${category}`;
  const body = [`Nama: ${name.trim() || anonymousName}`, `Kategori: ${category}`, '', 'Aspirasi:', message.trim()].join('\n');
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Buka aplikasi email lewat klik tautan (lebih andal daripada mengganti location untuk skema mailto). */
function openMailClient(href: string) {
  const a = document.createElement('a');
  a.href = href;
  a.rel = 'noopener';
  a.click();
}

/**
 * Formulir aspirasi.
 * Pesan dikirim lewat aplikasi email pengunjung (mailto) ke alamat di
 * `content.aspiration.delivery.email`. Website tidak punya server dan tidak
 * menyimpan isi aspirasi (tanpa fetch, tanpa localStorage/sessionStorage).
 */
export function AspirationForm() {
  const f = content.aspiration;
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [mailHref, setMailHref] = useState<string | null>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (!category) next.category = f.fields.category.required;
    const trimmed = message.trim();
    if (!trimmed) next.message = f.fields.message.required;
    else if (trimmed.length < f.fields.message.minLength) next.message = f.fields.message.tooShort;
    else if (trimmed.length > f.fields.message.maxLength) next.message = f.fields.message.tooLong;
    return next;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (next.category || next.message) {
      setMailHref(null);
      (next.category ? categoryRef : messageRef).current?.focus();
      return;
    }
    const href = buildMailto(name, category, message);
    setMailHref(href);
    openMailClient(href);
  }

  const hasErrors = Boolean(errors.category || errors.message);
  const count = message.trim().length;

  return (
    <div className="section section--aspiration">
      <p className="section__intro">{f.intro}</p>

      <form className="aspiration-form" noValidate onSubmit={onSubmit}>
        {hasErrors && (
          <p className="form-error-summary" role="alert">
            {f.errorSummary}
          </p>
        )}

        <div className="field">
          <label htmlFor="asp-name">
            {f.fields.name.label} <span className="field__optional">(opsional)</span>
          </label>
          <input
            id="asp-name"
            type="text"
            autoComplete="off"
            maxLength={f.fields.name.maxLength}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setMailHref(null);
            }}
            aria-describedby="asp-name-hint"
          />
          <p id="asp-name-hint" className="field__hint">
            {f.fields.name.hint}
          </p>
        </div>

        <div className={`field${errors.category ? ' field--invalid' : ''}`}>
          <label htmlFor="asp-category">{f.fields.category.label}</label>
          <select
            id="asp-category"
            ref={categoryRef}
            value={category}
            required
            aria-invalid={errors.category ? true : undefined}
            aria-describedby={errors.category ? 'asp-category-error' : undefined}
            onChange={(e) => {
              setCategory(e.target.value);
              setMailHref(null);
              if (errors.category) setErrors((p) => ({ ...p, category: undefined }));
            }}
          >
            <option value="">{f.fields.category.placeholder}</option>
            {f.fields.category.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="asp-category-error" className="field__error">
              {errors.category}
            </p>
          )}
        </div>

        <div className={`field${errors.message ? ' field--invalid' : ''}`}>
          <label htmlFor="asp-message">{f.fields.message.label}</label>
          <textarea
            id="asp-message"
            ref={messageRef}
            rows={5}
            required
            value={message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={`asp-message-hint${errors.message ? ' asp-message-error' : ''}`}
            onChange={(e) => {
              setMessage(e.target.value);
              setMailHref(null);
              if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
            }}
          />
          <div className="field__meta">
            <p id="asp-message-hint" className="field__hint">
              {f.fields.message.hint}
            </p>
            <span className={`field__count${count > f.fields.message.maxLength ? ' is-over' : ''}`} aria-hidden="true">
              {count}/{f.fields.message.maxLength}
            </span>
          </div>
          {errors.message && (
            <p id="asp-message-error" className="field__error">
              {errors.message}
            </p>
          )}
        </div>

        <p className="send-notice">
          {f.sendNotice}
          <span className="send-notice__to">
            Tujuan: <strong>{f.delivery.email}</strong>
          </span>
        </p>
        <button type="submit" className="btn btn--primary">
          {f.submitLabel}
        </button>

        <div className="form-result" role="status" aria-live="polite">
          {mailHref && (
            <div className="form-result__msg">
              <p>{f.resultMessage}</p>
              <p className="form-result__fallback">
                {f.fallbackLabel} <a href={mailHref}>{f.delivery.email}</a>.
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
