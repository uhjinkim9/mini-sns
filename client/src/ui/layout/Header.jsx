import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

import style from "./style/DrawerStyle";

export default function Header({open, handleDrawerOpen}) {
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
