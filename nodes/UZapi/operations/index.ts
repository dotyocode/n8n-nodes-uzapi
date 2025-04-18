import { generateQr } from './generateQr';
import { getStatus } from './getStatus';
import { sendAudio } from './sendAudio';
import { sendFile } from './sendFile';
import { sendFile64 } from './sendFile64';
import { sendImage } from './sendImage';
import { sendLink } from './sendLink';
import { sendText } from './sendText';
import { sendVideo } from './sendVideo';
import { startSession } from './startSession';

export const operationsMap = {
	startSession,
	getStatus,
	generateQr,
	sendtext: sendText,
	sendLink,
	sendImage,
	sendFile,
	sendVideo,
	sendAudio,
	sendFile64,
} as const;
