import "temporal-polyfill/global"
import { createViewMonthGrid, createViewWeek } from "@schedule-x/calendar"
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react"
import '@schedule-x/theme-default/dist/calendar.css'

function CalendarPage() {
    const calendar = useCalendarApp({
        views: [
            createViewWeek(),
            createViewMonthGrid()
        ],
        events: [
            {
                id: 1, 
                title: 'example event',
                start: Temporal.ZonedDateTime.from('2026-10-27T10:30:00+07:00[Asia/Bangkok]'),
                end: Temporal.ZonedDateTime.from('2026-10-28T00:00:00+07:00[Asia/Bangkok]'),
                description: 'example description'
            },
            {
                id: 2, 
                title: 'Hi kk',
                start: Temporal.ZonedDateTime.from('2026-10-27T10:30:00+07:00[Asia/Bangkok]'),
                end: Temporal.ZonedDateTime.from('2026-10-28T00:00:00+07:00[Asia/Bangkok]'),
                description: 'KK is sitting next to me'
            }
        ],
        selectedDate: Temporal.PlainDate.from('2026-10-27'),
        timezone: 'Asia/Bangkok', //will have to update depending on location
    })

    return (
        <>
            <div className="
                mt-8 h-[700px] min-h-[600px] 
                overflow-hidden rounded-2xl border border-primary/20 bg-card/80 p-4 
                [&_.sx-react-calendar-wrapper]:h-full [&_.sx-react-calendar-wrapper]:min-h-0"
            >
                <ScheduleXCalendar calendarApp={calendar} />
            </div>
        </>
    );
}

export default CalendarPage;
