import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from "@fullcalendar/core/locales/ja"
import "../calender.css"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { calculateDailyBalances } from '../utils/finaceCalculations'
import { Balance, CalenderContent, Transaction } from '../types'
import { formatCurrency } from '../utils/formatting'

interface CalenderProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}
const Calender = ({monthlyTransactions,setCurrentMonth}: CalenderProps) => {
  const events = [
    { title: 'Meeting', start: "2024-08-17", income: 500, expense: 200, balance: 300},
    { title: 'aerokn', start: "2024-08-18", income: 300, expense: 200, balance: 100 },
  ]
  
  // 月の取引データ
  // const monthlyTransactions = [
  //   {
  //     id: "a",
  //     type: "income",
  //     category: "お小遣い",
  //     amount: 700,
  //     content: "母から",
  //     date: "2024-08-17",
  //   },
  // ]
  const dailyBalances = calculateDailyBalances(monthlyTransactions)
  console.log(dailyBalances)

  // 1.日付ごとの収支を計算する関数
  // const dailyBalances = {
  //   "2024-08-17" : {income: 700, expense: 200, balance: 500},
  //   "2024-08-18" : {income: 0, expense: 500, balance: -500},
  // }

  // 2.FullCalender用のイベントを生成する関数
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
  console.log(calenderEvents)

  // const calenderEvents = [
  //   {
  //     start: "2024-08-17",
  //     income: 700, 
  //     xpense: 200,
  //     balance: 500,
  //   },
  //   {
  //     start: "2024-08-18",
  //     income: 0,
  //     expense: 500,
  //     balance: -500,
  //   },
  // ]

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
    console.log(datesetInfo);
    setCurrentMonth(datesetInfo.view.currentStart)
  }
  return (
    <div>
      <FullCalendar
        locale={jaLocale}
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        events={calenderEvents}
        eventContent={renderEventContent}
        datesSet={handleDateSet}
      />
    </div>
  )
}

export default Calender