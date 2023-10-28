import React, { Component } from "react";
//import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import auth from "./services/authService";
//import jwtDecode from "jwt-decode"; 
//import NavBar from "./components/navBar";
import WelcomePage from "./components/welcome/index";
import WelcomeFrame from "./welcome";
//import Footer from "./components/layout/footer";
//import Header from "./components/layout/header";
//import Autmenu from "./components/authMenu";
//import Home from "./home";
//import NotFound from "./components/notFound";
//import LoginForm from "./components/security/loginForm";
//import SecMenu from "./components/security/secmenu";
//import RegisterForm from "./components/security/registerForm";
//import Logout from "./components/security/logout";
//import auth from "./services/authService";
//import road from "./components/ContractManagemenrt/RoadRefference/Road/road";
//import roadCharacteristic from "./components/ContractManagemenrt/RoadRefference/RoadCharacteristics/roadCharacteristic";
//import roadClassification from "./components/ContractManagemenrt/RoadRefference/RoadClassification/roadClassification";
//import Contractor from "./components/ContractManagemenrt/ContractSettings/contractor/contractor";
//import Contract from "./components/ContractManagemenrt/ContractSettings/contract/contract";

//import ServiceOrder from "./components/ContractManagemenrt/ContractSettings/serviceorders/serviceorder";
//import RoadInpection from "./components/ContractManagemenrt/RoadInspection/inspectionindex";
//import ContractInpection from "./components/ContractManagemenrt/ContractSettings/contractinspection/inspection";
//import ContractPayment from "./components/ContractManagemenrt/ContractSettings/contractpayment/contractpayment";

//import Project from "./components/ContractManagemenrt/ContractSettings/project/project";

//import roadType from "./components/ContractManagemenrt/RoadRefference/RoadType/roadType";
//import AddRole from "./components/security/Role/addRole";
//import RevMenu from "./components/revenueCorrection/revenuMenu";
//import Program from "./components/rmfplannings/Program/program";
//import ProgramTable from "./components/rmfplannings/Program/programTable";
//import ViewSAP from "./components/rmfplannings/viewSAP/sap";

//import Revmen from "./components/revenueCorrection/revenunavbar";
//import RevHome from "./components/revenueCorrection/revenuHome";
//import Sources from "./components/revenueCorrection/sourceoffunds/sourceofFunds";
//import Product from "./components/revenueCorrection/revenuProduct/revenuProduct";
//import Payment from "./components/revenueCorrection/revenuPayment/revenuPayment";
//import RevCorrection from "./components/revenueCorrection/revenuCorrection/revenuCorrection";
//import Revupload from "./components/revenueCorrection/revenuCorrection/revenuCorrectionsupload";
//import ViewPayment from "./components/revenueCorrection/paternerServicePayment/viewpaternerServicePayment";
//import Business from "./components/revenueCorrection/businessPaterner/businessPaterner";
//import Paterner from "./components/revenueCorrection/paternerService/paternerService";
//import ServicePayment from "./components/revenueCorrection/servicePayment/servicePayment";
//import PaternerServicePayment from "./components/revenueCorrection/paternerServicePayment/paternerServicePayment";
//import FiscalYearContractType from "./components/ContractManagemenrt/ContractSettings/contracttype/contracttype";

//import Roles from "./components/security/Role/roles";
//import AuditTrail from "./components/security/AuditTrail/audittrail";
//import Securables from "./components/security/Securables/securables";
//import Users from "./components/security/User/users";
//import UpdateRole from "./components/security/updateRole";
//import SecNav from "./components/security/secNavBar";

//import * as UserAccessData from "./services/security/securableService";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./App.css";

class App extends Component {
  state = {
    user: [],
    useraccesseses: [],
    username: [],
    accessusername: [],
  };

  async componentDidMount() {
    try {
      const user = await auth.getCurrentUser();
      this.setState({ user });
    } catch (ex) {
      toast.error("Loading current issues......");
    }
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        
        <ToastContainer />
        {auth.getCurrentUser()&&(
          <WelcomeFrame/>
        )
        }
        {!auth.getCurrentUser() && (
        <WelcomePage />
        )}
      </React.Fragment>
    );
  }
}

export default App;
