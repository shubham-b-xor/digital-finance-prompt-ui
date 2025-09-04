import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from '../redux/hooks';
import { toggleSidebar } from '../redux/uiSlice';

const TopBar: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    return (
        <AppBar color='primary' position="static" elevation={1}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleToggleSidebar}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div">
                    Knowledge Manager
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
