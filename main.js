let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');


form.addEventListener('submit' , (e)=>{
    e.preventDefault(); //to prevent default behavior when refreshing
    formValidation();//call each time click Add
});

let formValidation = ()=>{
    if(textInput.value === ""){
       console.log('failure');
       msg.innerHTML ="Task cannot be blank";
    }
    else{
       console.log('success');
       msg.innerHTML ="";
       acceptData();
       add.setAttribute("data-bs-dismiss" , "modal")      //set attribute and a value
       //(attribute , value) => notice what happend in the console 
       add.click();//simulate a button
       //IIFE =>immediately invoked function expression
       // run once => here when success
       (()=>{
        add.setAttribute("data-bs-dismiss" , "")      //set attribute and a value

       })()
    }
};
//empty object to collect and accept data
let data=[];
//convert the object into array inorder to Local store it
//[{},{},{}]
let acceptData = ()=>{
    data.push({
        text: textInput.value,
        date:  dateInput.value,
        description:textarea.value,
    });
    // data['text'] = textInput.value;
    // data['date'] = dateInput.value;
    // data['description']=textarea.value;

    //store data locally
    localStorage.setItem("data" , JSON.stringify(data))//key , value => to see it as a string
    //localStorage.getItem -> retrieve data

    console.log(data);
    creatTasks();//trigger it here
};
//update on screen
let creatTasks = ()=>{
    tasks.innerHTML="";//in order to clear the previous one
     data.map((x,y)=>{
        return  tasks.innerHTML+=`
        <div id=${y}> 
                  <span class="fw-bold">${x.text}</span> <!--font weight bold -->
                  <span class="small text-secondary">${x.date}</span>
                  <p>${x.description}</p>
                  <span class="options">
                      <img onClick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" src="images/edit-removebg-preview.png" height="15px" width="15px">
                      <img onClick = "deleteTask(this);creatTasks()" src="images/trash-removebg-preview.png" height="15px" width="15px">
                  </span>
              </div>
        `;
     }) //x target all objects 0 ,1,2,3,4,5 ycount the index number and replace all data with x
     //+= to add to them
     
resetForm();//trigger it here 
};

let deleteTask = (e)=>{
   e.parentElement.parentElement.remove();//two levels up
   data.splice(e.parentElement.parentElement.id, 1)//what to remove and how many times
   localStorage.setItem("data" , JSON.stringify(data))//key , value => to see it as a string and to update local storage
   console.log(data);
  // console.log( e.parentElement.parentElement.id);//get the task number from y(index)=> make it as an id
};

let editTask = (e)=>{
    // I want the data to go to the form to edit them and delete the previous
   // e.parentElement.parentElement.remove();//remove it and bring back the form
   let selectedTask = e.parentElement.parentElement;//here the parent and have 3 childs
   textInput.value=selectedTask.children[0].innerHTML;//represent the first child
   dateInput.value=selectedTask.children[1].innerHTML;
   textarea.value=selectedTask.children[2].innerHTML;
   deleteTask(e);
   //selectedTask.remove();//removed the parent
};




// I want the form to get reset
let resetForm = ()=>{
      textInput.value="";
      dateInput.value="";
      textarea.value="";
};
//get all the data from the local storage and push it into data
//and show them as cards
(()=>{
  data = JSON.parse(localStorage.getItem("data")) || []; // to avoid null while mapping
  console.log(data);
  creatTasks();

})();

