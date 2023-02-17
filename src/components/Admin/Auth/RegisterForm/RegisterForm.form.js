import * as Yup from "yup";

export function initialValues () {
    return{
        email:"",
        password:"",
        repeatPassword:"",
        conditionsAccepted: false,

    };
};

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email("Email no valido").required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio").min(8,"La contraseña debe tener mínimo 8 caracteres"),
        repeatPassword: Yup.string().required("Campo obligatorio").oneOf([Yup.ref("password")],"Las contraseñas deben de ser iguales"),
        conditionsAccepted: Yup.bool().isTrue(true)
    })
}