import AddStudent from './AddStudent';
import './App.css';
import ViewStudents from './ViewStudents';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import SearchStd from './SearchStd';
import UpdateStd from './UpdateStd';
import LoginPage from './LoginPage';
import StdHome from './StdHome';
import AdLogout from './AdLogout';
import StdLogout from './StdLogout';
import ChangePswd from './ChangePswd';

function App() {
  return (
    <div className="container-fluid">
     <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={LoginPage} />
        <Route path="/login" exact Component={LoginPage} />
        <Route path="/allstd" exact Component={ViewStudents} />
        <Route path="/newstd" exact Component={AddStudent} />        
        <Route path="/search/:rno" exact Component={SearchStd} />
        <Route path="/update/:rno" exact Component={UpdateStd} />
        <Route path="/stdhome" exact Component={StdHome} />
        <Route path="/alogout" exact Component={AdLogout} />
        <Route path="/slogout" exact Component={StdLogout} />
        <Route path="/cpwd" exact Component={ChangePswd} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
