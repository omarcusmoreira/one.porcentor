import { useEffect, useState } from 'react'
import { HabitInput } from './components/HabitInput/HabitInput'
import { HabitList, Thabits } from './components/HabitList/HabitList'
import { Header } from './components/Header/Header'

function App() {
  const [habits, setHabits] = useState<Thabits[]>(() => {
    const localHabits = localStorage.getItem('HABITS')
    if (localHabits == null) return []
    return JSON.parse(localHabits)
  })
  useEffect(() => {
    localStorage.setItem('HABITS', JSON.stringify(habits))
  }, [habits])

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <Header />
      <HabitList habits={habits} setHabits={setHabits} />
      <HabitInput habits={habits} setHabits={setHabits} />
    </div>
  )
}

export default App
