import React from 'react'
import {Form, Button} from "semantic-ui-react"
import {useFormik} from "formik"
import {Auth} from "../../../../api"
import {useAuth} from "../../../../hooks"
import {initialValues, validationSchema} from "./LoginForm.form"


const authContoller = new Auth ();

export function LoginForm() {

    const {login} = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                const response  = await  authContoller.login(formValue);
                authContoller.setAccessToken(response.access);
                authContoller.setRefreshToken(response.refresh);
                
                login(response.access)
                
            } catch (error) {
                console.log(error)
                
            }
        }
    })

  return (
    <div>
        <Form className='register-form' onSubmit={formik.handleSubmit} >
            <Form.Input name="email" placeholder ="Correo Eletronico"
            onChange={formik.handleChange} value = {formik.values.email}
            error={formik.errors.email}
            />
            <Form.Input name="password" type="password" placeholder ="Contraseña"
            onChange={formik.handleChange} value = {formik.values.password}
            error={formik.errors.password}
             />
             <Button inverted color="yellow" type= "submit" fluid loading={formik.isSubmitting} >
                Entrar
            </Button>
           
        </Form>
    </div>
  )
}
