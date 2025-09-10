import ChatHistory from "../components/ChatHistory";
import { addMessage, removeMessage } from "../redux/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from "../types";
import { Box, Button, Stack, Typography } from "@mui/material";
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import EmptyChatHistory from "../components/EmptyChatHistory";
import { customResponse } from "../mocks/customResponse";
import PromptInputV1 from "../components/PromptInputV1";
import { setAwaitingResponse, setIsNewChatDialog } from "../redux/uiSlice";
import NewChatDialog from "../components/NewChatDialog";
import { clearFiles } from "../redux/fileUploadSlice";
import { Add } from "@mui/icons-material";

const ChatV1: React.FC = () => {
    const messages = useAppSelector((state) => state.chat.messages);
    const dispatch = useAppDispatch();

    const handleNewChat = () => {
        dispatch(setIsNewChatDialog(true));
    };

    const handleSend = async (prompt: string, files?: File[], mockServerToggle?: string) => {

        const userMessage: ChatMessage = {
            id: uuidv4(),
            sender: 'user',
            message: prompt,
            fileName: files && files.length > 0 ? files.map(f => f.name).join(', ') : undefined,
            errorCode: -1,
            errorMessage: null,
            erroredProperties: []
        };

        const lazyMessage: ChatMessage = {
                    id: uuidv4(),
                    sender: 'bot',
                    message: `... Hang tight, we’re on it!`,
                    errorCode: -1,
                    type: 'loading',
                    errorMessage: null,
                    erroredProperties: []
                };

        dispatch(addMessage(userMessage));

        if (userMessage.fileName) {
            const formData = new FormData();
            formData.append('prompt', prompt);
            formData.append('responseToggle', mockServerToggle ?? 'success');
            if (files && files.length > 0) {
                files.forEach((file) => {
                    formData.append('files', file);
                });
            }
            try {
                
                dispatch(addMessage(lazyMessage));
                dispatch(setAwaitingResponse(true));
                setTimeout(() => {
                    const botMessage: ChatMessage = {
                        id: uuidv4(),
                        sender: 'bot',
                        message: `${customResponse["unstructured-success"]}`,
                        errorCode: -1,
                        type: 'text/csv',
                        errorMessage: null,
                        erroredProperties: []
                    };
                    dispatch(removeMessage());
                    dispatch(clearFiles());
                    dispatch(addMessage(botMessage));
                    dispatch(setAwaitingResponse(false));
                }, 4000);
            } catch (error) {
                console.error('Error submitting prompt:', error);
                const botMessage: ChatMessage = {
                    id: uuidv4(),
                    sender: 'bot',
                    message: "Error submitting prompt.",
                    errorCode: -1,
                    errorMessage: (error as Error).message,
                    erroredProperties: []
                };
                dispatch(addMessage(botMessage));
            }
        } else {
            dispatch(addMessage(lazyMessage));
            dispatch(setAwaitingResponse(true));
            setTimeout(() => {
                const botMessage: ChatMessage = {
                    id: uuidv4(),
                    sender: 'bot',
                    message: `${customResponse["unstructured-failed"]}`,
                    errorCode: -1,
                    type: 'text/csv',
                    errorMessage: null,
                    erroredProperties: []
                };
                dispatch(removeMessage());
                dispatch(addMessage(botMessage));
                dispatch(setAwaitingResponse(false));
            }, 4000);
        }

    };



    return (
        <>
            <Box
                sx={{
                    display: 'block',
                    maxWidth: 1000,
                    width: '100%',
                    p: 0,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                    }}
                >
                    <Typography color='textSecondary' variant="h5" gutterBottom>
                        <ChatBubbleOutlineRoundedIcon fontSize='small' sx={{ marginRight: 2 }} color='info' /> Chat
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" endIcon={<Add />} color='info' size="small" onClick={handleNewChat}>
                            New Chat
                        </Button>
                    </Stack>
                </Box>
            </Box>
            {messages.length === 0 ? <EmptyChatHistory /> :
                <ChatHistory messages={messages} />}
            <PromptInputV1 displayHelp={false} onSend={handleSend} />
            <NewChatDialog />
        </>
    )
}

export default ChatV1;
