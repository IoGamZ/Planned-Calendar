import { useState } from "react";

const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.file";
//define permssion scope for drive access and manipulation (from API and Service in Google Cloud service)

export const GoogleDriveAccess = ({ onConnected }) => {
    const [accessToken, setAccessToken] = useState(""); //store and use google drive access token
    const [files, setFiles] = useState([]);             //store list of file PLANNING to be extracted
    const [isGoing, setIsGoing] = useState(false);  //track if request is ongoing or not
    const [error, setError] = useState("");

    const loadDriveFiles = async (token) => {
        const response = await fetch(
            "https://www.googleapis.com/drive/v3/files?" +
                new URLSearchParams({
                    pageSize: "20",
                    orderBy: "modifiedTime desc",
                    fields: "files(id,name,mimeType,modifiedTime,webViewLink)",
                }),
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) {
            let message = `Google Drive rejected the request (${response.status}).`;

            try {
                const errorBody = await response.json();
                const googleMessage = errorBody.error?.message;
                if (googleMessage) message += ` ${googleMessage}`;
            } catch {
                // Keep the status message if Google does not return JSON.
            }

            throw new Error(message);
        }

        const data = await response.json();
        setFiles(data.files ?? []);
    };

    const connectDrive = () => {
        if (!window.google?.accounts?.oauth2) {
            setError("Google authorization is still loading. Please try again.");
            return;
        }

        setIsGoing(true);
        setError("");

        const tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: "4114665443-h9kp58627tmo4s81hb7drsfbm96stlpt.apps.googleusercontent.com",
            scope: DRIVE_SCOPE,
            callback: async (tokenResponse) => {
                if (tokenResponse.error) {
                    setError("Google Drive access was not granted.");
                    setIsGoing(false);
                    return;
                }

                try {
                    setAccessToken(tokenResponse.access_token);
                    await loadDriveFiles(tokenResponse.access_token);
                    onConnected?.();
                } catch (requestError) {
                    setError(requestError.message);
                } finally {
                    setIsGoing(false);
                }
            },
        });

        tokenClient.requestAccessToken({ prompt: accessToken ? "" : "consent" });
    };

    return (
        <section className="mt-8 rounded-2xl border border-primary/20 bg-card/80 p-6 text-left shadow-lg backdrop-blur-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Google Drive storage</h2>
                    <p className="mt-1 text-sm text-foreground/65">
                        Store calendar files created by this app in your Drive.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={connectDrive}
                    disabled={isGoing}
                    className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                >
                    {isGoing ? "Connecting…" : accessToken ? "Refresh Drive" : "Connect Drive"}
                </button>
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            {accessToken && !error && (
                <div className="mt-5 border-t border-border pt-4">
                    <p className="text-sm font-medium text-green-700">Google Drive connected.</p>
                    {files.length > 0 ? (
                        <ul className="mt-3 space-y-2 text-sm">
                            {files.map((file) => (
                                <li key={file.id} className="flex items-center justify-between gap-3">
                                    <span className="truncate">{file.name}</span>
                                    {file.webViewLink && (
                                        <a
                                            className="shrink-0 text-primary underline"
                                            href={file.webViewLink}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Open
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-3 text-sm text-foreground/60">
                            No app-accessible files yet. Calendar files created by this app will appear here.
                        </p>
                    )}
                </div>
            )}
        </section>
    );
};
