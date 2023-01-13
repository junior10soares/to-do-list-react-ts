import { Trash } from 'phosphor-react'
import styles from '../components/TaskList.module.css'

interface ContentProps{
    content: string
    taskDelete: (string: string) => void
    handleCheckTask: (string: string) => void
    isDone: boolean
}

export function TaskList({content, taskDelete, isDone, handleCheckTask}: ContentProps ){

    return(
        
        <div  className={styles.area}>
            <li>
                <input
                    className={styles.check}
                    checked={isDone}
                    onChange={() => handleCheckTask(content)}        
                    type="checkbox" 
                />
                <p>{content}</p>
                <button type='button' onClick={() => taskDelete(content)}
                    className={styles.trash}>
                    <Trash             
                    size={24}/>
                </button>
                
            </li>
        </div>
    )
}