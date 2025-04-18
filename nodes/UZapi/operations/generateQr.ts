import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiClient } from '../apiClient';

export async function generateQr(
	ctx: IExecuteFunctions,
	client: ApiClient,
	i: number,
): Promise<INodeExecutionData> {
	const sessionKey = ctx.getNodeParameter('sessionKey', i) as string;
	const session = ctx.getNodeParameter('session', i) as string;

	const buffer: Buffer = (await client.request(
		{
			method: 'GET',
			url: `/getQrCode?session=${session}&sessionkey=${sessionKey}`,
			headers: { 'Content-Type': 'application/json' },
			encoding: null,
		},
		i,
	)) as Buffer;

	const sharp = require('sharp');
	const margin = 20;
	const paddedBuffer: Buffer = await sharp(buffer)
		.extend({
			top: margin,
			bottom: margin,
			left: margin,
			right: margin,
			background: { r: 255, g: 255, b: 255, alpha: 1 },
		})
		.png()
		.toBuffer();

	const binaryData = await ctx.helpers.prepareBinaryData(paddedBuffer, `${session}.png`);

	return {
		json: { session, sessionKey },
		binary: { qrImage: binaryData },
	};
}
