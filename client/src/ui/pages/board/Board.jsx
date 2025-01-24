import * as React from "react";

import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import MultilineTextFields from "../../components/inputs/MultilineTextFields";
import ButtonGroup from "../../components/inputs/ButtonGroup";

export default function Board() {
	return (
		<>
			<Typography variant="h5" noWrap sx={{flexGrow: 1,

							width: "100wv",

      }} component="div">
				게시판
			</Typography>
			<Divider />

			<MultilineTextFields></MultilineTextFields>
      <ButtonGroup></ButtonGroup>
		</>
	);
}
