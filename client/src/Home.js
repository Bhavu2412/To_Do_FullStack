import Form from './components/searchForm';
import Card from './components/Cards';
import { useEffect,useState } from 'react';
import axios from 'axios';
export default function Home({ jwtToken }) {
  const [Tasks,setTasks] = useState([]);
  useEffect(()=>{
    
    if(jwtToken){
        axios.get('https://todo-list-ywe3.onrender.com/home',{
      headers:{
        Authorization: `Bearer ${jwtToken}`
      }
      })
      .then(res=>{
        setTasks(res.data.tasks);
        
      })
      .catch(err=>{
        
      })
    }
    
  },[Tasks , jwtToken])
  
  return (
    <>
      
      <Form jwtToken={jwtToken}/>
      {
        Tasks.map(task => {
            return <Card title={task.title} jwtToken={jwtToken} done={task.done} id={task._id} />
          })
      }
    </>
  )

}