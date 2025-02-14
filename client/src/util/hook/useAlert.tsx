import {createContext, useState, useContext, ReactNode, JSX} from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import Stack from "@mui/material/Stack";
import {AlertColor} from "@mui/material";

interface AlertConfig {
	visible: boolean;
	severity: AlertColor;
	message: string;
}

interface AlertContextType {
	showAlert: (
		severity: AlertColor,
		message: string,
		duration?: number
	) => void;
}

// `AlertContext`를 export 추가하여 사용 가능하게 설정
export const AlertContext = createContext<AlertContextType | undefined>(
	undefined
);

interface AlertProviderProps {
	children: ReactNode;
}

export function AlertProvider({children}: AlertProviderProps): JSX.Element {
	const [alertConfig, setAlertConfig] = useState<AlertConfig>({
		visible: false,
		severity: "info",
		message: "",
	});

	// ✅ 알림 띄우는 함수
	function showAlert(severity: AlertColor, message: string, duration = 2500) {
		setAlertConfig({visible: true, severity, message});

		setTimeout(() => {
			setAlertConfig((prev) => ({...prev, visible: false}));
		}, duration);
	}

	return (
		<>
			<AlertContext.Provider value={{showAlert}}>
				{children}
				{alertConfig.visible && (
					<Stack
						sx={(theme) => ({
							width: "90%",
							maxWidth: "400px",
							position: "fixed",
							top: "20px",
							left: "50%",
							transform: "translateX(-50%)",
							zIndex: theme.zIndex.modal + 1, // ✅ zIndex 오류 해결
						})}
						spacing={2}
					>
						<Alert
							severity={alertConfig.severity}
							variant="filled"
							icon={getAlertIcon(alertConfig.severity)}
						>
							{alertConfig.message}
						</Alert>
					</Stack>
				)}
			</AlertContext.Provider>
		</>
	);
}

// 전역적으로 showAlert을 쉽게 사용하기 위한 Custom Hook
export function useAlert(): AlertContextType {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error(
			"🚨 `useAlert` must be used within an `AlertProvider`. Wrap your app with `<AlertProvider>`."
		);
	}
	return context;
}

// ✅ Alert 아이콘 매핑 함수
function getAlertIcon(severity: AlertColor) {
	const icons = {
		success: <CheckIcon fontSize="inherit" />,
		warning: <WarningIcon fontSize="inherit" />,
		error: <ErrorIcon fontSize="inherit" />,
		info: <InfoIcon fontSize="inherit" />,
	};
	return icons[severity] || null;
}
