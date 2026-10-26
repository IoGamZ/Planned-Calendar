import { CalendarApp } from '@schedule-x/calendar'
import './Home.jsx'
import {scheduleXCalendar, useCalendarApp} from "@schedule-x/react"

function calendar() {
    const calendar : CalendarApp = useCalendarApp (config: {
        views:
    })

    return (
        <>
            <div>
                <ScheduleXCalendar calendarApp={} />
            </div>
        </>
    )
}

export default calendar