import { INodeProperties } from 'n8n-workflow';
import { options } from './options/options';

const OPS_WITH_SESSION_KEY = [
	'startSession',
	'getStatus',
	'generateQr',
	'sendtext',
	'sendLink',
	'sendImage',
	'sendFile',
	'sendAudio',
	'sendVideo',
	'sendFile64',
] as const;

const OPS_WITH_NUMBER = [
	'sendtext',
	'sendLink',
	'sendImage',
	'sendFile',
	'sendAudio',
	'sendVideo',
	'sendFile64',
] as const;
const OPS_WITH_CAPTION = OPS_WITH_NUMBER;
const OPS_WITH_PATH = ['sendImage', 'sendFile', 'sendAudio', 'sendVideo'] as const;
const OPS_WITH_FILE64 = ['sendFile64'] as const;

function stringField(
	displayName: string,
	name: string,
	operations: readonly string[],
	description: string,
): INodeProperties {
	return {
		displayName,
		name,
		type: 'string',
		displayOptions: { show: { operation: [...operations] } },
		default: '',
		description,
	};
}

export const properties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options,
		default: 'startSession',
		description: 'Qual endpoint da UZapi chamar?',
	},

	stringField('API Token', 'apiToken', ['startSession'], 'API Token para autenticação'),
	stringField('Session Key', 'sessionKey', OPS_WITH_SESSION_KEY, 'Session Key para autenticação'),
	stringField('Session', 'session', OPS_WITH_SESSION_KEY, 'Session retornada em /start'),
	stringField(
		'Número (com DDI)',
		'number',
		OPS_WITH_NUMBER,
		'Número do destino, ex: 5511999998888',
	),
	stringField('Texto', 'text', ['sendtext', 'sendLink'], 'Mensagem a ser enviada'),
	stringField('URL', 'url', ['sendLink'], 'Endereço do link a ser enviado'),
	stringField(
		'Descrição',
		'caption',
		OPS_WITH_CAPTION,
		'Descrição da imagem ou arquivo a ser enviado',
	),
	stringField('Link', 'path', OPS_WITH_PATH, 'Link do arquivo ou imagem a ser enviado'),
	stringField(
		'Arquivo',
		'binaryPropertyName',
		OPS_WITH_FILE64,
		'Diretório do arquivo a ser enviado. Ex: C:\\Users\\SeuUsuario\\Downloads\\Arquivo.pdf',
	),
];
