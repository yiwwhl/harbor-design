export class ApiResponse<T> {
  constructor(
    public status: 'success' | 'error',
    public message: string,
    public data?: T,
  ) {}
}
