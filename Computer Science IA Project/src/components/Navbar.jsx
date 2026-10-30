import { NavLink, useLocation } from "react-router-dom";

export function Navbar() {
    const { pathname } = useLocation();
    const isTasksPage = pathname === "/tasks";
    const destination = isTasksPage
        ? { name: "Calendar", href: "/" } //having two differnet state of TasksPage depending on what page is shown
        : { name: "Tasks", href: "/tasks" }; //href (destination) (/) is main, (/tasks) is taskpage.

    return (
        <nav className="fixed left-0 top-0 z-50 w-full transition-all duration-300 py-5">
            <div className="container flex items-center justify-between gap-4">
                <NavLink
                    className="flex shrink-0 items-center text-xl font-bold text-primary transition-colors duration-500"
                    to="/"
                >
                    <span className="relative z-10">
                        <span className="text-foreground transition-colors duration-500" /*Logo to the right */>Planned</span>{" "}
                        Calendar
                    </span>
                </NavLink>

                <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-8">
                        <NavLink
                            to={destination.href} //Destination depends on the function above!
                            className="whitespace-nowrap text-foreground/80 transition-colors duration-300 hover:text-primary"
                        /* Destination name becomes the button*/>
                            {destination.name} 
                        </NavLink >
                    </div>
                </div>
            </div>
        </nav>
    );
}
