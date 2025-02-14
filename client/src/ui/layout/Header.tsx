import React from "react";
import {useNavigate} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

import style from "./style/DrawerStyle";
import {LocalStorage, Cookies} from "../../util/context/storage";
import axios from "axios";

// interface HeaderProps {
// 	open: boolean;
// 	handleDrawerOpen: () => void;
// }

const Header: React.FC<{
	open: boolean;
	handleDrawerOpen: () => void;
	isMobile: boolean;
}> = ({open, handleDrawerOpen}) => {
	const navigate = useNavigate();

	async function handleLogout() {
		delete axios.defaults.headers.common["Authorization"]; // 만약 axios에 기본으로 Authorization을 설정한 경우 제거
		Cookies.clearAll();
		LocalStorage.clearAll();
		navigate("/");
	}

	return (
		<style.AppBar position="fixed" open={open}>
			<Toolbar>
				<Typography
					variant="h6"
					noWrap
					sx={{flexGrow: 1}}
					component="div"
				>
					Mini SNS
				</Typography>

				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerOpen}
					sx={[open && {display: "none"}]}
				>
					<MenuIcon />
				</IconButton>

				<IconButton
					color="inherit"
					aria-label="logout"
					edge="end"
					onClick={handleLogout}
					sx={[open && {display: "none"}]}
				>
					<LogoutIcon />
				</IconButton>
			</Toolbar>
		</style.AppBar>
	);
};

export default Header;
