import * as fs from 'fs';
import * as mimeTypes from 'mime-types';

export function toDataUri(path: string): string {
	if (!fs.existsSync(path)) throw new Error(`Arquivo não encontrado: ${path}`);

	const buf = fs.readFileSync(path);
	const mimeType = mimeTypes.lookup(path) || 'application/octet-stream';
	return `data:${mimeType};base64,${buf.toString('base64')}`;
}
