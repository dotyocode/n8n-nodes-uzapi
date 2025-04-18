import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiClient } from '../apiClient';

export async function startSession(
	ctx: IExecuteFunctions,
	client: ApiClient,
	i: number,
): Promise<INodeExecutionData> {
	const apiToken = ctx.getNodeParameter('apiToken', i) as string;
	const sessionKey = ctx.getNodeParameter('sessionKey', i) as string;
	const session = ctx.getNodeParameter('session', i) as string;

	const data = await client.request(
		{
			method: 'POST',
			url: '/start',
			headers: {
				'Content-Type': 'application/json',
				apitoken: apiToken,
				sessionkey: sessionKey,
			},
			body: { session: session },
			json: true,
		},
		i,
	);

	return { json: data };
}
