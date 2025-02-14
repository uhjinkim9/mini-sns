/********************************************
 * 일반 텍스트, 숫자, 비밀번호 입력란 컴포넌트
 ********************************************/

import {ChangeEvent} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface InputProps {
	variant?: "standard" | "filled" | "outlined"; // 입력란 형태
	label?: string;
	name?: string;
	value?: any; // 입력 값
	required?: boolean; // 필수 입력 여부
	disabled?: boolean; // 입력 비활성화
	type?: "password" | "number" | "search";
	slotProps?: {
		input?: {
			readOnly?: boolean; // 읽기 전용
		};
		inputLabel?: {
			shrink?: true; // 라벨 크기 축소
		};
	};
	helperText?: string; // 도움말(입력란 아래)
	fullWidth?: boolean;
	error?: boolean; // 에러 표시
	multiline?: boolean; // 다행 입력 여부
	maxRows?: {rows?: number}; // 다행 입력란일 경우 최대 행 수
	onChange?: (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void; // 변경 이벤트 핸들러
}

/*************************************************************/

export default function Input(props: InputProps) {
	const {
		variant = "standard",
		label = "",
		name = "",
		value = null,
		required = false,
		disabled = false,
		type = "",
		slotProps: {
			input: {readOnly = false} = {},
			inputLabel: {shrink = false} = {},
		} = {},
		fullWidth = false,
		error = false,
		multiline = false,
		maxRows = {rows: 0},
		onChange: onChange = null,
	} = props;

	function handleChange(
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		if (onChange) {
			onChange(event);
		}
	}

	return (
		<Box sx={{display: "flex", flexWrap: "wrap", margin: 1}}>
			<TextField
				variant={variant}
				label={label}
				name={name}
				value={value}
				required={required}
				disabled={disabled}
				type={type}
				slotProps={{
					input: {readOnly},
					inputLabel: {shrink},
				}}
				fullWidth={fullWidth}
				error={error}
				multiline={multiline}
				maxRows={maxRows.rows}
				onChange={handleChange}
			></TextField>
		</Box>
	);
}
