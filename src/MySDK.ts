import axios, { AxiosError, AxiosResponse } from 'axios';
import { IpResponse } from './interfaces/app.interface';

class MySDK {
  private baseUrl: string;

  constructor(baseURL?: string) {
    this.baseUrl = baseURL || 'http://localhost:3000';
  }

  async getIp(ip: string): Promise<IpResponse> {
    try {
      const response: AxiosResponse<IpResponse> = await axios.get(
        this.baseUrl,
        {
          params: {
            ip,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new AxiosError(error);
    }
  }
}

export default MySDK;
