export interface Task {
    id: number;
    title: string;
    date: string;
    status: 'Pending' | 'Completed';
}