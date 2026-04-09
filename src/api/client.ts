import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { TMDB_ACCESS_TOKEN, TMDB_BASE_URL } from '@env';

import type { TmdbErrorResponse } from './types';

type RequestConfigWithRetry = InternalAxiosRequestConfig & { _retry?: boolean };

/** Normalized error shape from the response interceptor (not exported). */
interface NormalizedError {
  message: string;
  status: number | undefined;
}

function isTmdbErrorBody(data: unknown): data is TmdbErrorResponse {
  if (data === null || typeof data !== 'object') {
    return false;
  }
  const o = data as Record<string, unknown>;
  return typeof o.status_message === 'string' && typeof o.status_code === 'number';
}

function extractErrorMessage(data: unknown): string | undefined {
  if (isTmdbErrorBody(data)) {
    return data.status_message;
  }
  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>;
    if (typeof record.message === 'string') {
      return record.message;
    }
  }
  return undefined;
}

function normalizeAxiosError(error: AxiosError): NormalizedError {
  if (error.response) {
    const msg =
      extractErrorMessage(error.response.data) ??
      error.message ??
      'Request failed';
    return { message: msg, status: error.response.status };
  }
  return {
    message: error.message || 'Network error',
    status: undefined,
  };
}

/** Retry only when no HTTP response arrived (true network / transport failure). Never retry 4xx/5xx or user aborts. */
function isNetworkLayerFailure(error: AxiosError): boolean {
  if (error.response !== undefined) {
    return false;
  }
  if (error.code === 'ERR_CANCELED') {
    return false;
  }
  return true;
}

const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (TMDB_ACCESS_TOKEN) {
    config.headers.Authorization = `Bearer ${TMDB_ACCESS_TOKEN}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const config = error.config as RequestConfigWithRetry | undefined;

    if (config && !config._retry && isNetworkLayerFailure(error)) {
      config._retry = true;
      return apiClient.request(config);
    }

    return Promise.reject(normalizeAxiosError(error));
  },
);

export default apiClient;
