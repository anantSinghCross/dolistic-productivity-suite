export function sanitizeTags(tagsString) {
  return tagsString !== "" ? tagsString.split(",").map((tag) => tag.trim().toLowerCase()) : [];
}

export function filterArray(arr, filterObject, searchText) {
  const { priority /*array*/, completed /*array*/, tags /*array*/ } = filterObject;

  return arr
    .filter((item) => item.todo.toLowerCase().includes(searchText.toLowerCase())) // true even when the substring is of length 0 i.e ''.
    .filter((item) => {
      return (
        // priority check, tags check, completed check
        checkPriority(item, priority) && checkCompleted(item, completed) && checkTags(item, tags)
      );
    });
}

function checkPriority(item, priorityToCheck) {
  if (!priorityToCheck || priorityToCheck.length === 0) {
    return true;
  }
  return priorityToCheck.includes(item.priority);
}

function checkCompleted(item, completedToCheck) {
  if (!completedToCheck || completedToCheck.length === 0) {
    return true;
  }
  return completedToCheck.includes(item.completed);
}

function checkTags(item, tagsToCheck) {
  if (!tagsToCheck || tagsToCheck.length === 0) {
    return true;
  }
  return tagsToCheck.some((tag) => item.tags.includes(tag));
}

export function sortSelector(key) {
  if (key === 2) {
    return () => 0;
  } else if (key === 0) {
    return (a, b) => b.priority - a.priority;
  } else if (key === 1) {
    return (a, b) => {
      return new Date(a.completeBy) - new Date(b.completeBy);
    };
  }
}

export function getUniqueTags(arr) {
  let uniqueTags = new Set();
  arr.forEach((item) => {
    item.tags.forEach((tag) => uniqueTags.add(tag));
  });
  return Array.from(uniqueTags);
}

export function debounced(fn, delay = 250) {
  let timeoutId = null;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function calculateProgress(checklist){
  if(!checklist || checklist.length === 0) {
    return {
      checkedItems: 0,
      totalItems: 0,
      progress: 0,
    }
  }
  const checked = checklist.reduce((accum, item) => {
    if (item.completed) {
      accum += 1;
    }
    return accum;
  }, 0);
  const totalItems = checklist.length;
  const progress = Math.ceil((checked / totalItems) * 100);
  return {
    checkedItems: checked,
    totalItems,
    progress,
  }
} 