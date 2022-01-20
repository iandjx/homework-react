import { Container, Row, Button } from "react-bootstrap";
import React from "react";
import './Homepage.css';

const Homepage = ({history}) => {
   
   return <div className ='main'>
       <Container>
           <Row>
               <div className='intro-text'>
                   <div>
                       <h1 className='title'>Welcome to GamerForum</h1>
                       <p className='subtitle'>Discuss what ever you want about Games.</p>
                    </div>
                    <div className="buttonContainer">
                        <a href="/login">
                            <Button id="LoginOpenDialogButton" size='lg' className="Homepagebutton">Login</Button>
                            </a>
                            <a href="/register">
                            <Button id="RegisterOpenDialogButton" size='lg' className="Homepagebutton" variant="outline-primary">Register</Button>
                            </a>
                    </div>
               </div>
           </Row>
       </Container>

   </div>
};

export default Homepage;