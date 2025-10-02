"use client";
import { useEffect, useState } from "react";
import {
	herbalActions,
	herbalEnergetics,
	herbalConstituents,
} from "../../../../lib/constants";
import { getHerb, updateHerb } from "@/pages/api/herbs";
import Tooltip from "../../../../components/Tooltip";
import Link from "next/link";
import { useParams } from "next/navigation";

const EditHerb = () => {
	//get id from URL
	const { id } = useParams();
	//useState
	const [inputName, setInputName] = useState("");
	const [inputAltName, setInputAltName] = useState("");
	const [confirmMessage, setConfirmMessage] = useState(false);
	const [herbData, setHerbData] = useState(null);

	//get the herb data
	useEffect(() => {
		const getHerbData = async (herbId) => {
			try {
				console.log(id);
				const result = await getHerb(herbId);
				setHerbData(result);
				// console.log(result);
				// console.log(setHerbData);
			} catch (err) {
				console.log("An error occurred retrieving this herb data ", err);
			}
		};
		//call the function
		getHerbData(id);
	}, []);

	//render checkbox and check boxes that were selected
	const renderCheckboxes = (label, attributeName, arrayValue) => {
		const chunkSize = 10;
		const checkboxGroups = [];

		for (let i = 0; i < arrayValue.length; i += chunkSize) {
			const chunk = arrayValue.slice(i, i + chunkSize);
			checkboxGroups.push(
				<div key={i} className="w-full md:w-auto">
					{chunk.map((item, idx) => (
						<Tooltip text={item.description} key={`${i}-${idx}`}>
							<div key={`${i}-${idx}`} className="flex gap-4">
								<input
									type="checkbox"
									id={`${attributeName}_${item.name}`}
									name={`${attributeName}`}
									value={item.name}
									defaultChecked={
										herbData?.[attributeName]?.includes(item.name) ?? false
									}
								/>
								<label htmlFor={`${attributeName}_${item.name}`}>
									{item.name}
								</label>
							</div>
						</Tooltip>
					))}
				</div>
			);
		}

		return (
			<div>
				<label className="block text-text-input text-lg mb-2 font-semibold">
					{label}:
				</label>
				<div className="flex flex-wrap space-x-4">{checkboxGroups}</div>
			</div>
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {};
		const formElements = e.target.elements;

		for (let i = 0; i < formElements.length; i++) {
			const element = formElements[i];
			if (!element.name) continue;

			if (element.type === "checkbox") {
				if (!formData[element.name]) formData[element.name] = [];
				if (element.checked) formData[element.name].push(element.value);
			} else if (element.type === "radio") {
				if (element.checked) formData[element.name] = element.value;
			} else if (element.type === "file") {
				formData[element.name] = element.files;
			} else {
				formData[element.name] = element.value;
			}
		}

		// console.log(formData);
		// Add the herb via API call
		const result = updateHerb(id, formData);
		//show a success message
		result && setConfirmMessage(true);
		//reset form
		e.target.reset();
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

	return (
		<div className="wrapper bg-main text-text">
			{herbData ? (
				<main className="max-w-screen-lg mx-auto bg-container">
					<form onSubmit={handleSubmit} className=" p-4 md:p-8 md:m-2">
						<div className="mb-5">
							<label
								className="block text-text-input text-lg mb-2 font-semibold"
								htmlFor="latin_name">
								Name
							</label>
							<input
								className="block w-full p-2.5 border-color-text border-size border-border border rounded-box"
								type="text"
								name="latin_name"
								id="latin_name"
								placeholder="Ginger"
								required
								onFocus={() => setConfirmMessage(false)}
								defaultValue={herbData.latin_name}
							/>
						</div>
						<div className="mb-5">
							<label
								className="block text-text-input text-lg mb-2 font-semibold"
								htmlFor="herb_name">
								Name
							</label>
							<input
								className="block w-full p-2.5 border-color-text border-size border-border border rounded-box"
								type="text"
								name="herb_name"
								id="herb_name"
								placeholder="Ginger"
								required
								onFocus={() => setConfirmMessage(false)}
								defaultValue={herbData.herb_name}
							/>
						</div>
						<div className="mb-5">
							<label
								className="block text-text-input text-lg mb-2 font-semibold"
								htmlFor="alt_name">
								Alternative Name
							</label>
							<input
								className="block w-full p-2.5 border-color-text border-size border-border border rounded-box"
								type="text"
								name="alt_name"
								id="alt_name"
								placeholder="Ginger"
								onFocus={() => setConfirmMessage(false)}
								defaultValue={herbData.alt_name}
							/>
						</div>
						<div className="mb-5">
							<div className="mb-5">
								{renderCheckboxes(
									"Herbal Actions",
									"herbal_action",
									herbalActions
								)}
							</div>
						</div>
						<div className="mb-5">
							<div className="mb-5">
								{renderCheckboxes(
									"Herbal Energetics",
									"herbal_energetics",
									herbalEnergetics
								)}
							</div>
						</div>
						<div className="mb-5">
							<div className="mb-5">
								{renderCheckboxes(
									"Herbal Constituents",
									"herbal_constituents",
									herbalConstituents
								)}
							</div>
						</div>

						<div className="mb-5">
							<label
								className="block text-text-input text-lg mb-2 font-semibold"
								htmlFor="notes">
								Notes
							</label>
							<textarea
								id="notes"
								name="notes"
								className="block w-full p-2.5 border-color-text border-size border-border border rounded-box"
								defaultValue={herbData.notes}></textarea>
						</div>

						<button
							type="submit"
							className="bg-button-success cursor-pointer text-text hover:bg-button-hover rounded-lg p-2">
							Submit
						</button>
						{confirmMessage && (
							<p className="text-text font-semibold mt-4 italic">
								*The Herb has been added!{" "}
								<Link
									href="/"
									className="underline text-button-secondary cursor-pointer">
									Go Back Home!
								</Link>
							</p>
						)}
					</form>
				</main>
			) : (
				<p className="flex justify-center mx-auto w-full">{displayLoading()}</p>
			)}
		</div>
	);
};

export default EditHerb;
