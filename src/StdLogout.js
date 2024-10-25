import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StdLogout = () =>{

    const navigate = useNavigate();
    useEffect(()=>{
        sessionStorage.removeItem("std_log");
        navigate("/login");
    });
    
    return(
        <div></div>
    );
};

export default StdLogout;