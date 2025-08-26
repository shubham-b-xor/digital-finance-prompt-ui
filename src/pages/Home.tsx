import ChatHistory from "../components/ChatHistory";
import PromptInput from "../components/PromptInput";
import { addMessage } from "../redux/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { v4 as uuidv4 } from 'uuid';

type ChatMessage = {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    fileName?: string;
};

const Home: React.FC = () => {
    const messages = useAppSelector((state) => state.chat.messages);
    const dispatch = useAppDispatch();

    const handleSend = (prompt: string, file?: File) => {
        const userMessage: ChatMessage = {
            id: uuidv4(),
            sender: 'user',
            text: prompt,
            fileName: file?.name,
        };

        dispatch(addMessage(userMessage)); // <-- dispatch to Redux

        setTimeout(() => {
            const botMessage: ChatMessage = {
                id: uuidv4(),
                sender: 'bot',
                text: userMessage.fileName ?
                    `Domain: Investment Portfolio
    Section: Asset Allocation
    🔎 Analyzed Insights:
    Portfolio diversification improved; no single asset class exceeds 35% of total investment.
    Equity exposure increased from 45% to 52%, driven by strong market performance.
    Bond holdings were reduced by 10%, indicating a risk-on shift.
    New entries in alternative investments (e.g., REITs, crypto) account for 6% of total holdings.`
                    : `You said: "${prompt}"`,
            };
            dispatch(addMessage(botMessage)); // <-- dispatch to Redux
        }, 1000);
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
