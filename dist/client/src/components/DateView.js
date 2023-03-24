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
const react_1 = __importStar(require("react"));
function DateView() {
    const [dates, setDates] = (0, react_1.useState)([]);
    const [offset, setOffset] = (0, react_1.useState)(0);
    const [today, setToday] = (0, react_1.useState)(new Date());
    const getDates = () => {
        const next7Days = [...Array(7)].map((_, i) => {
            const date = new Date();
            date.setDate(today.getDate() + offset + i);
            return date.toDateString();
        });
        setDates(prev => next7Days);
    };
    (0, react_1.useEffect)(() => {
        getDates();
    }, [offset]);
    return (<div className='w-[100%] py-2 px-10 bg-[#121212] flex justify-between items-center'>
            <div className="icon"><button className="bg-[#6366f1] py-1 px-3 text-bold text-lg" onClick={() => { setOffset(prev => prev - 7); }}>{`<`}</button></div>
            <div className="">
                <button className='bg-[#6366f1] py-1 px-2'>{today.toDateString()}</button>
            </div>
            <div className="flex gap-2">
                {dates.map((date, i) => {
            return (<button className='bg-[#6366f1] py-1 px-2' key={i}>{date}</button>);
        })}
                
            </div>
            <div className="icon"><button className="bg-[#6366f1] py-1 px-3 text-bold text-lg" onClick={() => { setOffset(prev => prev + 7); }}>{`>`}</button></div>
        </div>);
}
exports.default = DateView;
//# sourceMappingURL=DateView.js.map