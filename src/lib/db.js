import { MongoClient } from 'mongodb';

const uri = import.meta.env.PROD
	? import.meta.env.VITE_MONGODB_URI
	: import.meta.env.VITE_MONGODB_URI_LOCAL;
const options = {};

let client;
let clientPromise;

if (!uri) {
	throw new Error('Please add your Mongo URI to the environment variables');
}

if (!global._mongoClientPromise) {
	client = new MongoClient(uri, options);
	global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
