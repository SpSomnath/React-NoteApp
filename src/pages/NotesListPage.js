import React ,{useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

function NotesListPage() {

    let [notes, setNotes] = useState([])

    useEffect(()=>{
        gettNotes()

    },[])

    let gettNotes = async ()=> {
       let response = await fetch('/api/notes/')
       let data = await  response.json()
       setNotes(data)
    }

  return (
    <div className='notes'>
      <div className='notes-header'>
          <h2 className='notes-title'>&#9782; Notes</h2>
          <p className='notes-count'>{notes.length}</p>
      </div>
        <div className='notes-list'>
            {notes.map((note, index) => (
                // {console.log('data: ', note.body)}
               <ListItem key={index} note={note}/>
            ))}
            
        </div>
        <AddButton/>
    </div>
  )
}

export default NotesListPage