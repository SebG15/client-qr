import React from 'react'
import {Menu, Icon} from "semantic-ui-react"
import {Link, useLocation} from "react-router-dom"
import "./AdminMenu.scss"

export  function AdminMenu() {

const {pathname} =useLocation();

const isCurrentPath = (path) =>{
    if(path === pathname) return true;
    return false;
}

  return (
    <Menu fluid vertical icon text className='admin-menu'>
        <Menu.Item as={Link} to ="/admin/users" active={isCurrentPath("/admin/users")}> 
            <Icon name='users'/>
            Usuarios
        </Menu.Item>

        <Menu.Item as={Link} to ="/admin/qr" active={isCurrentPath("/admin/menu")}> 
            <Icon name='qrcode'/>
            Qr
        </Menu.Item>
        
        <Menu.Item as={Link} to ="/admin/taxis" active={isCurrentPath("/admin/taxis")}> 
            <Icon name='taxi'/>
            Taxis
        </Menu.Item>
    </Menu>
  )
}
