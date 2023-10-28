import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
//import { ToastContainer } from "react-toastify";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
//import auth from "./Services/authService";
import jwtDecode from "jwt-decode";
import NavBar from "./components/navBar";
//import WelcomePage from "./components/welcome/index";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import Autmenu from "./components/authMenu";
//import Home from "./home";
//import NotFound from "./components/notFound";
//import LoginForm from "./components/security/loginForm";
//import SecMenu from "./components/security/secmenu";
//import RegisterForm from "./components/security/registerForm";
//import Logout from "./components/security/logout";
import auth from "./services/authService";
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
import WelcomeNav from "./welcomenav";
//import Roles from "./components/security/Role/roles";
//import AuditTrail from "./components/security/AuditTrail/audittrail";
//import Securables from "./components/security/Securables/securables";
//import Users from "./components/security/User/users";
//import UpdateRole from "./components/security/updateRole";
//import SecNav from "./components/security/secNavBar";

//import * as UserAccessData from "./services/security/securableService";
//-------------------common-----------------------
import Home from "./home";
import NotFound from "./components/notFound";
//-------------------security
import LoginForm from "./components/security/loginForm";
//import SecMenu from "./components/security/secmenu";
import RegisterForm from "./components/security/registerForm";
import Logout from "./components/security/logout";
import Roles from "./components/security/Role/roles";
import AuditTrail from "./components/security/AuditTrail/audittrail";
import Securables from "./components/security/Securables/securables";
import Users from "./components/security/User/users";
import UpdateRole from "./components/security/updateRole";
import AddRole from "./components/security/Role/addRole";
//-----------------------Revenu Collection
import RevMenu from "./components/revenueCorrection/revenuMenu";
import Revmen from "./components/revenueCorrection/revenunavbar";
import RevHome from "./components/revenueCorrection/revenuHome";
import Sources from "./components/revenueCorrection/sourceoffunds/sourceofFunds";
import Product from "./components/revenueCorrection/revenuProduct/revenuProduct";
import Payment from "./components/revenueCorrection/revenuPayment/revenuPayment";
import RevCorrection from "./components/revenueCorrection/revenuCorrection/revenuCorrection";
import Revupload from "./components/revenueCorrection/revenuCorrection/revenuCorrectionsupload";
import ViewPayment from "./components/revenueCorrection/paternerServicePayment/viewpaternerServicePayment";
import Business from "./components/revenueCorrection/businessPaterner/businessPaterner";
import Paterner from "./components/revenueCorrection/paternerService/paternerService";
import ServicePayment from "./components/revenueCorrection/servicePayment/servicePayment";
import PaternerServicePayment from "./components/revenueCorrection/paternerServicePayment/paternerServicePayment";
//-----------------------------planing
import Program from "./components/rmfplannings/Program/program";
import ProgramTable from "./components/rmfplannings/Program/programTable";
import ViewSAP from "./components/rmfplannings/viewSAP/sap";
//------------------------------------Contract Management
import FiscalYearContractType from "./components/ContractManagemenrt/ContractSettings/contracttype/contracttype";
import Project from "./components/ContractManagemenrt/ContractSettings/project/project";

//------------------------------------------------------------------------
import road from "./components/ContractManagemenrt/RoadRefference/Road/road";
import roadCharacteristic from "./components/ContractManagemenrt/RoadRefference/RoadCharacteristics/roadCharacteristic";
import roadClassification from "./components/ContractManagemenrt/RoadRefference/RoadClassification/roadClassification";
import Contractor from "./components/ContractManagemenrt/ContractSettings/contractor/contractor";
import Contract from "./components/ContractManagemenrt/ContractSettings/contract/contract";

import ServiceOrder from "./components/ContractManagemenrt/ContractSettings/serviceorders/serviceorder";
import RoadInpection from "./components/ContractManagemenrt/RoadInspection/inspectionindex";
import ContractInpection from "./components/ContractManagemenrt/ContractSettings/contractinspection/inspection";
import ContractPayment from "./components/ContractManagemenrt/ContractSettings/contractpayment/contractpayment";


import roadType from "./components/ContractManagemenrt/RoadRefference/RoadType/roadType";

//------------------------------------------------------------------------

//------------------------------------End Contract Management
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./App.css";


class Welcome extends Component {
  state = {
    user:[],
    useraccesseses:[],
    username:[],
    accessusername:[],
  };
   async populateBanks() {
    try {
        const username = auth.getJwt();
        this.setState({ username });
        const accessusername=jwtDecode(username)
        this.setState({ accessusername });
        
       
        } catch (ex) {
         toast.error("current user data Loading issues......"+ex);
     
    }
  }

  async componentDidMount() {
    try {
       
      await this.populateBanks();     
              
      const user = await auth.getCurrentUser();
      this.setState({ user });
      //toast.error("Loading issues......"+user.username);
    } catch (ex) {
      toast.error("Loading user issues......");
     
    }
      
  }

