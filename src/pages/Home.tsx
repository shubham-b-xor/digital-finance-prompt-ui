import ChatHistory from "../components/ChatHistory";
import PromptInput from "../components/PromptInput";
import { addMessage } from "../redux/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, PromptResponse } from "../types";

const Home: React.FC = () => {
    const messages = useAppSelector((state) => state.chat.messages);
    const dispatch = useAppDispatch();

    const handleSend = async (prompt: string, files?: File[], mockServerToggle?: string) => {
        const userMessage: ChatMessage = {
            id: uuidv4(),
            sender: 'user',
            message: prompt,
            fileName: files && files.length > 0 ? files.map(f => f.name).join(', ') : undefined,
            errorCode: -1
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
                const response = await fetch('http://localhost:8000/submitPrompt', {
                    method: 'POST',
                    body: formData,
                });
                console.log('Response:', response);
                const data: PromptResponse = await response.json();
                console.log('Data:', data);
                const botMessage: ChatMessage = {
                    id: uuidv4(),
                    sender: 'bot',
                    message: data.message ?? data.errorMessage,
                    errorCode: data.errorCode, 
                    type: data.type,
                    erroredProperties: data.erroredProperties
                };
                dispatch(addMessage(botMessage));
            } catch (error) {
                console.error('Error submitting prompt:', error);
                const botMessage: ChatMessage = {
                    id: uuidv4(),
                    sender: 'bot',
                    message: "Error submitting prompt.",
                    errorCode: -1
                };
                dispatch(addMessage(botMessage));
            }
        } else {
            setTimeout(() => {
                const botMessage: ChatMessage = {
                    id: uuidv4(),
                    sender: 'bot',
                    message: `You said: "${prompt}"`,
                    errorCode: -1
                };
                dispatch(addMessage(botMessage));
            }, 1000);
        }
    };

    return (
        <>
            {
                messages.length === 0 ? (
                    <PromptInput displayHelp={true} onSend={handleSend} />
                ) : (
                    <>
                        <ChatHistory messages={messages} />
                        <PromptInput displayHelp={false} onSend={handleSend} />
                    </>
                )
            }
        </>
    )
}

export default Home;
