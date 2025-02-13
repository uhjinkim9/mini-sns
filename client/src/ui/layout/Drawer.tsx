import React, {useState} from "react";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material"; // ✅ 반응형 처리를 위해 추가
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import style from "./style/DrawerStyle";
import Header from "./Header";
import SideBar from "./SideBar";

interface PersistentDrawerRightProps {
	pages: any[];
	onClickSideMenu: (page: any) => void;
}

const PersistentDrawerRight: React.FC<PersistentDrawerRightProps> = ({
	pages,
	onClickSideMenu,
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // 600px 이하일 때 true

	const [open, setOpen] = useState(!isMobile); // 모바일에서는 기본적으로 닫힘

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{display: "flex"}}>
			<CssBaseline />

			{/* ✅ 모바일일 때 헤더의 Drawer 버튼 변경 */}
			<Header
				open={open}
				handleDrawerOpen={handleDrawerOpen}
				isMobile={isMobile}
			/>

			<SideBar
				open={open}
				theme={theme}
				handleDrawerClose={handleDrawerClose}
				pages={pages}
				onClickSideMenu={onClickSideMenu}
			/>

			{/* ✅ 모바일일 때 사이드바가 닫히면 마진 제거 */}
			<style.Main open={open && !isMobile}>
				<style.DrawerHeader />
			</style.Main>
		</Box>
	);
};

export default PersistentDrawerRight;
