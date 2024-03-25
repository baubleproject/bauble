import create from 'zustand';
import { TaskType } from '@/components/Cards/KanbanTaskCard';

interface KanbanStore {
    tasks: TaskType[];
    setTasks: (tasks: TaskType[]) => void;
    draggedTask: string;
    setDraggedTask: (id: string) => void;
    addTask: (task: TaskType) => void;
    updateTask: (taskId: string, updatedTask: Partial<TaskType>) => void;
    removeTask: (taskId: string) => void;
}

const useKanbanStore = create<KanbanStore>((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),
    draggedTask: "",
    setDraggedTask: (id: string) => {
        console.log(id)
        set({ draggedTask: id });
    },
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    updateTask: (taskId, updatedTask) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task?.id === taskId ? { ...task, ...updatedTask } : task
            ),
        })),
    removeTask: (taskId) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task?.id !== taskId),
        })),
}));

export default useKanbanStore;

