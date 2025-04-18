import { IBinaryKeyData, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { toDataUri } from '../../../utils/files/fileUtils';
import { ApiClient } from '../apiClient';

export async function sendFile64(
	ctx: IExecuteFunctions,
	client: ApiClient,
	i: number,
): Promise<INodeExecutionData> {
	const sessionKey = ctx.getNodeParameter('sessionKey', i) as string;
	const session = ctx.getNodeParameter('session', i) as string;
	const number = ctx.getNodeParameter('number', i) as string;
	const caption = ctx.getNodeParameter('caption', i, '') as string;

	let path = ctx.getNodeParameter('binaryPropertyName', i, '') as string;

	if (path) {
		const looksLikeDataUri = path.startsWith('data:');
		const looksLikeUrl = /^https?:\/\//i.test(path);
		if (!looksLikeDataUri && !looksLikeUrl) {
			path = toDataUri(path);
		}
	}

	if (!path) {
		const binaryPropertyName = ctx.getNodeParameter('binaryPropertyName', i, 'data') as string;
		const binaryItem = (ctx.getInputData()[i].binary ?? {}) as IBinaryKeyData;

		if (!binaryItem || !binaryItem[binaryPropertyName]) {
			throw new Error(
				'Nenhum arquivo encontrado.',
			);
		}

		const buf = await ctx.helpers.getBinaryDataBuffer(i, binaryPropertyName);
		const mimeType = binaryItem[binaryPropertyName].mimeType || 'application/octet-stream';
		path = `data:${mimeType};base64,${buf.toString('base64')}`;
	}

	const data = await client.request(
		{
			method: 'POST',
			url: '/sendFile64',
			headers: { 'Content-Type': 'application/json', sessionkey: sessionKey },
			body: { session: session, number: number, caption: caption, path: path },
			json: true,
		},
		i,
	);

	return { json: data };
}
