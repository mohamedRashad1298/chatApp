import React,{useState,useEffect,useCallback} from "react";

let logoutTime;

const AuthContext = React.createContext({
  token:'',
  isLoggedIn:false,
  login:(token)=>{},
  logOut:()=>{}
});

const retrieveStoredTime = ()=>{
const sortedToken=localStorage.getItem('token');
const sortedExpirationDate = localStorage.getItem('expirationTime');
const remaingTime = calculateRemaingTime(sortedExpirationDate);

if(remaingTime <= 3600){
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  return null;
}

return{
  token:sortedToken,
  duration:remaingTime
};
}


const calculateRemaingTime = (expirationTime)=>{

const currentTime = new Date().getTime();
const adjExirationTime = new Date(expirationTime).getTime();

const remaingDuration = adjExirationTime - currentTime

return remaingDuration;
}


export const AuthContextProvider = (props)=>{
 const tokenData = retrieveStoredTime();
let intialToken;

if (tokenData){
  intialToken = tokenData.token
}

  const [token , setToken]=useState(intialToken);
  const userIsLoggedIn = !!token;

  const loginHandeler = (token,expirationTime)=>{
    setToken(token)
    localStorage.setItem('token',token);
localStorage.setItem('exirationTime',expirationTime)
const remaingTime = calculateRemaingTime(expirationTime)

 logoutTime =setTimeout(logOutHandeler,remaingTime)
  };
  const logOutHandeler = useCallback( ()=>{
    setToken(null)
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime')
    if(logoutTime){
      clearTimeout(logoutTime)
    }
  },[] )


useEffect(()=>{
  if(tokenData){
     logoutTime = setTimeout(logOutHandeler, tokenData.duration);
  }
},[tokenData,logOutHandeler])

const contextValue = {
  token:token,
  isLoggedIn:userIsLoggedIn,
  login:loginHandeler,
  logOut:logOutHandeler,
}

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;