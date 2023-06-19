const myForm = document.querySelector('#my-form');

const nameInput = document.querySelector('#name');

const emailInput = document.querySelector('#email');
const itemList = document.getElementById('items');

myForm.addEventListener('submit', onSubmit);
itemList.addEventListener('click', removeItem);
  
function onSubmit(e){
    e.preventDefault();
    let myObj={
      name:nameInput.value,
      email:emailInput.value
    };
    myObj=JSON.stringify(myObj);
    e.preventDefault(); 
    localStorage.setItem(emailInput.value,myObj);
  
    // Create new li element
    var li = document.createElement('li');
    // Add class
    li.className = 'items';
    // Add text node with input value
    li.appendChild(document.createTextNode(nameInput.value));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(emailInput.value));
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
  function removeItem(e){
    if(e.target.classList.contains('delete')){
      var li = e.target.parentElement;
      localStorage.removeItem(li.firstChild.nextSibling.nextSibling.nodeValue);
      itemList.removeChild(li); 
    }
    if(e.target.classList.contains('edit')){
      var li = e.target.parentElement;
      emailInput.value=li.firstChild.nextSibling.nextSibling.nodeValue;
      nameInput.value=li.firstChild.nodeValue;
      localStorage.removeItem(li.firstChild.nextSibling.nextSibling.nodeValue);
      itemList.removeChild(li);
  }
}