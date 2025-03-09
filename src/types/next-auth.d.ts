import 'next-auth'

declare module 'next-auth' {
    interface User{
        _id?: string
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }
    interface Session{
        user: {
            _id?: string
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            username?: string;
        } & DefaultSession['user']
    } // For a default session ye ek key aayegi he aayegi
    // retains the default attributes of Session and adds or overrides other attributes
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }
}