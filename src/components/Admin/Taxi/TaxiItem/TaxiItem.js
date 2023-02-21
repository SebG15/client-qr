import React, {useState} from 'react'
import { Image,Button, Icon, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "./TaxiItem.scss"
import {BasicModal} from "../../../Shared"
import {TaxiForm} from "../TaxiForm"
import {Taxi} from "../../../../api"
import {useAuth} from "../../../../hooks"
import {ENV} from "../../../../utils"


const taxiController = new Taxi ();

export function TaxiItem(props) {
    const {taxi,onReload} = props ;
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("")
    const [showConfirm, setShowConfirm] = useState(false)
    const {accessToken} = useAuth();


    const onOpenCloseModal = () => setShowModal((prevState)=>!prevState);
    const onOpenCloseConfirm = () => setShowConfirm ((prevState)=> !prevState)

    const onDelete = async ()=> {
        try {

            await taxiController.deleteTaxi(accessToken,taxi._id)
            onReload()
            onOpenCloseConfirm()
            
        } catch (error) {
            console.error(error)
        }
    }

    const openUpdateTaxi= () =>{
        setTitleModal(`¿Actualizar taxi ${taxi.placa}?`)
        onOpenCloseModal()
    }

  return (
    <>
        <div className='taxi-item'>
            <div className='taxi-item__info'>
                <Image src={`${ENV.BASE_PATH}/${taxi.foto}`}/>
                <div>
                    <p>Taxi: {taxi.placa}</p>
                </div>
            </div>

            <div>
                <Button icon as={Link} to={`/taxi/${taxi.path}`} target="_blank"> 
                    <Icon name='eye'/>
                </Button>
                <Button icon circular color="green" onClick={openUpdateTaxi}>
                    <Icon name='edit'/>
                </Button>
                <Button circular icon color="red" onClick={onOpenCloseConfirm}>
                    <Icon name='trash alternate outline'/>
                </Button>
            </div>
        </div>

        <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}  >
            <TaxiForm onClose={onOpenCloseModal} onReload={onReload} taxi={taxi}   />
        </BasicModal>

        <Confirm open={showConfirm} onCancel={onOpenCloseConfirm} onConfirm={onDelete} content={`¿Eliminar el taxi ${taxi.placa}?`} size="mini" />
    </>
  )
}
