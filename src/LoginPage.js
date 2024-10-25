import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () =>{

    const navigate = useNavigate();
    const [msg, setMsg] = useState(''); 
    const [userForm, setUserform] = useState({
        'username':'',
        'pswd':''
    });

    const [formErr, setFormerr] = useState({});

    const [stdinfo, setStdInfo] = useState([]);

    const inputHandle = (e) =>{
        setUserform({...userForm,[e.target.name]:e.target.value});
    };

    const SubmitForm = (e) =>{
        e.preventDefault();

        let validationMsg = {};

        if(!userForm.username.trim())
        {
            validationMsg.uname = "Username is Required";
        }
        if(!userForm.pswd.trim())
        {
            validationMsg.pwd = "Password is Required";
        }

        setFormerr(validationMsg);

        if(Object.keys(validationMsg).length===0)
        {
            if(userForm.username==="admin" && userForm.pswd==="admin@123")
            {
                sessionStorage.setItem("admin_log", "Administrator");
                navigate("/allstd");
            }
            else
            {
                axios({
                    url:"http://localhost:9090/Students",
                    method:"GET",
                    data:null,
                })
                .then((response)=>{
                    setStdInfo(response.data);
                    let usercheck = false;
                    stdinfo.map((std)=>{
                        if(std.mailid===userForm.username && std.pswd===userForm.pswd)
                        {
                            usercheck = true;
                            //alert("Student is existed....");
                            sessionStorage.setItem("stdrno", std.id);
                            sessionStorage.setItem("std_log", std.sname);
                            navigate("/stdhome");
                        }
                    });
                    if(usercheck===false)
                        //alert("Please check username / password");
                        setMsg('Please check username / password');
                })
                .catch((err)=>{
                    console.log(err);
                });          
            }                
        }
    }

    return(
        <div className="container-fluid">
            <br /><br /><br />
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                        <div className="row">
                                <div className="col-lg-12">
                                    <b>Login Here</b>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={SubmitForm}>
                            <label>Username</label>
                            <input type="text"  name="username"  className="form-control" onChange={inputHandle} />
                            {formErr.uname && <span style={{'color':'red'}}>{formErr.uname}</span>}
                            <br />
                            
                            <label>Password</label>
                            <input type="password"  name="pswd"  className="form-control"
                             onChange={inputHandle} />
                             {formErr.pwd && <span style={{'color':'red'}}>{formErr.pwd}</span>}
                            <br />
                            {msg && <span style={{'color':'red'}}>{msg}</span>}
                            <div className="row">
                                <div className="col-lg-12" style={{'textAlign':'center'}}>
                                    <br />
                                        <input type="submit"  value="Login"  className="btn btn-success" />
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="reset"  value="Reset Form"  className="btn btn-danger" />
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    );
};

export default LoginPage;