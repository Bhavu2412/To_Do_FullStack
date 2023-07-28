import React from 'react';
import Nav from 'react-bootstrap/Nav';
export default function NavBar({jwtToken}){
    
    function handleLogOut(e){
        localStorage.removeItem('token');
        e.preventPropogation();
    }
    return(
        <div className='navbar-container'>
            <div className='navbar-parts'>
                
                <Nav.Link href='/'><button className='navbar-button'><b>Home</b></button></Nav.Link>
                <Nav.Link href='/about'><button className='navbar-button'><b>About</b></button></Nav.Link>
                
            </div>
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