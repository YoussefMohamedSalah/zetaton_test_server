declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SERVER_PORT?: number;
			FIREBASE_API_KEY?: string;
			FIREBASE_AUTH_DOMAIN?: string;
			FIREBASE_DATABASE_URL?: string;
			FIREBASE_PROJECT_ID?: string;
			FIREBASE_STORAGE_BUCKET?: string;
			FIREBASE_MESSAGING_SENDER_ID?: string;
			FIREBASE_APP_ID?: string;
			NODE_ENV?: string;
		}
	}
}

export { };
