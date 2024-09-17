import { useState } from 'react';
import {
    addDays,
    startOfQuarter,
    subMonths,
    addMonths,
    format,
    startOfWeek,
    getMonth,
} from 'date-fns';
import { Task } from '../types/Task';

export const useTaskTable = () => {
    const getQuarterStartAlignedToWeek = (date: Date) => {
        const startOfQuarterDate = startOfQuarter(date);
        return startOfWeek(startOfQuarterDate, { weekStartsOn: 1 });
    };

    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentQuarterStart, setCurrentQuarterStart] = useState<Date>(
        startOfQuarter(new Date())
    );

    const addTask = (
        name: string,
        description: string,
        startDate: Date,
        endDate: Date
    ) => {
        setTasks([
            ...tasks,
            { id: tasks.length + 1, name, startDate, endDate, description },
        ]);
    };

    const handlePreviousQuarter = () => {
        setCurrentQuarterStart(subMonths(currentQuarterStart, 3));
    };

    const handleNextQuarter = () => {
        setCurrentQuarterStart(addMonths(currentQuarterStart, 3));
    };

    const weeksInQuarter = Array.from({ length: 13 }, (_, i) => {
        const quarterStartFromMonday =
            getQuarterStartAlignedToWeek(currentQuarterStart);
        return addDays(quarterStartFromMonday, i * 7);
    });

    const taskCoversWeek = (task: Task, weekStart: Date) => {
        const weekEnd = addDays(weekStart, 7);
        return task.startDate <= weekEnd && task.endDate >= weekStart;
    };

    const getMonthWithMoreDaysInWeek = (weekStart: Date) => {
        const currentDate = new Date(weekStart);
        const start = startOfWeek(currentDate, { weekStartsOn: 1 });

        let firstMonthDays = 0;
        let secondMonthDays = 0;
        const firstMonth = getMonth(start);

        for (let i = 0; i < 7; i++) {
            const day = addDays(start, i);
            const currentMonth = getMonth(day);

            if (currentMonth === firstMonth) {
                firstMonthDays++;
            } else {
                secondMonthDays++;
            }
        }

        const firstMonthName = format(start, 'MMMM');
        const secondMonthName = format(addDays(start, 7), 'MMMM');

        if (firstMonthDays > secondMonthDays) {
            return firstMonthName;
        } else {
            return secondMonthName;
        }
    };

    const groupWeeksByMonth = () => {
        const monthGroups: { month: string; weeks: Date[] }[] = [];
        let currentMonth = getMonthWithMoreDaysInWeek(weeksInQuarter[0]);
        let currentMonthWeeks: Date[] = [];

        weeksInQuarter.forEach((week) => {
            const weekMonth = getMonthWithMoreDaysInWeek(week);

            if (weekMonth !== currentMonth) {
                monthGroups.push({
                    month: currentMonth,
                    weeks: currentMonthWeeks,
                });
                currentMonth = weekMonth;
                currentMonthWeeks = [week];
            } else {
                currentMonthWeeks.push(week);
            }
        });

        monthGroups.push({ month: currentMonth, weeks: currentMonthWeeks });

        return monthGroups;
    };

    return {
        tasks,
        addTask,
        handlePreviousQuarter,
        handleNextQuarter,
        weeksInQuarter,
        taskCoversWeek,
        groupWeeksByMonth,
        currentQuarterStart,
    };
};
