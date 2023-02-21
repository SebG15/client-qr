import React,{useState, useEffect} from 'react'
import { Container,Loader,Table,Icon,Image } from 'semantic-ui-react';
import {ENV} from "../../../utils"
import { useParams } from 'react-router-dom';
import {Taxi as TaxiController} from "../../../api"
import "./Taxi.scss"


const taxiController = new TaxiController ();




export  function Taxi() {

  const [taxi, setTaxi] = useState(null);
  const {path}= useParams()
  
  

  useEffect(() => {
    (async ()=>{
      try {
        const response = await taxiController.getTaxi(path)
        setTaxi(response)
        
      } catch (error) {
        console.error(error)
      }
    })()
  }, [path])

  if(!taxi) return <Loader active inline="centered"/>



  return (
    <Container className='taxi'>
        <h1 className='taxi__info'>
           INORMACION DEL CONDUCTOR Y VEHICULO
        </h1>
        <Image src={`${ENV.BASE_PATH}/${taxi.taxiStored.foto}`}/>
        

        <Table definition color="yellow" >
        <Table.Body>
      <Table.Row>
        <Table.Cell><Icon name='user'/>Nombre:</Table.Cell>
        <Table.Cell>{taxi.taxiStored.conductor}</Table.Cell>        
      </Table.Row>

      <Table.Row>
        <Table.Cell><Icon name="taxi"/>Placa:</Table.Cell>
        <Table.Cell>{taxi.taxiStored.placa}</Table.Cell>        
      </Table.Row>

      <Table.Row>
        <Table.Cell><Icon name='slack'/>Numero Interno: </Table.Cell>
        <Table.Cell>{taxi.taxiStored.numeroInterno}</Table.Cell>        
      </Table.Row>
      <Table.Row>
        <Table.Cell><Icon name='building'/>Empresa: </Table.Cell>
        <Table.Cell>{taxi.taxiStored.empresa}</Table.Cell>        
      </Table.Row>
      <Table.Row>
        <Table.Cell><Icon name={taxi.taxiStored.activo === true?"check":"ban"}/>¿Activo?</Table.Cell>
        <Table.Cell>{taxi.taxiStored.activo === true?"Sí":"No"}</Table.Cell>        
      </Table.Row>

    </Table.Body>

        </Table>
        
    </Container>
  )
}
