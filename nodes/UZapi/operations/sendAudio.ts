import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiClient } from '../apiClient';

export async function sendAudio(
	ctx: IExecuteFunctions,
	client: ApiClient,
	i: number,
): Promise<INodeExecutionData> {
	const sessionKey = ctx.getNodeParameter('sessionKey', i) as string;
	const session = ctx.getNodeParameter('session', i) as string;
	const number = ctx.getNodeParameter('number', i) as string;
	const caption = ctx.getNodeParameter('caption', i) as string;
	const path = ctx.getNodeParameter('path', i) as string;

	const data = await client.request(
		{
			method: 'POST',
			url: '/sendAudio',
			headers: { 'Content-Type': 'application/json', sessionkey: sessionKey },
			body: { session: session, number: number, caption: caption, path: path },
			json: true,
		},
		i,
	);

	return { json: data };
}
