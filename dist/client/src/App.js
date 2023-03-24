"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.css");
const Navbar_1 = __importDefault(require("./components/Navbar"));
const TodoViewer_1 = __importDefault(require("./components/TodoViewer"));
const user_action_1 = require("./state/action/user.action");
const react_redux_1 = require("react-redux");
function App() {
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        (0, user_action_1.getUser)(dispatch);
    });
    return (<div className="App">
      <Navbar_1.default />
      {/* <DateView /> */}
      <TodoViewer_1.default />
    </div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map