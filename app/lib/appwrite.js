import { Client, Databases, Account, ID } from "appwrite";

//CONNECT TO THE APPWRITE DB
const client = new Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Replace with your project ID

const account = new Account(client);

//CONNECT TO THE DB
const databases = new Databases(client);

export { account, databases, ID };
