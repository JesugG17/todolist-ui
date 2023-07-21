
export interface AuthResponse {
    data: Info,
    messages: string[];
    code: number;
}

interface Info {
    user: string;
    token: string;
}