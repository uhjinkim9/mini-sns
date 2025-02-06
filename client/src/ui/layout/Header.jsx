import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

import style from "./style/DrawerStyle";

export default function Header({open, handleDrawerOpen}) {
	async function handleLogout() {
		window.localStorage.clear();
		window.location.href = "/";

		// 로그아웃 기록 남기기: LoginManager
	}

	return (
		<style.AppBar position="fixed" open={open}>
			{/* <TokenRefresher /> */}
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
					aria-label="logout"
					edge="end"
					onClick={handleLogout}
					sx={[open && {display: "none"}]}
				>
					<LogoutIcon />
				</IconButton>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="end"
					onClick={handleDrawerOpen}
					sx={[open && {display: "none"}]}
				>
					<MenuIcon />
				</IconButton>
			</Toolbar>
		</style.AppBar>
	);
}
