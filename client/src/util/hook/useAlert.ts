import {createContext, useState, useContext, ReactNode} from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import Stack from "@mui/material/Stack";

// Alert 상태 타입 정의
interface AlertConfig {
	visible: boolean;
	severity: "success" | "warning" | "error" | "info";
	message: string;
}

// AlertContext 타입 정의
interface AlertContextType {
	showAlert: (
		severity: "success" | "warning" | "error" | "info",
		message: string,
		duration?: number
	) => void;
}

// 컨텍스트 전역 생성 (초기값을 undefined로 설정)
const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
	children: ReactNode;
}

export function AlertProvider({children}: AlertProviderProps) {
	const [alertConfig, setAlertConfig] = useState<AlertConfig>({
		visible: false,
		severity: "info",
		message: "",
	});

	// 알림 띄우는 함수
	function showAlert(
		severity: "success" | "warning" | "error" | "info",
		message: string,
		duration = 2500
	) {
		setAlertConfig({visible: true, severity, message});

		setTimeout(() => {
			setAlertConfig((prev) => ({...prev, visible: false}));
		}, duration);
	}

	return (
		<AlertContext.Provider value={{showAlert}}>
			{children}
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
export function useAlert(): AlertContextType {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error("useAlert must be used within an AlertProvider");
	}
	return context;
}

interface IconAlertProps {
	severity: "success" | "warning" | "error" | "info";
	message: string;
}

const IconAlert = ({severity, message}: IconAlertProps) => {
	const iconMapping = {
		success: <CheckIcon fontSize="inherit" />,
		warning: <WarningIcon fontSize="inherit" />,
		error: <ErrorIcon fontSize="inherit" />,
		info: <InfoIcon fontSize="inherit" />,
	};

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
				variant="standard"
				icon={iconMapping[severity]}
			>
				{message}
			</Alert>
		</Stack>
	);
};
