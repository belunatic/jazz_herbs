"use client";
import { useState } from "react";

const AddHerb = () => {
	const [inputFields, setInputFields] = useState([{ value: "" }]);
	const [inputName, setInputName] = useState("");
	const [inputAltName, setInputAltName] = useState("");

	// Function to add a new input field
	const handleAddFields = () => {
		setInputFields([...inputFields, { value: "" }]);
	};

	// Function to remove an input field by index
	const handleRemoveFields = (index) => {
		const newInputFields = [...inputFields];
		newInputFields.splice(index, 1);
		setInputFields(newInputFields);
	};

	// Function to update the value of an input field
	const handleValueChange = (index, event) => {
		const values = [...inputFields];
		values[index].value = event.target.value;
		setInputFields(values);
	};
	return (
		<div>
			<div>
				<label htmlFor="herb_name">Name</label>
				<input
					type="text"
					name="herb_name"
					id="herb_name"
					placeholder="Ginger"
					required></input>
			</div>
			<div>
				<label htmlFor="alt_name">Alternative Name</label>
				<input
					type="text"
					name="alt_name"
					id="herb_name"
					placeholder="Ginger"></input>
			</div>

			{inputFields.map((inputField, index) => (
				<div className="input-container" key={index}>
					<input
						type="text"
						placeholder="Feature"
						value={inputField.value}
						onChange={(e) => handleValueChange(index, e)}
					/>

					<button
						className="delete-btn"
						onClick={() => handleRemoveFields(index)}>
						<span className="material-symbols-outlined delete-icon">
							delete
						</span>
					</button>
				</div>
			))}
			<button className="add-btn" onClick={handleAddFields}>
				<span className="material-symbols-outlined add-icon">add</span>Add Field
			</button>
			<div>
				<label htmlFor="notes"> Notes</label>
				<textarea id="notes" name="notes"></textarea>
			</div>
		</div>
	);
};

export default AddHerb;
