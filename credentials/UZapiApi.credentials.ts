import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

import { uzapiCredentialProperties, uzapiGenericAuth } from './uzapiCredentialProperties';

export class UZapiApi implements ICredentialType {
	name = 'uzapiCredentialsApi';
	displayName = 'UZapi API';
	documentationUrl = 'https://documenter.getpostman.com/view/131526/U16hsmcg#intro';

	properties: INodeProperties[] = uzapiCredentialProperties;

	authenticate: IAuthenticateGeneric = uzapiGenericAuth;
}
