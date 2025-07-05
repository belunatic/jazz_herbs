"use client";
import { useState } from "react";

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
	const renderCategoryCheckboxes = (name, arrayValue) => {
		return (
			<div>
				<label>Categories:</label>
				{arrayValue.map((item, idx) => (
					<div key={idx}>
						<input
							type="checkbox"
							id={`${name}_${item}`}
							name={`${name}`}
							value={item}
						/>
						<label htmlFor={`${name}_${item}`}>{item}</label>
					</div>
				))}
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
		<form onSubmit={handleSubmit} className="w-full max-w-lg bg-main text-text">
			<div className="">
				<label htmlFor="herb_name">Name</label>
				<input
					type="text"
					name="herb_name"
					id="herb_name"
					placeholder="Ginger"
					required
				/>
			</div>
			<div>
				<label htmlFor="alt_name">Alternative Name</label>
				<input type="text" name="alt_name" id="alt_name" placeholder="Ginger" />
			</div>
			<div>
				<div> {renderCategoryCheckboxes("category", categories)}</div>
			</div>

			<div>
				<label htmlFor="notes"> Notes</label>
				<textarea id="notes" name="notes"></textarea>
			</div>

			<button type="submit">Submit</button>
		</form>
	);
};

export default AddHerb;
