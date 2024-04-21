import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if(id === 'new') return
    let response = await fetch(`/api/note/${id}/`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    fetch(`/api/note/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let updateNote = async () => {
    fetch(`/api/note/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let handleSubmit = () => {
    if(id !== 'new' && note.body === ''){
      deleteNote()
    }else if (id !== 'new'){
      updateNote()

    }else if(id === 'new' && note !== null ){
      createNote()
    }
    navigate("/"); // Use navigate('/') instead of history.push('/')
  };

  let deleteNote = async () => {
    fetch(`/api/note/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    navigate("/");
  };

  let handleChange = (value) =>{
    setNote({...note, body:value})
  }

  return (
    <div className="note">
      <div className="note-header">
        <div className="action">
          <h3>
            <ArrowLeft onClick={handleSubmit} />
          </h3>
          {id !=='new' ?(
            <button onClick={deleteNote}>Delete</button>
          ):(

          <button onClick={handleSubmit} >Done</button>
          )}
        </div>
        <textarea
          onChange={(e) => {handleChange(e.target.value) }}
         value={note?.body}></textarea>
      </div>
    </div>
  );
};

export default NotePage;
