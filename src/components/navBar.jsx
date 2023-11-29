import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import {
  FcPlanner,
  FcTimeline,
  FcTodoList,
  FcNeutralTrading,
  FcParallelTasks,
  FcComboChart,
} from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { FaPeopleCarry, FaRoad } from "react-icons/fa";
import {
  FcFeedIn,
  FcMoneyTransfer,
  FcSalesPerformance,
  FcConferenceCall,
  FcServices,
  FcDebt,
  FcCurrencyExchange,
} from "react-icons/fc";
import {
  FcBusinessman,
  FcPodiumWithSpeaker,
  FcBiotech,
  FcUnlock,
} from "react-icons/fc";
import { BiSolidShoppingBag } from "react-icons/bi";
import * as FisclaYearData from "../services/RMFPlanning/fiscalYearService";
import {
  MdPermContactCalendar,
  MdManageAccounts,
  MdOutlineAddRoad,
  MdMergeType,
} from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ExpendableButton } from "../components/ContractManagemenrt/ContractSettings/contractor/ExpendableButton";
import { FcPlus, FcSynchronize } from "react-icons/fc";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineWeibo,
  AiOutlineShop,
} from "react-icons/ai";
import { GiPayMoney } from "react-icons/gi";
import { toast } from "react-toastify";
import useOpenController from "../components/ContractManagemenrt/ContractSettings/contractor/Hooks/useOpenController";
import * as Contract from "../services/ContractManagement/ContractSetting/contractservice";

import * as UserAccessData from "../services/security/securableService";
import jwtDecode from "jwt-decode";
import { BiSubdirectoryRight } from "react-icons/bi";
import * as ContractType from "../services/ContractManagement/ContractSetting/contractTypeService";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight, FaCoins } from "react-icons/fa";
import { GiLookAt, GiRoad } from "react-icons/gi";
import auth from "../services/authService";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import * as FiscalYear from "../services/RMFPlanning/fiscalYearService";
import * as FiscalYearContractType from "../services/ContractManagement/ContractSetting/Fiscalyearcontracttypeservice";
import * as Projectdata from "../services/ContractManagement/ContractSetting/projectservice";

import ContractTypeMenu from "./Menu/contracttype";
import ContractTypeMenuinspection from "./MenuInspection/contracttype";
import ContractTypeMenupayment from "./MenuPayment/contracttype";

