import { useId } from 'react';

/** ID unik & aman untuk gradient/clipPath/mask (useId mengandung ':' yang rawan di url(#...)). */
export function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
}
