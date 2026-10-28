import CalendarPage from "../components/CalendarPage.jsx";

function Home({ user }) {
    return (
        <main className="container py-10 sm:py-14">
            <div className="grid gap-8 lg:grid-cols-[minmax(240px,0.75fr)_minmax(0,2fr)] lg:items-start">
                <section className="pt-2 lg:sticky lg:top-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                        My Calendar
                    </p>
                </section>
                <section align="right">
                    <CalendarPage />
                </section>
            </div>
        </main>
    );
}

export default Home;
