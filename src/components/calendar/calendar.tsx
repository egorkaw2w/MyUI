"use client"
import { useMemo, useState } from "react"
import "./calendar.scss"
// @params dateType - формат даты,
// @params targetInputId - id инпута, куда будет записываться дата
type calendarType = {
    dateType?: "DD.MM.YYYY" | "MM.DD.YYYY"
    targetInputId: string,
    lang?: "ru" | "en",
    className?: string
}

const MONTH_ru = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
const MONTH_en = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const WEEKDAYS_ru = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const WEEKDAYS_en = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
export const Calendar: React.FC<calendarType> = ({
    dateType = "DD.MM.YYYY",
    targetInputId,
    lang = "ru",
    className = "" }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const date = new Date();
    const MONTH = lang === "ru" ? MONTH_ru : MONTH_en;
    const WEEKDAYS = lang === "ru" ? WEEKDAYS_ru : WEEKDAYS_en;

    const isToday = (day: number): boolean => {
        return day === date.getDate()
            && currentMonth === date.getMonth()
            && currentYear === date.getFullYear()
    }
    // @params action: 1 | -1 - увелечение или уменьшение месяца
    const MonthManager = (action: 1 | -1) => {
        let yearChange = 0;
        setCurrentMonth(prev => {
            const nextMonth = prev + action;
            if (nextMonth > 11) {
                yearChange = 1;
                return 0;
            }
            if (nextMonth < 0) {
                yearChange = -1;
                return 11;
            }
            console.log('nextMonth: ', nextMonth)

            return nextMonth;
        })
        setCurrentYear(prevYear => {
            return prevYear + yearChange
        })
        yearChange = 0;
    }
    const DateSetter = (target: string, day: number, dateType: string) => {
        const id = document.getElementById(target) as HTMLInputElement
        console.log(new Date(currentYear, currentMonth, day))
        if (dateType === "MM.DD.YYYY") id.value = `${currentMonth + 1}.${day}.${currentYear}`
        else id.value = `${day}.${currentMonth + 1}.${currentYear}`
    }
    const { prevDays, currentDays } = useMemo(() => {
        const firsDayOffset = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();
        const prevDays = Array.from({ length: firsDayOffset }, (_, i) => prevMonthDays - firsDayOffset + 1 + i);

        const currentDays = Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }, (_, i) => i + 1)

        return { prevDays, currentDays };
    }, [currentMonth, currentYear])
    return (
        <div className={`calendar ${className}}`}>
            <div className="calendar__header">
                <div className="calendar__years">
                    {currentYear}
                </div>
                <div className="calendar__MonthMaster">
                    <button className="calendar__back"
                        onClick={() => MonthManager(-1)}>-</button>
                    <div className="calendar__title">{MONTH[currentMonth] || "Ошибка"}</div>
                    <div className="calendar__forward"
                        onClick={() => MonthManager(1)}>+</div>
                </div>
            </div>
            <div className="calendar__body">
                <div className="calendar__weekDays">
                    {
                        WEEKDAYS.map((day, index) => (
                            <div key={index} className="calendar__weekDays-element">
                                {day}
                            </div>
                        ))
                    }
                </div>
                <div className="calendar__monthDays">
                    {
                        prevDays.map((day, index) => (
                            <div key={index} className="calendar__emptyDays-element item"
                                onClick={() => MonthManager(-1)}>{day}</div>
                        ))
                    }
                    {
                        currentDays
                            ? currentDays.map((day: number, index: number) => (
                                <div key={index} className={`calendar__active-element item ${isToday(day) ? "today" : ""}`}
                                    onClick={() => DateSetter(targetInputId, day, dateType)}>{day}</div>))
                            : <div className="нет дней"></div>
                    }
                </div>
            </div>
        </div>
    )
}