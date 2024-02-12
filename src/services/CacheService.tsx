export function saveInCache(noteList : any, collection_name_local : string) {

    console.log("Save in cache");
    for(let currentNote of noteList) {

        console.log("Save in cache - Current");
        localStorage.setItem(collection_name_local + currentNote.id, JSON.stringify(currentNote));
    }
}

export function removeFromCache(keyId : string) {
    localStorage.removeItem(keyId);
}

export function addInCache(keyId : string, element : any) {
    localStorage.setItem(keyId, JSON.stringify(element));

}

export function getInCache(keyId : string) {
    return localStorage.getItem(keyId) ?? "";
}