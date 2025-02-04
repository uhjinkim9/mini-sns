import React, {forwardRef} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// ✅ `forwardRef`를 컴포넌트 정의에서 적용
const MultilineTextFields = forwardRef(
	({label, defaultValue, onChangeContent, rows}, ref) => {
		return (
			<Box
				component="form"
				sx={{"& .MuiTextField-root": {width: "100%"}}}
				noValidate
				autoComplete="off"
				alignContent="normal"
			>
				<div>
					<TextField
						id="outlined-multiline-static"
						label={label}
						multiline
						rows={rows}
						defaultValue={defaultValue}
						onChange={onChangeContent}
						inputRef={ref} // ref는 `inputRef`에 전달해야 함
					/>
				</div>
			</Box>
		);
	}
);

export default MultilineTextFields;
