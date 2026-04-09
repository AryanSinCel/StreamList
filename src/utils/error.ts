/**
 * Normalizes unknown errors (e.g. Axios interceptor rejects) to a user-facing string.
 */
export function isAbortError(error: unknown): boolean {
  if (error && typeof error === 'object') {
    const o = error as { code?: string; name?: string; message?: string };
    if (o.code === 'ERR_CANCELED' || o.name === 'CanceledError') {
      return true;
    }
    if (typeof o.message === 'string' && /aborted|canceled/i.test(o.message)) {
      return true;
    }
  }
  return false;
}

export function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    const msg = (error as { message: unknown }).message;
    if (typeof msg === 'string' && msg.length > 0) {
      return msg;
    }
  }
  return 'Something went wrong';
}
