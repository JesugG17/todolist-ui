
export interface AuthReponse {
    data: Info,
    messages: string[];
    code: number;
}

interface Info {
    user: string;
    token: string;
}