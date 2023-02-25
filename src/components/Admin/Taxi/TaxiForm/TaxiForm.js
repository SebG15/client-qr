import React, {useCallback} from 'react'
import "./TaxiForm.scss"
import {Form, Image} from "semantic-ui-react"
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'
import {image} from "../../../../assets"
import{useAuth} from "../../../../hooks"
import {Taxi} from "../../../../api"
import {ENV} from "../../../../utils"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {initialValues, validationSchema} from "./TaxiForm.form"

const taxiContoller  = new Taxi();

export  function TaxiForm(props) {

  
  const notify = () => toast.success("Exitoooooo",{
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: false,
})
  const{onClose, onReload, taxi} = props
  const {accessToken} = useAuth()

  const formik = useFormik({
    initialValues:initialValues(taxi),
    validationSchema:validationSchema(taxi),
    validateOnChange:false,
    onSubmit: async (formValue) => {

      try {
        
        if(taxi){
          await taxiContoller.updateTaxi(accessToken,taxi._id,formValue)
          
                    

        } else{
          await taxiContoller.createTaxi(accessToken,formValue)
        }
        
        
        onReload()  
       
        
        onClose()
        
        
        
        
      } catch (error) {
        console.error(error)
      }
    }
  })

  const onDrop = useCallback((acceptedFiles)=>{
    const file = acceptedFiles[0]
    formik.setFieldValue("foto",URL.createObjectURL(file))
    formik.setFieldValue("fileFoto",file)
  });

  const {getRootProps,getInputProps} = useDropzone({
    accept : "image/jpeg, image/png",
    onDrop
  })

  const getFoto = () =>{
    if(formik.values.fileFoto){
      return formik.values.foto
    } else if(formik.values.foto){
      return `${ENV.BASE_PATH}/${formik.values.foto}`
    }
    return image.noFoto
  }

  

  return (
    <Form className='taxi-form' onSubmit={formik.handleSubmit}>
      
        <div className='taxi-form__foto'{...getRootProps()}>
          <input{...getInputProps()}/>
            <Image avatar size='small' src={getFoto()} />
        </div>

        <Form.Group widths={'equal'}>
        <Form.Input name ="placa" placeholder="Placa del taxi" 
          onChange={formik.handleChange} value={formik.values.placa} error={formik.errors.placa} />
        <Form.Input name ="empresa" placeholder="Empresa del taxi" 
        onChange={formik.handleChange} value={formik.values.empresa} error={formik.errors.empresa}/>        
        </Form.Group>     
      

        <Form.Group widths={'equal'}>
        <Form.Input name ="numeroInterno" placeholder="Numero interno"
        onChange={formik.handleChange} value={formik.values.numeroInterno} error={formik.errors.numeroInterno}/>
        <Form.Input name ="conductor" placeholder="Nombre del conductor"
        onChange={formik.handleChange} value={formik.values.conductor} error={formik.errors.conductor}
        />
        
          
        </Form.Group>
        <Form.Dropdown placeholder='Activo' options={activeOptions} selection 
        onChange={(_,data)=>formik.setFieldValue("activo", data.value)} 
        value={formik.values.activo} error={formik.errors.activo} />

        <Form.Button  color="yellow" type= "submit" fluid loading={formik.isSubmitting}   >

              {taxi?"Actualizar Taxi":"Crear Taxi"}
               
            </Form.Button>
            <ToastContainer/>
            

    </Form>
    
  )
}

const activeOptions =[
  {
      key: "activo",
      text: "Si",
      value: "true"
  },
  {
      key: "noActivo",
      text: "No",
      value: "false"
  },
]
