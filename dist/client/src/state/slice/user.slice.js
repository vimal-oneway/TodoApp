"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.failed = exports.success = exports.request = exports.userSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    loading: false,
    user: JSON.parse(JSON.stringify(localStorage.getItem("user"))),
};
exports.userSlice = (0, toolkit_1.createSlice)({
    name: "User",
    initialState: initialState,
    reducers: {
        request: (state) => {
            state.loading = true;
        },
        success: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        logout: (state) => {
            state.loading = false;
            localStorage.clear();
        },
        failed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
_a = exports.userSlice.actions, exports.request = _a.request, exports.success = _a.success, exports.failed = _a.failed, exports.logout = _a.logout;
exports.default = exports.userSlice.reducer;
//# sourceMappingURL=user.slice.js.map