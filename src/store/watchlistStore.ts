import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import {
  persist,
  type PersistStorage,
  type StorageValue,
} from 'zustand/middleware';

/**
 * Watchlist item shape (project-spec §9.3).
 */
export interface WatchlistItem {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: number;
  releaseDate: string;
  genreIds: number[];
  mediaType: 'movie' | 'tv';
}

/**
 * Persisted slice — only `items` is written to disk.
 * `hydrated` / `count` are derived at runtime after merge.
 */
type PersistedWatchlistSlice = {
  items: WatchlistItem[];
};

/**
 * Persist layer that never throws: bad/corrupt JSON or native errors behave
 * like empty storage so `merge` runs and `hydrated` becomes true.
 */
function createWatchlistPersistStorage(): PersistStorage<PersistedWatchlistSlice> {
  return {
    getItem: async (name) => {
      try {
        const raw = await AsyncStorage.getItem(name);
        if (raw == null) {
          return null;
        }
        return JSON.parse(raw) as StorageValue<PersistedWatchlistSlice>;
      } catch {
        return null;
      }
    },
    setItem: async (name, value) => {
      try {
        await AsyncStorage.setItem(name, JSON.stringify(value));
      } catch {
        /* ignore — watchlist still works in memory */
      }
    },
    removeItem: async (name) => {
      try {
        await AsyncStorage.removeItem(name);
      } catch {
        /* ignore */
      }
    },
  };
}

export interface WatchlistState {
  items: WatchlistItem[];
  addItem: (item: WatchlistItem) => void;
  removeItem: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
  count: number;
  /** `true` only after AsyncStorage rehydration finishes (success or failure). */
  hydrated: boolean;
}

const STORAGE_KEY = 'watchlist-storage';

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      count: 0,
      hydrated: false,
      addItem: (item) => {
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) {
            return state;
          }
          const items = [...state.items, item];
          return { items, count: items.length };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const items = state.items.filter((i) => i.id !== id);
          return { items, count: items.length };
        });
      },
      isInWatchlist: (id) => get().items.some((i) => i.id === id),
    }),
    {
      name: STORAGE_KEY,
      storage: createWatchlistPersistStorage(),
      partialize: (state): PersistedWatchlistSlice => ({ items: state.items }),
      merge: (persistedState, currentState) => {
        const p = persistedState as Partial<PersistedWatchlistSlice> | undefined;
        const items = p?.items ?? [];
        return {
          ...currentState,
          items,
          count: items.length,
          hydrated: true,
        };
      },
    },
  ),
);
