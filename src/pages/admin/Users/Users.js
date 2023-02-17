import React, {useState} from 'react'
import {Tab, Button,Icon} from "semantic-ui-react"
import {BasicModal} from "../../../components/Shared"
import {UserForm, ListUser} from "../../../components/Admin/Users"
import "./Users.scss"

export  function Users() {

  const [showModal, setShowModal] = useState(false)
  const [reload, setReload] = useState(false)

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload  = () => setReload((prevState) => !prevState);

  const panes =[
    {
      menuItem: "Usuarios Activos",
      render: () => (
        <Tab.Pane attached = {false}>
          <ListUser usersActive = {true} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Usuarios Inactivos",
      render: () => (
        <Tab.Pane attached = {false}>
          <ListUser usersActive = {false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      )
    }

  ]
  // creacion de nuevo usuario desde el formulario
  return (
    <>
        <div className='user-page'>
          <Button circular color='yellow' className='user-page__add'  onClick={onOpenCloseModal}>
          <Icon  name='add user'/>
            Nuevo Usuario
          </Button>
          <Tab menu={{secondary:true}} panes ={panes}/>
        </div>

        <BasicModal show ={showModal} close={onOpenCloseModal} title="Crear nuevo Usuario">
          <UserForm close={onOpenCloseModal} onReload={onReload} />
        </BasicModal>
    </>
  );
}
