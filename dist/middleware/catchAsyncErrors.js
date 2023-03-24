"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncErrors = void 0;
const catchAsyncErrors = (func) => (req, res, next) => Promise
    .resolve(func(req, res, next))
    .catch(next);
exports.catchAsyncErrors = catchAsyncErrors;
//# sourceMappingURL=catchAsyncErrors.js.map