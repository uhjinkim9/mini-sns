import React, {createContext, useState, useContext} from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import Stack from "@mui/material/Stack";

// 컨텍스트 전역 생성
const AlertContext = createContext();

export function AlertProvider({children}) {
	const [alertConfig, setAlertConfig] = useState({
		visible: false,
		severity: "info",
		message: "",
	});

	// 알림 띄우는 함수
	function showAlert(severity, message, duration = 2500) {
		setAlertConfig({visible: true, severity: severity, message: message});

		setTimeout(() => {
			setAlertConfig((prev) => ({...prev, visible: false}));
		}, duration);
	}

	return (
		<AlertContext.Provider value={{showAlert}}>
			{children}
			{/* Alert 상태가 true일 때만 렌더링 */}
			{alertConfig.visible && (
				<IconAlert
					key={alertConfig.message}
					severity={alertConfig.severity}
					message={alertConfig.message}
				/>
			)}
		</AlertContext.Provider>
	);
}

// 전역적으로 showAlert을 쉽게 사용하기 위한 Custom Hook
export function useAlert() {
	return useContext(AlertContext);
}

const IconAlert = ({severity, message}) => {
	return (
		<Stack
			sx={{
				width: "50%",
				position: "fixed",
				top: "20px",
				left: "50%",
				transform: "translateX(-50%)",
				zIndex: 9999,
			}}
			spacing={2}
		>
			<Alert
				severity={severity}
				variant={"standard"} // filled, standard, outlined
				icon={true}
				iconMapping={{
					success: <CheckIcon fontSize="inherit" />,
					warning: <WarningIcon fontSize="inherit" />,
					error: <ErrorIcon fontSize="inherit" />,
					info: <InfoIcon fontSize="inherit" />,
				}}
			>
				{message}
			</Alert>
		</Stack>
	);
};
