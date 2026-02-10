export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    items: {
      id: string;
      username: string;
      fullName: string;
      email: string;
      image: string;
      phone: string;
    };
    accessToken: string;
  };
}

export interface payloadLogin {
    username: string;
    password: string;
}
