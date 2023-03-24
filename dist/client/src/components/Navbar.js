"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const user_action_1 = require("../state/action/user.action");
const react_redux_1 = require("react-redux");
function Navbar(props) {
    const { error, user } = (0, react_redux_1.useSelector)((state) => {
        return state === null || state === void 0 ? void 0 : state.userState;
    });
    const [isUser, setIsUser] = (0, react_1.useState)(false);
    const dispatch = (0, react_redux_1.useDispatch)();
    const handleLogin = () => {
        window.open(`${import.meta.env.VITE_REACT_SER_URL}/api/v1/google`, "_self");
    };
    const handleLogout = () => {
        (0, user_action_1.logoutUser)(dispatch);
    };
    const LoginBtn = () => {
        return (user ? (<button className="btn" onClick={handleLogout}>
                    Logout
                </button>) : (<button className="btn" onClick={handleLogin}>
                    Login
                </button>));
    };
    (0, react_1.useEffect)(() => {
        (user === null || user === void 0 ? void 0 : user._id) ?
            setIsUser((prev) => (prev = true)) :
            setIsUser((prev) => (prev = false));
    }, [user, isUser]);
    return (<header className="w-[100%] py-2 px-10 flex items-center justify-between bg-[#6366f1]">
            <div className="logo">
                <material_1.Typography>TODO's</material_1.Typography>
            </div>
            <nav>
                <LoginBtn />
            </nav>
        </header>);
}
exports.default = Navbar;
//# sourceMappingURL=Navbar.js.map