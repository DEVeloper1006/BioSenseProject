import React, {useEffect, useState} from "react";
import NavBar from "./components/navbar";
import Title from "./components/title"

export default function index(){

  const [message, setMessage] = useState("loading")
  const [people, setPeople] = useState([]);

  // This is a simple example of how to call the API and handle the response.
  // In practice you would want more error handling and type checking.
  /*
  useEffect(() => {
    fetch("http://localhost:8080/api/home")
    .then(response => response.json())
    .then(data => {
      //message = Loading
      //Once data retrieved, message = data.message
      setMessage(data.message)
      setPeople(data.people)
      console.log(data.people)
  })}, []);
  */

  return (
    <div>
      <NavBar />
      <Title />
    </div>
  )
}