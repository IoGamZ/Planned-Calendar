import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleDriveAccess } from "../components/GoogleDriveAccess.jsx";

const decodeCredential = (credential) => {
    try {
        const payload = credential.split(".")[1];
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const decoded = decodeURIComponent(
            window
            .atob(base64)
            .split("")
            .map((character) => `%${(`00${character.charCodeAt(0).toString(16)}`).slice(-2)}`)
            .join("")
        );

        return JSON.parse(decoded);
    } catch {
        return null;
    }
};

export function Authentication({ user, onComplete, onAuthenticated }) {
    const [loginError, setLoginError] = useState("");

    const handleLogin = (credentialResponse) => {
        const profile = decodeCredential(credentialResponse.credential);
        onAuthenticated?.(profile);
    };

    if (!user) {
        return (
            <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
                <section className="w-full max-w-md rounded-3xl border border-primary/20 bg-card/85 p-8 text-center shadow-xl backdrop-blur-sm sm:p-10">
                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                        Planned Calendar
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-foreground">Log in</h1>
                    <p className="mt-3 text-foreground/70">
                        Sign in with Google to access your calendar.
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-3">
                        <GoogleLogin
                            onSuccess={handleLogin}
                            onError={() => setLoginError("Google sign-in failed. Please try again.")}
                            useOneTap
                            theme="outline"
                            size="large"
                            shape="pill"
                            text="signin_with"
                            width="260"
                        />
                        {loginError && <p className="text-sm text-red-600">{loginError}</p>}
                    </div>

                    <p className="mt-8 text-xs text-foreground/55">
                        
                    </p> 
                </section>
            </main>
        );
    }

    return (
        <main className="relative z-10">
            <section className="container -mt-24 pb-12">
                <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-lg backdrop-blur-sm">
                    {user.picture && (
                        <img className="h-10 w-10 rounded-full" src={user.picture} alt="" />
                    )}
                    <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.18em] text-primary">Signed in as</p>
                        <span className="block truncate text-sm font-medium">{user.email}</span>
                    </div>
                </div>
                <GoogleDriveAccess onConnected={() => onComplete?.()} />
            </section>
        </main>
    );
}
