import {useEffect, useState} from "react";
import axios from "axios";
import "./App.css";


const API = "http://localhost:8080/students";


function App(){

const [students,setStudents] = useState([]);

const [student,setStudent] = useState({
    name:"",
    email:""
});

const [message,setMessage] = useState("");
const [showPopup,setShowPopup] = useState(false);

const [showConfirm,setShowConfirm] = useState(false);
const [deleteId,setDeleteId] = useState(null);


const [editId,setEditId] = useState(null);
const [error,setError] = useState("");




const loadStudents = async()=>{

    const response = await axios.get(API);

    setStudents(response.data);

}



useEffect(()=>{

    loadStudents();

},[]);



const saveStudent = async(e)=>{

    e.preventDefault();


    if(!student.name.trim()){

        showMessage("Name is required");
        return;
    }


    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(!emailRegex.test(student.email)){

        showMessage("Please enter a valid email");

        return;
    }


    if(editId){

        await axios.put(
            `${API}/${editId}`,
            student
        );

        setEditId(null);

    }
    else{

        await axios.post(
            API,
            student
        );

    }


    showMessage(
			editId 
			? "Student updated successfully"
			: "Student created successfully"
		);


    setStudent({
        name:"",
        email:""
    });


    loadStudents();

}


const editStudent=(s)=>{

    setEditId(s.id);

    setStudent({
        name:s.name,
        email:s.email
    });

}

const showMessage = (msg)=>{

    setMessage(msg);
    setShowPopup(true);


    setTimeout(()=>{
        setShowPopup(false);
    },2500);

}



const deleteStudent = (id)=>{

    setDeleteId(id);
    setShowConfirm(true);

}

const confirmDelete = async()=>{


    await axios.delete(
        `${API}/${deleteId}`
    );


    showMessage("Student deleted successfully");


    setShowConfirm(false);

    setDeleteId(null);


    loadStudents();

}



return (

<div className="container">


<h1>Student CRUD</h1>


<form onSubmit={saveStudent}>

	{
		error && 
		<p className="error">
			{error}
		</p>
    }


	<input

		placeholder="Name"

		value={student.name}

		onChange={
		e=>setStudent({
		...student,
		name:e.target.value
		})
		}

	/>

	<input

		placeholder="Email"

		value={student.email}

		onChange={
		e=>setStudent({
		...student,
		email:e.target.value
		})
		}

	/>


	<button type="submit">
		{
		editId ? "Update" : "Create"
		}
	</button>


</form>



<table>

<thead>

<tr>

<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Action</th>

</tr>

</thead>


<tbody>


{
students.map(s=>(

<tr key={s.id}>

<td>{s.id}</td>

<td>{s.name}</td>

<td>{s.email}</td>


<td>

<button
onClick={()=>editStudent(s)}
>
Edit
</button>


<button
className="delete"
onClick={()=>deleteStudent(s.id)}
>
Delete
</button>


</td>


</tr>


))

}


</tbody>

</table>

{
showPopup &&

<div className="popup">

    <div className="popup-box">

        <span>✓</span>

        <p>{message}</p>

    </div>

</div>

}

{
showConfirm &&

<div className="modal-bg">

    <div className="confirm-box">


        <p>
        Are you sure you want to delete this student?
        </p>


        <div className="actions">


        <button
        className="cancel"
        onClick={()=>{
            setShowConfirm(false)
        }}
        >
        Cancel
        </button>


        <button
        className="delete"
        onClick={confirmDelete}
        >
        Delete
        </button>


        </div>


    </div>

</div>

}


</div>


)


}


export default App;
