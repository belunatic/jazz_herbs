"use client";
import { useState, useEffect } from "react";

const SearchForm = ({ currentHerbData, setHerbData }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const searchSubmit = () => {
		console.log(searchTerm);
		console.log(currentHerbData);
		if (currentHerbData) {
			setHerbData(
				currentHerbData.filter((item) => {
					console.log(item.herb_name, item.alt_name);
					const matchesHerbName =
						searchTerm.length === 0 ||
						item.herb_name.toLowerCase().includes(searchTerm.toLowerCase());

					const matchesAltName =
						searchTerm.length === 0 ||
						item.alt_name.toLowerCase().includes(searchTerm.toLowerCase());

					const matchesNotes =
						searchTerm.length === 0 ||
						item.notes.toLowerCase().includes(searchTerm.toLowerCase());

					return matchesAltName || matchesHerbName || matchesNotes;
				})
			);
		}
	};

	return (
		<div className="flex flex-col gap-y-4 mt-6">
			<input
				className="block w-full p-2.5 border-text border-size border-1 rounded-box text-text"
				type="text"
				name="search"
				id="search"
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button
				onClick={searchSubmit}
				className="py-2 block px-1 rounded-lg cursor-pointer hover:bg-button-success/70 bg-button-success w-full">
				Search
			</button>
		</div>
	);
};

export default SearchForm;
