"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

export default function HerbalCheckboxGroup({
	title,
	data,
	selectedItems,
	setSelectedItems,
}) {
	const [open, setOpen] = useState(false);

	//save selected inputs
	const handleChange = (name) => {
		setSelectedItems((prev) =>
			prev.includes(name)
				? prev.filter((item) => item !== name)
				: [...prev, name]
		);
	};

	return (
		<div className="mb-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold mb-2 text-text ">{title}</h2>
				<p
					onClick={() => setOpen(!open)}
					className="text-text font-bold text-xl cursor-pointer">
					{!open ? <FaPlus /> : <FaMinus />}
				</p>
			</div>
			{open ? (
				<div className="grid grid-cols-1 gap-1">
					{data.map(({ name, description }) => (
						<label
							key={name}
							className="flex items-start space-x-2 cursor-pointer text-text">
							<input
								type="checkbox"
								checked={selectedItems.includes(name)}
								onChange={() => handleChange(name)}
								className="mt-1"
							/>
							<div>
								<span className="font-medium">{name}</span>
							</div>
						</label>
					))}
				</div>
			) : (
				""
			)}
		</div>
	);
}
