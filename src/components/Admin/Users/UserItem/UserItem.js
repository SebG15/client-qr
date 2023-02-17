import React, {useState} from 'react'
import {Image, Button, Icon, Confirm} from "semantic-ui-react"
import {image} from "../../../../assets"
import "./UserItem.scss"
import { BasicModal } from "../../../Shared"
import {User} from "../../../../api" 
import {useAuth} from "../../../../hooks"
import {ENV} from "../../../../utils"
import {UserForm} from "../UserForm"

const userController = new User ()

export function UserItem(props) {
    const {accessToken} = useAuth()
    const {user,onReload } = props
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("")
    const [showConfirm, setShowConfirm] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState("")
    const [isDelete, setIsDelete] = useState(false)

    const onOpenCloseModal =() => setShowModal((prevState)=> !prevState)
    const onOpenCloseConfirm = () => setShowConfirm((prevState)=> ! prevState)

   // funcion para ejecutar el boton de actualizar
   const openUpdateUser = ()=>{
    setTitleModal(`Actualizar ${user.email}`)
    onOpenCloseModal()
   }

   //
  

   // 
   const openDesactivateActivateConfirm = () =>{
    setIsDelete(false)
    setConfirmMessage(user.active? `¿Desea desactivar usuario ${user.email} ?`: `¿Desea activar usuario ${user.email} ?`)
    onOpenCloseConfirm()
   }
   // funcion para activar o desactivar usuarios
   const onActivateDesactivate = async () =>{
    try {
        await userController.updateUser(accessToken, user._id,{
            active: !user.active
        })
        onReload()
        onOpenCloseConfirm()
    } catch (error) {
        console.error(error)
    }
    
   }

   //funcion apra abrir el icono de delete user

   const openDeleteConfrim = () =>{
    setIsDelete(true);
    setConfirmMessage(`¿Elimnar al usuario ${user.email} ?`)
    onOpenCloseConfirm()
   }

   // funcion que se ejecuta para eliminar el user

   const onDelete = async () =>{
    try {
        await userController.deleteUser(accessToken, user._id);
        onReload(); // recargar la lista
        onOpenCloseConfirm() // CErrar la lista
    } catch (error) {
        console.error(error)
    }


   }

  return (
    <>
        <div className='user-item'>
            <div className='user-item__info'> 
            <Image avatar src={user.avatar ? `${ENV.BASE_PATH}/${user.avatar}`: image.noAvatar}/>                          
                <div>
                    <p>
                        {user.firstname} {user.lastname}
                    </p>
                    <p>{user.email}</p>
                </div>
            </div>   
            <div>
                <Button circular icon color="green" onClick={openUpdateUser} >
                    <Icon  name='edit'/> Edit
                </Button>
                <Button circular icon color={user.active? "grey": "blue"} onClick={openDesactivateActivateConfirm}>
                    <Icon  name={user.active? "ban": "check"}/> {user.active? "Off": "On"}
                </Button>
                <Button circular icon color="red" onClick={openDeleteConfrim} >
                    <Icon  name='trash alternate outline'/> Eliminar
                </Button>
            </div>
        </div>

    <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <UserForm close ={onOpenCloseModal} onReload={onReload} user= {user}/>
    </BasicModal>
    
    <Confirm open={showConfirm} onCancel={onOpenCloseConfirm} onConfirm={isDelete? onDelete: onActivateDesactivate}
     content={confirmMessage} size="mini" />

    </>
  )
}
