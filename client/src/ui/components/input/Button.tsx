/********************
 * 일반 버튼 컴포넌트
 ********************/

import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface BasicButtonProps {
	variant?: "text" | "contained" | "outlined"; // 버튼 형태
	children?: React.ReactNode; // 버튼 내 텍스트
	disabled?: boolean; // 버튼 비활성화
	href?: string; // 클릭 시 이동할 링크
	disableElevation?: boolean; // 그림자 효과 비활성화
	fullWidth?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // 클릭 이벤트
}

export default function BasicButton(props: BasicButtonProps) {
	const {
		variant: variant = "contained",
		children: children = "",
		disabled: disabled = false,
		href: href = undefined,
		disableElevation: disableElevation = false,
		fullWidth: fullWidth = false,
		onClick: onClick = null,
	} = props;

	function handleClickButton(event: React.MouseEvent<HTMLButtonElement>) {
		if (onClick) {
			onClick(event);
		}
	}

	return (
		<Box sx={{display: "flex", flexWrap: "wrap", margin: 1}}>
			<Button
				variant={variant}
				href={href}
				disabled={disabled}
				disableElevation={disableElevation}
				fullWidth={fullWidth}
				onClick={handleClickButton}
			>
				{children}
			</Button>
		</Box>
	);
}
