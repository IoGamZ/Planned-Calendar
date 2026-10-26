import { useEffect, useRef, useState } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

const decodeJwtPayload = (credential) => {
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

export const GoogleSignIn = ({ onAuthenticated }) => {
    const buttonRef = useRef(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(Boolean(GOOGLE_CLIENT_ID));

    useEffect(() => {
        if (!GOOGLE_CLIENT_ID) {
            return undefined;
        }

        let script = document.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`);
        let ownsScript = false;

        const renderGoogleButton = () => {
            if (!window.google?.accounts?.id || !buttonRef.current) return;

            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: (response) => {
                    const profile = decodeJwtPayload(response.credential);

                    if (!profile) {
                        setError("Google returned an invalid credential. Please try again.");
                        return;
                    }

                    // The credential is intentionally not stored in localStorage.
                    // A backend must verify it before creating a real application session.
                    setUser(profile);
                    onAuthenticated?.(profile);
                    setError("");
                },
            });

            buttonRef.current.replaceChildren();
            window.google.accounts.id.renderButton(buttonRef.current, {
                theme: "outline",
                size: "large",
                shape: "pill",
                text: "signin_with",
                width: 260,
            });
            setIsLoading(false);
        };

        if (window.google?.accounts?.id) {
            renderGoogleButton();
            return undefined;
        }

        if (!script) {
            script = document.createElement("script");
            script.src = GOOGLE_SCRIPT_SRC;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            ownsScript = true;
        }

        script.addEventListener("load", renderGoogleButton);
        script.addEventListener("error", () => {
            setError("Google Sign-In could not be loaded. Check your network connection.");
            setIsLoading(false);
        });

        return () => {
            script?.removeEventListener("load", renderGoogleButton);
            if (ownsScript) script.remove();
        };
    }, [onAuthenticated]);

    const signOut = () => {
        window.google?.accounts?.id.disableAutoSelect();
        setUser(null);
    };

    if (!GOOGLE_CLIENT_ID) {
        return (
            <p className="mt-8 rounded-xl border border-primary/30 bg-card/70 px-5 py-3 text-sm text-foreground/70">
                Add <code>VITE_GOOGLE_CLIENT_ID</code> to <code>.env.local</code> to enable Google sign-in.
            </p>
        );
    }

    if (user) {
        return (
            <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex items-center gap-3 rounded-full border border-primary/30 bg-card/80 px-4 py-2 shadow-sm">
                    {user.picture && (
                        <img className="h-9 w-9 rounded-full" src={user.picture} alt="" />
                    )}
                    <span className="text-sm font-medium">Signed in as {user.name || user.email}</span>
                    <button
                        type="button"
                        onClick={signOut}
                        className="rounded-full px-3 py-1 text-sm text-primary transition hover:bg-primary/10"
                    >
                        Sign out
                    </button>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
        );
    }

    return (
        <div className="mt-8 flex flex-col items-center gap-3">
            <div ref={buttonRef} aria-label="Sign in with Google" />
            {isLoading && <p className="text-sm text-foreground/60">Loading Google sign-in…</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
};
