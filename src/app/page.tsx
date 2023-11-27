'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { EndOfLineState } from 'typescript'
import Task from '@/components/Task'

export default function Home() {
  const [isModified, setIsModified] = useState(false)

  const [Empty, setEmpty] = useState(false)

  const isEmpty = () => {
    if (tasks.length === 0) {
      setEmpty(true)
    }
  }

  const handleCheckboxChange = (index: number) => {
    setTasks(tasks.map((task) => (task.id === index ? { ...task, isChecked: !task.isChecked } : task)))
  }

  const handleAllCheckboxChange = () => {
    setTasks(tasks.map((task) => (task.isChecked ? task : { ...task, isChecked: !task.isChecked })))
  }

  const [tasks, setTasks] = useState([
    { id: 0, name: 'Commencer les décorations de Noel', isChecked: true, modified: false },
    { id: 1, name: 'Ranger le bureau', isChecked: true, modified: false },
    { id: 2, name: 'Acheter du café', isChecked: false, modified: false }
  ])

  const checkedTasks = tasks.filter((task) => task.isChecked)
  const uncheckedTasks = tasks.filter((task) => !task.isChecked)

  console.log(checkedTasks)
  console.log(uncheckedTasks)

  const removeItem = (index: number) => {
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
    setTasks(updatedTasks)
  }

  const removeAllItems = () => {
    setTasks([])
  }

  const [inputTask, setinputTask] = useState('')

  const addItem = () => {
    if (inputTask.trim() !== '') {
      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1
      setTasks([...tasks, { id: newId, name: inputTask, isChecked: false, modified: false }])
      setinputTask('')
    }
  }

  const [updatedTask, setupdatedTask] = useState('')

  const updateTask = (id: number, newName: string, task: any) => {
    task.modified = !task.modified
    const updatedTask = tasks.map((task) => (task.id === id ? { ...task, name: newName } : task))
    setTasks(updatedTask)
  }

  return (
    <div>
      <p className="TodoList">
        <img id="todo" src="to do list.svg" alt="to do list" />
      </p>

      <div className="rectangle_violet">
        <input
          className="navbaradd"
          type="text"
          value={inputTask}
          onChange={(e) => setinputTask(e.target.value)}
          placeholder=" Add task ..."
        />
        <button className="buttonadd" onClick={addItem}>
          <link rel="preload" href="ArialRoundedMTBold.woff2" as="font" type="font/woff2"></link>
          Add
        </button>

        {/* <h1 className="message_vide">{isEmpty ? 'No task ... (╥﹏╥)' : ''}</h1> */}

        <h1 className="categories_prefaites">ONGOING</h1>
        {uncheckedTasks.map((task, index) => {
          return (
            <div className="task_block">
              <Task
                index={task.id}
                name={task.name}
                isChecked={false}
                handleCheck={() => handleCheckboxChange(task.id)}
              />
              {task.modified && (
                <input
                  className="navbarupdate"
                  type="text"
                  value={updatedTask}
                  onChange={(e) => setupdatedTask(e.target.value)}
                  placeholder="Update task..."
                />
              )}
              <div className="boutons">
                <button className="updatebutton" onClick={() => updateTask(task.id, updatedTask, task)}>
                  <img src="pencil.svg" alt="" />
                </button>
                <button onClick={() => removeItem(index)}>
                  <img src="bin.svg" alt="" />
                </button>
              </div>
            </div>
          )
        })}

        <h1 className="categories_prefaites">DONE</h1>
        {checkedTasks.map((task, index) => {
          return (
            <div className="task_block">
              <div className="donetaskname">
                <Task
                  index={task.id}
                  name={task.name}
                  isChecked={true}
                  handleCheck={() => handleCheckboxChange(task.id)}
                />
              </div>

              <button className="boutons" onClick={() => removeItem(index)}>
                <img src="bin.svg" alt="" />
              </button>
            </div>
          )
        })}

        <button className="alldonebutton" onClick={() => handleAllCheckboxChange()}>
          All done
        </button>

        <button className="deleteallbutton" onClick={() => removeAllItems()}>
          Delete all
        </button>
      </div>
    </div>
  )
}
