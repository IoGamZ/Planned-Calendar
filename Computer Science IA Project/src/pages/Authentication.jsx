import { useEffect, useState } from "react";
import { GoogleDriveAccess } from "../components/Login/GoogleDriveAccess.jsx";

export const Authentication = ({ user, onComplete }) => {
    const [isWaitingForCalendar, setIsWaitingForCalendar] = useState(false);

    useEffect(() => {
        if (!isWaitingForCalendar) return undefined;

        const timer = window.setTimeout(() => {
            onComplete?.();
        }, 5000);

        return () => window.clearTimeout(timer);
    }, [isWaitingForCalendar, onComplete]);


    return (
        <main className="relative z-10">
            <section className="container -mt-24 pb-12">
                <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-lg">
                    {user?.picture && <img className="h-10 w-10 rounded-full" src={user.picture} alt="" />}
                    <span className="truncate text-sm font-medium">{user?.email}</span>
                </div>
                <GoogleDriveAccess onConnected={() => setIsWaitingForCalendar(true)} />
                {isWaitingForCalendar && (
                    <p className="mt-4 text-center text-sm text-foreground/65">
                        Calendar ready. Opening your calendar in 5 seconds...
                    </p>
                )}
            </section>
        </main>
    );
};
