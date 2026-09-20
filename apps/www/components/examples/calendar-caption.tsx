"use client"

import { enUS } from "react-day-picker/locale"

import { Calendar } from "@/components/ui/calendar"

function CalendarCaption() {
  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      locale={enUS}
      className="rounded-lg border"
    />
  )
}

export default CalendarCaption
