import React from 'react'
import { Container, } from 'semantic-ui-react';
import {Footer} from "../../components/Web"
import "./ClientLayout.scss"


export function ClientLayout(props) {
    const {children} = props;
  return (
    <div className='client-layout'>
       <div className='client-layout__header'>
        
       </div>
       {children}

       <div className='client-layout__footer'>
        <Container>
          <Footer.Info/>         
        </Container>
        <Container>
        <span>
              TODOS LOS DERECHOS RESERVADOS  © 
            </span>

            
        </Container>
       </div>
    </div>
  )
}
