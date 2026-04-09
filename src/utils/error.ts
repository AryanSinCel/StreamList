/**
 * Normalizes unknown errors (e.g. Axios interceptor rejects) to a user-facing string.
 */
export function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    const msg = (error as { message: unknown }).message;
    if (typeof msg === 'string' && msg.length > 0) {
      return msg;
    }
  }
  return 'Something went wrong';
}
