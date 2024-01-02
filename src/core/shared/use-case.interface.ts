export interface UseCaseInterface<T, R> {
  execute(input: T): Promise<R>;
}
