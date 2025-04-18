import { IAuthenticateGeneric, INodeProperties } from 'n8n-workflow';

export const uzapiCredentialProperties: INodeProperties[] = [
	{
		displayName: 'Base URL',
		name: 'baseUrl',
		type: 'string',
		default: 'https://teste.uzapi.com.br:3333',
		description: 'URL base da UZapi',
	},
];

export const uzapiGenericAuth: IAuthenticateGeneric = {
	type: 'generic',
	properties: {
		headers: {},
	},
};
