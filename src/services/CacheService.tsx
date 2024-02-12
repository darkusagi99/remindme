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

export function loadFromCache(collection_name_local : string) {

    const res= [];

    for(let i = 0; i < localStorage.length; i++) {
        let currentKey = localStorage.key(i);
        if (currentKey != null && currentKey.startsWith(collection_name_local)) {
            let tmpItem = localStorage.getItem(currentKey);
            if (tmpItem != null) {
                res.push(JSON.parse(tmpItem));
            }
        }
    }

    return res;
}