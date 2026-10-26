import { GoogleDriveAccess } from "../components/Login/GoogleDriveAccess.jsx";

export const Home = ({ user, onSignOut }) => {
    return (
        <>
            <main className="relative z-10">
                <section className="container -mt-24 pb-12">
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-lg backdrop-blur-sm">
                        <div className="flex min-w-0 items-center gap-3">
                            {user?.picture && <img className="h-10 w-10 rounded-full" src={user.picture} alt="" />}
                            <span className="truncate text-sm font-medium">{user?.email}</span>
                        </div>
                        <button type="button" onClick={onSignOut} className="text-sm text-primary hover:underline">
                            Sign out
                        </button>
                    </div>
                    <GoogleDriveAccess />
                </section>
            </main>
        </>
    );
};
