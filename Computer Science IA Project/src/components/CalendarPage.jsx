//Same code structure as the tutorial//
import { createViewMonthGrid, createViewWeek } from "@schedule-x/calendar";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/calendar.css";
import { useState, } from "react";

function CalendarPage() {
    const eventsService = useState(() => createEventsServicePlugin())[0]

    const calendar = useCalendarApp({
        views: [
            createViewWeek(),       //Filter for Week
            createViewMonthGrid()   //Filter for Month (grid style)
        ],
        calendars: {
            example: {
                colorName: 'example',
                lightColors: {
                    main: '#f9d71c',
                    container: '#fff5aa',
                    onContainer: '#594800',
                },
                darkColors: {
                    main: '#fff5c0',
                    onContainer: '#fff5de',
                    container: '#a29742',
                }
            }
        },
        events: [
            {//block event
                id: 1, 
                title: "example event",
                start: Temporal.ZonedDateTime.from("2026-10-27T10:30:00+07:00[Asia/Bangkok]"),
                end: Temporal.ZonedDateTime.from("2026-10-27T12:00:00+07:00[Asia/Bangkok]"),
                description: "example description",
                calendarID: "example" //calendarID is used as category of events, and for color!
                
            },
            {//day event
                id: 2, 
                title: "test",
                start: Temporal.ZonedDateTime.from("2026-10-27T10:30:00+07:00[Asia/Bangkok]"),
                end: Temporal.ZonedDateTime.from("2026-10-28T00:00:00+07:00[Asia/Bangkok]"),
                description: "KK is sitting next to me",
                calendarID: "example"
            }

        ],
        selectedDate: Temporal.PlainDate.from("2026-10-27"),
        timezone: "Asia/Bangkok", 
        plugins: [eventsService]
        
    })

    //setting height 700px (min at 600px) AND... force to fill 100% of height with failsafe of 0% to prevent overflowing
    return (
        <div className="h-[700px] min-h-[600px] [&_.sx-react-calendar-wrapper]:h-full [&_.sx-react-calendar-wrapper]:min-h-0"> 
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
}//this is what being sent to Home.jsx

export default CalendarPage;
