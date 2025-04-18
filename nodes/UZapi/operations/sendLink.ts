import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiClient } from '../apiClient';

export async function sendLink(
	ctx: IExecuteFunctions,
	client: ApiClient,
	i: number,
): Promise<INodeExecutionData> {
	const apiToken = ctx.getNodeParameter('apiToken', i, '') as string;
	const sessionKey = ctx.getNodeParameter('sessionKey', i) as string;
	const session = ctx.getNodeParameter('session', i) as string;
	const number = ctx.getNodeParameter('number', i) as string;
	const text = ctx.getNodeParameter('text', i) as string;
	const url = ctx.getNodeParameter('url', i) as string;

	const data = await client.request(
		{
			method: 'POST',
			url: '/sendLink',
			headers: {
				'Content-Type': 'application/json',
				sessionkey: sessionKey,
				...(apiToken && { apitoken: apiToken }),
			},
			body: { session: session, number: number, text: text, url: url },
			json: true,
		},
		i,
	);

	return { json: data };
}
