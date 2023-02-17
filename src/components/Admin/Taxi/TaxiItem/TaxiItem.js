import React from 'react'
import { Image,Button, Icon, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "./TaxiItem.scss"
import {ENV} from "../../../../utils"

export function TaxiItem(props) {
    const {taxi} = props ;
    

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
                <Button icon>
                    <Icon name='edit'/>
                </Button>
                <Button icon>
                    <Icon name='trash alternate outline'/>
                </Button>
            </div>
        </div>
    </>
  )
}
