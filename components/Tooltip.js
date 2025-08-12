const Tooltip = ({ children, text }) => {
	return (
		<div className="relative group">
			{children}
			{text !== "" ? (
				<div className="absolute w-[150px] left-full top-1/2 transform -translate-y-1/2 ml-2 hidden group-hover:block bg-tooltip text-tooltipText text-xs rounded py-1 px-2 z-10">
					{text}
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Tooltip;
