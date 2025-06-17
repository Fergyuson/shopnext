// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
    debug: true,           // <— включили подробные логи
    logger: {
        error(code, ...rest) { console.error('NextAuth error', code, rest); },
        warn(code)          { console.warn('NextAuth warn', code); },
        debug(code, ...rest){ console.debug('NextAuth debug', code, rest); },
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
