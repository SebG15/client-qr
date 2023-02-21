import React,{useState, useEffect} from 'react'
import {Loader, Pagination } from "semantic-ui-react"
import {TaxiItem} from "../TaxiItem"
import {size, map} from "lodash"
import {Taxi} from "../../../../api"
import "./ListTaxis.scss"


const taxiController = new Taxi()

export  function ListTaxis(props) {
    const {reload,onReload } = props;
    const [taxis, setTaxis] = useState(null);
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(null)
    

    useEffect( () => {
        (async () =>{
            try {
                const response = await taxiController.getTaxis(page);
                
                
                setTaxis(response.docs);
                setPagination({
                    limit: response.limit,
                    page:response.page,
                    pages: response.pages,
                    total:response.total,
                })
            } catch (error) {
                console.error(error);
            }
        })();
      
    }, [page,reload]);

    const changePage= (_, data) => {
        setPage(data.activePage)
    }

    if(!taxis) return <Loader active inline ="centered"> Cargando Taxis </Loader>
    if(size(taxis) === 0) return "No hay taxis creados"
    
  return (
    <div className='list-taxis'>
        {map(taxis, (taxi)=> (
            <TaxiItem  key ={taxi._id} taxi={taxi} onReload={onReload}  />
        ) )}
        <div className='list-taxis__pagination'>
            <Pagination 
            totalPages={pagination.pages}
            defaultActivePage={pagination.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={changePage} 
            />
            
        </div>
    </div>
  )
}
