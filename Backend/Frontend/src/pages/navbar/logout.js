import React ,{useEffect} from "react";
import { useContext } from "react";
import {useNavigate} from "react-router-dom" ; 
import { UserContext } from "../../App";

export default function Logout({setCartList ,setActiveUser}) {

    const {state ,dispatch} = useContext(UserContext) ;
    const navigate = useNavigate() ;
	useEffect(() => {
	  
        fetch('/logout' , {
            method : "GET" , // 'GET' as now we wanna fetch the data from the database unlinke in the case of signin/signup
            headers : {
                Accept : "application/json" ,
                "Content-Type" : "application/json"
            } ,
            credentials : "include"
        }).then((res) =>{
            dispatch({type : "USER" ,payload : false}) ;
            // window.alert("User Logged Out !!")
            setActiveUser(null) ;
            setCartList([]) ;
            navigate('/login' ,{replace : true}) ;
            if(!res.status === 200) {
				const error = new Error(res.error) ;
				throw error ;
			}
        }).catch((err) =>{
            console.log(err) ;
        }) ;
        
	}, []) ;

    return (
        <div className="about">
        <h1>Welcome to the LogOut Page !!</h1>
        </div>
    )
}
