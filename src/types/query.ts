/**
 * Shared async data hook shape (project-spec §9.2).
 */
export interface UseQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}
