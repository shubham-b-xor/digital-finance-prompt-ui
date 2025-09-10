import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Toolbar,
    Box,
    IconButton,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { toggleSidebar } from '../redux/uiSlice';
import { clearMessages } from '../redux/chatSlice';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 300;

const ListItemButtonStyle = { borderRadius: 2, marginLeft: 2, marginRight: 2, marginBottom: 0, boxShadow: 0};

const Sidebar: React.FC = () => {
    const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleClose = () => {
        dispatch(toggleSidebar());
    };

    const handleSettings = () => {
        navigate('/master-configuration');
    };

    const handleNewChat = () => {
        dispatch(clearMessages());
        navigate('/');
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
                        px: [1]
                    }}
                >
                    <StorageRoundedIcon color='primary'/>
                    <Typography variant="h6" noWrap component="div">
                        Digital Finance
                    </Typography>
                    <IconButton onClick={handleClose} aria-label="close sidebar">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton disabled sx={ListItemButtonStyle} onClick={handleNewChat}>
                                <PersonRoundedIcon color='success' sx={{ marginRight: 2 }} /><ListItemText primary="User Module" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={ListItemButtonStyle} onClick={handleNewChat}>
                                <SearchRoundedIcon color='success' sx={{ marginRight: 2 }} /><ListItemText primary="Chat Interface" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton disabled sx={ListItemButtonStyle} onClick={handleNewChat}>
                            <ShieldRoundedIcon color='primary' sx={{ marginRight: 2 }} /><ListItemText primary="Admin Module" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton sx={ListItemButtonStyle} onClick={handleSettings}>
                            <SettingsRoundedIcon color='primary' sx={{ marginRight: 2 }} /><ListItemText primary="Master Configuration" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
