import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SearchStd = () =>{
    let {rno} = useParams();
    const [stdinfo, setStdInfo] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
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
    }, []);

    return(
        <div className="container-fluid">
            <h2 style={{'textAlign':'center'}}>Student Information</h2>
            <hr />
            <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-10">
                    <div className="row">
                        <div className="col-lg-12" style={{'textAlign':'right'}}>
                            <input type="button"  value="Back"  className="btn btn-primary" onClick={()=>{navigate("/allstd")}} />
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

export default SearchStd;