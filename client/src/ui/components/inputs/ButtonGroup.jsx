import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export default function VariantButtonGroup() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				"& > *": {
					m: 1,
				},
			}}
		>
			<ButtonGroup
				variant="outlined" // text
				aria-label="Basic button group"
			>
				<Button>저장</Button>
				<Button>초기화</Button>
			</ButtonGroup>
		</Box>
	);
}
