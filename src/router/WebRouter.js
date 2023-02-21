import React from 'react'
import {Routes, Route} from "react-router-dom"
import {ClientLayout} from "../layouts/ClientLayout"
import {Home, Taxi} from "../pages/web"

export  function WebRouter() {
  const loadLayout = (Layout,Page)=>{
    return (
    <Layout>
      <Page/>
    </Layout>);
  }

  return (
    <Routes>        
        <Route path='/' element={loadLayout(ClientLayout,Home)}/>
        
        <Route path='/taxi/:path' element={loadLayout(ClientLayout,Taxi)}/>
    </Routes>
    
  );
}
