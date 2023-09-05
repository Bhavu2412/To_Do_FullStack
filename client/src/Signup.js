
import axios from 'axios';
import React,{ useState } from 'react';
import { FaFacebook, FaGoogle , FaApple , FaPhone } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import Popup from './components/Popup';
export default function Signup(){
    const navigate = useNavigate();
    const [show, setShow] =useState({succ : false , err : false});
    const [res, setRes] = useState({succ : '' , err : ''});
    const [data,setData] = useState({email: '' , password : '' , username : '' , date : '' , name:''});
    function handleInputChange(e){
        const {name , value } = e.target;
        setData({...data , [name]:value});
    }
    function handleClick(){
        navigate('/login');
    }
    
    function handleSubmit(e){
        e.preventDefault();
        sendData(data);
    }
    function sendData(d){
       
            axios.post('https://todo-list-ywe3.onrender.com/signup', data)
            .then(resp=>{
                setRes({...res , succ : resp.data.message});
                setShow({...show , succ : true});
                setTimeout(()=>{
                    window.location='https://64f73671a87728009135de31--spontaneous-tiramisu-fca227.netlify.app/Signup/login';
                },3000)
            })
            .catch(err=>{
               
                setRes({...res , err : err.response.data.message});
                setShow({...show , err : true});
            })
    }
    return (
        <>
        <div className="container-signup">
                <h1 id="head"><b>Signup to ToDo</b></h1>
                <br/>
                <hr width='90%'/>
            <div className='mainClass'>
            <div className='cont-1'>
                <br/>
                <p id="google" className="signin"><big><b>Continue with Google</b> </big><FaGoogle size={30}  /></p>
                <p id="facebook" className="signin"><big><b>Continue with Facebook</b> </big><FaFacebook size={30}  /></p>
                <p id="apple" className="signin"><big><b>Continue with Apple</b> </big><FaApple size={30}  /></p>
                <p id="number" className="signin"><big> <b>Continue with Number</b></big><FaPhone size={30}  /></p>
                <br/>
                
                <br/>
            </div>
            <div className="login" id="login">
                <form onSubmit={handleSubmit}>
                <p id="email"> <b>What's your Email address?</b></p>
                
                <input id="inpemail" type="email" value={data.email} name="email" onChange={handleInputChange}/>
                <p id="email"> <b>What's should we call you?</b></p>
                <input id="inpemail" type="text" value={data.name} name="name" onChange={handleInputChange}/>
                <p id="username"><b>Give a unique username to yourself</b></p>
                <input id="inpemail" type="text" value={data.username} name="username" onChange={handleInputChange}/>
                <p id="pass"> <b>Create a Password</b></p>
                <input id="inppass" type="password" value={data.password} name="password" onChange={handleInputChange}/>
                <p id="dob"> <b>Enter your date of birth</b></p>
                <input type="date" id="day" name="day" value={data.date} onChange={handleInputChange}/>   
                <button type="submit" id="submit"><b>Signup</b></button>
                </form>
                <br/>
                <br/>
            </div>
            <br/>

            </div>
            <hr width="70%" />
            <div className="signup">
                <p id="don"><b>Have an account? </b></p>
                <p id="signup" onClick={handleClick}><b>Login</b></p>
            </div>
                </div>
            {
                show.succ && <Popup title={res.succ} show={show} setShow={setShow}/>
            }
            {
                show.err && <Popup title={res.err} show={show} setShow={setShow}/>
            }
        </>
    );
}
