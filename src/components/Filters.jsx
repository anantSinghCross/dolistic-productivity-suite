import React from "react";

// TODO: Make an accordian component

function Filters({ controls, uniqueTags }) {
    
    const {filters, setFilters, sorter, setSorter} = controls;
    
    const handleSorterChange = (e) => {
        setSorter(parseInt(e.target.value));
    };
    
    const handlePriorityChange = (e) => {
        setFilters(prevFilter => {
            const value = parseInt(e.target.value);
            const s = new Set(prevFilter.priority);
            if(s.has(value)){
                s.delete(value);
            } else {
                s.add(value);
            }
            // if it is there then remove it, if not then add it
            const updatedPriorities = Array.from(s);
            return {
                ...prevFilter,
                priority: updatedPriorities
            }
        })
    }

    const handleStatusChange = (e) => {
        setFilters(prevFilter => {
            let value = e.target.value;
            if(value === 'true'){
                value = true;
            } else {
                value = false;
            }
            const s = new Set(prevFilter.completed);
            if(s.has(value)){
                s.delete(value);
            } else {
                s.add(value);
            }
            const updatedCompleted = Array.from(s);
            return {
                ...prevFilter,
                completed: updatedCompleted
            }
        })
    }

    const handleTagsChange = (e) => {
        setFilters(prevFilter => {
            let value = e.target.value;
            const s = new Set(prevFilter.tags);
            if(s.has(value)){
                s.delete(value);
            } else {
                s.add(value);
            }
            const updatedTags = Array.from(s);
            return {
                ...prevFilter,
                tags: updatedTags
            }
        })
    }

    const tagsCheckboxes = (uniqueTags && uniqueTags.length>0) ? (
        uniqueTags.map(item => {
            return (<div key={item} className=" text-sm flex items-center rounded-full bg-slate-100 px-2 pr-3">
                <input className="flex-shrink-0 m-1" type="checkbox" id={item} value={item} onChange={handleTagsChange}/>
                <label className=" pb-1" htmlFor={item}>{item}</label>
            </div>)
        })
    ) : (
        null
    )

    return (
        <div className="flex flex-col p-3 gap-2">
            <div className="flex items-center gap-2">
                <p>Sort by</p>
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
                        <input className="m-1" type="checkbox" id='completed' value={true} onChange={handleStatusChange}/>
                        <label className=" pb-1" htmlFor="completed">Done</label>
                    </div>
                    <div className=" flex items-center">
                        <input className="m-1" type="checkbox" id='not-done' value={false} onChange={handleStatusChange}/>
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
