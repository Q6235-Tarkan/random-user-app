import axios from "axios"
import './App.css';
import { useState,useEffect } from "react";
import spinner from "../src/img/spinner.gif"

const url = "https://randomuser.me/api/";

function App() {
  const [showData, setShowData] = useState("name");
  const [spinners,setSpinners]=useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    picture: "",
    dob: "",
    location: "",
    phone: "",
    gender: "",
    login: "",
    id: "",
  });
  const {
    name,
    email,
    dob: { age },
    location: { city },
    phone,
    picture,
    gender,
    login: { username },
    id: { value },
  } = data;





  const getUser = async () => {
    // getUser her çağrıldığında resim altında isim bilgisi çıksın istiyorum
    setShowData("name");
    try {
      setSpinners(true);
      const response = await axios.get(url);
      // console.log(response.data.results)
      if (response.data.results.length > 0) {
        
        setData(response.data.results[0]);
        
        
      } else {
        setData(null);
      }
      setSpinners(false);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    setSpinners(true);
    getUser();
  
    
  }, []);
  
  function handleAddUser(){
   
    if(users.some((e)=>e.value===value)){
      alert("This user is already added!")

    }else{
      setUsers([
      ...users,
      { name: name, email: email, phone: phone, age: age, value: value },
    ]);}

    
  }
 


  return (
    <div className="App">
     <main>
      
      <div className="block">
        <div className="container">
          <img src={spinners ? spinner:picture.large} alt="random user" className="user-img" />

          {showData === "name" && (
            <>
              <p className="user-title">My name is </p>
              <p className="user-value">
                {name.first} {name.last}
              </p>
            </>
          )}

          {showData === "email" && (
            <>
              <p className="user-title">My email is </p>
              <p className="user-value"> {email}</p>
            </>
          )}
          {showData === "age" && (
            <>
              <p className="user-title">My age is </p>
              <p className="user-value"> {age}</p>
            </>
          )}
          {showData === "city" && (
            <>
              <p className="user-title">My city is </p>
              <p className="user-value"> {city}</p>
            </>
          )}
          {showData === "phone" && (
            <>
              <p className="user-title">My phone is </p>
              <p className="user-value"> {phone}</p>
            </>
          )}
          {showData === "username" && (
            <>
              <p className="user-title">My username is </p>
              <p className="user-value"> {username}</p>
            </>
          )}
          <div className="icons">
            <button className="icon" data-label="name" onMouseEnter={() =>setShowData("name")}>{gender==="female" ? "🙎‍♀️":"🙎‍♂️"}
            </button>

            <button className="icon" data-label="email" onMouseEnter={() =>setShowData("email")}>✉️
            
            </button>
            <button className="icon" data-label="age" onMouseEnter={() =>setShowData("age")}>👨‍👩‍👧‍👦
            </button>
            <button className="icon" data-label="city" onMouseEnter={() =>setShowData("city")}>🗺️
            </button>
            <button className="icon" data-label="phone" onMouseEnter={() =>setShowData("phone")}>☎️
            </button>
            <button className="icon" data-label="username" onMouseEnter={() =>setShowData("username")}>🔒
            </button>
          </div>
          <div className="butongrup">
            <button className="btn" type="button" onClick={getUser}>
              New User
            </button>
            <button className="btn" type="button" onClick={handleAddUser}>
              ➕Add User
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Name</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({name,age,phone,email,value})=>(
                <tr key={value} className="tr-body">
                  <td className="td">{name.first} {name.last}</td>
                  <td className="td">{email}</td>
                  <td className="td">{phone}</td>
                  <td className="td">{age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
    </main>
  
    
    </div>
  );
}

export default App;
