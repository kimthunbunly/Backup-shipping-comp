// import React from "react"

let getCookie = cname => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

let isLoggedIn = () => (getCookie("isLoggedIn") === "true" ? true : false);

const userAuth = {
    isAuthenticated: isLoggedIn(),
    authenticate(cb) {
        document.cookie = "isLoggedIn=true";
        this.isAuthenticated = isLoggedIn;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        document.cookie = "isLoggedIn=false";
        localStorage.clear()
        this.isAuthenticated = isLoggedIn();
        setTimeout(cb, 100);
    }
};



export default userAuth
