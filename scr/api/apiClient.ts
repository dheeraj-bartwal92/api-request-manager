import axios, {AxiosInstance, AxiosResponse} from 'axios';

export interface ApiPayload<K> {
  payload?: K;
}

interface ApiResponse<T> {
  response: T;
}
class ApiClient {
  private readonly axiosInstance: AxiosInstance;
  private readonly axiosHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '',
      headers: this.axiosHeaders,
      timeout: 10000,
      timeoutErrorMessage: 'Slow Network',
      validateStatus(status: number) {
        return (
          (status >= 200 && status < 300) || status === 400 || status === 401
        );
      },
    });
  }

  requestHeader = () => {
    return {
      Authorization: 'Bearer',
    };
  };

  handleBodyResponse = async <K>(response: AxiosResponse): Promise<K> => {
    const {status, data, statusText} = response;
    if (status === 200)
      return Promise.resolve(JSON.parse(JSON.stringify(data)));
    const errorMessage = status === 401 ? '' : statusText;
    return Promise.reject({
      message: errorMessage,
    } as Error);
  };

  postApiService = async <K, T>(
    api: string,
    reqParam: ApiPayload<K>,
  ): Promise<T> => {
    try {
      // Make the POST request with the payload
      const response = await this.axiosInstance.post<T>(api, reqParam, {
        headers: {...this.axiosHeaders, ...this.requestHeader()},
      });

      // Handle the response data using the handleBodyResponse method
      return this.handleBodyResponse(response);
    } catch (error) {
      console.error('Error in postApiService:', error);
      throw error; // Always throw or handle the error, so the caller knows it failed
    }
  };

  getApiService = async <K>(api: string): Promise<K> => {
    try {
      // Make the POST request with the payload
      const response = await this.axiosInstance.get<K>(api, {
        headers: {...this.axiosHeaders, ...this.requestHeader()},
      });
      return this.handleBodyResponse(response);
    } catch (error) {
      console.error('Error in postApiService:', error);
      throw error; // Always throw or handle the error, so the caller knows it failed
    }
  };
}

export const API = new ApiClient();
