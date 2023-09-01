import express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { UserRouter } from './routes/User';
import { UploadRouter } from './routes/Upload';
import { AuthRouter } from './routes/Auth';


const app = express();
// Middleware
dotenv.config();
app.use(Cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
	app.listen(process.env.SERVER_PORT, () =>
		console.log(`Server Running on port : ${process.env.SERVER_PORT}`)
	);
	// Routes
	app.use('/upload', UploadRouter);
	app.use('/user', UserRouter);
	app.use('/auth', AuthRouter);

} catch (error) {
	console.error(error);
	throw new Error('Unable To Connect To Database');
}