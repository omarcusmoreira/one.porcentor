import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react'
import { Thabits } from '../HabitList/HabitList'
import { v4 as uuidv4 } from 'uuid'

interface HabitInputProps {
  habits: Thabits[]
  setHabits: Dispatch<SetStateAction<Thabits[]>>
}

export function HabitInput({ habits, setHabits }: HabitInputProps) {
  const [habitName, setHabitName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [weeklyFrequency, setWeeklyFrequency] = useState<string[]>([])

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const dayOfWeek = event.target.value
    const isChecked = event.target.checked

    if (isChecked) {
      setWeeklyFrequency([...weeklyFrequency, dayOfWeek])
    } else {
      setWeeklyFrequency(weeklyFrequency.filter((day) => day !== dayOfWeek))
    }
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setHabitName(() => {
      return event.target.value
    })
  }

  function handleStartDateChange(event: ChangeEvent<HTMLInputElement>) {
    setStartDate(event.target.value)
  }

  function handleAddHabit() {
    const date = new Date().toDateString()
    const newHabit: Thabits = {
      name: habitName,
      completed: 0,
      createdAt: date,
      startDate,
      updatedAt: '',
      weeklyFrequency,
      id: uuidv4(),
      hasUpdatedToday: false,
    }
    setHabits(() => {
      return [...habits, newHabit]
    })
    setHabitName('')
    setStartDate('')
    setWeeklyFrequency([])
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
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            placeholder="times per week"
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Weekly Frequency</label>
        <label>
          <input
            type="checkbox"
            value="sunday"
            onChange={handleCheckboxChange}
            checked={weeklyFrequency.includes('sunday')}
          />
          Sunday
        </label>
        <label>
          <input
            type="checkbox"
            value="monday"
            onChange={handleCheckboxChange}
            checked={weeklyFrequency.includes('monday')}
          />
          Monday
        </label>
        <label>
          <input
            type="checkbox"
            value="tuesday"
            onChange={handleCheckboxChange}
            checked={weeklyFrequency.includes('tuesday')}
          />
          Tuesday
        </label>
        <label>
          <input
            type="checkbox"
            value="wednesday"
            onChange={handleCheckboxChange}
            checked={weeklyFrequency.includes('wednesday')}
          />
          Wednesday
        </label>
        <label>
          <input
            type="checkbox"
            value="thursday"
            onChange={handleCheckboxChange}
            checked={weeklyFrequency.includes('thursday')}
          />
          Thursday
        </label>
        <label>
          <input
            type="checkbox"
            value="friday"
            onChange={handleCheckboxChange}
            checked={weeklyFrequency.includes('friday')}
          />
          Friday
        </label>
        <label>
          <input
            type="checkbox"
            value="saturday"
            onChange={handleCheckboxChange}
            checked={weeklyFrequency.includes('saturday')}
          />
          Saturday
        </label>
      </div>
      <button onClick={() => handleAddHabit()}>+</button>
    </div>
  )
}
