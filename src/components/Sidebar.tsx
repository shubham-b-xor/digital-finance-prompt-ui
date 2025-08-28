import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Toolbar,
    Box,
    Divider,
    IconButton,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { toggleSidebar } from '../redux/uiSlice';
import { toggleDarkMode } from '../redux/uiSlice';
import { clearMessages } from '../redux/chatSlice';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
    const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
    const darkMode = useAppSelector((state) => state.ui.darkMode);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleClose = () => {
        dispatch(toggleSidebar());
    };

    const handleSettings = () => {
        navigate('/settings');
        dispatch(toggleSidebar());
    };

    const handleNewChat = () => {
        dispatch(clearMessages());
        navigate('/');
        dispatch(toggleSidebar());
    };

    if (!sidebarOpen) {
        return null;
    }

    return (
        <Drawer
            variant="persistent"
            open={sidebarOpen}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    transition: (theme) =>
                        theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                },
            }}
        >
            <Box>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: [1],
                    }}
                >
                    <Typography variant="h6" noWrap component="div">
                        History
                    </Typography>
                    <IconButton onClick={handleClose} aria-label="close sidebar">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ borderRadius: 2, marginLeft: 2, marginRight: 2, marginBottom: 2, boxShadow: 4 }} onClick={handleNewChat}>
                                <PlaylistAddIcon sx={{ marginRight: 2 }} /><ListItemText primary="New Chat" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ borderRadius: 2, marginLeft: 2, marginRight: 2, marginBottom: 2, boxShadow: 4 }} onClick={handleSettings}>
                                <SettingsIcon sx={{ marginRight: 2 }} /><ListItemText primary="Settings" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                </Box>
            </Box>
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <IconButton onClick={() => dispatch(toggleDarkMode())} color="inherit">
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
