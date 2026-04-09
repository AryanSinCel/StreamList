/**
 * @deprecated Prefer `buildImageUrl` from `./image` with an explicit size.
 * Kept for any legacy imports; forwards to the spec helper.
 */
import { buildImageUrl } from './image';

export function buildTmdbImageUrl(path: string | null | undefined): string | null {
  return buildImageUrl(path, 'w342');
}
