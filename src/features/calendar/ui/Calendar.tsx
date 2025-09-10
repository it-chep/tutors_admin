import React, { JSX, useState } from 'react';
import classes from './calendar.module.scss';
import arrowLeft from '../../../shared/lib/assets/ArrowLeft.png'
import arrowRight from '../../../shared/lib/assets/ArrowRight.png'

interface CalendarProps {
    isLoading?: boolean;
    onDateRangeSelect?: (startDate: Date | null, endDate: Date | null) => void;
}

export const Calendar: React.FC<CalendarProps> = ({onDateRangeSelect, isLoading}) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    // Функции для навигации
    const prevMonth = (): void => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = (): void => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

  // Получение дат для трех месяцев
    const getThreeMonths = (): Date[] => {
        const months: Date[] = [];
        for (let i = -1; i <= 1; i++) {
            const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
            months.push(monthDate);
        }
        return months;
    };

    // Проверка, находится ли дата в выбранном диапазоне
    const isInRange = (date: Date): boolean => {
        if (!startDate || !endDate) return false;
        return date > startDate && date < endDate;
    };

    // Проверка, является ли дата началом или концом диапазона
    const isRangeEdge = (date: Date): boolean => {
        if (!startDate || !endDate) return false;
        return date.getTime() === startDate.getTime() || date.getTime() === endDate.getTime();
    };

    // Обработчик клика по дате
    const handleDateClick = (date: Date): void => {
        if(isLoading){
            return
        }
        let newStartDate: Date | null = startDate;
        let newEndDate: Date | null = endDate;

        if (!startDate || (startDate && endDate)) {
            newStartDate = date;
            newEndDate = null;
        } else if (date > startDate) {
            newEndDate = date;
        } else {
            newStartDate = date;
            newEndDate = null;
        }

        setStartDate(newStartDate);
        setEndDate(newEndDate);
        setHoverDate(null);

        if (onDateRangeSelect) {
            onDateRangeSelect(newStartDate, newEndDate);
        }
    };

    // Обработчик наведения на дату
    const handleDateHover = (date: Date): void => {
        if (startDate && !endDate) {
            setHoverDate(date);
        }
    };

    // Генерация календаря для месяца
    const renderMonth = (monthDate: Date): JSX.Element[] => {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        const startDay = firstDay.getDay();
        const days: JSX.Element[] = [];

        // Пустые ячейки перед первым днем месяца
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className={classes.calendarDay + " " + classes.empty}></div>);
        }

        // Дни месяца
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isStart = startDate && date.getTime() === startDate.getTime();
            const isEnd = endDate && date.getTime() === endDate.getTime();
            const isHoverEnd = hoverDate && !endDate && startDate && date.getTime() === hoverDate.getTime();
            const inRange = isInRange(date);
            const isRangeEdgeDate = isRangeEdge(date);
            const isToday = date.toDateString() === new Date().toDateString();

            const dayClass = [
                classes.calendarDay,
                isStart && classes.startDate,
                isEnd && classes.endDate,
                inRange && classes.inRange,
                isRangeEdgeDate && classes.rangeEdge,
                isHoverEnd && classes.hoverEnd,
                isToday && classes.today
            ].filter(Boolean).join(' ');

            days.push(
                <div
                    key={date.toISOString()}
                    className={dayClass}
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={() => handleDateHover(date)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const months = getThreeMonths();

    return (
        <div className={classes.calendarContainer}>
            <div className={classes.calendarHeader}>
                <button onClick={prevMonth} className={classes.navButton}>
                    <img src={arrowLeft} />
                </button>
                <section className={classes.currentMonth}>
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </section>
                <button onClick={nextMonth} className={classes.navButton}>
                    <img src={arrowRight} />
                </button>
            </div>

            <div className={classes.calendarMonths}>
                {months.map((monthDate, index) => (
                <div key={index} className={classes.calendarMonth}>
                    <h3>
                        {monthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div className={classes.calendarWeekdays}>
                        {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(day => (
                            <div key={day} className={classes.weekday}>{day}</div>
                        ))}
                    </div>
                    <div className={classes.calendarDays + (isLoading ? ` ${classes.disabled}` : '')}>
                        {renderMonth(monthDate)}
                    </div>
                </div>
                ))}
            </div>
            <div className={classes.selectedRange}>
                <p>
                    Период: {(!startDate && !endDate) ? 'Выберите даты' : 
                    (startDate && !endDate) ? 'Выберите вторую дату' :  
                    endDate && `${startDate?.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
                </p>
                <button 
                    disabled={isLoading}
                    onClick={() => {
                        setStartDate(null);
                        setEndDate(null);
                        if (onDateRangeSelect) {
                            onDateRangeSelect(null, null);
                        }
                    }}
                    className={classes.clearButton}
                >
                    Очистить
                </button>
            </div>
        </div>
    );
};
