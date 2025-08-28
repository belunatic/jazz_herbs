"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getHerb, deleteHerb } from "@/pages/api/herbs";
import AddHerbButton from "../../../components/AddHerbButton";
import { useUser } from "../../../context/UserContext";
import Modal from "../../../components/Modal";
import { useRouter } from "next/navigation";
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";

const HerbDetailsPage = () => {
	//retrieve the id
	const { id } = useParams();
	const router = useRouter();
	// retrieve the user info from Context
	const { User, setUser, sessionOn, setNotify } = useUser();
	const [loading, setLoading] = useState(true);
	const [herbData, setHerbData] = useState(null);
	const [modal, setModal] = useState(false);
	const [selectedDeleteHerb, setSelectedDeleteHerb] = useState(null);
	const [copies, setCopied] = useState(false);

	//get the herbs
	useEffect(() => {
		const getSingleHerb = async () => {
			try {
				const result = await getHerb(id);
				// console.log(result);
				setHerbData(result);
				setLoading(false);
			} catch (err) {
				console.log("This is error from retrieving all herbs: ", err);
			}
		};
		getSingleHerb();
	}, []);

	//display the herbs
	const displaySingleHerb = () => (
		<div key={herbData.$id} className="max-w-full h-full">
			<div className="flex flex-col h-full p-6">
				<h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
					{herbData.herb_name}
					<br />
					<span className="italic text-xl">{herbData.alt_name}</span>
				</h1>

				{displayHerbsFeatures("Constituents", herbData.herbal_constituents)}
				{displayHerbsFeatures("Energetics", herbData.herbal_energetics)}
				{displayHerbsFeatures("Action", herbData.herbal_action)}
				{/* show notes if the herbs has notes */}
				{herbData.notes.length !== 0 ? (
					<div>
						<p className="font-semibold text-text text-lg underline">Notes:</p>
						<p className="text-text">{herbData.notes}</p>
					</div>
				) : (
					""
				)}

				{/* Push button to bottom */}
				<div className="flex justify-end gap-4 mt-auto pt-4">
					{User ? (
						<>
							<button
								onClick={copyToClipboard}
								className="p-2  cursor-pointer hover:bg-button-secondary/70 bg-button-secondary text">
								{copies ? "Linked Copied" : "Copy Link"}
							</button>
							<button className="p-2  cursor-pointer hover:bg-button-success/70 bg-button-success text">
								<FaPenToSquare />
							</button>
							<button
								onClick={(e) => openModal(e, herbData.$id)}
								className="p-2  cursor-pointer hover:bg-error/70 bg-error text">
								<FaTrashCan />
							</button>
						</>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
	//display the herbs features
	const displayHerbsFeatures = (title, feat) => {
		return (
			<div className="py-4">
				<div>
					<p className="font-semibold text-text text-lg underline">{title}:</p>
					{feat.map((val, i) => {
						return (
							<span key={i} className="text-text">
								{val}
								{feat.length - 1 !== i ? ", " : ""}
							</span>
						);
					})}
				</div>
			</div>
		);
	};
	//UX for the load button
	const displayLoading = () => (
		<div role="status" className="flex justify-center ">
			<svg
				aria-hidden="true"
				className="w-8 h-8 text-text animate-spin fill-blue-600"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
			<span className="sr-only">Loading...</span>
		</div>
	);

	//open confirmation modal and set the deleted Item
	// to be deleted when the user confirms the deletion
	const openModal = (e, id) => {
		//prevent the default action of a link from being triggered
		e.preventDefault();
		// console.log(id);
		setModal(true);
		setSelectedDeleteHerb(id);
	};

	//delete a herb function
	const deleteHerbFunc = async (id) => {
		try {
			const result = await deleteHerb(id);
			// console.log(result);
			setModal(false);
			//redirect to home after deletion
			router.push("/");
		} catch (err) {
			console.log("Error occurred while trying to delete:", err);
		}
	};

	//copy to the browser clipboard
	const copyToClipboard = () => {
		//get the current url
		const url = window.location.href;
		//copy url to the clipboard
		navigator.clipboard
			.writeText(url)
			.then(() => {
				console.log("link is copied: ", url);
				setCopied(true);
				//in given second turn back the boolean
				//use to change the "Copy Link" button text
				setTimeout(() => {
					setCopied(false);
				}, 3000);
			})
			.catch((err) => {
				console.log("An error occurred when copying the link: ", err);
			});
	};

	return (
		<>
			{modal && (
				<Modal
					openModal={modal}
					closeModal={() => setModal(false)}
					confirmFunction={() => deleteHerbFunc(selectedDeleteHerb)}>
					Are you sure you want to delete this herb?
				</Modal>
			)}
			<div className="bg-container p-4">
				{/* <h1 className="text-text text-xl md:text-3xl font-bold pb-4">
				Hello {User?.name ? `, ${User.name}` : ""}
			</h1> */}
				<main className="">
					{loading ? displayLoading() : displaySingleHerb()}
				</main>

				{User ? <AddHerbButton linkTo="herbs/addherb" title="Add herb" /> : ""}
			</div>
		</>
	);
};

export default HerbDetailsPage;
