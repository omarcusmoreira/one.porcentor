import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react'
import { Thabits } from '../HabitList/HabitList'
import { v4 as uuidv4 } from 'uuid'

interface HabitInputProps {
  habits: Thabits[]
  setHabits: Dispatch<SetStateAction<Thabits[]>>
}

export function HabitInput({ habits, setHabits }: HabitInputProps) {
  const [habitName, setHabitName] = useState('')
  const [habitFrequency, setHabitFrequency] = useState<number>(0)
  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setHabitName(() => {
      return event.target.value
    })
  }
  function handleFrequencyChange(event: ChangeEvent<HTMLInputElement>) {
    setHabitFrequency(() => {
      return Number(event.target.value)
    })
  }
  function handleAddHabit() {
    const date = new Date().toDateString()
    const newHabit: Thabits = {
      name: habitName,
      completed: 0,
      createdAt: date,
      updatedAt: '',
      frequency: habitFrequency,
      id: uuidv4(),
      hasUpdatedToday: false,
    }
    setHabits(() => {
      return [...habits, newHabit]
    })
    setHabitName('')
    setHabitFrequency(0)
  }
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Description</label>
          <input
            type="text"
            value={habitName}
            onChange={handleNameChange}
            placeholder="Habit description"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Frequency</label>
          <input
            type="text"
            value={habitFrequency}
            onChange={handleFrequencyChange}
            placeholder="times per week"
          />
        </div>
      </div>
      <button onClick={() => handleAddHabit()}>+</button>
    </div>
  )
}
