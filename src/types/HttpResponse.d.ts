export interface HttpResponse<T> {
  data?: T;
  meta?: HttpMeta;
}

export interface HttpMeta {
  code?: number;
  message?: string;
  status?: string;
}

export interface HttpError {
  message?: string;
}
