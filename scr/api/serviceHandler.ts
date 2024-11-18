import {API, ApiPayload} from './apiClient';

export enum API_METHOD {
  POST = 'POST',
  GET = 'GET',
}

// `T` is the expected response type, `K` is the type for request payload (only used for POST)
export const serviceHandler = async <K, T>(
  method: API_METHOD,
  url: string,
  payload?: K,
): Promise<T> => {
  try {
    switch (method) {
      case API_METHOD.GET:
        const getResponse = await API.getApiService<T>(url);
        return getResponse;

      case API_METHOD.POST:
        const postResponse = await API.postApiService<K, T>(
          url,
          payload || ({} as ApiPayload<K>),
        );
        return postResponse;

      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  } catch (error) {
    console.error('Error in serviceHandler:', error);
    throw error;
  }
};
