import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

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
    const [error, setError] = useState("");

    const handleSuccess = (credentialResponse) => {
        const profile = decodeJwtPayload(credentialResponse.credential);

        if (!profile) {
            setError("Google returned an invalid credential. Please try again.");
            return;
        }

        setError("");
        onAuthenticated?.(profile);
    };

    const handleError = () => {
        setError("Google sign-in failed. Please try again.");
    };

    return (
        <div className="mt-8 flex flex-col items-center gap-3">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap
                theme="outline"
                size="large"
                shape="pill"
                text="signin_with"
                width="260"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
};
