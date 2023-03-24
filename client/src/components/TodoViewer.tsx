import { useState, useEffect } from 'react'
import TodoCard from './TodoCard'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../state/action/todo.action';
import { RootState } from '../state';
import { ITodoList } from '../types/redux/todo.types';


function TodoViewer() {

  const { error, data } = useSelector((state: RootState) => {
    return state?.todoState;
  });
  const [addValue, setAddValue] = useState<string>("");

  const dispatch = useDispatch()
  const handleChangeCreate = (event: any) => {
    if (addValue != "") {
      addTodo(dispatch, addValue);
      setAddValue("");
    }
  }

  const CallTodoCard = (data: any) => {
    return (data?.todoList.map((a: ITodoList, i: number) => (
      <TodoCard task={a.task} done={a.done} taskId={a._id} key={a._id} dispatch={dispatch} />
    )))
  }

  useEffect(() => {
    CallTodoCard(data)
  }, [data])

  return (
    <div className='w-[90%] min-h-[90svh] md:h-0 max-w-[40rem] mx-auto relative  mt-10 flex flex-col justify-center rounded-2xl py-5'>
      <div className="w-[100%] flex flex-col items-center" >
        {
          CallTodoCard(data)
        }
      </div>
      <form className="bg-[#6366f1] rounded-xl  flex justify-between  md:flex-row items-center px-5 py-3 my-2 ">
        <input type="text" placeholder='Stay on track, get it done with ease' className='txtBox bg-[#111] w-[100%]' value={addValue} onChange={(e) => { setAddValue(e.target.value) }} />
        <button type="button" onClick={(e) => { handleChangeCreate(e) }} className='btn bg-[#111] ml-3'>add</button>
      </form>
    </div>
  )
}

export default TodoViewer