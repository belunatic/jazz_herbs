// src/auth.js
import { account, OAuthProvider } from "@/lib/appwrite";

export const loginWithGoogle = async () => {
	try {
		const baseUrl = window.location.origin;
		console.log(baseUrl);
		console.log("Hello me");
		await account.createOAuth2Token(
			OAuthProvider.Google,
			`${baseUrl}/`, // your callback URL
			`${baseUrl}/` // failure URL
		);
	} catch (error) {
		console.error(error);
	}
};

export const logoutUser = async () => {
	try {
		await account.deleteSession("current");
	} catch (error) {
		console.error(error);
	}
};

export const getUser = async () => {
	try {
		return await account.get();
	} catch (error) {
		console.error(error);
	}
};

// 3. Implement the callback handler
export const createUserSession = async (userId, secret) => {
	try {
		// Create a session using the OAuth2 token
		await account.createSession(userId, secret);

		// Get the user data
		const user = await account.get();
		console.log("this is the user from func:  ", user);
		// User is now authenticated!
		return user;
	} catch (error) {
		console.error("Authentication failed:", error);
		throw error;
	}
};
