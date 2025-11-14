"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import "./calendar.scss"
// @params dateType - формат даты,
// @params targetInputId - id инпута, куда будет записываться дата
type calendarType = {
    dateType?: "DD.MM.YYYY" | "MM.DD.YYYY"
    targetInputId: string,
    lang?: "ru" | "en",
    className?: string
    sorted?: boolean,
    isMulti?: boolean,
    multiDateSeparator?: string
}

const MONTH_ru = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
const MONTH_en = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const WEEKDAYS_ru = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const WEEKDAYS_en = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
export const Calendar: React.FC<calendarType> = ({
    dateType = "DD.MM.YYYY",
    targetInputId,
    lang = "ru",
    className = "",
    sorted = true,
    isMulti = false,
    multiDateSeparator = "-" }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [range, setRange] = useState<{ start: string | null, end: string | null }>({ start: null, end: null })
    const MONTH = lang === "ru" ? MONTH_ru : MONTH_en;
    const WEEKDAYS = lang === "ru" ? WEEKDAYS_ru : WEEKDAYS_en;
    const inputRef = useRef<HTMLInputElement>(null);

    const isToday = (day: number, month: number, year: number): boolean => {
        const today = new Date();
        return day === today.getDate()
            && month === today.getMonth()
            && year === today.getFullYear();
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

    const formatDate = (dateStr: string, type: "DD.MM.YYYY" | "MM.DD.YYYY"): string => {
        const [d, m, y] = dateStr.split('.');
        if (type === "DD.MM.YYYY") {
            return `${d}.${m}.${y}`;
        } else {
            return `${m}.${d}.${y}`;
        }
    }
    const InputUpdate = () => {
        const input = inputRef.current;
        console.log('input: ', input);
        if (!input) return;
        if (range.start && range.end) {
            input.value = `${formatDate(range.start, dateType)}${multiDateSeparator}${formatDate(range.end, dateType)}`;
        }
        else if (range.start) {
            input.value = formatDate(range.start, dateType);
        }
        else {
            input.value = "";
        }
    }
    const parseDate = (dateStr: string): Date => {
        const [d, m, y] = dateStr.split('.');
        return new Date(+y, +m - 1, +d);
    }
    //@params day - выбранный день
    //@params isMulti - режим выбора диапазона дат (true - включен, false - выключен)
    const DateHandler = (day: number, isMulti: boolean) => {
        const rawDate = `${day}.${currentMonth + 1}.${currentYear}`;

        if (!isMulti) {
            setRange({ start: rawDate, end: null });
            return;
        }
        else {
            setRange(prev => {
                if (!prev.start || prev.end) {
                    return { start: rawDate, end: null };
                } else {
                    const prevStartDate = parseDate(prev.start);
                    const pickedDate = new Date(currentYear, currentMonth, day);
                    if (sorted) {
                        if (pickedDate < prevStartDate) {
                            return { start: rawDate, end: prev.start };
                        } else {
                            return { start: prev.start, end: rawDate }
                        }
                    }
                    return { ...prev, end: rawDate }
                }
            })
        }
    }
    useEffect(() => {
        InputUpdate()
    }, [range, dateType])
    const { prevDays, currentDays, nextDays } = useMemo(() => {
        const firsDayOffset = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();
        const prevDays = Array.from({ length: firsDayOffset }, (_, i) => prevMonthDays - firsDayOffset + 1 + i);

        const currentDaysCount = new Date(currentYear, currentMonth + 1, 0).getDate();
        const currentDays = Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }, (_, i) => i + 1)

        const totalCels: number = 42;
        const filledCells = firsDayOffset + currentDaysCount;
        const nextMonthDays = totalCels - filledCells;
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextDays = Array.from({ length: nextMonthDays }, (_, i) => i + 1);


        return { prevDays, currentDays, nextDays, nextMonth, nextYear };
    }, [currentMonth, currentYear])

    useEffect(() => {
        const input = document.getElementById(targetInputId) as HTMLElement
        if (input) {
            inputRef.current = input as HTMLInputElement
        }
    }, [targetInputId])

    const HighlightDays = useMemo(() => {
        if (!range.start) {
            return { start: null, end: null, inBetween: new Set<number>() };
        }

        const [startDay, startMonth, startYear] = range.start.split('.').map(Number);
        const end = range.end ? range.end.split('.').map(Number) : [startDay, startMonth, startYear];
        const [endDay, endMonth, endYear] = end;

        const startDate = new Date(startYear, startMonth - 1, startDay);
        const endDate = new Date(endYear, endMonth - 1, endDay);
        const currentFirst = new Date(currentYear, currentMonth, 1);
        const currentLast = new Date(currentYear, currentMonth + 1, 0);

        const rangeStartInCurrent = startDate >= currentFirst ? startDate : currentFirst;
        const rangeEndInCurrent = endDate <= currentLast ? endDate : currentLast;

        if (rangeStartInCurrent > rangeEndInCurrent) {
            return { start: null, end: null, inBetween: new Set<number>() };
        }

        const startDayInCurrent = rangeStartInCurrent.getDate();
        const endDayInCurrent = rangeEndInCurrent.getDate();

        const minDay = Math.min(startDayInCurrent, endDayInCurrent);
        const maxDay = Math.max(startDayInCurrent, endDayInCurrent);

        const inBetween = new Set<number>();
        for (let d = minDay + 1; d < maxDay; d++) {
            inBetween.add(d);
        }

        return {
            start: minDay,
            end: maxDay,
            inBetween
        };
    }, [range, currentMonth, currentYear]);
    return (
        <div className={`calendar ${className}`}>
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
                            <div key={index} className={`calendar__emptyDays-element item}`}
                                onClick={() => MonthManager(-1)}>{day}</div>
                        ))
                    }
                    {
                        currentDays
                            ? currentDays.map((day: number, index: number) => (
                                <div key={index} className={`calendar__active-element item
                                     ${isToday(day, currentMonth, currentYear) ? "today" : ""} 
                                     ${HighlightDays.start === day ? "range-start" : ""}
                                     ${HighlightDays.end === day ? "range-end" : ""} 
                                     ${HighlightDays.inBetween.has(day) ? "in-range" : ""}`}
                                    onClick={() => DateHandler(day, isMulti)}>{day}</div>))
                            : <div className="нет дней"></div>
                    }
                    {
                        nextDays.map((day, index) => (
                            <div key={index} className="calendar__emptyDays-element item"
                                onClick={() => MonthManager(1)}>{day}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}