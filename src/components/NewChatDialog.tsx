import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setIsNewChatDialog, setPrompt } from '../redux/uiSlice';
import { clearMessages } from '../redux/chatSlice';
import { useNavigate } from 'react-router-dom';
import { clearFiles } from '../redux/fileUploadSlice';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewChatDialog() {
    const isDialogOpen = useSelector((state: any) => state.ui.isNewChatDialogOpen);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleClose = ((e: any) => {
        if (e.target.value === 'Agree') {
            dispatch(clearMessages());
            dispatch(clearFiles());
            dispatch(setPrompt(''));
            navigate('/');
        }
        dispatch(setIsNewChatDialog(false));
    });

    return (
        <React.Fragment>
            <Dialog
                open={isDialogOpen}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle><LiveHelpIcon color='warning' fontSize='large' />{"Do you want to start new conversation?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Your current conversation will be lost. and you will start a new conversation.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button value={'Disagree'} onClick={handleClose}>Disagree</Button>
                    <Button value={'Agree'} onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

