import React, {useState} from "react";

import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import style from "./style/DrawerStyle";
import Header from "./Header";
import SideBar from "./SideBar";

export default function PersistentDrawerRight({pages, onClickSideMenu}) {
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{display: "flex"}}>
			<CssBaseline />

			<Header open={open} handleDrawerOpen={handleDrawerOpen} />
			<SideBar
				open={open}
				theme={theme}
				handleDrawerClose={handleDrawerClose}
				pages={pages}
				onClickSideMenu={onClickSideMenu}
			/>

			<style.Main open={open}>
				<style.DrawerHeader />
			</style.Main>
		</Box>
	);
}
