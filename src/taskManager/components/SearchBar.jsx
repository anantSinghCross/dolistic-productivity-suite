import React from "react";

function SearchBar({ controls }) {
  const { searchText, setSearchText } = controls;
  return (
    <div className="flex">
      <input
        className="w-full mt-2 shadow-inner border outline-indigo-500 rounded-lg p-2"
        type="text"
        placeholder="🔎 Search your tasks..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
