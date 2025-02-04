import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export default function TwoButtonGroup(props) {
	const {
		onClickButtonOne: onClickButtonOne,
		onClickButtonTwo: onClickButtonTwo,
		textButtonOne: textButtonOne,
		textButtonTwo: textButtonTwo,
		size: size,
		activeButton: activeButton,
	} = props;

	const handleClickButtonOne = () => {
		onClickButtonOne();
	};

	const handleClickButtonTwo = () => {
		onClickButtonTwo();
	};

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
				size={size}
			>
				<Button
					variant={activeButton === 1 ? "contained" : "outlined"}
					onClick={handleClickButtonOne}
				>
					{textButtonOne}
				</Button>
				<Button
					variant={activeButton === 2 ? "contained" : "outlined"}
					onClick={handleClickButtonTwo}
				>
					{textButtonTwo}
				</Button>
			</ButtonGroup>
		</Box>
	);
}
