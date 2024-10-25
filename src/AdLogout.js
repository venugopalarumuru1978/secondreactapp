import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AdLogout = () =>{

    const navigate = useNavigate();

    useEffect(()=>{
        sessionStorage.removeItem("admin_log");
        navigate("/login");
    });
    return(
        <div>
            <h1>Hello</h1>
        </div>
    );
};

export default AdLogout;