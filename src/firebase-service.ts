import * as admin from 'firebase-admin';

// Initialize Firebase
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://fir-api-1-1b0a3-default-rtdb.firebaseio.com'
});

export default admin;