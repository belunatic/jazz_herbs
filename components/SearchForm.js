import React from "react";

const SearchForm = () => {
	return (
		<div className="flex flex-col gap-y-4 mt-6">
			<input
				className="block w-full p-2.5 border-text border-size border-1 border rounded-box text-text"
				type="text"
				name="search"
				id="search"
				onFocus={() => setConfirmMessage(false)}
			/>
			<button className="py-2 block px-1 rounded-lg cursor-pointer hover:bg-button-success/70 bg-button-success w-full">
				Search
			</button>
		</div>
	);
};

export default SearchForm;
