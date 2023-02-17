import React, {useState} from 'react'
import {Form,  Button } from "semantic-ui-react"
import  {Auth} from "../../../../api"
import {useFormik} from "formik"
import {initialValues,validationSchema} from "./RegisterForm.form"
import "./ResgisterForm.scss"

const authController = new Auth()

export  function RegisterForm(props) {
    const {openLogin} = props;
    const [error, setError] = useState("")

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema:validationSchema(),
        validateOnChange:false,
        onSubmit: async (formValue) =>{
            try {
                setError("");
                await authController.register(formValue)
                openLogin();                
            } catch (error) {
                setError("Error en el servidor");              
            }
        },
    });

  return (
    <div>
        <Form className='register-form' onSubmit={formik.handleSubmit}>
            <Form.Input name="email" placeholder ="Correo Eletronico"
             onChange={formik.handleChange} value ={formik.values.email} 
             error={formik.errors.email}/>
            <Form.Input name="password" type="password" placeholder ="Contraseña"
             onChange={formik.handleChange} value ={formik.values.password} 
             error={formik.errors.password}/>
            <Form.Input name="repeatPassword" type="password" placeholder ="Repetir Contraseña" 
            onChange={formik.handleChange} value ={formik.values.repeatPassword} 
            error={formik.errors.repeatPassword}/>
            
            <Form.Checkbox name="conditionsAccepted" label="He leido los terminos y condiciones"
             onChange={(_,data)=> formik.setFieldValue("conditionsAccepted",data.checked)} checked={formik.values.conditionsAccepted}
             error={formik.errors.conditionsAccepted}/>

            <Button inverted color="yellow" type= "submit"   fluid loading={formik.isSubmitting}>
                Crear Usuario
            </Button>
            <p className="register-form__error">
               {error}
            </p>
        </Form>
    </div>
  )
};
