import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

import HomeIcon from "@mui/icons-material/Home";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import ChannelIcon from "@mui/icons-material/VideoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import CreateRoleIcon from "@mui/icons-material/AddCircleOutline";
import CreateUserIcon from "@mui/icons-material/PersonAdd";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import {  Outlet } from "react-router-dom";
import CustomizedTables from "../userTable/Table";
import RoleTables from "../roleTable/RoleTables";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }: any) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}



const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop: any) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "black", // Set the background color to black
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "black", // Ensure black background when open
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "black", // Ensure black background when closed
    },
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== "open",
})<AppBarProps>(({ theme, open }: any) => ({
  backgroundColor: "black", // Set the background color to black
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate=useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerItems = [
    { text: "Dashboard", icon: <HomeIcon />, section: "Main", link: "/"},
    { text: "Inbox", icon: <InboxIcon />, section: "Manage"  ,link: "/"},
    { text: "Channel", icon: <ChannelIcon />, section: "Manage", link: "/" },
    
    { text: "Create Role", icon: <CreateRoleIcon />, section: "Settings" ,  link: "/role" },
    { text: "Create User", icon: <CreateUserIcon />, section: "Settings" , link: "/user"},
    { text: "Settings", icon: <SettingsIcon />, section: "Settings", link: "/" },

    { text: "Profile", icon: <ProfileIcon />, section: " " , link: "/"},
    { text: "Logout", icon: <LogoutIcon />, section: " " ,link:"/logout"},
  ];

  // Inside the Drawer component, update the List items as follows:

  const handleNavigate=(e:any,value:any)=>{
    console.log("value",value);
    // e.preventDefault();
  if(value==="/logout"){
    localStorage.removeItem('itemName');
   return navigate("/login")
  }
  navigate(value)
  
    

  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="subtitle1">Welcome John Doe</Typography>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
          {/* Add user profile section */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Add search and notification section */}
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {theme.direction === "rtl" ? <MenuIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

     
        <List>
  {drawerItems.map((item, index) => (
    <React.Fragment key={index}>
      {item.section && (index === 0 || drawerItems[index - 1].section !== item.section) && open ? (
        <React.Fragment>
          <Divider />
         
          <ListItem disablePadding>

            <ListItemButton
             onClick={(e) => handleNavigate(e, item.link)}
              sx={{
                minHeight: 20,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: 'white',
                fontSize: '13px', // Correct syntax
                fontWeight: 200,   // Correct syntax
              }}

         
            >
          
              <p >{item.section}</p>
            </ListItemButton>
          

          </ListItem>
         
          {/* <span style={{color:"white", justifyContent: open ? 'initial' : 'center',}}>{item.section}</span> */}
        </React.Fragment>
      ) : null}


      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          onClick={(e) => handleNavigate(e, item.link)}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              color: 'white', // Set icon color to white
            }}
            onClick={(e) => handleNavigate(e, item.link)}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, color: 'white' }}   onClick={(e) => handleNavigate(e, item.link)}/>
        </ListItemButton>
      </ListItem>
    
    </React.Fragment>
  ))}
</List>


        <Divider />
      </Drawer>
      <>
      <Box sx={{ marginTop: "90px", padding: "20px" }}>
      <Outlet/>
</Box>
    
      </>
    </Box>
  );
}
