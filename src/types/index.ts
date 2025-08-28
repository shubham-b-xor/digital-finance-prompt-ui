export type ChatMessage = {
    id: string;
    type?: 'application/pdf' | 'text/csv' | 'unknown';
    sender: 'user' | 'bot';
    message?: string | null;
    fileName?: string;
    errorCode: number;
    errorMessage: string | null;
    erroredProperties: string[];
};

export type PromptResponse = {
    type: 'application/pdf' | 'text/csv';
    errorCode: number;
    errorMessage: string | null;
    erroredProperties: string[];
    message?: string | null;
};
