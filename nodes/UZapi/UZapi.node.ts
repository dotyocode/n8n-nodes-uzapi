import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { properties } from '../../utils/properties/properties';

import { ApiClient } from './apiClient';
import { operationsMap } from './operations';

export class UZapi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'UZapi',
		name: 'uzapi',
		icon: 'file:zapi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interage com a API da UZapi (WhatsApp)',
		defaults: { name: 'UZapi' },
		inputs: ['main'] as any,
		outputs: ['main'] as any,
		credentials: [{ name: 'uzapiCredentialsApi', required: false }],
		properties: properties as unknown as INodeTypeDescription['properties'],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const creds = (await this.getCredentials('uzapiCredentialsApi')) as { baseUrl: string };
		const client = new ApiClient(this, creds.baseUrl);

		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as keyof typeof operationsMap;
			const handler = operationsMap[operation];

			if (!handler)
				throw new Error(`Operation "${operation}" não implementada`);

			const result = await handler(this, client, i);
			Array.isArray(result) ? returnData.push(...result) : returnData.push(result);
		}

		return this.prepareOutputData(returnData);
	}
}
