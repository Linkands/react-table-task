export interface Task {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
}

export interface AddTaskFormProps {
    addTask: (
        name: string,
        description: string,
        startDate: Date,
        endDate: Date
    ) => void;
}
