import { ENV } from "../utils"


export class Taxi{
    basiApi = ENV.BASE_API;

    async getTaxis(page=1, limit=10){
        
        try {
            // paginacion de los taxis
            const pageFilter = `page=${page}`;
            const limitFilter = `limit=${limit}`
            const url = `${this.basiApi}/${ENV.API_ROUTES.TAXI}?${pageFilter}&${limitFilter}`;

            const response = await fetch(url) // verficar si hay necesidad de ocultar los cursos a la vista de la web o del usuario final
            const result = await response.json();
            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error 
        }
    }

    async createTaxi(accessToken, data){
        try {
            
            const formData =  new FormData();
            Object.keys(data).forEach((key)=>{
                formData.append(key,data[key])
            })

            if(data.fileFoto){
                formData.append("foto",data.fileFoto)
            }

            const url = `${this.basiApi}/${ENV.API_ROUTES.TAXI}`
            const params = {
                method : "POST",
                headers:{
                    Authorization : `Bearer ${accessToken}`
                }
                ,
                body: formData,
            }

            const response = await fetch(url,params)
            const result = await response.json()

            if(response.status !== 200) throw result;

            return result

        } catch (error) {
            throw error
        }
    }

    async updateTaxi(accessToken,idTaxi,taxiData){
        try {
            const data = taxiData
            const formData =  new FormData();
            Object.keys(data).forEach((key)=>{
                formData.append(key,data[key])
            })

            if(data.fileFoto){
                formData.append("foto",data.fileFoto)
            }

            const url= `${ENV.BASE_API}/${ENV.API_ROUTES.TAXI}/${idTaxi}`
            const params ={
                method: "PATCH",
                headers:{
                    Authorization:`Bearer ${accessToken}`
                },
                body: formData
            };


            const response = await fetch(url,params);
            const result = await response.json();


            if(response.status !== 200)  throw result;
            return result;


            
        } catch (error) {
            throw error
            
        }
    }

    async deleteTaxi(accessToken,idTaxi){
        try {

            const url = `${this.basiApi}/${ENV.API_ROUTES.TAXI}/${idTaxi}`;
            const params ={
                method : "DELETE",
                headers: {
                Authorization: `Bearer ${accessToken}`
                }

            }
            const response = await fetch(url,params);
            const result = await response.json();

            if(response.status !== 200 ) throw result;
            return result ;
        } catch (error) {
            throw error;
        }
    }

    async getTaxi (path){
        try {
            const url =`${this.basiApi}/${ENV.API_ROUTES.TAXI}/${path}`;

            const response = await fetch(url);

            const result = await response.json();

            if(response.status !==200) throw result
            return result
            
        } catch (error) {
            throw error
        }
    }
}