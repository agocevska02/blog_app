// import { Local_Storage_Keys } from '@/types/shared/local-storage';
// import { LocalStorageInstance } from '@/utilities/shared/local-storage';
import { BLOG_API_URL } from "../constants";
import HttpClient from "./http-client";

class BlogClient extends HttpClient {
  apiUrl: string;
  requestHeaders: Record<string, string>;
  contentTypeHeader: Record<string, string>;

  constructor() {
    super();
    this.apiUrl = BLOG_API_URL;

    // const jwt =
    //   typeof window !== 'undefined' ? LocalStorageInstance.getItem<string>('jwt') : undefined;

    this.requestHeaders = {
      Accept: "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      
      //   'Authorization': jwt ? `Bearer ${jwt}` : '',
    };

    this.contentTypeHeader = { "Content-Type": "application/json" };
  }

  //   setJwt() {
  //     const jwt =
  //       typeof window !== 'undefined' ? LocalStorageInstance.getItem<string>('jwt') : undefined;

  //     this.requestHeaders['Authorization'] = jwt ? `Bearer ${jwt}` : '';
  //   }

  async get<T>(
    uri: string,
    headers?: HeadersInit,
    isExternal?: boolean
  ): Promise<T> {
    const url = isExternal ? uri : `${this.apiUrl}/${uri}`;

    // if (!this.requestHeaders['Authorization']) this.setJwt();

    const contentTypeHeader = headers ? { ...headers } : this.contentTypeHeader;

    const response = await fetch(`${url}`, {
      headers: isExternal
        ? undefined
        : { ...this.requestHeaders, ...contentTypeHeader },
      method: "GET",
    });

    const responseData = await response.json();

    if (!responseData.error) {
      return await responseData;
    } else {
      throw new Error(responseData.error.message);
    }
  }

  async post<T>(
    uri: string,
    bodyData: object,
    headers?: HeadersInit,
    isExternal?: boolean
  ): Promise<T> {
    const url = isExternal ? uri : `${this.apiUrl}/${uri}`;

    // if (!this.requestHeaders['Authorization']) this.setJwt();

    const contentTypeHeader = headers ? { ...headers } : this.contentTypeHeader;

    const response = await fetch(`${url}`, {
      headers: isExternal
        ? undefined
        : { ...this.requestHeaders, ...contentTypeHeader },
      method: "POST",
      body: bodyData instanceof FormData ? bodyData : JSON.stringify(bodyData),
    });

    const responseData = await response.json();

    if (!responseData.error) {
      return await responseData;
    } else {
      throw new Error(responseData.error.message);
    }
  }

  async put<T>(
    uri: string,
    bodyData: object,
    headers?: HeadersInit,
    isExternal?: boolean
  ): Promise<T> {
    const url = isExternal ? uri : `${this.apiUrl}/${uri}`;

    // if (!this.requestHeaders['Authorization']) this.setJwt();

    const contentTypeHeader = headers ? { ...headers } : this.contentTypeHeader;

    const response = await fetch(`${url}`, {
      headers: isExternal
        ? undefined
        : { ...this.requestHeaders, ...contentTypeHeader },
      method: "PUT",
      body: JSON.stringify(bodyData),
    });

    const responseData = await response.json();

    if (!responseData.error) {
      return await responseData;
    } else {
      throw new Error(responseData.error.message);
    }
  }

  async delete<T>(
    uri: string,
    bodyData?: object,
    headers?: HeadersInit,
    isExternal?: boolean
  ): Promise<T> {
    const url = isExternal ? uri : `${this.apiUrl}/${uri}`;

    // if (!this.requestHeaders['Authorization']) this.setJwt();

    const contentTypeHeader = headers ? { ...headers } : this.contentTypeHeader;

    const response = await fetch(`${url}`, {
      headers: isExternal
        ? undefined
        : { ...this.requestHeaders, ...contentTypeHeader },
      method: "DELETE",
      body: JSON.stringify(bodyData),
    });

    const responseData = await response.json();

    if (!responseData.error) {
      return await responseData;
    } else {
      throw new Error(responseData.error.message);
    }
  }

  async patch<T>(
    uri: string,
    bodyData: object,
    headers?: HeadersInit
  ): Promise<T> {
    const url = `${this.apiUrl}/${uri}`;

    const response = await fetch(`${url}`, {
      headers: { ...this.requestHeaders, ...headers },
      method: "PATCH",
      body: bodyData instanceof FormData ? bodyData : JSON.stringify(bodyData),
    });

    const responseData = await response.json();

    if (!responseData.error) {
      return await responseData;
    } else {
      throw new Error(responseData.error.message);
    }
  }

  async download(
    uri: string,
    isExternal: boolean = true,
    headers?: HeadersInit
  ): Promise<Blob> {
    const url = isExternal ? uri : `${this.apiUrl}/${uri}`;

    // if (!this.requestHeaders['Authorization']) this.setJwt();

    const response = await fetch(`${url}`, {
      headers: isExternal ? undefined : { ...this.requestHeaders, ...headers },
      method: "GET",
    });

    return response.blob();
  }

  async export(
    uri: string,
    bodyData: object,
    headers?: HeadersInit,
    isExternal?: boolean
  ): Promise<Blob> {
    const url = isExternal ? uri : `${this.apiUrl}/${uri}`;

    // if (!this.requestHeaders['Authorization']) this.setJwt();

    const contentTypeHeader = headers ? { ...headers } : this.contentTypeHeader;

    const response = await fetch(`${url}`, {
      headers: isExternal
        ? undefined
        : { ...this.requestHeaders, ...contentTypeHeader },
      method: "POST",
      body: bodyData instanceof FormData ? bodyData : JSON.stringify(bodyData),
    });

    return await response.blob();
  }
}

export const BlogClientInstance = new BlogClient();
