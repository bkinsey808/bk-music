type ZerothFretControlsProps = {};
export const ZerothFretControls = ({}: ZerothFretControlsProps) => {
	return (
		<>
			<div className="absolute bottom-0 left-1 top-0 flex w-4 flex-col justify-center [&>button]:text-base">
				<button aria-label="Add course">+</button>
				<button aria-label="Remove Course">-</button>
			</div>
			<div className="absolute bottom-0 right-3 top-0 flex w-1 flex-col justify-center [&>button]:text-xs [&>button]:leading-tight">
				<button aria-label="Add half step">▲</button>
				<button aria-label="Remove half step">▼</button>
			</div>
		</>
	);
};
