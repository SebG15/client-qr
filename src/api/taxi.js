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
}