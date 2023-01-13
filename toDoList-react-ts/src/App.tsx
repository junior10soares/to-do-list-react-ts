import { Header } from './components/Header'
import { TaskList } from './components/TaskList'
import { ClipboardText, PlusCircle } from 'phosphor-react'
import { useState } from 'react'
import styles from './components/App.module.css'

interface TaskProps {
  message: string
  isDone: boolean
}

export function App() {
  const [newTask, setNewTask] = useState('')
  const [tasks, setTask] = useState<TaskProps[]>([])

  function handleClick(){
    event?.preventDefault()//p n atualizar a tela
    setTask([...tasks, {message: newTask, isDone: false}])
    setNewTask('')
  }
  
  function handleNewTask(event: React.ChangeEvent<HTMLInputElement>){
    setNewTask(event?.target.value)
  }

  function handleDelete(taskToDelete:string){
    if(tasks.length > 0){
      const taskWithoutDeleteOne = tasks.filter(item => 
        item.message !== taskToDelete
      )
      setTask(taskWithoutDeleteOne)
    }
  }

  function handleCheckTask(taskToCheck:string){
      const updatedTasks = tasks.map(item => (
        item.message === taskToCheck ? 
        {...item, isDone: !item.isDone} : 
      item))
      setTask(updatedTasks)
  }

  const tasksDoneAmount = tasks.filter(task => task.isDone === true).length
  
  return(

    <div>

      <Header /> 

      <form onSubmit={handleClick}>
        <div className={styles.aside}>
          <input      
            required
            onChange={handleNewTask}
            value={newTask}
            placeholder='Adicione uma nova tarefa' 
            name='text' 
            type="text" 
          />
          <button type="submit">Criar <PlusCircle size={16}/></button>
        </div>  
      </form>

      <div className={styles.text}>
        <p>Tarefas Criadas <span>{tasks.length}</span></p>
        <p>Concluidas <span>{tasksDoneAmount > 0 ? `${tasksDoneAmount} de ${tasks.length}` : `${tasks.length}`}</span></p>
      </div>
      {
        tasks.length > 0 ? 
        tasks.map(item => {
          return (
            <TaskList 
              key={item.message}
              taskDelete={handleDelete}
              content={item.message}
              isDone={item.isDone}
              handleCheckTask={handleCheckTask}
            />
          )
        })
        :
        <div className={styles.footer}>
        <ClipboardText size={56}/>
        <p>Você ainda não tem tarefas cadastradas</p>
        <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      }
  

    </div>
  )
    }
