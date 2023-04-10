import { Dispatch, SetStateAction } from 'react'

function weeksPassed(inputDate: string) {
  const differenceInMs = Date.now() - new Date(inputDate).getTime()
  const weeks = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 7))
  return weeks
}

export type Thabits = {
  id: string
  name: string
  frequency: number
  completed: number
  createdAt: string
  updatedAt: string
  hasUpdatedToday: boolean
}
interface HabitListProps {
  habits: Thabits[]
  setHabits: Dispatch<SetStateAction<Thabits[]>>
}
export function HabitList({ habits, setHabits }: HabitListProps) {
  function handleDeleteHabit(id: string) {
    setHabits((currentHabit) => {
      return currentHabit.filter((habit) => {
        return habit.id !== id
      })
    })
    console.log(id)
  }
  function handleOnePorcentor(id: string) {
    const newHabit = habits.map((habit) => {
      if (habit.id === id) {
        return {
          ...habit,
          completed: habit.completed + 1,
          updatedAt: new Date().toDateString(),
          hasUpdatedToday: true,
        }
      }
      return habit
    })
    setHabits(newHabit)
  }

  function handleResetHabit(id: string) {
    const newHabit = habits.map((habit) => {
      if (habit.id === id) {
        return { ...habit, completed: 0 }
      }
      return habit
    })
    setHabits(newHabit)
  }
  return (
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
      {habits.map((habit) => {
        const date = new Date().toDateString()
        console.log(
          habit.name + ' Today: ' + date + 'updatedAt: ' + habit.updatedAt,
        )
        const updatedFrequency = weeksPassed(habit.createdAt)
        const estimatedCompleted = updatedFrequency * habit.frequency
        const actualCompletedPercentage = habit.completed
        const hasUpdatedToday = habit.updatedAt === date
        return (
          <div
            key={habit.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #000',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex' }}>
              <div
                style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
              >
                <h3>{habit.name}</h3>
                <h5>{habit.frequency} times per week</h5>
              </div>
              <div>
                <button
                  disabled={hasUpdatedToday}
                  onClick={() => handleOnePorcentor(habit.id)}
                >
                  {hasUpdatedToday ? '✅' : '+1%'}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>Should be {estimatedCompleted}% better</span>
                <span>You are {actualCompletedPercentage}% better</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleResetHabit(habit.id)}>
                  reset
                </button>
                <button onClick={() => handleDeleteHabit(habit.id)}>
                  delete
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
