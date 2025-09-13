import Cookie from "js-cookie"
import jwt_decode from "jwt-decode"

export default ({ $config }, inject) => {
    window.auth = (response) => {
        try {
            const token = response.credential
            const user = jwt_decode(token)
            console.log(user)
            // store.commit('auth/user', {
            //     fullName: user.name,
            //     profileUrl: user.picture,
            // });

            Cookie.set($config.auth.cookieName, token, {
                expires: 1/24,
                sameSite: 'lax',
            });
        } catch (e) {
            console.error(`JWT error ${e}`)
        }
    };

    addScript();
    inject('auth', {
        signOut,
    });

    function addScript() {
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client"
        script.async = true
        document.head.appendChild(script)
    }

    function signOut() {
        Cookie.remove($config.auth.cookieName);
        // store.commit('auth/user', null)
    }
}
