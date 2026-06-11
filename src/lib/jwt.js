export function parseGoogleCredential(credential) {
	const base64Url = credential.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
			.join('')
	);

	return JSON.parse(jsonPayload);
}
