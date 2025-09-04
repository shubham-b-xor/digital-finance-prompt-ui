import { ChatMessage } from "../../types";
import UserMessage from "./UserMessage";
import React from "react";
import CSVResult from "./CsvResult";
import DocResult from "./DocResult";

interface ResultProps {
    message: ChatMessage
}

const Result: React.FC<ResultProps> = ({ message }) => {
    const isUser = message.sender === 'user';
    console.log('Rendering message: ', message);
    console.log('Rendering message: ', message.type);
    return (
        <>
            {isUser ? <UserMessage message={message} />
                : (<>
                    {message.type === 'text/csv' && (
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <CSVResult message={message} />
                        </React.Suspense>
                    )}

                    {message.type === 'application/pdf' && (
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <DocResult message={message} />
                        </React.Suspense>
                    )}
                </>)}
        </>
    );
}

export default Result;
