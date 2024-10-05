import clientPromise from '$lib/db';

export async function GET({ url }) {
	try {
		const client = await clientPromise;
		const db = client.db('league_link');

		const userCollection = db.collection('users');
		const result = await userCollection.findOne({});

		return new Response(
			JSON.stringify({
				message: result ? 'User found' : 'User not found',
				data: result || 'No documents found.'
			}),
			{ status: result ? 200 : 404, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		return new Response(
			JSON.stringify({ message: 'Database connection failed', error: error.message }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
}