import "../home.css";
const NavBar = ({ user, fiscalyearid, fiscalyearname }) => {
  //---------------------------------------------------------------------------
  const [canaccessDashboard, setCanaccessDashboard] = useState();
  const [canaccessRevenue, setCanaccessRevenue] = useState();
  const [canaccessSecurity, setCanaccessSecurity] = useState();
  const [canaccessPlanning, setCanaccessPlanning] = useState();
  const [canaccesscontract, setCanaccesscontract] = useState();
  const [canaccesslookup, setCanaccesslookup] = useState();
  const [useraccess, setuseraccess] = useState([]);
  const [emails, setemails] = useState([]);
  const [email, setemail] = useState(user.username);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const username = auth.getJwt();
        const jwt = jwtDecode(username);
        const { data } = await UserAccessData.getsecurableaccess(
          jwt.username,
          27
        );
        setuseraccess(data);

        data.forEach((object, index) => {
          setCanaccessDashboard(object.canaccess);
        });
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading Fiscal Year Contract Type data.........." +
        ex
    );
  }
  //---revenu
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const username = auth.getJwt();
        const jwt = jwtDecode(username);
        const { data } = await UserAccessData.getsecurableaccess(
          jwt.username,
          25
        );
        setuseraccess(data);

        data.forEach((object, index) => {
          setCanaccessRevenue(object.canaccess);
        });
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading Fiscal Year Contract Type data.........." +
        ex
    );
  } //--security
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const username = auth.getJwt();
        const jwt = jwtDecode(username);
        const { data } = await UserAccessData.getsecurableaccess(
          jwt.username,
          16
        );
        setuseraccess(data);

        data.forEach((object, index) => {
          setCanaccessSecurity(object.canaccess);
        });
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading Fiscal Year Contract Type data.........." +
        ex
    );
  }
  //--planing
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const username = auth.getJwt();
        const jwt = jwtDecode(username);
        const { data } = await UserAccessData.getsecurableaccess(
          jwt.username,
          11
        );
        setuseraccess(data);

        data.forEach((object, index) => {
          setCanaccessPlanning(object.canaccess);
        });
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading Fiscal Year Contract Type data.........." +
        ex
    );
  } //--contract management
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const username = auth.getJwt();
        const jwt = jwtDecode(username);
        const { data } = await UserAccessData.getsecurableaccess(
          jwt.username,
          26
        );
        setuseraccess(data);

        data.forEach((object, index) => {
          setCanaccesscontract(object.canaccess);
        });
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading Fiscal Year Contract Type data.........." +
        ex
    );
  } //--admin portal
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const username = auth.getJwt();
        const jwt = jwtDecode(username);
        const { data } = await UserAccessData.getsecurableaccess(
          jwt.username,
          16
        );
        setuseraccess(data);

        data.forEach((object, index) => {
          setCanaccessSecurity(object.canaccess);
        });
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading Fiscal Year Contract Type data.........." +
        ex
    );
  } //-- lookup
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const username = auth.getJwt();
        const jwt = jwtDecode(username);
        const { data } = await UserAccessData.getsecurableaccess(
          jwt.username,
          28
        );
        setuseraccess(data);

        data.forEach((object, index) => {
          setCanaccesslookup(object.canaccess);
        });
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading Fiscal Year Contract Type data.........." +
        ex
    );
  } //--

  //toast.error(useraccess.canaccess);
  //-----------------------------------------------------------------------------------
  const { isOpen, toggle } = useOpenController(false);
  const { isOpenrec, togglerec } = useOpenController(false);
  const { isOpenplan, toggleplan } = useOpenController(false);
  const { isOpencont, toggleCont } = useOpenController(false);
  const { isOpenfiscalyear, togglefiscalyear } = useOpenController(false);
  const { isOpenapprovalcontract, toggleapprovalcontract } =
    useOpenController(false);
  const { isOpenapprovalinspection, toggleapprovalinspection } =
    useOpenController(false);
  const { isOpenapproval, toggleapproval } = useOpenController(false);
  const { isOpencontracttype, togglecontracttype } = useOpenController(false);
  const { isOpenproject, toggleproject } = useOpenController(false);
  const { isOpenlookup, togglelookup } = useOpenController(false);
  const { isOpensecurity, togglesecurity } = useOpenController(false);
  const { isOpenlookcoll, togglelookcoll } = useOpenController(false);
  const { isOpenlookplan, togglelookplan } = useOpenController(false);
  const { isOpenlookcontr, togglelookcontr } = useOpenController(false);

  //-----------------------------------------------------------------------------------
  const [isopen, setOpenState] = useState(false);
  const [isopenrec, setOpenrecState] = useState(false);
  const [isopenplan, setOpenplanState] = useState(false);
  const [isopenapproval, setOpenapproval] = useState(false);
  const [isopenapprovalcontract, setOpenapprovalcontract] = useState(false);
  const [isopencont, setOpencontState] = useState(false);
  const [isopenfiscalyear, setOpenfiscalyearState] = useState(false);
  const [isopencontracttype, setOpencontracttypeState] = useState(false);
  const [isopenproject, setOpenprojectState] = useState(false);
  const [isopenlookup, setOpenlookupState] = useState(false);
  const [isopensecurity, setOpensecurityState] = useState(false);
  const [isopenlookcoll, setOpenlookcollState] = useState(false);
  const [isopenlookplan, setOpenlookplanState] = useState(false);
  const [isopenlookcontr, setOpenlookcontrState] = useState(false);
  const [isopenapprovalinspection, setOpenapprovalinspection] = useState(false);
  //------------------------------------------------------------------------
  const [fiscalYear, setFiscalYear] = useState([]);
  const [fiscalYearid, setFiscalYearid] = useState(0);
  const [fiscalyearcontracttypeid, setfiscalyearcontracttypeid] = useState(0);
  const [fiscalYearcontracttype, setFiscalYearcontracttype] = useState([]);
  const [project, setproject] = useState([]);
  //-----------------------------------------------------------------------------------
  const handleshowproject = async () => {
    <NavLink
      className="nav-item nav-link"
      to={{
        pathname: "/ContractManagemenrt/contract/Project",
        state: {
          fiscalyearcontracttypeid:
            fiscalYearcontracttype.fiscalyearcontracttypeid,
        },
      }}
    >
      {toast.error(
        "An Error Occured, while Loading contracttype data.........."
      )}
      {window.location.reload(false)}
    </NavLink>;
  };

  //--------------------------------------------------------------
  const handleClick = async (fiscalyearid) => {
    try {
      setFiscalYearid(fiscalyearid);

      const { data } =
        await FiscalYearContractType.getfiscalyearcontracttypeByfiscalyearId(
          fiscalYearid
        );
      setFiscalYearcontracttype(data);
    } catch (ex) {
      toast.error(
        "An Error Occured, while Loading contracttype data.........." + ex
      );
    }
  };
  //--------------------------------------------------------------
  const handleprojectClick = async (fiscalyearcontracttypeid) => {
    try {
      setfiscalyearcontracttypeid(fiscalyearcontracttypeid);

      const { data } = await Projectdata.getprojectsbyfiscalyearcontracttypeid(
        fiscalyearcontracttypeid
      );
      setproject(data);
    } catch (ex) {
      toast.error(
        "An Error Occured, while Loading contracttype data.........." + ex
      );
    }
  };

  //--------------------------------------------------------------------------------
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } =
          await FiscalYearContractType.getfiscalyearcontracttypeByfiscalyearId(
            fiscalYearid
          );
        setFiscalYearcontracttype(data);
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading Fiscal Year Contract Type data.........." +
        ex
    );
  }
  //--------------------------------------------------------------------------------
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } =
          await Projectdata.getprojectsbyfiscalyearcontracttypeid(
            fiscalyearcontracttypeid
          );
        setproject(data);
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading Fiscal Year Contract Type data.........." +
        ex
    );
  }

  //---------------------------------------
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } = await FiscalYear.getFiscalyears();
        setFiscalYear(data);
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading fiscal year data.........." + ex
    );
  }

  //---------------------------------------
  const brochure = fiscalYear.map((fiscalYear, index) => {
    return (
      <>
        <div className="row" key={fiscalYear.fiscalyearid}>
          <div className="col">{fiscalYear.fiscalyear}</div>
        </div>
      </>
    );
  });
  //---------------------------------------

  //canaccessSecurity;
  //canaccessPlanning;
  //canaccesscontract;

  //-----------------------------------------------------------------
  const FiscalYearContracttype = fiscalYearcontracttype.map(
    (fiscalYearcontracttype, index) => {
      return (
        <>
          <div
            className="row"
            key={fiscalYearcontracttype.fiscalyearcontracttypeid}
          >
            <div className="col">{fiscalYearcontracttype.contracttypename}</div>
          </div>
        </>
      );
    }
  );
  //--------------------------------------------
  function handleopenclick() {
    {
      /** 
   var coll = document.getElementsByClassName("collapsible");
   var i;

   for (i = 0; i < coll.length; i++) {
     coll[i].addEventListener("click", function () {
       this.classList.toggle("active");
       var content = this.nextElementSibling;
       if (content.style.display === "block") {
         content.style.display = "none";
       } else {
         content.style.display = "block";
       }
     });
   
     }
    */
    }
    setOpenrecState(!isopenrec);
    setOpenplanState(false);
    setOpensecurityState(false);
    setOpenlookupState(false);
    setOpenlookcollState(false);
    setOpencontState(false);
  }
  function handleopenplanningclick() {
    setOpenrecState(false);
    setOpensecurityState(false);
    setOpenlookupState(false);
    setOpenplanState(!isopenplan);
    setOpenlookcollState(false);
    setOpencontState(false);
  }
  function handleopencontractclick() {
    setOpenrecState(false);
    setOpenrecState(false);
    setOpensecurityState(false);
    setOpenlookupState(false);
    setOpenlookcollState(false);
    setOpencontState(!isopencont);
  }
  function handleopencontractcontractclick() {
    setOpenrecState(false);
    setOpenrecState(false);
    setOpensecurityState(false);
    setOpenlookupState(false);
    setOpenlookcollState(false);
    setOpenprojectState(!isopenproject);
    setOpencontracttypeState(false);
    setOpenfiscalyearState(false);
  }
  function handleopencontractinspectionclick() {
    setOpenrecState(false);
    setOpenrecState(false);
    setOpensecurityState(false);
    setOpenlookupState(false);
    setOpenlookcollState(false);
    setOpenprojectState(false);
    setOpenfiscalyearState(false);
    setOpencontracttypeState(!isopencontracttype);
  }
  function handleopencontractpaymentclick() {
    setOpenrecState(false);
    setOpenrecState(false);
    setOpensecurityState(false);
    setOpenlookupState(false);
    setOpenlookcollState(false);
    setOpencontracttypeState(false);
    setOpenprojectState(false);
    setOpenfiscalyearState(!isopenfiscalyear);
  }
  function handleopensecurityclick() {
    setOpenrecState(false);
    setOpenplanState(false);
    setOpenlookupState(false);
    setOpensecurityState(!isopensecurity);
    setOpenlookcollState(false);
    setOpencontState(false);
  }
  function handleopenlookupclick() {
    setOpenrecState(false);
    setOpenplanState(false);
    setOpensecurityState(false);
    setOpenlookupState(!isopenlookup);
    setOpenlookcollState(false);
    setOpencontState(false);
  }

  function handleopenlookupcollectionclick() {
    setOpenrecState(false);
    setOpenplanState(false);
    setOpensecurityState(false);
    setOpenlookcontrState(false);
    setOpencontState(false);
    setOpenlookcollState(!isopenlookcoll);
  }
  function handleopenlookupcontractclick() {
    setOpenrecState(false);
    setOpenplanState(false);
    setOpensecurityState(false);
    setOpenlookcollState(false);
    setOpencontState(false);
    setOpenlookcontrState(!isopenlookcontr);
  }
 
  //----------------------------------------------------
  const handleNavCollapse = () => {
    if (isNavCollapsed === true) setIsNavCollapsed(false);
    else setIsNavCollapsed(true);
  };

  //--------------------------------------------
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse`} id="navbarsExample09">
          {/*<div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarsExample09"
           ></div>*/}

          <div className="carid">
            <div id="sidebar-menu" className="row" style={{ width: 1820 }}>
              <div className="col">
                <button
                  type="button"
                  className="collapsible"
                  style={{ height: 60 }}
                >
                  <span className="">
                    <FcHome />
                    RUCS
                  </span>
                </button>
                <div class="content">
                  <p></p>
                </div>
              </div>
            </div>
            {canaccessDashboard && (
              <div className="row" style={{ width: 1820 }}>
                <button
                  type="button"
                  className="collapsible"
                  style={{ height: 60, left: 16 }}
                >
                  <DiSqllite isOpen={isOpen} toggle={toggle} />
                  <ExpendableButton isOpen={isOpen} toggle={toggle} />{" "}
                  <Link
                    className="navbar-brand text-info font-weight-bolder"
                    to="/home"
                  >
                    <div className="col">
                      <FcComboChart />
                      Dashbord
                    </div>
                  </Link>
                </button>
                <div class="content">
                  <p></p>
                </div>
              </div>
            )}

            {canaccessRevenue && (
              <div className="row" style={{ width: 1820 }}>
                <div className="col">
                  <button
                    type="button"
                    className="collapsible"
                    style={{ height: 60 }}
                    onClick={handleopenclick}
                  >
                    <DiSqllite isOpenrec={isOpenrec} toggle={togglerec} />
                    <ExpendableButton
                      isOpenrec={isOpenrec}
                      toggle={togglerec}
                    />
                    {"  "} {"  "} <FaPeopleCarry /> RMF Revenue Collection
                  </button>
                  {isopenrec && (
                    <div className="row">
                      {" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="col">
                        <div className="card" style={{ width: 430 }}>
                          <div className="vertical">
                            <br />
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to={{
                                  pathname: "/revenu/revenupayment",
                                  state: { fiscalyearid: fiscalyearid },
                                }}
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <FcMoneyTransfer />
                                    &nbsp;Collections unit rate
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to={{
                                  pathname: "/revenu/revenucorrection",
                                  state: {
                                    fiscalyearid: fiscalyearid,
                                    fiscalyearname: fiscalyearname,
                                  },
                                }}
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <FcFeedIn />
                                    &nbsp;Revenus Collection
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to="/revenu/administration"
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <MdManageAccounts />
                                    &nbsp;Administration
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to={{
                                  pathname: "/revenu/expenduture",
                                  state: {
                                    fiscalyearid: fiscalyearid,
                                    fiscalyearname: fiscalyearname,
                                  },
                                }}
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <GiPayMoney />
                                    &nbsp;Expenduture
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to={{
                                  pathname: "/revenu/dashboard",
                                  state: {
                                    fiscalyearid: fiscalyearid,
                                    fiscalyearname: fiscalyearname,
                                  },
                                }}
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <FcParallelTasks /> Revenu DashBoard
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {canaccessPlanning && (
              <div className="row" style={{ width: 1820 }}>
                <div className="col">
                  <button
                    type="button"
                    className="collapsible"
                    style={{ height: 60 }}
                    onClick={handleopenplanningclick}
                  >
                    <DiSqllite isOpenplan={isOpenplan} toggle={toggleplan} />
                    <ExpendableButton
                      isOpenplan={isOpenplan}
                      toggle={toggleplan}
                    />{" "}
                    <FcPlanner /> RMF Action Plan
                  </button>
                  {isopenplan && (
                    <div className="row">
                      {" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="col">
                        <div className="card" style={{ width: 430 }}>
                          <div className="vertical">
                            <br />
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to="/planing/programtable"
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <FcTimeline /> Planing Process
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to="/planing/administration"
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <MdManageAccounts />
                                    &nbsp;Administration
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to="/planing/sap"
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <FcTodoList /> View SAP
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {canaccesscontract && (
              <div className="row" style={{ width: 1820 }}>
                <div className="col">
                  <button
                    type="button"
                    className="collapsible"
                    style={{ height: 60 }}
                    onClick={handleopencontractclick}
                  >
                    <DiSqllite isOpencont={isOpencont} toggle={toggleCont} />
                    <ExpendableButton
                      isOpencont={isOpencont}
                      toggle={toggleCont}
                    />{" "}
                    <BiSolidShoppingBag /> RMF Contract Management
                  </button>
                  {isopencont && (
                    <div className="row">
                      {" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="col">
                        <div className="card" style={{ width: 430 }}>
                          <div className="vertical">
                            <br />
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to="/contractmanagemenrt/administration"
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <MdManageAccounts />
                                    &nbsp;Administration
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                            <div className="toggle">
                              <button
                                type="button"
                                className="collapsibles"
                                style={{ height: 40 }}
                                onClick={handleopencontractcontractclick}
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    &nbsp;&nbsp;&nbsp;
                                    <AiOutlineShop />
                                    &nbsp; Contracts
                                  </span>
                                </div>
                              </button>
                              {isopenproject && (
                                <div className="row">
                                  {" "}
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <div className="col">
                                    <div
                                      className="card"
                                      style={{ width: 400 }}
                                    >
                                      <div className="vertical">
                                        <br />
                                        <div className="toggle">
                                          <>
                                            {fiscalYear.map((fiscalYear) => (
                                              <ContractTypeMenu
                                                fiscalyearid={
                                                  fiscalYear.fiscalyearid
                                                }
                                                fiscalyear={
                                                  fiscalYear.fiscalyear
                                                }
                                              />
                                            ))}
                                          </>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="toggle">
                              <button
                                type="button"
                                className="collapsibles"
                                style={{ height: 40 }}
                                onClick={handleopencontractinspectionclick}
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    &nbsp;&nbsp;&nbsp;
                                    <AiOutlineWeibo />
                                    &nbsp; Inspection
                                  </span>
                                </div>
                              </button>
                              {isopencontracttype && (
                                <div className="row">
                                  {" "}
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <div className="col">
                                    <div
                                      className="card"
                                      style={{ width: 400 }}
                                    >
                                      <div className="vertical">
                                        <br />
                                        <div className="toggle">
                                          <>
                                            {fiscalYear.map((fiscalYear) => (
                                              <ContractTypeMenuinspection
                                                fiscalyearid={
                                                  fiscalYear.fiscalyearid
                                                }
                                                fiscalyear={
                                                  fiscalYear.fiscalyear
                                                }
                                              />
                                            ))}
                                          </>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="toggle">
                              <button
                                type="button"
                                className="collapsibles"
                                style={{ height: 40 }}
                                onClick={handleopencontractpaymentclick}
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    &nbsp;&nbsp;&nbsp;
                                    <FcMoneyTransfer />
                                    &nbsp; Payment
                                  </span>
                                </div>
                              </button>
                              {isopenfiscalyear && (
                                <div className="row">
                                  {" "}
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <div className="col">
                                    <div
                                      className="card"
                                      style={{ width: 400 }}
                                    >
                                      <div className="vertical">
                                        <br />
                                        <div className="toggle">
                                          <>
                                            {fiscalYear.map((fiscalYear) => (
                                              <ContractTypeMenupayment
                                                fiscalyearid={
                                                  fiscalYear.fiscalyearid
                                                }
                                                fiscalyear={
                                                  fiscalYear.fiscalyear
                                                }
                                              />
                                            ))}
                                          </>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {canaccessSecurity && (
              <div className="row" style={{ width: 1820 }}>
                <div className="col">
                  <button
                    type="button"
                    className="collapsible"
                    style={{ height: 60 }}
                    onClick={handleopensecurityclick}
                  >
                    <DiSqllite
                      isOpensecurity={isOpensecurity}
                      toggle={togglesecurity}
                    />
                    <ExpendableButton
                      isOpensecurity={isOpensecurity}
                      toggle={togglesecurity}
                    />{" "}
                    <MdManageAccounts /> RMF Administration Potal
                  </button>
                  {isopensecurity && (
                    <div className="row">
                      {" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="col">
                        <div className="card" style={{ width: 430 }}>
                          <div className="vertical">
                            <br />

                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to="/security/users"
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <FcBusinessman />
                                    Users
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to="/security/role"
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <FcPodiumWithSpeaker />
                                    Roles
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to="/security/securables"
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <FcTodoList />
                                    {""}Securables
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to="/security/userapproval"
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <FcApproval />
                                    User Approvals
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                            <div className="toggle">
                              <NavLink
                                className="nav-item nav-link"
                                to="/security/auditTrail"
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <FcBiotech />
                                    Audit Trail
                                  </span>
                                </div>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {canaccesslookup && (
              <div className="row" style={{ width: 1820 }}>
                <div className="col">
                  <button
                    type="button"
                    className="collapsible"
                    style={{ height: 60 }}
                    onClick={handleopenlookupclick}
                  >
                    <DiSqllite
                      isOpenlookup={isOpenlookup}
                      toggle={togglelookup}
                    />
                    <ExpendableButton
                      isOpenlookup={isOpenlookup}
                      toggle={togglelookup}
                    />{" "}
                    <GiLookAt /> RMF LookUp
                  </button>
                  {isopenlookup && (
                    <div className="row">
                      {" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="col">
                        <div className="card" style={{ width: 430 }}>
                          <div className="vertical">
                            <br />
                            <div className="toggle">
                              <button
                                type="button"
                                className="collapsibles"
                                style={{ height: 40 }}
                                onClick={handleopenlookupcollectionclick}
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <FaPeopleCarry /> Revenu Collection
                                  </span>
                                </div>
                              </button>
                              {isopenlookcoll && (
                                <div className="row">
                                  {" "}
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <div className="col">
                                    <div
                                      className="card"
                                      style={{ width: 400 }}
                                    >
                                      <div className="vertical">
                                        <br />
                                        <div className="toggle">
                                          <NavLink
                                            className="nav-item nav-link"
                                            to="/revenu/currency"
                                          >
                                            <div className="cardss ">
                                              <span className="nav-link-inner--text">
                                                <FaCoins />
                                                &nbsp; Currency
                                              </span>
                                            </div>
                                          </NavLink>
                                        </div>
                                        <div className="toggle">
                                          <NavLink
                                            className="nav-item nav-link"
                                            to="/revenu/sourceoffunds"
                                          >
                                            <div className="cardss ">
                                              <span className="nav-link-inner--text">
                                                <FcSalesPerformance /> Source of
                                                Funds
                                              </span>
                                            </div>
                                          </NavLink>
                                        </div>
                                        <div className="toggle">
                                          <NavLink
                                            className="nav-item nav-link"
                                            to="/revenu/revenuproduct"
                                          >
                                            <div className="cardss ">
                                              <span className="nav-link-inner--text">
                                                <FaPeopleCarry />
                                                &nbsp; Collections
                                              </span>
                                            </div>
                                          </NavLink>
                                        </div>
                                        <div className="toggle">
                                          <NavLink
                                            className="nav-item nav-link"
                                            to="/revenu/businesspaterner"
                                            tag={Link}
                                          >
                                            <div className="cardss ">
                                              <span className="nav-link-inner--text">
                                                <FcConferenceCall />
                                                &nbsp;Business Partener
                                              </span>
                                            </div>
                                          </NavLink>
                                        </div>
                                        <div className="toggle">
                                          <NavLink
                                            className="nav-item nav-link"
                                            to="/revenu/paternerservice"
                                            tag={Link}
                                          >
                                            <div className="cardss ">
                                              <span className="nav-link-inner--text">
                                                <FcServices />
                                                &nbsp;Partener Service
                                              </span>
                                            </div>
                                          </NavLink>
                                        </div>
                                        <div className="toggle">
                                          <NavLink
                                            className="nav-item nav-link"
                                            to="/revenu/servicepayment"
                                            tag={Link}
                                          >
                                            <div className="cardss ">
                                              <span className="nav-link-inner--text">
                                                <FcCurrencyExchange />
                                                &nbsp;Service Payment
                                              </span>
                                            </div>
                                          </NavLink>
                                        </div>
                                        <div className="toggle">
                                          <NavLink
                                            className="nav-item nav-link"
                                            to="/revenu/paternerservicepayment"
                                            tag={Link}
                                          >
                                            <div className="cardss ">
                                              <span className="nav-link-inner--text">
                                                <FcDebt />
                                                &nbsp;Paterner Service Payment
                                              </span>
                                            </div>
                                          </NavLink>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="toggle">
                              <button
                                type="button"
                                className="collapsibles"
                                style={{ height: 40 }}
                                onClick={handleopenlookupcontractclick}
                              >
                                <div className="cardss ">
                                  <span className="nav-link-inner--text">
                                    <BiSolidShoppingBag /> Contract Management
                                  </span>
                                </div>
                              </button>
                              {isopenlookcontr && (
                                <div className="row">
                                  {" "}
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <div className="col">
                                    <div
                                      className="card"
                                      style={{ width: 400 }}
                                    >
                                      <div className="vertical">
                                        <br />
                                        <div className="toggle">
                                          <NavLink
                                            className="nav-item nav-link"
                                            to="/ContractManagemenrt/RoadRefference/roadClassification"
                                          >
                                            <div className="cardss ">
                                              <span className="nav-link-inner--text">
                                                <GiRoad /> Road Classification
                                              </span>
                                            </div>
                                          </NavLink>
                                        </div>
                                        <div className="toggle">
                                          <NavLink
                                            className="nav-item nav-link"
                                            to="/ContractManagemenrt/RoadRefference/roadCharacteristic"
                                          >
                                            <div className="cardss ">
                                              <span className="nav-link-inner--text">
                                                <MdOutlineAddRoad /> Road
                                                Characteristics
                                              </span>
                                            </div>
                                          </NavLink>
                                        </div>
                                        <div className="toggle">
                                          <NavLink
                                            className="nav-item nav-link"
                                            to="/ContractManagemenrt/RoadRefference/roadType"
                                          >
                                            <div className="cardss ">
                                              <span className="nav-link-inner--text">
                                                <FaRoad /> Rood Types
                                              </span>
                                            </div>
                                          </NavLink>
                                        </div>
                                        <div className="toggle">
                                          <NavLink
                                            className="nav-item nav-link"
                                            to="/ContractManagemenrt/RoadRefference/road"
                                          >
                                            <div className="cardss ">
                                              <span className="nav-link-inner--text">
                                                <FcTimeline /> Road
                                              </span>
                                            </div>
                                          </NavLink>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
