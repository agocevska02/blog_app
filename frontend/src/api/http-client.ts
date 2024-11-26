abstract class HttpClient {
    abstract get<T>(uri: string, headers: HeadersInit, isExternal: boolean): Promise<T>;
    abstract post<T>(
      uri: string,
      bodyData: object,
      headers: HeadersInit,
      isExternal: boolean,
      isBlob: boolean,
    ): Promise<T>;
    abstract put<T>(uri: string, bodyData: object, headers: HeadersInit, isExternal: boolean): Promise<T>;
    abstract delete<T>(uri: string, bodyData: object, headers: HeadersInit, isExternal: boolean): Promise<T>;
    abstract download(uri: string, isExternal: boolean, headers: HeadersInit): Promise<Blob>;
  }
  
  export default HttpClient;