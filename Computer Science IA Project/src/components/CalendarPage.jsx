import { createViewMonthGrid, createViewWeek } from "@schedule-x/calendar"
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react"
import '@schedule-x/theme-default/dist/calendar.css'

function CalendarPage() {
    const calendar = useCalendarApp({
        views: [
            createViewWeek(),       //Filter for Week
            createViewMonthGrid()   //Filter for Month (grid style)
        ],
        events: [
            {//block event
                id: 1, 
                title: 'example event',
                start: Temporal.ZonedDateTime.from('2026-10-27T10:30:00+07:00[Asia/Bangkok]'),
                end: Temporal.ZonedDateTime.from('2026-10-27T12:00:00+07:00[Asia/Bangkok]'),
                description: 'example description',
                calendarID: "example" //calendarID is used as category of events, and for color!
                
            },
            {//day event
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
        <div className="h-[700px] min-h-[600px] [&_.sx-react-calendar-wrapper]:h-full [&_.sx-react-calendar-wrapper]:min-h-0">
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
}

export default CalendarPage;
