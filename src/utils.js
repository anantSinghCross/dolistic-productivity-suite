export function sanitizeTags(tagsString){
    return tagsString!==''? tagsString.split(',').map(tag => tag.trim().toLowerCase()) : [];
}