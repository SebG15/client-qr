import * as Yup  from "yup"


export function initialValues(taxi){

    return{

        foto: taxi?.foto ||  "",
        fileFoto: taxi?.fileFoto || null,
        placa: taxi?.placa || "",
        empresa:taxi?.empresa ||"",
        numeroInterno:taxi?.numeroInterno || "",
        conductor:taxi?.conductor || "",
        activo:taxi?.activo || "",
    };
}

export function validationSchema (taxi){
    return Yup.object({
        placa: Yup.string().required(true),
        empresa: Yup.string().required(true),
        numeroInterno: Yup.string().required(true),
        conductor: Yup.string().required(true),
        activo: Yup.boolean().required(true),
        
    })
}