import * as React from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import MultilineTextFields from "../../components/inputs/MultilineTextFields";
import ButtonGroup from "../../components/inputs/ButtonGroup";

export default function Board() {
	console.log("게시판 옴");
	return (
		<>
			<Typography
				variant="h5"
				noWrap
				sx={{
					flexGrow: 1,

					width: "100wv",
				}}
				component="div"
			>
				게시판
			</Typography>
			<Divider />

			<MultilineTextFields></MultilineTextFields>
			<ButtonGroup></ButtonGroup>
		</>
	);
}
