import { Typography, Checkbox, colors } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { MouseEventHandler, useState } from 'react'

import { useSelector } from 'react-redux';
import { doneTodoById, deleteTodoById, updateTodoById } from '../state/action/todo.action';
import { RootState } from '../state';

function TodoCard(props: any): JSX.Element {
  const { task, done, taskId, dispatch } = props;

  const [taskDone, setTaskDone] = useState<boolean>(done);
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(task);

  const handleCheck = (event: any) => {
    setTaskDone((prev: boolean) => prev = !prev);
    doneTodoById(dispatch, taskId, !done)
  }

  const handleEdit = (event: any) => {
    edit && updateTodoById(dispatch, value, taskId);
    setEdit((prev: boolean) => prev = !prev)
  }

  const handleDelete = (event: any) => {
    console.log(taskId);
    deleteTodoById(dispatch, taskId)
  }
  return (
    <div className="w-[100%] max-w-[40rem]  rounded-xl  flex flex-col justify-between  md:flex-row bg-[#111] items-center px-5 py-3  my-2"  >
      <div className="w-[100%]">
        <input type="checkbox" className="cursor-pointer" id={`${taskId}`} onChange={handleCheck} checked={taskDone} />

        {edit ?
          <input type="text" className="txtBox" value={value} onChange={(e) => { setValue(e.target.value) }} />
          :
          <Typography component={'label'} htmlFor={`${taskId}`} ml={2}
            sx={{
              fontWeight: "500",
              fontSize: "1rem",
              textDecoration: taskDone ? 'line-through' : 'none'
            }}
          >
            {value}
          </Typography>}
      </div>
      <div className="flex justify-between mt-3 md:mt-0">
        <button onClick={handleEdit} className={`btn text-white  hover:bg-[#333] item ml-3   `} style={{
          backgroundColor: edit ? "green" : "#444"
        }}>
          {!edit ? <EditOutlinedIcon /> : <TaskAltIcon />}
        </button>
        <button className="btn bg-red-500 text-black hover:bg-red-400 item ml-3" onClick={handleDelete}>
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
