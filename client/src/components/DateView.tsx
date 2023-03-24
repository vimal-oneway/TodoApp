import React, { useEffect, useState } from 'react'

function DateView() {


    const [dates, setDates] = useState<string[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [today, setToday] = useState<Date>(new Date());

    const getDates = () => {
        const next7Days = [...Array(7)].map((_, i) => {
            const date: Date = new Date();
            date.setDate(today.getDate() + offset + i);
            return date.toDateString();
        })
        setDates(prev => next7Days)
    }

    useEffect(()=>{
        getDates()
    },[offset])


    return (
        <div className='w-[100%] py-2 px-10 bg-[#121212] flex justify-between items-center'>
            <div className="icon"><button className="bg-[#6366f1] py-1 px-3 text-bold text-lg" onClick={()=>{setOffset(prev=> prev-7)}}>{`<`}</button></div>
            <div className="">
                <button className='bg-[#6366f1] py-1 px-2'>{today.toDateString()}</button>
            </div>
            <div className="flex gap-2">
                {
                    dates.map((date, i)=>{
                        return(
                            <button className='bg-[#6366f1] py-1 px-2' key={i}>{date}</button>
                        )
                    })
                }
                
            </div>
            <div className="icon"><button className="bg-[#6366f1] py-1 px-3 text-bold text-lg" onClick={()=>{setOffset(prev=> prev+7)}}>{`>`}</button></div>
        </div>
    )
}
export default DateView;