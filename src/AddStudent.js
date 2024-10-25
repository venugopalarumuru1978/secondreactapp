import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () =>{
    const navigate = useNavigate();
    const [newstd, setNewstd] = useState({
        "id": 0,
        "sname": "",
        "course": "",
        "fees": 0.0,
        "mailid":"",
        "pswd":""
    });

    const [formErr, setFormerr] = useState({});

    
    const NewStd = (e) =>{
        e.preventDefault();

        let validationMsg = {};

        if(newstd.id===0)
        {
            validationMsg.id = "Roll Number is Required";
        }

        if(!newstd.sname.trim())
        {
            validationMsg.sname = "Student Name is Required";
        }

        if(!newstd.course.trim())
        {
            validationMsg.course = "Course is Required";
        }

        if(newstd.fees===0.0)
        {
            validationMsg.fees = "Fees is Required";
        }

        if(!newstd.mailid.trim())
        {
            validationMsg.mailid = "mail id is Required";
        }

        if(!newstd.pswd.trim())
        {
            validationMsg.pswd = "Password is Required";
        }
        else if(newstd.pswd.length<5)
        {
            validationMsg.pswd = "Password must be 5 or more than 5 chars";
        }

        setFormerr(validationMsg);
        if(Object.keys(validationMsg).length===0)
        {
            axios({
                url:"http://localhost:9090/Students",
                method:"POST",
                data:newstd,
            })
            .then((response)=>{
                console.log(response.data);
                //alert('New Student is Added..')
                navigate("/allstd");
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    };

    return(
        <div className="container-fluid" >
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                        <div className="row">
                                <div className="col-lg-6">
                                    <b>Register here</b>
                                </div>
                                <div className="col-lg-6" style={{'textAlign':'right'}}>
                                    <a href="/allstd"><b>Back</b></a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={NewStd}>
                            <label>Roll Number</label>
                            <input type="text"  name="rollno"  className="form-control" 
                            onChange={(e)=>{setNewstd({...newstd, id:e.target.value})}} />
                            {formErr.id && <span style={{'color':'red'}}>{formErr.id}</span>}
                            <br />
                            <label>Student Name</label>
                            <input type="text"  name="sname"  className="form-control"
                            onChange={(e)=>{setNewstd({...newstd, sname:e.target.value})}} />
                            {formErr.sname && <span style={{'color':'red'}}>{formErr.sname}</span>}
                            <br />
                            <label>Course</label>
                            <input type="text"  name="course"  className="form-control" 
                            onChange={(e)=>{setNewstd({...newstd, course:e.target.value})}} />
                            {formErr.course && <span style={{'color':'red'}}>{formErr.course}</span>}
                            <br />
                            <label>Fees</label>
                            <input type="text"  name="fees"  className="form-control"
                            onChange={(e)=>{setNewstd({...newstd, fees:e.target.value})}} />
                            {formErr.fees && <span style={{'color':'red'}}>{formErr.fees}</span>}
                                       <br />
                            <label>Mail ID</label>
                            <input type="email"  name="maild"  className="form-control"
                            onChange={(e)=>{setNewstd({...newstd, mailid:e.target.value})}} />
                            {formErr.mailid && <span style={{'color':'red'}}>{formErr.mailid}</span>}
                                       <br />
                            <label>Password</label>
                            <input type="text"  name="pswd"  className="form-control"
                            onChange={(e)=>{setNewstd({...newstd, pswd:e.target.value})}} />
                            {formErr.pswd && <span style={{'color':'red'}}>{formErr.pswd}</span>}
                            <div className="row">
                                <div className="col-lg-12" style={{'textAlign':'center'}}>
                                    <br />
                                        <input type="submit"  value="Add Student"  className="btn btn-primary" />
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
}

export default AddStudent;