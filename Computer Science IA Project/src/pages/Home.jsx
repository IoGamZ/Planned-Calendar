import CalendarPage from "../components/CalendarPage.jsx";

function Home() {
    return (
        <main className="container h-screen overflow-hidden py-6 sm:py-8 mt-6">
            <div className="grid h-full min-h-0 grid-cols-[minmax(250px,0.85fr)_minmax(0,2fr)] items-start gap-1">
                <section className="min-h-0 pt-2">
                    <p className="text-xl font-bold tracking-[0.25em] text-primary">
                        -   Upcoming Tasks   -
                    </p>
                    <section className="mt-8 rounded-2xl border border-primary/80 p-6 text-left shadow-lg lg:translate-x-8 ">
                        <div className=" gap-4 sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Example Task #1
                                </h2>
                                <p className="mt-1 text-sm text-foreground/65">
                                    Description of example task, should only hold up to 25 words.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="mt-8 rounded-2xl border border-primary/60 p-6 text-left shadow-lg lg:translate-x-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Example Task #2
                                </h2>
                                <p className="mt-1 text-sm text-foreground/65">
                                    Description of example task, should only hold up to 25 words.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="mt-8 rounded-2xl border border-primary/40 p-6 text-left shadow-lg lg:translate-x-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Example Task #3
                                </h2>
                                <p className="mt-1 text-sm text-foreground/65">
                                    Description of example task, should only hold up to 25 words.
                                </p>
                            </div>
                        </div>
                    </section>
                </section>
                <section className="min-h-0 overflow-hidden lg:translate-x-28">
                    <CalendarPage />
                </section>
            </div>
        </main>
    );
}

export default Home;
