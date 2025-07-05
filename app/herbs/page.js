"use client";
import { useState } from "react";
import { herbalActions } from "@/lib/constants";

const AddHerb = () => {
	const [inputFields, setInputFields] = useState([{ value: "" }]);
	const [inputName, setInputName] = useState("");
	const [inputAltName, setInputAltName] = useState("");
	const categories = ["a", "b", "e", "l"];

	// Function to add a new input field
	const handleAddFields = () => {
		setInputFields([...inputFields, { value: "" }]);
	};
	//Herb Action (constituents)
	//Energetics
	const renderCategoryCheckboxes = (label, attributeName, arrayValue) => {
		const chunkSize = 10;
		const checkboxGroups = [];

		for (let i = 0; i < arrayValue.length; i += chunkSize) {
			const chunk = arrayValue.slice(i, i + chunkSize);
			checkboxGroups.push(
				<div key={i} className="mb-4">
					{chunk.map((item, idx) => (
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
					))}
				</div>
			);
		}

		return (
			<div>
				<label className="block mb-2 text-sm font-medium">{label}:</label>
				<div className="flex flex-wrap space-x-4">{checkboxGroups}</div>
			</div>
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			name: e.target.herb_name.value,
			altName: e.target.alt_name.value,
			features: inputFields.map((field) => field.value),
			notes: e.target.notes.value,
			categories: Array.from(e.target.categories)
				.filter((input) => input.checked)
				.map((input) => input.value),
		};
		console.log(formData);
		// You can add your submit logic here (e.g., API call)
	};

	return (
		<div className="wrapper bg-main text-text">
			<form
				onSubmit={handleSubmit}
				className="max-w-lg mx-auto bg-container p-4 m-2">
				<div className="mb-5">
					<label className="block mb-2 text-sm font-medium" htmlFor="herb_name">
						Name
					</label>
					<input
						className="block w-full p-2.5 border-color-text border-size border-border border rounded-box"
						type="text"
						name="herb_name"
						id="herb_name"
						placeholder="Ginger"
						required
					/>
				</div>
				<div className="mb-5">
					<label className="block mb-2 text-sm font-medium" htmlFor="alt_name">
						Alternative Name
					</label>
					<input
						className="block w-full p-2.5 border-color-text border-size border-border border rounded-box"
						type="text"
						name="alt_name"
						id="alt_name"
						placeholder="Ginger"
					/>
				</div>
				<div className="mb-5">
					<div className="mb-5">
						{" "}
						{renderCategoryCheckboxes(
							"Herbal Actions",
							"herbal_action",
							herbalActions
						)}
					</div>
				</div>

				<div className="mb-5">
					<label className="block mb-2 text-sm font-medium" htmlFor="notes">
						{" "}
						Notes
					</label>
					<textarea
						id="notes"
						name="notes"
						className="block w-full p-2.5 border-color-text border-size border-border border rounded-box"></textarea>
				</div>

				<button type="submit" className="bg-button-success text-white p-2">
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddHerb;
