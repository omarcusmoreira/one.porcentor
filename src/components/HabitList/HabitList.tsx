import { Dispatch, SetStateAction } from 'react'

export type Thabits = {
  id: string
  name: string
  completed: number
  createdAt: string
  updatedAt: string
  startDate: string
  hasUpdatedToday: boolean
  weeklyFrequency: string[]
}

function countOccurrences(habit: Thabits) {
  const today = new Date().getTime()

  const startDate = new Date(habit.startDate).getTime()
  let occurrences = 0
  console.log('hoje é ' + today)
  console.log('inicio do ciclo ' + startDate)
  if (startDate > today) {
    // habit hasn't started yet
    console.log('não começou')
    return 0
  }

  const daysSinceStart = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24))
  console.log('Dias do inicio do ciclo ' + daysSinceStart)
  for (let i = 0; i < daysSinceStart; i++) {
    const currentDate = new Date(startDate + i * 24 * 60 * 60 * 1000)
    const dayOfWeek = currentDate
      .toLocaleString('en-us', { weekday: 'long' })
      .toLowerCase()
    if (habit.weeklyFrequency.includes(dayOfWeek)) {
      console.log('today')
      occurrences++
    }
  }

  return occurrences
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
                <h5>{habit.startDate} cycle start</h5>
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
                <span>You are {actualCompletedPercentage}% better</span>
                <span>
                  You were supposed to be {countOccurrences(habit)}% better
                </span>
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
