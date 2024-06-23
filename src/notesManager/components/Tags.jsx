import React from "react";

function Tags({
  tags /**contains all tags */,
  tagFilter /**only the tags applied in filter */,
  toggleTagFilter,
}) {
  const tagsList = tags.map((tag) => (
    <span
      key={tag}
      onClick={() => toggleTagFilter(tag)}
      className={`p-2 px-3 rounded-md self-center  ${
        tagFilter.includes(tag) ? "bg-indigo-500 text-white shadow-inner " : "bg-slate-100"
      } `}
    >
      {`${tag[0].toUpperCase()}${tag.slice(1)}`}
    </span>
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
    <div className="flex gap-1 text-xs flex-wrap">
      <span
        className=" p-2 px-4 rounded-md self-center bg-indigo-100 text-indigo-700"
        onClick={handleAllFilterToggle}
      >
        All
      </span>
      {tagsList}
    </div>
  );
}

export default Tags;
