import React, { useState } from 'react';
import { AddTaskFormProps } from '../../types/Task';
import './AddTaskForm.css';

const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            alert('End date cannot be before start date!');
            return;
        }

        addTask(name, description, start, end);
        setName('');
        setStartDate('');
        setEndDate('');
        setDescription('');
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Task Name'
                required
                className='input'
            />
            <input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Description'
                required
                className='input'
            />
            <div className='dates'>
                <input
                    type='date'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className='input'
                />
                <input
                    type='date'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className='input'
                />
            </div>

            <button type='submit' className='button'>
                Add Task
            </button>
        </form>
    );
};

export default AddTaskForm;
