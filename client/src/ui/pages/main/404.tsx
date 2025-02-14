import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function NotFound() {
	const [pgSize, setPgSize] = React.useState(12);

	function handleSliderChange(e: Event, val: number | number[]) {
		if (typeof val === "number") {
			setPgSize(val);
		}
	}

	return (
		<>
			<p style={{fontSize: `${pgSize}px`}}>404 Page Not Found</p>
			<Box>
				<Slider
					value={pgSize}
					min={10}
					max={50}
					step={1}
					aria-label="Default"
					valueLabelDisplay="auto"
					onChange={handleSliderChange}
				/>
			</Box>
		</>
	);
}
