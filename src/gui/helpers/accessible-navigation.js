export const traverseElement = (parent, element, location) => {
  //TODO conditional for navTypes/actions only
  let navType = ( () => {
    switch(true){
      case(element.classList.contains("horizantal-navigation-menu")):
        return "row"
        break;
      case(element.classList.contains("vertical-navigation-menu")):
        return "column"
      case(element.tagName == "BUTTON"):
        return "button"
      case(element.tagName == "A"):
        return "link"
      case(element.type == "checkbox"):
        return "checkbox"
      case(element.type == "range"):
        return "range"
      case(element.type == "text"):
        return "text"
      default:
        return false
    }
  })();

  let flowType = ( () => {
    switch(true){
      case(parent.classList.contains("horizantal-navigation-menu")):
        return "row"
        break;
      case(parent.classList.contains("vertical-navigation-menu")):
        return "column"
      default:
        return "invalid flow type."
    }
  })();

  let fillerNode = {
    flowType : flowType,
    navType : navType,
    element : element,
    location :location,
    children: []
  }
  

  if(element.children){
    let childIndex = 0;
    if(navType){
      for(let child of Array.from(element.children)){
        if(traverseElement(element,child,location.concat(childIndex))){
          fillerNode.children.push( traverseElement(element, child,location.concat(childIndex)))
          childIndex++;
        } 
          
        }
      }
  }
  else{
    //return element class type and start to build object

    //fill in the objects children
    for(let child in element.children){
      
    }
  }
  if (!navType){

    return false;
  }
  return fillerNode;
}

export const findValidActionsIntree = (validList, tree) => {
  //takes an object that represents the dom, and finds the first child that is an action type, (button or input)

  if(tree.children.length > 0){
    for(let child of tree.children){
      findValidActionsIntree(validList, child)
    }
  }
  else if(tree.navType === "button"
  || tree.navType === "checkbox"
  || tree.navType === "range"
  || tree.navType === "text"
  || tree.navType === "link"){ 
    validList.push(tree.location);
  }
  return validList;
}

export const arrayIncludesArray = (arr1, arr2) => {

    return convertMultiDimArrayToStringArray(arr1).includes(arr2.toString())
}

export function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

export function startsWithArray(arr1, arr2) {
  if (arr2.length > arr1.length) {
    return false;
  }
  
  for (let i = 0; i < arr2.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  
  return true;
}


export const findObjectWithLocation = (validObjects,location,tree) => {
  if(tree.children.length > 0){
    for(let child of tree.children){
      findObjectWithLocation(validObjects, location, child)
    }
  }
  // console.log(JSON.stringify(tree.location), JSON.stringify(location)  , "cringe", tree)
  if(JSON.stringify(tree.location) === JSON.stringify(location) ){
    validObjects.push(tree);
  }
  return validObjects[0];
}
export const convertMultiDimArrayToStringArray = (arr) => {
  return arr.toString();
} 

export const findClosestSibling = (validList,location,direction) => {

        //need to find our parents next valid sibling

        //this is done by taking our current index, and taking the next highest one that DOESN't Begin with our current level wich is simply location.slice(0,-1)
        
        //Do this one better by explicitly searching for the level that is our level + direction, and finding the lowest index in that bunch
  let siblingToSearch;
  let currentLevel = location
  siblingToSearch = [...currentLevel];
  siblingToSearch[currentLevel.length-1] +=direction
  let listToSearch;
  // if our direction is negative, we will flip the list THEN find the closes match
  if(direction < 0){
    listToSearch = [...validList].reverse();
  }
  else{
    listToSearch = [...validList]
  }

  let nextLocationIndex = listToSearch.findIndex(possibleLocation => {
    return (startsWithArray(possibleLocation,siblingToSearch))})
    //note: may need to use the same recursive fix as used in find closest cousin...
  return(listToSearch[nextLocationIndex]);
}

export const findClosestRelative = (validList,location,direction) => {


        //need to find our parents next valid sibling

        //this is done by taking our current index, and taking the next highest one that DOESN't Begin with our current level wich is simply location.slice(0,-1)
        
        //Do this one better by explicitly searching for the level that is our level + direction, and finding the lowest index in that bunch
  let parentToSearch;
  let currentLevel = location
  parentToSearch = [...currentLevel].slice(0,-1);
  parentToSearch[parentToSearch.length-1] +=direction
  let listToSearch;
  // if our direction is negative, we will flip the list THEN find the closes match
  if(direction > 0){
    listToSearch = [...validList].reverse();
  }
  else{
    listToSearch = [...validList]
  }

  let nextLocationIndex = listToSearch.findIndex(possibleLocation => {
    return (startsWithArray(possibleLocation,parentToSearch))})


  if(nextLocationIndex == -1){
    return findClosestRelative(validList,parentToSearch, direction )
  }

  return(listToSearch[nextLocationIndex]);
}