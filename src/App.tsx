import { ChangeEvent, useState } from "react"

import { Header } from "./components/Header"
import { Input } from "./components/Input"
import { Button } from "./components/Button"
import { Task } from "./components/Task"

import { TaskType } from "./components/Task"

import { PlusCircle, ClipboardText } from "@phosphor-icons/react"

import styles from "./App.module.css"

import "./global.css"

export function App(){
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [newTask, setNewTask] = useState("")

  function handleChangeNewTask(event: ChangeEvent<HTMLInputElement>){
    setNewTask(event.target.value)
  }

  function handleAddNewTask(){
    const taskAlreadyExists = tasks.find(task => task.content === newTask)

    if(taskAlreadyExists){
      return alert("Já existe essa tarefa!")
    }

    const taskToAdd: TaskType = {
      content: newTask,
      type: "uncompleted"
    }

    setTasks([...tasks, taskToAdd])
    setNewTask("")
  }

  function removeTask(taskToRemove: string){
    const tasksWithoutTaskToRemove = tasks.filter(task => task.content !== taskToRemove)
    setTasks(tasksWithoutTaskToRemove)
  }

  function toggleTaskCompleted(taskToToggleContent: string){
    const taskToToggle: TaskType | undefined = tasks.find(task => task.content === taskToToggleContent)

    if(!taskToToggle){
      return
    }

    const arrayWithouTaskToUpdate = tasks.filter(task => task.content !== taskToToggleContent)

    if(taskToToggle.type === "uncompleted"){
      taskToToggle.type = "completed"
    }else{
      taskToToggle.type = "uncompleted"
    }

    setTasks([...arrayWithouTaskToUpdate, taskToToggle])
  }

  const completedTasksCount = tasks.reduce((count, task) => {
    if (task.type === "completed") {
        return count + 1;
    }
    return count;
  }, 0);

  return (
    <div>
      <Header />
      <div className={styles.tasks}>
        <header>
          <Input 
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={handleChangeNewTask}
          />
          <Button 
            text="Criar"
            icon={PlusCircle}
            onClick={handleAddNewTask}
          />
        </header>
        <div className={styles.tasksList}>
          <header>
            <div className={styles.tasksCount}>
              <p>Tarefas criadas <span className={styles.count}>{tasks.length}</span></p>
            </div>
            <div className={styles.finishedTasksCount}>
              <p>Concluídas <span className={styles.count}>{completedTasksCount}</span></p>
            </div>
          </header>
          <main>
            {
              tasks.length > 0 ? (
                  tasks.map(task => {
                    return (
                      <Task 
                        key={task.content} 
                        task={task} 
                        onRemoveTask={removeTask}
                        onToggleTaskCompleted={toggleTaskCompleted}
                      />
                    )
                  })
              ):(
                <div className={styles.noTasks}>
                  <ClipboardText size={56} /> 
                  <p>
                    Você ainda não tem tarefas cadastradas
                  </p>
                  <span>
                    Crie tarefas e organize seus itens a fazer
                  </span>
                </div>
              )
            }
          </main>
        </div>
      </div>
    </div>
  )
}