"use client";
import { useUser } from "../context/UserContext";

const NotificationBar = () => {
	const { notify, setNotify } = useUser();

	const handleCloseNotification = () => {
		setNotify(false);
	};
	return (
		<>
			{notify ? (
				<div
					className="p-4 mb-4  flex justify-between text-sm text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400"
					role="alert">
					<p>Sorry, but you do not have access to this app.</p>
					<span
						className="cursor-pointer ps-4 font-bold text-lg "
						onClick={handleCloseNotification}>
						{" "}
						X
					</span>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default NotificationBar;
