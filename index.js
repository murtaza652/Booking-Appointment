const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const itemList = document.getElementById('items');

myForm.addEventListener('submit', onSubmit);
itemList.addEventListener('click', removeItem);
  
function onSubmit(e){
    e.preventDefault();
    axios.post('https://crudcrud.com/api/f9116f855ba4473983b31abc3faf5be4/bookings',{
      name:nameInput.value,
      email:emailInput.value,
      phone:phoneInput.value
    })
      .then(re=> console.log(re.data))
      .catch(e=> console.log(e))
    showOnscreen({name:nameInput.value,
      email:emailInput.value,
      phone:phoneInput.value})
  }  
function removeItem(e){
  if(e.target.classList.contains('delete')){
      var li = e.target.parentElement;
      itemList.removeChild(li); 
  }
  if(e.target.classList.contains('edit')){
      var li = e.target.parentElement;
      phoneInput.value = li.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nodeValue;
      emailInput.value=li.firstChild.nextSibling.nextSibling.nodeValue;
      nameInput.value=li.firstChild.nodeValue;
      itemList.removeChild(li);
  }
}
window.addEventListener('DOMContentLoaded',()=>{
  axios.get('https://crudcrud.com/api/f9116f855ba4473983b31abc3faf5be4/bookings')
    .then( res=> {
      for(var i=0; i<res.data.length; i++) { 
        showOnscreen(res.data[i]);
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
  editBtn.className="btn-sm float-right edit"
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