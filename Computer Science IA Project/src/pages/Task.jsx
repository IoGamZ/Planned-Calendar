//Same format as Upcoming Task section from Home.jsx (just with 1:1 ratio and gap of 4)
function TaskList() {
    return (
        <main className="container h-screen overflow-hidden py-6 sm:py-8 mt-6">
            <div className="grid h-full min-h-0 grid-cols-2 items-start gap-4">
                <section className="min-h-0 pt-2">
                    <p className="text-xl font-bold tracking-[0.25em] text-primary">
                        -   Task List   -
                    </p>
                    <section className="mt-8 rounded-2xl border border-primary/80 p-6 text-left shadow-lg ">
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
                    <section className="mt-8 rounded-2xl border border-primary/60 p-6 text-left shadow-lg">
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
                    <section className="mt-8 rounded-2xl border border-primary/40 p-6 text-left shadow-lg ">
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
                <section className="mt-8 rounded-2xl border border-primary/20 p-6 text-left shadow-lg">
                    This will be where user input their data for a task. 
                </section>
            </div>
        </main>
    );
}


export default TaskList;
