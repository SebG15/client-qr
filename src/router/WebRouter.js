import React from 'react'
import {Routes, Route} from "react-router-dom"
import {ClientLayout} from "../layouts/ClientLayout"
import {Home,Contact, Taxis} from "../pages/web"

export  function WebRouter() {
  const loadLayout = (Layout,Page)=>{
    return <Layout>
      <Page/>
    </Layout>
  }

  return (
    <Routes>        
        <Route path='/' element={loadLayout(ClientLayout,Home)}/>
        <Route path='/contacto' element={loadLayout(ClientLayout,Contact)}/>
        <Route path='/taxi/:path' element={loadLayout(ClientLayout,Taxis)}/>
    </Routes>
    
  );
}
