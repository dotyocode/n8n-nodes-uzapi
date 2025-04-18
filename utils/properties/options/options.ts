import { INodePropertyOptions } from 'n8n-workflow';

export const options: INodePropertyOptions[] = [
	{ name: 'Start Session', value: 'startSession', description: 'POST /start' },
	{ name: 'Get Session Status', value: 'getStatus', description: 'POST /getSessionStatus' },
	{ name: 'Generate & Read QR', value: 'generateQr', description: 'GET /getQrCode + decode' },
	{ name: 'Enviar texto', value: 'sendtext', description: 'POST /sendText' },
	{ name: 'Enviar link', value: 'sendLink', description: 'POST /sendLink' },
	{ name: 'Enviar Imagem', value: 'sendImage', description: 'POST /sendImage' },
	{ name: 'Enviar Arquivo', value: 'sendFile', description: 'POST /sendFile' },
	{ name: 'Enviar Áudio', value: 'sendAudio', description: 'POST /sendAudio' },
	{ name: 'Enviar Vídeo', value: 'sendVideo', description: 'POST /sendVideo' },
	{ name: 'Enviar Arquivo Base64', value: 'sendFile64', description: 'POST /sendFile64' },
];

export type UzapiOperation = (typeof options)[number]['value'];
