import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const StdHome = () =>{
    const [rno, setRno] = useState(0);
    const [stdinfo, setStdInfo] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        setRno(sessionStorage.getItem("stdrno"));

        if(sessionStorage.getItem("std_log")!=null)
        {
            console.log(rno);
            axios({
                url:"http://localhost:9090/Students/" + rno,
                method:"GET",
                data:null,
            })
            .then((response)=>{
                setStdInfo(response.data);
                console.log(stdinfo);
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        else
        {
            //alert("First Login here");
            navigate("/login");
        }
    });

    return(
        <div className="container-fluid">
            <h2 style={{'textAlign':'center'}}>Student Information</h2>
            <hr />
            <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-10">
                    <div className="row">
                        <div className="col-lg-12" style={{'textAlign':'right'}}>
                            <input type="button" value="Change Password"   className="btn btn-primary" onClick={()=>{navigate("/cpwd")}} />
                            <input type="button"  value="Logout"  className="btn btn-danger" onClick={()=>{navigate("/slogout")}} />
                        </div>
                    </div>
                <table className="table table-success table-striped">
                        <thead>
                            <tr>
                                <th>Roll Number</th>
                                <th>Student Name</th>
                                <th>Course</th>
                                <th>Fees</th>
                                <th>Mail ID</th>
                                <th>Password</th>
                            </tr>                            
                        </thead>
                        <tbody>
                            {
                                    <tr>
                                        <td>{stdinfo.id}</td>
                                        <td>{stdinfo.sname}</td>
                                        <td>{stdinfo.course}</td>
                                        <td>{stdinfo.fees}</td>
                                        <td>{stdinfo.mailid}</td>
                                        <td>{stdinfo.pswd}</td>
                                    </tr>
                            }                            
                        </tbody>
                    </table>

                </div>
                <div className="col-lg-1"></div>
            </div>
            <hr />
        </div>
    );
};

export default StdHome;