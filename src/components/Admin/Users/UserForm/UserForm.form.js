import * as Yup from "yup";


export function initialValues (user) {
    return{
        avatar : user?.avatar || "",
        fileAvatar :user?.fileAvatar ||  null,
        firstname : user?.firstname|| "",
        lastname :user?.lastname||  "",
        email: user?.email || "",
        role: user?.role || "",
        password:"",


    }
}

// Validacion para la creacion de usaurios desde admin
export function validationSchema (user){
    return Yup.object({
        firstname: Yup.string().required(true),
        lastname: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        role: Yup.string().required(true),
        password:user? Yup.string(): Yup.string().required(true).min(8,"La contraseña debe tener mínimo 8 caracteres")

    })

}