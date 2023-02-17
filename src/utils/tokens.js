import jwtDecode from "jwt-decode"; // lubreeria para decodficar los tokens



export const hasExpiredToken = (token) =>{
    const {exp}= jwtDecode(token);
    const currentData = new Date().getTime();

    if (exp <= currentData){ // validadcion de que expiró el token
        return true;
    }

    return false;
}