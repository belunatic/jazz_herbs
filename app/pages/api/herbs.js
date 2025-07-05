import { databases, ID } from "@/lib/appwrite";

export const createHerb = async (itemData) => {
	try {
		const result = await databases.createDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // databaseId
			process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID, // collectionId
			ID.unique(), // documentId
			itemData // data
		);
		console.log(result);
	} catch (err) {
		console.log(err);
	}

	console.log(result);
};
