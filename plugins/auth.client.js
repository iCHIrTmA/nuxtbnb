// import Cookie from "js-cookie"
import jwt_decode from "jwt-decode"

export default ({ $config }, inject) => {
    console.log('hello');
    window.auth = (response) => {
        try {
            const token = response.credential
            console.log(token)
            const user = jwt_decode(token)
            console.log(user)
        } catch (e) {
            console.error(e)
        }

    }
}
