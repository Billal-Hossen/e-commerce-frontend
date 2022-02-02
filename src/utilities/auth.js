import jwtdecode from 'jwt-decode';

export const authonticate= (token,cb)=>{
    if(typeof window !=="undefined"){
        localStorage.setItem("jwt",JSON.stringify(token))

    }
    cb();
}

export const isAuthonticated=()=>{
    if(typeof window === 'undefined') return false;
    if(localStorage.getItem('jwt')){
        const {exp} =jwtdecode(JSON.parse(localStorage.getItem("jwt")));
        if ((new Date()).getTime() <= exp * 1000){
            return true;
        }
        else{
            localStorage.removeItem("jwt");
           
        }
    }
    else{
        return false;
        
    }

}

export const userInfo=()=>{
  
  const jwt= JSON.parse(localStorage.getItem('jwt'));
  const decoded= jwtdecode(jwt);
  return {...decoded,token:jwt}

}

export const signOut=(cb)=>{
    if(typeof window !=="undefined"){
        localStorage.removeItem("jwt");
        cb();
    }
}

