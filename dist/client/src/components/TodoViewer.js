"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const TodoCard_1 = __importDefault(require("./TodoCard"));
const react_redux_1 = require("react-redux");
const todo_action_1 = require("../state/action/todo.action");
function TodoViewer() {
    const { error, data } = (0, react_redux_1.useSelector)((state) => {
        return state === null || state === void 0 ? void 0 : state.todoState;
    });
    const [addValue, setAddValue] = (0, react_1.useState)("");
    const dispatch = (0, react_redux_1.useDispatch)();
    const handleChangeCreate = (event) => {
        if (addValue != "") {
            (0, todo_action_1.addTodo)(dispatch, addValue);
            setAddValue("");
        }
    };
    const CallTodoCard = (data) => {
        return (data === null || data === void 0 ? void 0 : data.todoList.map((a, i) => (<TodoCard_1.default task={a.task} done={a.done} taskId={a._id} key={a._id} dispatch={dispatch}/>)));
    };
    (0, react_1.useEffect)(() => {
        CallTodoCard(data);
    }, [data]);
    return (<div className='w-[90%] min-h-[90svh] md:h-0 max-w-[40rem] mx-auto relative  mt-10 flex flex-col justify-center rounded-2xl py-5'>
      <div className="w-[100%] flex flex-col items-center">
        {CallTodoCard(data)}
      </div>
      <form className="bg-[#6366f1] rounded-xl  flex justify-between  md:flex-row items-center px-5 py-3 my-2 ">
        <input type="text" placeholder='Stay on track, get it done with ease' className='txtBox bg-[#111] w-[100%]' value={addValue} onChange={(e) => { setAddValue(e.target.value); }}/>
        <button type="button" onClick={(e) => { handleChangeCreate(e); }} className='btn bg-[#111] ml-3'>add</button>
      </form>
    </div>);
}
exports.default = TodoViewer;
//# sourceMappingURL=TodoViewer.js.map