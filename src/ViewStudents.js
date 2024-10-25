import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewStudents = () =>{

    const [stdInfo, setStdInfo] = useState([]);
    const navigate = useNavigate();

    const AddStds = () =>{
        navigate("/newstd");
    }
    const AllStds = () =>{
        navigate("/allstd");
    }
    
    const Searching = (rollno) => {        
        navigate("/search/" + rollno);
    }

    const Updating = (rollno) => {        
        navigate("/update/" + rollno);
    }

    const deleteStd = (rollno)  =>{        
                axios({
                    url:"http://localhost:9090/Students/" + rollno,
                    method:"DELETE",
                    data:null,
                })
                .then((response)=>{                   
                    alert("Student is Deleted...");
                })
                .catch((err)=>{
                    console.log(err);
                });
    }

    useEffect(()=>{
            if(sessionStorage.getItem("admin_log")!=null)
            {
                ShowStdData();
            }
            else
            {
                //alert("First Login Here");
                navigate("/login");
            }
        
    }, [stdInfo]);

    const ShowStdData = () =>{
        axios({
            url:"http://localhost:9090/Students",
            method:"GET",
            data:null,
        })
        .then((response)=>{
            setStdInfo(response.data);
            //console.log(stdInfo);
        })
        .catch((err)=>{
            console.log(err);
        });

        /*
        axios.get('http://localhost:9090/Students')
        .then((res)=>{
            setStdInfo(res.data);
            console.log(stdInfo);
        });
        */
    }

    return(
        <div  className="container-fluid">

            <br />
           
            <div className="row">
            
                <div className="col-lg-12">
                    <div className="row">
                    <div className="col-lg-8">
                        <h3>Welcome to : {sessionStorage.getItem("admin_log")}</h3>
                    </div>
                    <div className="col-lg-4">
                    <p style={{'textAlign':'right'}}>
                        <input type="button"  value={"Add New Student"}  className='btn btn-primary' onClick={AddStds} />
                        &nbsp;&nbsp;&nbsp;
                        <a href='/alogout' className="btn btn-danger"><b>Logout</b></a>
                    </p>
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
                                <th>Operations</th>
                            </tr>                            
                        </thead>
                        <tbody>
                            {
                                stdInfo.map((std)=>(
                                    <tr>
                                        <td>{std.id}</td>
                                        <td>{std.sname}</td>
                                        <td>{std.course}</td>
                                        <td>{std.fees}</td>
                                        <td>{std.mailid}</td>
                                        <td>
                                            <input type="button"  value="View"  className="btn btn-info" onClick={()=>{Searching(std.id)}} />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input type="button"  value="Delete"  className="btn btn-danger" onClick={()=>{deleteStd(std.id)}} />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input type="button"  value="Modify"  className="btn btn-success" onClick={()=>{Updating(std.id)}}  />
                                        </td>
                                    </tr>
                                ))
                            }                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewStudents;
