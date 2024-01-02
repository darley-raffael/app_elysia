export interface RepositoryInterface<T, U> {
	create(item: T): Promise<U>;
	update(item: T): Promise<U>;
	delete(id: string): Promise<null>;
	findById(id: string): Promise<U | null>;
	findAll(page: number): Promise<U[] | null>;
}
