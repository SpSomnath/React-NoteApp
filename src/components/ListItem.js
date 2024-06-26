import React from 'react'
import { Link } from 'react-router-dom'


let getTime = (note)=>{
  return new Date(note.created).toLocaleDateString()
}

let getTitle = (note ) =>{
  let title = note.body.split('\n')[0]
  console.log('note title:', title)
  if (title.length  > 45){
    console.log("title: ", title)
    return title.slice(0, 45)
  }
  else {
    return title 
  }

}

let getContent = (note )=>{
  let title = getTitle(note)
  let content = note.body.replaceAll('\n', ' ')
  content = content.replaceAll(title, '')

  if (content.length > 45 ){
    
    return content.slice(0,45) + ' ...'
    }else{
    return content
  }
}

const ListItem = ({note}) => {
  return (
    <div>
      <Link to={`/note/${note.id}`} >
        <div className='notes-list-item'>
        <h3>{getTitle(note)} </h3>
        <p><span>{getTime(note)}</span>{getContent(note)}</p>

        </div>
      </Link>
    </div>
  )
}

export default ListItem