  render() {
    const { user } = this.state;
    const useraccesseses=this.state.useraccesseses
    
    return (
      <React.Fragment>
       
       
          <Col
            style={{
              textAlign: "left",
              alignItems: "left",
              justifyContent: "center",
            }}
          >
            
            <Card className=" shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <Row>
                  <Col>
                  <Autmenu user={user} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <Header />
                  </Col>
                </Row>
                <Row >
                  <Col xs={4} sm={2} md={2.06} lg={3}>
                    <>
                      
                        <NavBar
                          user={user} 
                          
                        />
                      
                    </> 
                    
                  </Col >
                  <Col xs={8} sm={6} md={6.04} lg={9}>
                  
                {/*<WelcomeNav/> */}
                <Switch>
                      {/**------------common */}
                      <Route path="/not-found" component={NotFound} />
                      <Route path="/home" component={Home} />
                      {/**-------------------security----------- */}
                      <Route path="/register" component={RegisterForm} />
                      <Route path="/login" component={LoginForm} />
                      <Route path="/logout" component={Logout} />
                      <Route path="/security/addrole" component={AddRole} />
                      <Route path="/security/role" component={Roles} />
                      <Route path="/security/addrole" component={AddRole} />

                      <Route
                        path="/security/auditTrail"
                        component={AuditTrail}
                      />
                      <Route
                        path="/security/securables"
                        component={Securables}
                      />
                      <Route path="/security/users" component={Users} />

                      <Route
                        path="/security/updaterole"
                        component={UpdateRole}
                      />
                       {/**--------------------revenu collection--------------------------------- */}
                      <Route path="/revenu/home" component={RevHome} />
                      <Route path="/revenu/sourceoffunds" component={Sources} />
                      <Route path="/revenu/revenuproduct" component={Product} />
                      <Route path="/revenu/revenupayment" component={Payment} />
                      <Route
                        path="/revenu/revenucorrection"
                        component={RevCorrection}
                      />
                      <Route
                        path="/revenu/viewpaternerservicepayment"
                        component={ViewPayment}
                      />
                      <Route
                        path="/revenu/businesspaterner"
                        component={Business}
                      />
                      <Route
                        path="/revenu/paternerservice"
                        component={Paterner}
                      />
                      <Route
                        path="/revenu/servicepayment"
                        component={ServicePayment}
                      />
                      <Route
                        path="/revenu/paternerservicepayment"
                        component={PaternerServicePayment}
                      />
                      <Route path="/revenu/upload" component={Revupload} />
                       {/**----------------------------------------------------- */}

                      <Route path="/planing/program" component={Program} />
                      <Route
                        path="/planing/programtable"
                        component={ProgramTable}
                      />
                      <Route path="/planing/sap" component={ViewSAP} />

                       {/**----------------------------------------------------- */}
                       <Route
                        path="/ContractManagemenrt/contract/fiscalyearcontracttype"
                        component={FiscalYearContractType}
                      />
                      <Route
                        path="/ContractManagemenrt/contract/Project"
                        component={Project}
                      />

                       {/**----------------------------------------------------- */}
                       <Route
                        path="/ContractManagemenrt/RoadRefference/road"
                        component={road}
                      />
                      <Route
                        path="/ContractManagemenrt/RoadRefference/roadCharacteristic"
                        component={roadCharacteristic}
                      />
                      <Route
                        path="/ContractManagemenrt/RoadRefference/roadClassification"
                        component={roadClassification}
                      />
                      <Route
                        path="/ContractManagemenrt/RoadRefference/roadType"
                        component={roadType}
                      />

                      <Route
                        path="/ContractManagemenrt/contract/contractor"
                        component={Contractor}
                      />
                      <Route
                        path="/ContractManagemenrt/contract/contractinspection"
                        component={ContractInpection}
                      />
                      <Route
                        path="/ContractManagemenrt/contract/contractpayment"
                        component={ContractPayment}
                      />
                      

                      
                      <Route 
                        path="/ContractManagemenrt/contract/contract"
                        component={Contract}
                      />
                      
                      <Route
                        path="/ContractManagemenrt/contract/ServiceOrder"
                        component={ServiceOrder}
                      />
                      
                      
                      

                      <Route
                        path="/ContractManagemenrt/inspection"
                        component={RoadInpection}
                      />



                      {/**----------------------------------------------------- */}
                       
                      <Redirect from="/security" exact to="/security/addrole" />

                      <Redirect from="/" exact to="/Home" />
                      
                    </Switch> 
                  </Col>
                </Row>
                <Row>
                  <Footer />
                </Row>
              </CardBody>
            </Card>
          </Col>
       
        
      </React.Fragment> 
    );
  }
}

export default Welcome;
