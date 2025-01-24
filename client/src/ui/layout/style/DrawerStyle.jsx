import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

const drawerWidth = 240;

const Main = styled("main", {shouldForwardProp: (prop) => prop !== "open"})(
	({theme}) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginRight: -drawerWidth,
		/**
		 * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
		 * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
		 * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
		 * proper interaction with the underlying content.
		 */
		position: "relative",
		variants: [
			{
				props: ({open}) => open,
				style: {
					transition: theme.transitions.create("margin", {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen,
					}),
					marginRight: 0,
				},
			},
		],
	})
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({theme}) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	variants: [
		{
			props: ({open}) => open,
			style: {
				width: `calc(100% - ${drawerWidth}px)`,
				transition: theme.transitions.create(["margin", "width"], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginRight: drawerWidth,
			},
		},
	],
}));

const DrawerHeader = styled("div")(({theme}) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-start",
}));

const style = {drawerWidth, Main, AppBar, DrawerHeader};
export default style;
