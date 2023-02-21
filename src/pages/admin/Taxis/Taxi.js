// Esta es la seccion de courses en el curso 
import React, {useState} from 'react'
import {Tab,Button, Icon} from "semantic-ui-react"
import {BasicModal} from "../../../components/Shared"
import {ListTaxis, TaxiForm} from "../../../components/Admin/Taxi"
import "./Taxi.scss"


export  function Taxi() {

  const [showModal, setShowModal] = useState(false)

  const [reload, setReload] = useState(false)

  const onOpenCloseModal = () =>setShowModal((prevState)=> !prevState)

  const onReload = () => setReload((prevState) => !prevState)

  const panes = [
    {
      
      render: () => (
        <Tab.Pane attached={false}>
          <ListTaxis reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    
  ];
  

  return (
    <>
        <div className='taxi-page'>
            <div className='taxi-page__add'>
              <Button circular color='yellow'  onClick={onOpenCloseModal}>
               <Icon  name='taxi'/>
               <Icon  name='add'/>
                 Agregar Taxi
              </Button>
            </div>
            <Tab menu={{ secondary: true }} panes={panes} />

            
        </div>
        <BasicModal show={showModal} close={onOpenCloseModal} title =" Crear Nuevo Taxi">
          <TaxiForm onClose={onOpenCloseModal} onReload={onReload}/>
        </BasicModal>
    </>
  )
}
