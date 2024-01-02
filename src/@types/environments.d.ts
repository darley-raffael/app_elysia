declare module "bun" {
	interface Env {
		DATABASE_URL: string;
		SIZE_LIMIT_PAGE: number;
	}
}
