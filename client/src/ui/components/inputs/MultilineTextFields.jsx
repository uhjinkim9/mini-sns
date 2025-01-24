import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function MultilineTextFields() {
	return (
		<Box
			component="form"
			sx={{"& .MuiTextField-root": {width: "50%"}}}
			noValidate
			autoComplete="off"
			alignContent={"normal"}
		>
			<div>
				<TextField
					id="outlined-multiline-static"
					label="Multiline"
					multiline
					rows={4}
					defaultValue="Default Value"
				/>
			</div>
		</Box>
	);
}
