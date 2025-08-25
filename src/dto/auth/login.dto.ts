export interface LoginDto {
    email: string
    password: string
}

export class UserSessionDto {
    success: boolean;
    message: string;
    data: {
        token: string
        user: any
    }

}
