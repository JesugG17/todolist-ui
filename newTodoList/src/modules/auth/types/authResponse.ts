
export interface AuthResponse {
    data: Info,
    message: string;
    code: number;
}

interface Info {
    user: string | { userName: string, photo: string };
    token: string;
}