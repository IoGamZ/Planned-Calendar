import { GoogleSignIn } from "../components/Login/GoogleSignIn.jsx";

export const LoginPage = ({ onAuthenticated }) => {
    return (
        <main className="relative z-10 flex min-h-screen items-center justify-center px-4">
            <section className="w-full max-w-md rounded-3xl border border-primary/20 bg-card/85 p-8 text-center shadow-xl backdrop-blur-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                    My Calendar
                </p>
                <h1 className="mt-4 text-4xl font-bold text-foreground">Welcome back</h1>
                <p className="mt-3 text-foreground/70">
                    Sign in with Google to access your calendar workspace.
                </p>
                <GoogleSignIn onAuthenticated={onAuthenticated} />
            </section>
        </main>
    );
};
