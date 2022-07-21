
export interface ErrorResponse {
	id: string;
	code: string;
	message: string;
}

export interface GetOptions {
	url: string;
	params?: Params;
}

export interface Params {
	[ key: string ]: any;
}