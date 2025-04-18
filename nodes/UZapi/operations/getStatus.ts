import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiClient } from '../apiClient';

export async function getStatus(
	ctx: IExecuteFunctions,
	client: ApiClient,
	i: number,
): Promise<INodeExecutionData> {
	const apiToken = ctx.getNodeParameter('apiToken', i, '') as string;
	const sessionKey = ctx.getNodeParameter('sessionKey', i) as string;
	const session = ctx.getNodeParameter('session', i) as string;

	const data = await client.request(
		{
			method: 'POST',
			url: '/getSessionStatus',
			headers: {
				'Content-Type': 'application/json',
				sessionkey: sessionKey,
				...(apiToken && { apitoken: apiToken }),
			},
			body: { session: session },
			json: true,
		},
		i,
	);

	return { json: data };
}
