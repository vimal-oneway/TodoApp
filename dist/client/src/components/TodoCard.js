"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const TaskAlt_1 = __importDefault(require("@mui/icons-material/TaskAlt"));
const DeleteOutline_1 = __importDefault(require("@mui/icons-material/DeleteOutline"));
const EditOutlined_1 = __importDefault(require("@mui/icons-material/EditOutlined"));
const react_1 = require("react");
const todo_action_1 = require("../state/action/todo.action");
function TodoCard(props) {
    const { task, done, taskId, dispatch } = props;
    const [taskDone, setTaskDone] = (0, react_1.useState)(done);
    const [edit, setEdit] = (0, react_1.useState)(false);
    const [value, setValue] = (0, react_1.useState)(task);
    const handleCheck = (event) => {
        setTaskDone((prev) => prev = !prev);
        (0, todo_action_1.doneTodoById)(dispatch, taskId, !done);
    };
    const handleEdit = (event) => {
        edit && (0, todo_action_1.updateTodoById)(dispatch, value, taskId);
        setEdit((prev) => prev = !prev);
    };
    const handleDelete = (event) => {
        console.log(taskId);
        (0, todo_action_1.deleteTodoById)(dispatch, taskId);
    };
    return (<div className="w-[100%] max-w-[40rem]  rounded-xl  flex flex-col justify-between  md:flex-row bg-[#111] items-center px-5 py-3  my-2">
      <div className="w-[100%]">
        <input type="checkbox" className="cursor-pointer" id={`${taskId}`} onChange={handleCheck} checked={taskDone}/>

        {edit ?
            <input type="text" className="txtBox" value={value} onChange={(e) => { setValue(e.target.value); }}/>
            :
                <material_1.Typography component={'label'} htmlFor={`${taskId}`} ml={2} sx={{
                        fontWeight: "500",
                        fontSize: "1rem",
                        textDecoration: taskDone ? 'line-through' : 'none'
                    }}>
            {value}
          </material_1.Typography>}
      </div>
      <div className="flex justify-between mt-3 md:mt-0">
        <button onClick={handleEdit} className={`btn text-white  hover:bg-[#333] item ml-3   `} style={{
            backgroundColor: edit ? "green" : "#444"
        }}>
          {!edit ? <EditOutlined_1.default /> : <TaskAlt_1.default />}
        </button>
        <button className="btn bg-red-500 text-black hover:bg-red-400 item ml-3" onClick={handleDelete}>
          <DeleteOutline_1.default />
        </button>
      </div>
    </div>);
}
exports.default = TodoCard;
//# sourceMappingURL=TodoCard.js.map