import React from "react";

function Tags({
  tags /**contains all tags */,
  tagFilter /**only the tags applied in filter */,
  toggleTagFilter,
}) {
  const tagsList = tags.map((tag) => (
    <button
      key={tag}
      onClick={() => toggleTagFilter(tag)}
      className={`px-3 rounded-md  ${
        tagFilter.includes(tag) ? "bg-indigo-500 text-white shadow-inner" : "bg-slate-100"
      } `}
    >
      {`${tag[0].toUpperCase()}${tag.slice(1)}`}
    </button>
  ));

  const handleAllFilterToggle = () => {
    if (tags.length > 0 && tags.length === tagFilter.length) {
      tagFilter.forEach((tag) => {
        toggleTagFilter(tag);
      });
    } else if (tags.length > 0 && tags.length !== tagFilter.length) {
      tags.forEach((tag) => {
        if (!tagFilter.includes(tag)) {
          toggleTagFilter(tag);
        }
      });
    }
  };

  return (
    <div className="flex gap-1 text-xs">
      <button
        className=" px-4 rounded-md bg-indigo-100 text-indigo-700"
        onClick={handleAllFilterToggle}
      >
        All
      </button>
      {tagsList}
    </div>
  );
}

export default Tags;
