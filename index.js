const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const itemList = document.getElementById('items');

myForm.addEventListener('submit', onSubmit);
itemList.addEventListener('click', removeItem);

function onSubmit(e){
    e.preventDefault();
    const name=nameInput.value;
    const email=emailInput.value;
    const phone=phoneInput.value;
    var obj={
      name,
      email,
      phone
    }
    axios.post('http://localhost:3000/add-user',obj)
      .then(res=> {
        showOnscreen(res.data.newUserDetail)
      })
      .catch(e=> console.log(e))
  }  
function removeItem(e){
  if(e.target.classList.contains('delete')){
      var li = e.target.parentElement;
      axios.post('http://localhost:3000/delete',{id:e.target.id})
      .then(res=> {
        console.log(res);
      })
      .catch(e=> console.log(e))
      itemList.removeChild(li);
  }
  if(e.target.classList.contains('edit')){
      var li = e.target.parentElement;
      phoneInput.value = li.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nodeValue;
      emailInput.value=li.firstChild.nextSibling.nextSibling.nodeValue;
      nameInput.value=li.firstChild.nodeValue;
      axios.post('http://localhost:3000/delete',{id:e.target.id})
      .then(res=> {
        console.log(res);
      })
      .catch(e=> console.log(e))
      itemList.removeChild(li);
  }
}
window.addEventListener('DOMContentLoaded',()=>{
  axios.get('http://localhost:3000/add-user')
    .then( res=> {
      console.log(res.data.user);
      for(var i=0; i<res.data.user.length; i++) { 
        showOnscreen(res.data.user[i]);
    }})

})
function showOnscreen(user)
{
  // Create new li element
  var li = document.createElement('li');
  // Add class
  li.className = 'items';
  // Add text node with input value
  li.appendChild(document.createTextNode(user.name));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(user.email));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(user.phone));
  li.appendChild(document.createTextNode(" "));
  // Create del button element
  var deleteBtn = document.createElement('button');
  var editBtn= document.createElement('button');
  // Add classes to del button
  deleteBtn.className = 'btn-sm float-right delete';
  deleteBtn.id=user.id;
  editBtn.className="btn-sm float-right edit"
  editBtn.id=user.id;
  // Append text node
  deleteBtn.appendChild(document.createTextNode('delete'));
  editBtn.appendChild(document.createTextNode('edit'));  
  // Append button to li
  li.appendChild(deleteBtn);
  li.appendChild(document.createTextNode(" "));
  li.appendChild(editBtn);
  // Append li to list
  itemList.appendChild(li);
}