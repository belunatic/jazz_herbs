import { databases, ID } from "../../../lib/appwrite";
//Add a herb
export const createHerb = async (itemData) => {
	try {
		const result = await databases.createDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // databaseId
			process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID, // collectionId
			ID.unique(), // documentId
			itemData // data
		);
		return result;
	} catch (err) {
		console.log(err);
	}
};
//Get all herbs
export const getAllHerbs = async () => {
	try {
		const result = await databases.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // databaseId
			process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID // collectionId
		);
		return result;
	} catch (err) {
		console.log("This is a error getting all herbs:", err);
	}
};
//Get Specific Herb
export const getHerb = async (herbId) => {
	try {
		const result = await databases.getDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // databaseId
			process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID, // collectionId
			herbId //documentId
		);
		console.log(result);
		return result;
	} catch (err) {
		console.log("This is a Error getting a herb: ", err);
	}
};
//Delete A Herb
export const deleteHerb = async (herbId) => {
	try {
		const result = await databases.deleteDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // databaseId
			process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID, // collectionId
			herbId //documentId
		);
		console.log(result);
	} catch (err) {
		console.log("This is a Error getting a herb: ", err);
	}
};
//Update A Herb
export const updateHerb = async (itemData) => {
	try {
		const result = await databases.updateDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // databaseId
			process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID, // collectionId
			itemData //documentId
		);
		console.log(result);
	} catch (err) {
		console.log("This is a Error getting a herb: ", err);
	}
};
