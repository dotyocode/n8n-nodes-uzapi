import {
	IExecuteFunctions,
	IRequestOptions,
} from 'n8n-workflow';

export class ApiClient {
	constructor(
		private readonly ctx: IExecuteFunctions,
		private readonly baseUrl: string,
	) {}

	public async request(
		opts: Omit<IRequestOptions, 'url'> & { url: string },
		itemIndex: number,
	) {
		return this.ctx.helpers.requestWithAuthentication.call(
			this.ctx,
			'uzapiCredentialsApi',
			{
				...opts,
				url: `${this.baseUrl}${opts.url}`,
			},
			undefined,
			itemIndex,
		);
	}
}
