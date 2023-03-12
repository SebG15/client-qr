import React, {useCallback} from 'react'
import {Form, Image} from "semantic-ui-react"
import {useFormik} from "formik"
import {useDropzone} from "react-dropzone"
import {image} from "../../../../assets"
import {useAuth} from "../../../../hooks"
import {User} from "../../../../api"
import {ENV} from "../../../../utils"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {initialValues,validationSchema} from "./UserForm.form"
import "./UserForm.scss"

const userController = new User()

export function UserForm(props) {
    const {close, onReload, user} = props;
    const notify = () => toast.error("No se puede crear el usuario.",{
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
    })
    const {accessToken} = useAuth();
    

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(user),
        validateOnChange: false,
        onSubmit: async(formValue) =>{
            try {
                if(!user){
                    await userController.createUser(accessToken, formValue)
                } else{
                    await userController.updateUser(accessToken,user._id, formValue)
                }
                
                onReload();
                close();
                
            } catch (error) {
                notify()
                console.error(error)
            }
        }
    })

    // funcion para poner la imaagen
    const onDrop = useCallback((acceptedFiles) =>{
        const file = acceptedFiles[0]
        formik.setFieldValue("avatar", URL.createObjectURL(file))
        formik.setFieldValue("fileAvatar", file);

    })

    const {getRootProps, getInputProps} = useDropzone({
        accept : "image/jpeg, image/png",
        onDrop
    })

    const getAvatar =() =>{
        if(formik.values.fileAvatar){
            return formik.values.avatar;
        } else if (formik.values.avatar){
            return `${ENV.BASE_PATH}/${formik.values.avatar}`
        }
        return image.noAvatar
        
    }

  return (
    <Form className='user-form' onSubmit={formik.handleSubmit}>
        <div className='user-form__avatar' {...getRootProps()}>
            <input {...getInputProps()} />
            <Image avatar size='small' src ={getAvatar()}/>
        </div>

        <Form.Group widths={'equal'}>
            <Form.Input 
            name = "firstname" placeholder = "Nombre" 
            onChange={formik.handleChange} 
            value ={formik.values.firstname}
            error= {formik.errors.firstname}
            />
            <Form.Input 
            name = "lastname" placeholder = "Apellido"
            onChange={formik.handleChange} 
            value ={formik.values.lastname}
            error= {formik.errors.lastname}
            />
        </Form.Group>

        <Form.Group widths={'equal'}>
            <Form.Input name = "email" placeholder = "Correo"
            onChange={formik.handleChange} 
            value ={formik.values.email}
            error= {formik.errors.email}
            />
            <Form.Dropdown placeholder='Selecionar Rol' options={roleOptions} selection
            onChange={(_,data)=> formik.setFieldValue("role",data.value)}
            value ={formik.values.role}
            error= {formik.errors.role}
            />
        </Form.Group>

        <Form.Input type='password'name="password" placeholder="Contraseña"
        onChange={formik.handleChange} 
        value ={formik.values.password}
        error= {formik.errors.password}
        />
        <Form.Button  color="yellow" type= "submit" fluid loading={formik.isSubmitting} >
               {user? "Actualizar Usuario": "Crear Usuario"}
            </Form.Button>
            <ToastContainer/>
    </Form>
    
  )
}


const roleOptions =[
    {
        key: "user",
        text: "Usuario",
        value: "user"
    },
    {
        key: "Admin",
        text: "Administrador",
        value: "admin"
    },
]