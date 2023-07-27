import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck , faSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Card({title , done , id , jwtToken}){
   const data={title:'hi there!!!' , done : true};
   function handleEditClick(){
       
    axios.patch(`http://localhost:8080/edit/${id}`,data,{
        header:{
            Authorization : `Bearer ${jwtToken}`
        }
    })
    .catch(err=>{
        
    })
   }
   function handleDeleteClick(){
       if(jwtToken){

           axios.delete(`http://localhost:8080/delete/${id}`,
           {
               headers:{
                   Authorization : `Bearer ${jwtToken}`
               }
           }
           )
           .catch(err=>{
              
           })
       }
   }
   async function handleToggleTask (id) {
    try {
      await axios.put(`http://localhost:8080/update/${id}`);
    } catch (error) {
      
    }
  };
    return(
        <div className='container-card' key={id}>
        
        <h2>{title}</h2>
        <div className="editbutton">
            
        <button className='Card-Button' onClick={()=>{handleToggleTask(id)}}>{done? (<FontAwesomeIcon icon={faCheck} size='2x' />):( <FontAwesomeIcon icon={faSquare} size='2x' style={{ color: '#ffffff' }}/>)}</button>
        <button className='Card-Button' onClick={handleEditClick}><FontAwesomeIcon icon={faEdit} size='2x'  /></button>
        <button className='Card-Button' onClick={handleDeleteClick}><FontAwesomeIcon icon={faTrash} size='2x'  /></button>
        </div>
        </div>
    )
}


