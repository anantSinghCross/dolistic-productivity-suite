import React from "react";
import { getUniqueTags } from "../../utils";

function Tags({ tags /**contains all tags */, tagFilter/**only the tags applied in filter */, toggleTagFilter }) {
  const tagsList = tags.map((tag) => (
    <button
      key={tag}
      onClick={() => toggleTagFilter(tag)}
      className={`px-3 rounded  ${tagFilter.includes(tag) ? "bg-indigo-600 text-white" : "bg-slate-100"} `}
    >
      {`${tag[0].toUpperCase()}${tag.slice(1)}`}
    </button>
  ));
  let allFiltersBtn;
  if(((tagFilter && tags) && tagFilter.length == tags.length) || (tagFilter && tagFilter.length === 0)){ // meaning all tags are appied OR none
    allFiltersBtn = <button className=" px-4 rounded bg-indigo-600 text-white">All</button>;
  } else {
    allFiltersBtn = <button className=" px-4 rounded bg-slate-100">All</button>;
  }
  return (
    <div className="flex gap-1 text-xs">
      {allFiltersBtn}
      {tagsList}
    </div>
  );
}

export default Tags;
