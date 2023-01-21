const generateSearchOptions = (theList) => {
  const searchingOptions = [];
  for (let index = 0; index < theList.length; index++) {
    const element = theList[index];
    const theListKeys = Object.keys(element);
    let string = "";
    for (let j = 0; j < theListKeys.length; j++) {
      const keyElement = theListKeys[j];
      string = string + element[keyElement];
    }
    searchingOptions.push({ id: element._id, value: string });
  }
  return searchingOptions;
};
function removeDuplicates(arr, n) {
  // Return, if array is empty
  // or contains a single element
  if (n === 0 || n === 1) return arr;

  var temp = new Array(n);

  // Start traversing elements
  var j = 0;
  for (var i = 0; i < n - 1; i++)
    // If current element is not equal
    // to next element then store that
    // current element
    if (arr[i]["_id"] !== arr[i + 1]["_id"]) temp[j++] = arr[i];

  // Store the last element as whether
  // it is unique or repeated, it hasn't
  // stored previously
  temp[j++] = arr[n - 1];

  // Modify original array
  for (var i = 0; i < j; i++) arr[i] = temp[i];

  const list = [];
  for (var i=0; i<j; i++){
    list.push(arr[i])
  }
  return list;
}

function removeDuplicatesWithFieldName(arr, n,filedName) {
  // Return, if array is empty
  // or contains a single element
  if (n === 0 || n === 1) return arr;

  var temp = new Array(n);

  // Start traversing elements
  var j = 0;
  for (var i = 0; i < n - 1; i++)
    // If current element is not equal
    // to next element then store that
    // current element
    if (arr[i][filedName] !== arr[i + 1][filedName]) temp[j++] = arr[i];

  // Store the last element as whether
  // it is unique or repeated, it hasn't
  // stored previously
  temp[j++] = arr[n - 1];

  // Modify original array
  for (var i = 0; i < j; i++) arr[i] = temp[i];

  const list = [];
  for (var i=0; i<j; i++){
    list.push(arr[i])
  }
  return list;
}
module.exports = {
  generateSearchOptions,
  removeDuplicates,
  removeDuplicatesWithFieldName
};
