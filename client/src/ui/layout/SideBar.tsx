import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import style from "./style/DrawerStyle";

interface Page {
	idx: number;
	pageNm: string;
}

interface SideBarProps {
	open: boolean;
	theme: any;
	handleDrawerClose: () => void;
	pages: Page[];
	onClickSideMenu: (page: Page) => void;
}

const SideBar: React.FC<SideBarProps> = ({
	open,
	theme,
	handleDrawerClose,
	pages,
	onClickSideMenu,
}) => {
	return (
		<Drawer
			sx={{
				width: style.drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: style.drawerWidth,
				},
			}}
			variant="persistent"
			anchor="right"
			open={open}
		>
			<style.DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === "rtl" ? (
						<ChevronLeftIcon />
					) : (
						<ChevronRightIcon />
					)}
				</IconButton>
			</style.DrawerHeader>
			<Divider />
			<List>
				{pages.map((page, index) => (
					<ListItem key={page.idx} disablePadding>
						<ListItemButton
							onClick={() => {
								onClickSideMenu(page);
							}}
						>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={page.pageNm} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			{/* <List> 외부 링크(PMIS 등) 추가
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List> */}
		</Drawer>
	);
};

export default SideBar;
