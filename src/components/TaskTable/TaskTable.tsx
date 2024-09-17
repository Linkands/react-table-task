import React from 'react';
import { format, getYear, getQuarter } from 'date-fns';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { useTaskTable } from '../../hooks/useTaskTable';
import './TaskTable.css';

const TaskTable: React.FC = () => {
    const {
        tasks,
        addTask,
        handlePreviousQuarter,
        handleNextQuarter,
        weeksInQuarter,
        taskCoversWeek,
        groupWeeksByMonth,
        currentQuarterStart,
    } = useTaskTable();

    const year = getYear(currentQuarterStart);
    const monthGroups = groupWeeksByMonth();
    const currentQuarter = getQuarter(currentQuarterStart);
    const baseWeekNumber = (currentQuarter - 1) * 13;

    return (
        <div className='tasks'>
            {tasks.length < 10 && <AddTaskForm addTask={addTask} />}

            {tasks.length !== 0 && (
                <div className='content'>
                    <div className='navigation'>
                        <button onClick={handlePreviousQuarter}>
                            Previous Quarter
                        </button>
                        <h2>
                            Quarter {currentQuarter}, {year}
                        </h2>
                        <button onClick={handleNextQuarter}>
                            Next Quarter
                        </button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                {monthGroups.map((group, index) => (
                                    <th
                                        key={index}
                                        colSpan={group.weeks.length}
                                    >
                                        {group.month}
                                    </th>
                                ))}
                            </tr>
                            <tr>
                                <th>Task</th>
                                {weeksInQuarter.map((week, index) => (
                                    <th key={index}>
                                        Week {baseWeekNumber + index + 1}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id}>
                                    <td className='name'>{task.name}</td>
                                    {weeksInQuarter.map((week, index) => (
                                        <td
                                            key={index}
                                            className={
                                                taskCoversWeek(task, week)
                                                    ? `cell active`
                                                    : 'cell'
                                            }
                                        >
                                            {taskCoversWeek(task, week) && (
                                                <div className='tooltip-container'>
                                                    <div className='tooltip-content'>
                                                        <p>
                                                            {format(
                                                                task.startDate,
                                                                'dd-MM-yyyy'
                                                            )}{' '}
                                                            to{' '}
                                                            {format(
                                                                task.endDate,
                                                                'dd-MM-yyyy'
                                                            )}
                                                        </p>
                                                        <strong>
                                                            {task.name}
                                                        </strong>
                                                        <p>
                                                            {task.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TaskTable;
