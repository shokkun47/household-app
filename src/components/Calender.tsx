import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from "@fullcalendar/core/locales/ja"
import "../calender.css"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { calculateDailyBalances } from '../utils/finaceCalculations'
import { Balance, CalenderContent, Transaction } from '../types'
import { formatCurrency } from '../utils/formatting'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

interface CalenderProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
}
const Calender = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
}: CalenderProps) => {
  const events = [
    { title: 'Meeting', start: "2024-08-17", income: 500, expense: 200, balance: 300},
    { title: 'aerokn', start: "2024-08-18", income: 300, expense: 200, balance: 100 },
  ]
  
  const dailyBalances = calculateDailyBalances(monthlyTransactions)

  const createCalenderEvents = (dailyBalances: Record<string,Balance>):CalenderContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const {income, expense, balance} = dailyBalances[date]
      return {
        start: date,
        income: formatCurrency(income), 
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      }
    })
  }

  const calenderEvents = createCalenderEvents(dailyBalances);

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className='money' id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className='money' id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className='money' id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  const handleDateSet = (datesetInfo:DatesSetArg) => {
    setCurrentMonth(datesetInfo.view.currentStart)
  }

  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  }
  
  return (
    <div>
      <FullCalendar
        locale={jaLocale}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={calenderEvents}
        eventContent={renderEventContent}
        datesSet={handleDateSet}
        dateClick={handleDateClick}
      />
    </div>
  )
}

export default Calender