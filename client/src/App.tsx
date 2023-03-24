import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import TodoCard from './components/TodoCard'
import DateView from './components/DateView'
import TodoViewer from './components/TodoViewer'
import { getUser } from './state/action/user.action'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getUser(dispatch);
  })

  return (
    <div className="App">
      <Navbar />
      {/* <DateView /> */}
      <TodoViewer />
    </div>
  )
}

export default App
