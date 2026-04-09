import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'streamlite-recent-searches';
const MAX = 5;

function parseList(raw: string | null): string[] {
  if (raw == null) {
    return [];
  }
  try {
    const v = JSON.parse(raw) as unknown;
    if (!Array.isArray(v)) {
      return [];
    }
    return v.filter((x): x is string => typeof x === 'string' && x.trim().length > 0);
  } catch {
    return [];
  }
}

export async function loadRecentSearches(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return parseList(raw);
  } catch {
    return [];
  }
}

export async function saveRecentSearches(terms: readonly string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify([...terms]));
  } catch {
    /* ignore */
  }
}

/** Prepends `term` (trimmed), dedupes, caps at MAX. */
export async function pushRecentSearch(term: string): Promise<string[]> {
  const t = term.trim();
  if (t.length === 0) {
    return loadRecentSearches();
  }
  const prev = await loadRecentSearches();
  const next = [t, ...prev.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(
    0,
    MAX,
  );
  await saveRecentSearches(next);
  return next;
}

export async function clearRecentSearches(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export async function removeRecentSearch(term: string): Promise<string[]> {
  const prev = await loadRecentSearches();
  const next = prev.filter((x) => x.toLowerCase() !== term.toLowerCase());
  await saveRecentSearches(next);
  return next;
}
