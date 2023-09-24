export interface AuthResponse {
  data: Info;
  message: string;
  code: number;
}

interface Info {
  user: User;
  token: string;
}
