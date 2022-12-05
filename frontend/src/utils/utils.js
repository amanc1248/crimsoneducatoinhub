export const generateSearchOptions =(theList)=>{
    const searchingOptions = [];
    for (let index = 0; index < theList.length; index++) {
        const element = theList[index];
        const theListKeys = Object.keys(element);
        console.log(theListKeys)
        let string='';
        for(let j=0; j<theListKeys.length; j++) {
            const keyElement = theListKeys[j];
            string  = string + element[keyElement];
        }
        searchingOptions.push({id:element._id, value:string});
    }
    console.log(searchingOptions);
    return searchingOptions;
}