export type LogInResponse = {
    user:{
        id: number;
        name: string;
        email: string;
    }
    token: string;
};