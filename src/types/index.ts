export type ChatMessage = {
    id: string;
    type?: 'application/pdf' | 'text/csv' | 'unknown';
    sender: 'user' | 'bot';
    message?: string;
    fileName?: string;
    errorCode: number;
    errorMessage?: string;
    erroredProperties?: string[];
};

export type PromptResponse = {
    type: 'application/pdf' | 'text/csv';
    errorCode: number;
    errorMessage?: string;
    erroredProperties?: string[];
    message?: string;
};
