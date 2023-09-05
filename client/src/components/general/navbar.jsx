import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';



export default function NavBar({jwtToken}){
    
    
    
   function handleProfileClick(){
       window.location='http://localhost:3000/profile'; 
   }
   

    function handleLogOut(e){
        localStorage.clear();
        e.preventPropogation();
    }
    
    return(
        <div className='navbar-container'>
            <div className='navbar-parts'>
                {
                   <div className='profile' onClick={handleProfileClick}><FontAwesomeIcon icon={faUser} size='1x'/></div>
                }   
                <Nav.Link href='/'><button className='navbar-button'><b>Home</b></button></Nav.Link>
                <Nav.Link href='/about'><button className='navbar-button'><b>About</b></button></Nav.Link>
                
            </div>
            { localStorage.getItem('name') &&  <h1 className='intro'>Hi {localStorage.getItem('name')}!</h1>}
            
            <div className='navbar-parts'>
            
                {jwtToken? 
                    
                        (
                         
                           <Nav.Link href='/'> <button className='navbar-button' onClick={handleLogOut}><b>Logout</b></button></Nav.Link>
                         
                        )
                    
                        :
                   
                        (
                            <>

                            <Nav.Link href='/login'><button className='navbar-button'><b>Login</b></button></Nav.Link>
                            <Nav.Link href='/Signup'><button className='navbar-button'><b>Signup</b></button></Nav.Link>
                          
                            </>
                        )
                    
                }
               
                   
            </div>
        </div>
    )
}