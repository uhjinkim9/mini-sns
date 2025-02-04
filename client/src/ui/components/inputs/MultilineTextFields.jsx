import React, {forwardRef} from "react";
import TextField from "@mui/material/TextField";

const MultilineTextFields = forwardRef(
	({label, defaultValue, onChangeContent, rows}, ref) => {
		return (
			<>
				<TextField
					id="outlined-multiline-static"
					label={label}
					multiline
					rows={rows}
					defaultValue={defaultValue}
					onChange={onChangeContent}
					inputRef={ref} // ref는 `inputRef`에 전달해야 함
				/>
			</>
		);
	}
);

export default MultilineTextFields;
