import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google"; //import google oauth
import { GoogleDriveAccess } from "../components/GoogleDriveAccess.jsx";  //API scope of Drive Access from GoogleDriveAccess.jsx

const decodeCredential = (credential) => { //recieve credentials(payload) similar to IGCSE payload theory:O
    try {
        const payload = credential.split(".")[1]; //seperate the payload into 3 chunk, header, payload and signature
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/"); //turn the token from - and _ (URL safe) into + and /
        const decoded = decodeURIComponent(
            window
            .atob(base64) //decodes the text (in base64) into bytes! (0000)
            .split("")
            .map((character) => `%${(`00${character.charCodeAt(0).toString(16)}`).slice(-2)}`)
            .join("") //three lines above makes those bytes into hexadecimal as a (percentage-encoded)
            //percentage encoded is hexa with % infront and -, _, ., ~ are safe aswell... search it up if forget
        );

        return JSON.parse(decoded); //turn JSON file from decoded, into objects like "event.title"
    } catch {
        return null;
    }//return null if fail so code doesnt breal
};


export function Authentication({ user, onComplete, onAuthenticated }) {
    const [setLoginError] = useState("");//storing dynamic infomation

    const handleLogin = (credentialResponse) => {
        const profile = decodeCredential(credentialResponse.credential);
        onAuthenticated?.(profile);
    };//when successful login, call in decodeCredential and decode then sent to oAuthentication(profile) only if exsist (? is for it).

    //when user not sign in
    if (!user) {
        //output login page
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
                           
                            //Oauth button design
                            theme="outline"
                            size="large"
                            shape="pill"
                            text="signin_with"
                            width="260"
                        />
                    </div>

                    <p className="mt-8 text-xs text-foreground/55">
                        
                    </p> 
                </section>
            </main>
        );
    }

    //if user is sign in
    return (
        <main className="relative z-10">
            <section className="container -mt-24 pb-12">
                <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-lg backdrop-blur-sm">
                    {user.picture && (
                        //show their pfp (&&) means only if it exsist, user.email show email
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
