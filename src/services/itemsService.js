export const addItemToServer = async (task,date) => { 
  const response = await fetch('http://localhost:3000/api/todo', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({task,date})


  })
  const data = await response.json();
  return mapServerItemstoLocalItems(data);
}

const mapServerItemstoLocalItems= (serverItem)=>{
  return{
   id: serverItem._id, 
   itemName: serverItem.task,
   itemDueDate: serverItem.date,
   completed: serverItem.completed,
   createdAt: serverItem.createdAt,
   updatedAt: serverItem.updatedAt
  } 
}

export const getItemFromServer= async ()=>{
  const response = await fetch('http://localhost:3000/api/todo')
  const data = await response.json();
  return data.map(mapServerItemstoLocalItems); 
}

export const markItemAsCompletedOnServer = async (itemId)=>{
  const response = await fetch (`http://localhost:3000/api/todo/${itemId}/completed`,{
    method: 'PUT'
  });
  const data = await response.json();
  return mapServerItemstoLocalItems(data);
}

export const deleteItemFromServer = async (itemId)=>{
  const response = await fetch(`http://localhost:3000/api/todo/${itemId}`,{
    method: 'DELETE'
  }); 
   const item= await response.json();
    console.log("Deleted Item:", item._id);
   return item.id;
  }