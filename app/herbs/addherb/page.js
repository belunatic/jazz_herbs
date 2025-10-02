"use client";
import { useState } from "react";
import {
	herbalActions,
	herbalEnergetics,
	herbalConstituents,
} from "../../../lib/constants";
import { createHerb } from "@/pages/api/herbs";
import Tooltip from "../../../components/Tooltip";
import Link from "next/link";

const AddHerb = () => {
	const [inputName, setInputName] = useState("");
	const [inputAltName, setInputAltName] = useState("");
	const [confirmMessage, setConfirmMessage] = useState(false);

	//Herb Action (constituents)
	//Energetics
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
		const result = createHerb(formData);
		//show a success message
		result && setConfirmMessage(true);
		//reset form
		e.target.reset();
	};

	return (
		<div className="wrapper bg-main text-text">
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
						/>
					</div>
					<div className="mb-5">
						<div className="mb-5">
							{" "}
							{renderCheckboxes(
								"Herbal Actions",
								"herbal_action",
								herbalActions
							)}
						</div>
					</div>
					<div className="mb-5">
						<div className="mb-5">
							{" "}
							{renderCheckboxes(
								"Herbal Energetics",
								"herbal_energetics",
								herbalEnergetics
							)}
						</div>
					</div>
					<div className="mb-5">
						<div className="mb-5">
							{" "}
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
							{" "}
							Notes
						</label>
						<textarea
							id="notes"
							name="notes"
							className="block w-full p-2.5 border-color-text border-size border-border border rounded-box"></textarea>
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
		</div>
	);
};

export default AddHerb;
