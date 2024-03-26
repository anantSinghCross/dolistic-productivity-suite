import React from "react";

function Filters({ controls, uniqueTags }) {
    
    const {filters, setFilters, sorter, setSorter} = controls;
    
    const handleSorterChange = (e) => {
        setSorter(parseInt(e.target.value));
    };
    
    const handlePriorityChange = (e) => {
        setFilters(prevFilter => {
            const updatedPriorities = prevFilter
            // if it is there then remove it, if not then add it
            return {
                ...prevFilter,
                priority: prevFilter.priority? [...prevFilter.priority, parseInt(e.target.value)]: [parseInt(e.target.value)]
            }
        })
    }

    const tagsCheckboxes = (uniqueTags && uniqueTags.length>0) ? (
        uniqueTags.map(item => {
            return (<div key={item} className=" text-sm flex items-center rounded-full bg-slate-100 px-2 pr-3">
                <input className="flex-shrink-0 m-1" type="checkbox" id={item}/>
                <label className=" pb-1" htmlFor={item}>{item}</label>
            </div>)
        })
    ) : (
        null
    )

    return (
        <div className="flex flex-col p-3 gap-2">
            <p>Filters</p>
            <div className="flex items-center gap-2">
                <p>Sort</p>
                <select
                    defaultValue={sorter}
                    onChange={handleSorterChange}
                    className=" p-1 rounded border text-sm outline-none"
                >
                    <option value="0">Priority</option>
                    <option value="1">Due Date</option>
                    <option value="2">None</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <p>Priority</p>
                <div className="flex items-center gap-2 rounded border py-1 px-2">
                    <div className=" flex items-center">
                        <input className="m-1" type="checkbox" id='High' value={3} onChange={handlePriorityChange}/>
                        <label className=" pb-1" htmlFor="High">High</label>
                    </div>
                    <div className=" flex items-center">
                        <input className="m-1" type="checkbox" id='Normal' value={2} onChange={handlePriorityChange}/>
                        <label className=" pb-1"  htmlFor="Normal">Normal</label>
                    </div>
                    <div className=" flex items-center">
                        <input className="m-1" type="checkbox" id='Low' value={1} onChange={handlePriorityChange}/>
                        <label className=" pb-1"  htmlFor="Low">Low</label>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <p>Status</p>
                <div className="flex items-center gap-2 rounded border py-1 px-2">
                    <div className=" flex items-center">
                        <input className="m-1" type="checkbox" id='completed'/>
                        <label className=" pb-1" htmlFor="completed">Done</label>
                    </div>
                    <div className=" flex items-center">
                        <input className="m-1" type="checkbox" id='not-done'/>
                        <label className=" pb-1"  htmlFor="not-done">Not Done</label>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <p className="flex-shrink-0">Include Tags</p>
                <div className="flex flex-wrap gap-2 py-1 px-2">
                    { tagsCheckboxes }
                </div>
            </div>
        </div>
    );
}

export default Filters;
