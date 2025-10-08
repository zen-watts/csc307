// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";



function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );
    
    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    function postUser(person) {
      return fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person),
      }).then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        return Promise.reject(new Error(`Expected 201, got ${res.status}`));
      });
    }

    function deleteUser(id) {
      return fetch(`http://localhost:8000/users/${encodeURIComponent(id)}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.status === 204) {
          return true;
        }
        if (res.status === 404) {
          return Promise.reject(new Error("Not found"));
        }
        return Promise.reject(new Error(`Expected 204, got ${res.status}`));
      });
    }

    function removeOneCharacter(index) {
      const id = characters[index]?.id;

      deleteUser(id).then(() => {
        const updated = characters.filter((c) => {
          return c.id !== id;
        });
      setCharacters(updated);
      })
      .catch((error) => {
        console.error(err);
      });
    }

    function updateList(person) { 
      postUser(person)
        .then((newUser) => {
          setCharacters((prev) => prev.concat(newUser));
        })
        .catch((error) => {
          console.log(error);
        });
    }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}



export default MyApp;