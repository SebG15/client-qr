import React from 'react'
import { Container,Button,Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import "./Banner.scss"

export  function Banner() {
  return (
    <div className='banner'>
        <Button  color="yellow" as={Link} to ="/admin"  >
              <Icon name='sign-in'/>
                Entrar

            </Button>
        <Container>
        <h1>
            QrTaxi es una aplicación para tu seguridad.
            </h1>    
            <h2>Con QrTaxi puedes estar más seguro.</h2>
           
        </Container>    
        
        
        

       
        

       
        
    </div>
  )
}
