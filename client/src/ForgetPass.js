import React,{ useState } from 'react';
import axios from 'axios';
import Popup from './components/Popup';

export default function Forgetpass(){
    const [count , setCount] = useState(0);
    const [err, setErr] = useState(false);
    const [err2, setErr2] = useState(false);
    const [verify,setVerify] = useState(false);
    const [newpass , setNewPass] = useState({pass:'' , passaga:''})
    const [showOtp,setShowOtp] = useState(false);
    const [otp,setOtp] = useState('');
    const [email,setEmail] = useState('');
    const [show, setShow] =useState({succ : false , err : false});
    const [res, setRes] = useState({succ : '' , err : ''});
    function handlePassClick(){
        if((newpass.pass).length <=5 ){
            setErr2(true);
            
        }
        else if(newpass.pass !== newpass.passaga){
           setErr(true);
           setNewPass({pass:'' , passaga:''});
        }
        else{
            sendDatapass(newpass.pass , email);
            
        }
    }

    function handleOTPClick(){
        sendDataotp(otp , email);
    }

    function handleOtpChange(e){
        setOtp(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        sendData(email);
    }

    function handleChange(e){
        setEmail(e.target.value);
    }


    function sendData(email){
        axios.post('https://todo-list-ywe3.onrender.com/forgetpassword' ,{email : email})
        .then(res=>{
            setShowOtp(true);
            setShow({...show , succ : true});
            setRes({...res , succ :res.data.message});
            setCount(n=> n+1);
        })
        .catch(err=>{
            setShow({...show , err : true});
            setRes({...res , err : err.response.data.message});
        })
    }

    function sendDatapass(n , e){
        axios.post('https://todo-list-ywe3.onrender.com/reset',{email : e , password : n})
        .then(res=>{
            
            setCount(n=> n+1);
            setShow({...show , succ : true});
            setRes({...res , succ :res.data.message});
            setTimeout(()=>{
                window.location='https://radiant-sable-3c911a.netlify.app/login';
            },3000)
        })
        .catch(err=>{
            
            setShow({...show , err : true});
            setRes({...res , err : err.response.data.message});
        })
    }

    function sendDataotp(o , e){
        axios.post('https://todo-list-ywe3.onrender.com/otpverify',{otp : o , email : e})
        .then(res=>{
           setVerify(true);
            setCount(n=> n+1);
            setShow({...show , succ : true});
            setRes({...res , succ :res.data.message});
        })
        .catch(err=>{
            
            setShow({...show , err : true});
            setRes({...res , err : err.response.data.message});
        })
    }
    return(
        <>
        <div className='container-forgetpass'>
            <form onSubmit={handleSubmit}>
                <p className='p-forgetpass'><b>Enter your email</b></p>
                <input type="email" className='input-forgetpass' name="email" value={email} onChange={handleChange}/>
                
                {
                    (count===0) && <button type='submit' className='button-form'><b>Submit</b></button>
                }
            
            </form>
            
            {
               showOtp && (
                   <>
                    <b className='p-forgetpass'>Enter OTP </b>

                    <div className='password-input'>

                        <input type='text' className='otp-input' name='otp' value={otp} onChange={handleOtpChange}/>
                        <br/>
                        {
                            (count===1) && <button type='submit' className='button-form' onClick={handleOTPClick}><b>Submit</b></button>
                        }
                    
                    </div>
                   </>
               ) 
            }
            {
                verify && (
                    <>
                        <div className='password-input'>
                            <div className='input-forget'>
                                <b className='p-new'>Enter new password</b>
                                <input type='password' name='password' value={newpass.pass} onChange={(e)=>{setNewPass({...newpass , pass:e.target.value})}} className='otp-input2'/>
                            </div>
                            <div className='input-forget'>
                                <b className='p-new'>Enter new password again</b>
                                <input type='text' name='againpassword' value={newpass.passaga} onChange={(e)=>{setNewPass({...newpass , passaga:e.target.value})}} className='otp-input2'/>  
                            </div>
                            <br/>
                        </div>
                        <button type='submit' className='button-form' onClick={handlePassClick}><b>Submit</b></button>
                    </>
                )
            }
            

        </div>
            {
                show.succ && <Popup title={res.succ} show={show} setShow={setShow}/>
                
            }
            {
                show.err && <Popup title={res.err} show={show} setShow={setShow}/>
            }
            {
                err && <Popup title={'Password donot match'} message={'please chek your password again'} show={err} setShow={setErr}/>
            }
            {
                err2 && <Popup title={'Password is of length less then 5'} message={'please chek your password again'} show={err2} setShow={setErr2}/>
            }
        </>
    )
}
