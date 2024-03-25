export function sanitizeTags(tagsString){
    return tagsString!==''? tagsString.split(',').map(tag => tag.trim().toLowerCase()) : [];
}

export function filterArray(arr, filterObject) {
    const { priority/*array*/, completed/*boolean*/, tags/*array*/ } = filterObject;
    return arr.filter(item => {
        return (
            // priority check, tags check, completed check
            (checkPriority(item, priority)) && (checkCompleted(item, completed)) && (checkTags(item, tags))
        )
    })
}

function checkPriority(item, priorityToCheck){
    if(!priorityToCheck || priorityToCheck.length === 0){
        return true;
    }
    return priorityToCheck.includes(item.priority);
}

function checkCompleted(item, completedToCheck){
    if(completedToCheck === null){
        return true;
    }
    return completedToCheck === item.completed;
}

function checkTags(item, tagsToCheck){
    if(!tagsToCheck || tagsToCheck.length === 0){
        return true;
    }
    return tagsToCheck.some(tag => item.tags.includes(tag));
}

function sortSelector(key){
    if (key === null) {
        return () => 0;
    } else if (key === 'priority') {
        return (a, b) => b.priority - a.priority;
    } else if (key === 'completeBy') {
        // compare dates
    }
}