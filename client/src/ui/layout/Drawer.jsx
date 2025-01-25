import React, { useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import Progress from "../components/feedback/CircularProgress";
import style from "./style/DrawerStyle";
import TokenRefresher from "../components/functional/TokenRefresher";

// 57번
export default function PersistentDrawerRight({ pages }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [mainContent, setMainContent] = useState();
  const modules = require.context("../pages", true, /\.jsx$/);

  // Webpack에서 동적 import 경로를 처리하려면, 가능한 모든 모듈 경로를 명시적으로 지정해야.
  function onClickSideMenu(pageObj) {
    const pagePath = `./${pageObj.pageGroup}/${pageObj.pageNm}.jsx`; // './'으로 시작해야 함

    console.log(modules.keys());
    // 출력 예: ['./board/Board.jsx', './profile/Profile.jsx']

    if (modules.keys().includes(pagePath)) {
      const PageComponent = modules(pagePath).default;
      setMainContent(<PageComponent />);
    } else {
      console.error(`Error: Cannot find module ${pagePath}`);
      setMainContent(<div>Page not found</div>);
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <TokenRefresher />
      <CssBaseline />
      <style.AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Mini SNS
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={[open && { display: "none" }]}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </style.AppBar>
      <style.Main open={open}>
        <style.DrawerHeader />
        <Suspense fallback={<Progress />}>{mainContent}</Suspense>
      </style.Main>
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
                onClick={(e) => {
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
    </Box>
  );
}
