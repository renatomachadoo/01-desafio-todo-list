import styles from "./Task.module.css"

import { Checkbox } from "./Checkbox"

import { Trash } from "@phosphor-icons/react"

export interface TaskType {
    content: string;
    type: "uncompleted" | "completed";
}

export interface TaskProps {
    task: TaskType;
    onRemoveTask: (content: string) => void;
    onToggleTaskCompleted: (content: string) => void;
}

export function Task({task, onRemoveTask, onToggleTaskCompleted}: TaskProps){

    function handleDeleteTask(){
        onRemoveTask(task.content)
    }

    return(
        <div className={styles.task}>
            <div className={styles.taskInfo}>
                <Checkbox id={task.content} onClick={() => onToggleTaskCompleted(task.content)}/>
                <p 
                    className={task.type === "completed" ? styles.contentFinished : styles.content}
                >
                    {task.content}
                </p>
            </div>
            <button onClick={handleDeleteTask}>
                <Trash size={24} />
            </button>
        </div>
    )
}