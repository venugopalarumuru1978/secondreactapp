import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const UpdateStd = () =>{

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

    const UpdateStdInfo = (e) =>{
        e.preventDefault();
        axios({
            url:"http://localhost:9090/Students/" + rno,
            method:"PUT",
            data:stdinfo,
        })
        .then((response)=>{           
            console.log(response.data);
            //alert("Student is Updated...")
            navigate("/allstd");
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    return(
        <div className="container-fluid">
            <h3 style={{'textAlign':'center'}}>Update Student Info</h3>
            <hr />
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-lg-6">
                                    <b>Update here</b>
                                </div>
                                <div className="col-lg-6" style={{'textAlign':'right'}}>
                                    <a href="/allstd"><b>Back</b></a>
                                </div>
                            </div>
                            
                        </div>
                        <div className="card-body">
                            <form onSubmit={UpdateStdInfo}>
                            <label>Roll Number</label>
                            <input type="text"  name="rollno"  className="form-control" 
                            value={stdinfo.id} disabled />
                            <br />
                            <label>Student Name</label>
                            <input type="text"  name="sname"  className="form-control"
                             value={stdinfo.sname} 
                             onChange={(e)=>{setStdInfo({...stdinfo, sname:e.target.value})}}/>
                            <br />
                            <label>Course</label>
                            <input type="text"  name="course"  className="form-control" 
                            value={stdinfo.course}
                            onChange={(e)=>{setStdInfo({...stdinfo, course:e.target.value})}}/>
                            <br />
                            <label>Fees</label>
                            <input type="text"  name="fees"  className="form-control"
                            value={stdinfo.fees}
                            onChange={(e)=>{setStdInfo({...stdinfo, fees:e.target.value})}}/>
                            <br />
                            <label>Mail ID</label>
                            <input type="text"  name="maild"  className="form-control"
                            value={stdinfo.mailid} 
                            onChange={(e)=>{setStdInfo({...stdinfo, mailid:e.target.value})}}/>
                            <div className="row">
                                <div className="col-lg-12" style={{'textAlign':'center'}}>
                                    <br />
                                        <input type="submit"  value="Update Student"  className="btn btn-primary" />
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

export default UpdateStd;