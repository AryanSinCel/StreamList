import axios from 'axios';
import { TMDB_ACCESS_TOKEN, TMDB_BASE_URL } from '@env';

const headers: Record<string, string> = {
  Accept: 'application/json',
};

if (TMDB_ACCESS_TOKEN) {
  headers.Authorization = `Bearer ${TMDB_ACCESS_TOKEN}`;
}

export const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 15000,
  headers,
});
