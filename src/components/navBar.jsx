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
import { toast } from "react-toastify";
import useOpenController from "../components/ContractManagemenrt/ContractSettings/contractor/Hooks/useOpenController";
import * as Contract from "../services/ContractManagement/ContractSetting/contractservice";

import * as UserAccessData from "../services/security/securableService";
import jwtDecode from "jwt-decode";
import { BiSubdirectoryRight } from "react-icons/bi";
import * as ContractType from "../services/ContractManagement/ContractSetting/contractTypeService";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight } from "react-icons/fa";
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
const NavBar = ({ user }) => {
  //---------------------------------------------------------------------------
  const [canaccessDashboard, setCanaccessDashboard] = useState();
  const [canaccessRevenue, setCanaccessRevenue] = useState();
  const [canaccessSecurity, setCanaccessSecurity] = useState();
  const [canaccessPlanning, setCanaccessPlanning] = useState();
  const [canaccesscontract, setCanaccesscontract] = useState();
  const [useraccess, setuseraccess] = useState([]);
  const [emails, setemails] = useState([]);
  const [email, setemail] = useState(user.username);

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
  } //--

  //toast.error(useraccess.canaccess);
  //-----------------------------------------------------------------------------------
  const { isOpen, toggle } = useOpenController(false);
  const { isOpenrec, togglerec } = useOpenController(false);
  const { isOpenplan, toggleplan } = useOpenController(false);
  const { isOpencont, toggleCont } = useOpenController(false);
  const { isOpenfiscalyear, togglefiscalyear } = useOpenController(false);
  const { isOpencontracttype, togglecontracttype } = useOpenController(false);
  const { isOpenproject, toggleproject } = useOpenController(false);
  const { isOpenlookup, togglelookup } = useOpenController(false);
  const { isOpensecurity, togglesecurity } = useOpenController(false);

  //-----------------------------------------------------------------------------------
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
  //----------------------------------------------------
  return (
    <div
      style={{
        display: "flex",
        height: 600,
        width: 480,
        padding: 15,
        margin: 15,
        border: 0,
        alignItems: "left",
        justifyContent: "left",
      }}
    >
      {" "}
      <div className="table-responsive mb-5">
        <table className="table-hover" style={{ width: 380 }}>
          <thead>
            <th></th>
            <th></th>
            <th></th>
            <th style={{ width: 20 }}></th>
            <th style={{ width: 20 }}></th>
            <th style={{ width: 20 }}></th>
          </thead>
          <tbody>
            <tr className="table table-non bordered">
              <td>
                {" "}
                <Link
                  className="navbar-brand text-info font-weight-bolder"
                  to="/home"
                >
                  <span className="">
                    <FcHome />
                    RUCS
                  </span>
                </Link>
              </td>
            </tr>
            {canaccessDashboard && (
              <tr className="w-25">
                <td colspan="3">
                  <FcComboChart />
                  Dashbord
                </td>
                <td>
                  <div className="whitespace-nowrap">
                    <DiSqllite isOpen={isOpen} toggle={toggle} />
                    <ExpendableButton isOpen={isOpen} toggle={toggle} />
                  </div>
                </td>
              </tr>
            )}
            {canaccessRevenue && (
              <tr>
                <td colspan="3">
                  <div style={{ display: "inline-block" }}>
                    <FaPeopleCarry /> RMF Revenue Collection
                  </div>
                </td>
                <td>
                  <div className="whitespace-nowrap">
                    <DiSqllite isOpenrec={isOpenrec} toggle={togglerec} />
                    <ExpendableButton
                      isOpenrec={isOpenrec}
                      toggle={togglerec}
                    />
                  </div>
                </td>
              </tr>
            )}
            {isOpenrec && (
              <>
                <tr>
                  <td colspan="4">
                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/revenu/sourceoffunds"
                      >
                        <div class="col">
                          <FcSalesPerformance /> Source of Funds
                        </div>
                      </NavLink>
                    </div>
                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/revenu/revenuproduct"
                      >
                        <div class="col">
                          <i className="ni ni-key-25" />
                          <span className="nav-link-inner--text">
                            <FaPeopleCarry />
                            &nbsp; Revenus Products
                          </span>
                        </div>
                      </NavLink>
                    </div>

                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/revenu/revenupayment"
                      >
                        <div class="col">
                          <i className="ni ni-key-25" />
                          <span className="nav-link-inner--text">
                            <FcMoneyTransfer />
                            &nbsp;Revenus Payment
                          </span>
                        </div>
                      </NavLink>
                    </div>

                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/revenu/revenucorrection"
                      >
                        <div class="col">
                          <i className="ni ni-key-25" />
                          <span className="nav-link-inner--text">
                            <FcFeedIn />
                            &nbsp;Revenus Collection
                          </span>
                        </div>
                      </NavLink>
                    </div>

                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/revenu/businesspaterner"
                        tag={Link}
                      >
                        <div class="col">
                          <i className="ni ni-key-25" />
                          <span className="nav-link-inner--text">
                            <FcConferenceCall />
                            &nbsp;Business Partener
                          </span>
                        </div>
                      </NavLink>
                    </div>

                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/revenu/paternerservice"
                        tag={Link}
                      >
                        <div class="col">
                          <i className="ni ni-key-25" />
                          <span className="nav-link-inner--text">
                            <FcServices />
                            &nbsp;Partener Service
                          </span>
                        </div>
                      </NavLink>
                    </div>

                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/revenu/servicepayment"
                        tag={Link}
                      >
                        <div class="col">
                          <i className="ni ni-key-25" />
                          <span className="nav-link-inner--text">
                            <FcCurrencyExchange />
                            &nbsp;Service Payment
                          </span>
                        </div>
                      </NavLink>
                    </div>

                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/revenu/paternerservicepayment"
                        tag={Link}
                      >
                        <div class="col">
                          <i className="ni ni-key-25" />
                          <span className="nav-link-inner--text">
                            <FcDebt />
                            &nbsp;Paterner Service Payment
                          </span>
                        </div>
                      </NavLink>
                    </div>

                    <div class="row">
                      <NavLink className="nav-item nav-link" to="/revenu/home">
                        <div class="col">
                          <i className="ni ni-key-25" />
                          <span className="nav-link-inner--text">
                            <FcParallelTasks /> Revenu DashBoard
                          </span>
                        </div>
                      </NavLink>
                    </div>
                  </td>
                </tr>
              </>
            )}
            {canaccessPlanning && (
              <tr>
                <td colspan="3">
                  <div style={{ display: "inline-block" }}>
                    <FcPlanner /> RMF Action Plan
                  </div>
                </td>
                <td>
                  <div className="whitespace-nowrap">
                    <DiSqllite isOpenplan={isOpenplan} toggle={toggleplan} />
                    <ExpendableButton
                      isOpenplan={isOpenplan}
                      toggle={toggleplan}
                    />
                  </div>
                </td>
              </tr>
            )}
            {isOpenplan && (
              <>
                <tr>
                  <td colspan="4">
                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/planing/programtable"
                      >
                        <div class="col">
                          <FcTimeline /> Planing Process
                        </div>
                      </NavLink>
                    </div>
                    <div class="row">
                      <NavLink className="nav-item nav-link" to="/planing/sap">
                        <div class="col">
                          <i className="ni ni-key-25" />
                          <span className="nav-link-inner--text">
                            <FcTodoList /> View SAP
                          </span>
                        </div>
                      </NavLink>
                    </div>

                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/planing/programtable"
                      >
                        <div class="col">
                          <i className="ni ni-key-25" />
                          <span className="nav-link-inner--text">
                            <FcNeutralTrading /> Upload SAP
                          </span>
                        </div>
                      </NavLink>
                    </div>

                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/planing/programtable"
                      >
                        <div class="col">
                          <i className="ni ni-key-25" />
                          <span className="nav-link-inner--text">
                            <FcParallelTasks /> Planing DashBoard
                          </span>
                        </div>
                      </NavLink>
                    </div>
                  </td>
                </tr>
              </>
            )}
            {canaccesscontract && (
              <tr>
                <td colspan="3">
                  <div style={{ display: "inline-block" }}>
                    <BiSolidShoppingBag /> RMF Contract Management
                  </div>
                </td>
                <td>
                  {" "}
                  <div className="whitespace-nowrap">
                    <DiSqllite isOpencont={isOpencont} toggle={toggleCont} />
                    <ExpendableButton
                      isOpencont={isOpencont}
                      toggle={toggleCont}
                    />
                  </div>
                </td>
              </tr>
            )}
            {isOpencont && (
              <>
                <tr>
                  <td colspan="3">
                    <div style={{ display: "inline-block" }}>
                      <AiOutlineShop /> Contracts
                    </div>
                  </td>
                  <td>
                    {" "}
                    <div className="whitespace-nowrap">
                      <DiSqllite
                        isOpenproject={isOpenproject}
                        toggle={toggleproject}
                      />
                      <ExpendableButton
                        isOpenproject={isOpenproject}
                        toggle={toggleproject}
                      />
                    </div>
                  </td>
                </tr>
                {isOpenproject && (
                  <>
                    {fiscalYear.map((fiscalYear) => (
                      <ContractTypeMenu
                        fiscalyearid={fiscalYear.fiscalyearid}
                        fiscalyear={fiscalYear.fiscalyear}
                      />
                    ))}
                  </>
                )}
                <tr>
                  <td colspan="3">
                    <div style={{ display: "inline-block" }}>
                      <AiOutlineWeibo /> Inspection
                    </div>
                  </td>
                  <td>
                    {" "}
                    <div className="whitespace-nowrap">
                      <DiSqllite
                        isOpencontracttype={isOpencontracttype}
                        toggle={togglecontracttype}
                      />
                      <ExpendableButton
                        isOpencontracttype={isOpencontracttype}
                        toggle={togglecontracttype}
                      />
                    </div>
                  </td>
                </tr>
                {isOpencontracttype && (
                  <>
                    {fiscalYear.map((fiscalYear) => (
                      <ContractTypeMenuinspection
                        fiscalyearid={fiscalYear.fiscalyearid}
                        fiscalyear={fiscalYear.fiscalyear}
                      />
                    ))}
                  </>
                )}
                <tr>
                  <td colspan="3">
                    <div style={{ display: "inline-block" }}>
                      <FcMoneyTransfer /> Payment
                    </div>
                  </td>
                  <td>
                    {" "}
                    <div className="whitespace-nowrap">
                      <DiSqllite
                        isOpenfiscalyear={isOpenfiscalyear}
                        toggle={togglefiscalyear}
                      />
                      <ExpendableButton
                        isOpenfiscalyear={isOpenfiscalyear}
                        toggle={togglefiscalyear}
                      />
                    </div>
                  </td>
                </tr>
                {isOpenfiscalyear && (
                  <>
                    {fiscalYear.map((fiscalYear) => (
                      <ContractTypeMenupayment
                        fiscalyearid={fiscalYear.fiscalyearid}
                        fiscalyear={fiscalYear.fiscalyear}
                      />
                    ))}
                  </>
                )}
              </>
            )}
            <tr>
              <td colspan="3">
                <div style={{ display: "inline-block" }}>
                  <MdManageAccounts /> RMF Administration Potal
                </div>
              </td>
              <td>
                {/** isOpensecurity; togglesecurity; */}
                <div className="whitespace-nowrap">
                  <DiSqllite
                    isOpensecurity={isOpensecurity}
                    toggle={togglesecurity}
                  />
                  <ExpendableButton
                    isOpensecurity={isOpensecurity}
                    toggle={togglesecurity}
                  />
                </div>
              </td>
            </tr>
            {isOpensecurity && (
              <>
                <td colspan="4">
                  <div class="col">
                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/security/users"
                      >
                        <div class="col">
                          <span className="">
                            <FcBusinessman />
                            Users
                          </span>
                        </div>
                      </NavLink>
                    </div>
                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/security/role"
                      >
                        <div class="col">
                          <span className="nav-link-inner--text">
                            <FcPodiumWithSpeaker />
                            Roles
                          </span>
                        </div>
                      </NavLink>
                    </div>
                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/security/securables"
                      >
                        <div class="col">
                          <span className="nav-link-inner--text">
                            <FcTodoList />
                            {""}Securables
                          </span>
                        </div>
                      </NavLink>
                    </div>
                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/security/auditTrail"
                      >
                        <div class="col">
                          <span className="nav-link-inner--text">
                            <FcBiotech />
                            Audit Trail
                          </span>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </td>
              </>
            )}
            <tr>
              <td colspan="3">
                <div style={{ display: "inline-block" }}>
                  <GiLookAt /> RMF LookUp
                </div>
              </td>
              <td>
                <div className="whitespace-nowrap">
                  <DiSqllite
                    isOpenlookup={isOpenlookup}
                    toggle={togglelookup}
                  />
                  <ExpendableButton
                    isOpenlookup={isOpenlookup}
                    toggle={togglelookup}
                  />
                  {/**isOpenlookup, togglelookup */}
                </div>
              </td>
            </tr>
            {isOpenlookup && (
              <>
                <td colspan="4">
                  <div class="col">
                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/ContractManagemenrt/RoadRefference/roadClassification"
                      >
                        <div class="col">
                          <GiRoad /> Road Classification
                        </div>
                      </NavLink>
                    </div>
                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/ContractManagemenrt/RoadRefference/roadCharacteristic"
                      >
                        <div class="col">
                          <MdOutlineAddRoad /> Road Characteristics
                        </div>
                      </NavLink>
                    </div>
                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/ContractManagemenrt/RoadRefference/roadType"
                      >
                        <div class="col">
                          <FaRoad /> Rood Types
                        </div>
                      </NavLink>
                    </div>
                    <div class="row">
                      <NavLink
                        className="nav-item nav-link"
                        to="/ContractManagemenrt/RoadRefference/road"
                      >
                        <div class="col">
                          <FcTimeline /> Road
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </td>
              </>
            )}{" "}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NavBar;
