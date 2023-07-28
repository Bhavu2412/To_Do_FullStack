import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Popup from './Popup';
export default function Form({jwtToken}){
    const [show , setShow] = useState(false);
    const [data,setData] = useState({title:'', done:false});
    function handleChange(e){
        const {name , value} = e.target;
        setData({...data , [name]:value})
    }
    function handleSubmit(e){
        e.preventDefault();
        sendData(data);
        if(!jwtToken){
            setShow(true);
        }
    }
    const sendData=()=>{
        if(jwtToken){
                axios.post('https://todo-list-ywe3.onrender.com/create',data,
                {
                    headers:{
                        Authorization : `Bearer ${jwtToken}`
                    }
                }
                )
                .then(res=>{
                    
                    setData({title:'',done : false})
                })
                .catch(err=>{
                    
                })
        }
    }
    return (
        <>
        <form className='form'  onSubmit={handleSubmit}>
            
        <input className='input-searchForm' placeholder='Enter Tasks...'  value={data.title} name="title" onChange={handleChange}/>
        <button className='button-form' type='submit' ><b>Submit</b></button>
        </form>
        {
            show && <Popup title={'No user found.'} message={' Login first !!!'} setShow={setShow} show={show}/> 
        }
        </>
        
    )
}