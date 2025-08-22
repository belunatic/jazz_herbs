"use client";
import { useEffect, useState } from "react";
import { getUser, createUserSession } from "./pages/api/auth";
import { getAllHerbs, getHerb, deleteHerb } from "./pages/api/herbs";
import { useUser } from "../context/UserContext";
import AddHerbButton from "../components/AddHerbButton";
import Modal from "../components/Modal";
import Link from "next/link";
import HerbalCheckboxGroup from "../components/HerbalFilterCheckbox";
import {
	herbalActions,
	herbalEnergetics,
	herbalConstituents,
} from "../lib/constants"; // adjust path as needed
import SearchForm from "../components/SearchForm";
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";

export default function Home() {
	// retrieve the user info from Context
	const { User, setUser, sessionOn, setNotify } = useUser();
	const [originalHerbData, setOriginalHerbData] = useState(false);
	const [herbData, setHerbData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [modal, setModal] = useState(false);
	const [selectedDeleteHerb, setSelectedDeleteHerb] = useState(null);
	const [showFilterCol, setShowFilterCol] = useState(false);
	//filter purposes
	const [selectedActions, setSelectedActions] = useState([]);
	const [selectedEnergetics, setSelectedEnergetics] = useState([]);
	const [selectedConstituents, setSelectedConstituents] = useState([]);

	//Login Logic
	useEffect(() => {
		const checkUser = async () => {
			try {
				//log a user in if not logged in yet
				if (!User) {
					//get the userId and secret
					const params = new URLSearchParams(window.location.search);
					const userId = params.get("userId");
					const secret = params.get("secret");

					if (userId && secret) {
						//retrieve the allowed users
						const allowedUsers = process.env.NEXT_PUBLIC_ALLOWED_USERS;

						//login allowed user
						if (!process.env.NEXT_PUBLIC_ALLOWED_USERS?.includes(userId)) {
							//show notification if user not allowed
							setNotify(true);
							// Clean up URL params after login
							window.history.replaceState(
								{},
								document.title,
								window.location.pathname
							);
						} else {
							//create a session
							const userSession = await createUserSession(userId, secret);
							setUser(userSession);
							// Clean up URL params after login
							window.history.replaceState(
								{},
								document.title,
								window.location.pathname
							);
						}
					}
				}
			} catch (error) {
				console.error("Session not found or failed:", error);
				// Redirect to login or show error
			}
		};

		checkUser();
	}, []);

	//get the herbs
	useEffect(() => {
		const getHerbs = async () => {
			try {
				const result = await getAllHerbs();
				setOriginalHerbData(result.documents);
				setHerbData(result.documents);
				setLoading(false);
			} catch (err) {
				console.log("This is error from retrieving all herbs: ", err);
			}
		};
		getHerbs();
	}, []);

	//filter the herbs
	useEffect(() => {
		//check to see if original data is loaded from the server
		if (originalHerbData) {
			//filter thru original data
			const filteredData = originalHerbData.filter((item) => {
				//if NO condition is selected return true( a.k.a return all)
				//OR if condition is selected return only the data that matches the filter
				const matchesActions =
					selectedActions.length === 0 ||
					item.herbal_action?.some((a) => selectedActions.includes(a));

				const matchesEnergetics =
					selectedEnergetics.length === 0 ||
					item.herbal_energetics?.some((e) => selectedEnergetics.includes(e));

				const matchesConstituents =
					selectedConstituents.length === 0 ||
					item.herbal_constituents?.some((c) =>
						selectedConstituents.includes(c)
					);
				//return the ITEM that matches all the conditions
				return matchesActions && matchesEnergetics && matchesConstituents;
			});

			setHerbData(filteredData);
		}
	}, [
		selectedActions,
		selectedEnergetics,
		selectedConstituents,
		originalHerbData,
	]);

	//display the herbs
	const displayHerbs = () =>
		herbData.map((item) => (
			<div key={item.$id} className="max-w-sm h-full">
				<div className="flex flex-col h-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
					<Link href={`/herbs/${item.$id}`}>
						<h1 className="mb-2 text-2xl cursor-pointer font-bold tracking-tight text-gray-900 dark:text-white">
							{item.herb_name}
							<br />
							<span className="italic text-lg">{item.alt_name}</span>
						</h1>
					</Link>

					{displayHerbsFeatures("Constituents", item.herbal_constituents)}
					{displayHerbsFeatures("Energetics", item.herbal_energetics)}
					{displayHerbsFeatures("Action", item.herbal_action)}

					{/* Push button to bottom */}
					<div className="flex justify-end gap-4 mt-auto pt-4">
						<Link href={`/herbs/${item.$id}`}>
							<button className="p-2 h-[40px] cursor-pointer hover:bg-button-secondary/70 bg-button-secondary text">
								Read More
							</button>
						</Link>
						{User ? (
							<>
								<Link href={`/herbs/editherb/${item.$id}`}>
									<button className="py-2 px-1 h-[40px] cursor-pointer hover:bg-button-success/70 bg-button-success text">
										<FaPenToSquare />
									</button>
								</Link>
								<button
									onClick={(e) => openModal(e, item.$id)}
									className="py-2 px-1 h-[40px] cursor-pointer hover:bg-error/70 bg-error text">
									<FaTrashCan />
								</button>
							</>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		));
	//display the herbs features
	const displayHerbsFeatures = (title, feat) => {
		return (
			<div>
				<div>
					<p className="font-semibold text-text underline">{title}:</p>
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
		<div role="status" className="block mx-auto py-8 col-span-3">
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
			setHerbData(herbData.filter((item) => item.$id !== id));
			setModal(false);
		} catch (err) {
			console.log("Error occurred while trying to delete:", err);
		}
	};

	const resetAll = () => {
		setSelectedActions([]);
		setSelectedConstituents([]);
		setSelectedEnergetics([]);
		setHerbData(originalHerbData);
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
				<div className=" flex justify-between mb-4">
					<h1 className="text-text text-xl md:text-3xl font-bold pb-4">
						Hello {User?.name ? `, ${User.name}` : ""}
					</h1>
					<div className="flex gap-4">
						<button
							className="px-2 py-1 rounded-lg text-text cursor-pointer hover:bg-tooltip/70 bg-tooltip"
							onClick={resetAll}>
							Reset
						</button>
						<button
							className="px-2 py-1 rounded-lg text-text cursor-pointer hover:bg-tooltip/70 bg-tooltip"
							onClick={() => setShowFilterCol(!showFilterCol)}>
							{showFilterCol ? "Close" : "Filter"}
						</button>
					</div>
				</div>
				<main className="flex flex-col md:flex-row gap-4 items-stretch">
					<section
						className={` ${
							showFilterCol ? "md:w-1/5" : "hidden"
						} h-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
						<HerbalCheckboxGroup
							title="Constituents"
							data={herbalConstituents}
							attributeName="herbal_constituents"
							selectedItems={selectedConstituents}
							setSelectedItems={setSelectedConstituents}
						/>
						<HerbalCheckboxGroup
							title="Energetics"
							data={herbalEnergetics}
							attributeName="herbal_energetics"
							selectedItems={selectedEnergetics}
							setSelectedItems={setSelectedEnergetics}
						/>
						<HerbalCheckboxGroup
							title="Actions"
							data={herbalActions}
							attributeName="herbal_action"
							selectedItems={selectedActions}
							setSelectedItems={setSelectedActions}
						/>
						<hr className="w-full text-text" />
						{/* search form */}
						<SearchForm currentHerbData={herbData} setHerbData={setHerbData} />
					</section>
					<section className={` ${showFilterCol ? "md:w-4/5" : "w-full"}`}>
						<div className="grid grid-col-1 md:grid-cols-3 gap-4  items-stretch">
							{loading ? displayLoading() : displayHerbs()}
						</div>
					</section>
				</main>

				{User ? <AddHerbButton linkTo="herbs/addherb" title="Add herb" /> : ""}
			</div>
		</>
	);
}
