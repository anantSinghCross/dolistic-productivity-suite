import React from "react";

function SearchBar({ controls }) {
  const { searchText, setSearchText } = controls;
  return (
    <div className="flex">
      <input
        className=" w-full mr-2 ml-2 mt-3 border-2 outline-indigo-600 border-indigo-200 rounded-lg p-2"
        type="text"
        placeholder="🔎 Search your tasks..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
