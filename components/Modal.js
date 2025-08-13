// Modal as a separate component
import { useEffect, useRef } from "react";

const Modal = ({ openModal, closeModal, children, confirmFunction }) => {
	const ref = useRef();

	useEffect(() => {
		if (openModal) {
			ref.current?.showModal();
			console.log("Modal opened");
		} else {
			ref.current?.close();
			console.log("Modal closed");
		}
	}, [openModal]);

	return (
		<div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-transparent p-4 backdrop-blur-[1px]">
			<dialog
				ref={ref}
				onCancel={closeModal}
				className="m-auto flex h-full w-full items-center justify-center bg-transparent">
				<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-white">
					<div className="text-end">
						<button
							onClick={closeModal}
							className="cursor-pointer pb-2 font-semibold text-red-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18 18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div className="pt-2 pb-4">{children}</div>
					<div className="mt-4 flex justify-end space-x-4">
						<button
							className="cursor-pointer rounded bg-red-500 px-4 py-2 text-white"
							onClick={confirmFunction}>
							Delete
						</button>
						<button
							className="cursor-pointer rounded bg-gray-500 px-4 py-2 text-white"
							onClick={closeModal}>
							Cancel
						</button>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default Modal;
