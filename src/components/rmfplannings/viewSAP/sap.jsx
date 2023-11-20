import React, { Component } from "react";
import Modal from "./modal";
import AddModal from "./addroleModal";
import Rejectionmsg from "./rejectionmsg";
import { toast } from "react-toastify";
import { MdNotificationsActive } from "react-icons/md";
//import { Link } from "react-router-dom";
import * as Source from "../../../services/RevenuRessources/sourceofFundsServices";
import * as Business from "../../../services/RevenuRessources/businessPaternerServices";
import * as Outcome from "../../../services/RMFPlanning/outcomeService";
import * as UserApprovalData from "../../../services/security/userapprovalservice";
import * as UserData from "../../../services/security/userServices";
import * as auth from "../../../services/authService";
import jwtDecode from "jwt-decode";
import Pagination from "../../common/pagination";
//import Form from "../common/form";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import _ from "lodash";
import { async } from "./../../../services/RMFPlanning/stakeholderService";

class Sap extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      fiscalyear: "",
      outcomename: "",
      outcomeid: 0,
      statuses: "",
      outcomedescription: "",
      subprogramname: "",
      programname: "",
      approvmode:"",

      canapprov: true,
      canreview: true,
      sources: [],
      business: [],
      outcome: [],
      user: [],
      users: [],
      userapprovals: [],
      banks: [],
      currentPage: 1,
      pageSize: 4,
      requiredItem: 0,
      brochure: [],
      searchQuery: "",
      selectedrole: null,
      search: [],
      sortColumn: { path: "title", order: "asc" },
    };
  }
  async componentDidMount() {
    try {
      const user = auth.getJwt();
      this.setState({ user });
      const users = jwtDecode(user);
      this.setState({ users });
      const { data: userapprovals } =
        await UserApprovalData.getuserapprovalevel(users.username, "Planing");
      this.setState({ userapprovals });
      let approvmode="";
      {
        userapprovals.map(
          (userapprovals) => approvmode= userapprovals.approvallevel
        );
      }
      this.setState({approvmode});
      if (approvmode === "Approv") {
        this.setState({ canapprov: true, canreview: false });
        
      }else if (approvmode === "Verifier") {
        this.setState({ canapprov: false, canreview: true });
      }
     
      const { data: sources } = await Source.getSource();
      const { data: business } = await Business.getBusinessPaterners();
      const { data: outcome } = await Outcome.getoutcomes();

      this.setState({ sources, business, outcome });
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching data Please try again later" + ex
      );
    }
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleSearch = (query) => {
    //const { search } = await Role.getRolesearched(query);

    this.setState({ searchQuery: query, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      selectedrole,
      outcome: allsources,
    } = this.state;

    let filtered = allsources;
    if (searchQuery)
      filtered = allsources.filter(
        (m) =>
          m.OutComeName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.FiscalYear.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.OutcomeDescription.toLowerCase().startsWith(
            searchQuery.toLowerCase()
          ) ||
          m.SubProgramName.toLowerCase().startsWith(
            searchQuery.toLowerCase()
          ) ||
          m.ProgramName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.OutcomeId)
      filtered = allsources.filter(
        (m) => m.Outcome.OutcomeId === selectedrole.OutcomeId
      );
    ///////////////////////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const outcome = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: outcome };
  };
  handleapproval = async (outcomeid) => {
    try {
      const statuse = "Approved";
      if (!outcomeid) {
        toast.info(`the outcome you selected ${outcomeid} doesnot exist`);
      } else {
        await Outcome.updateoutcomestatus(outcomeid, statuse);
        toast.success(`this outcome  has been Approved successful`);
      }
    } catch (ex) {
      toast.error(`the Approval of this Outcome has been failed ${ex}`);
    }
  };

  handlereview = async (outcomeid) => {
    try {
      const statuse = "Verified";
      if (!outcomeid) {
        toast.info(`the User you selected ${outcomeid} doesnot exist`);
      } else {
        await Outcome.updateoutcomestatus(outcomeid, statuse);
        toast.success(`this outcome  has been reviewed successful`);
      }
    } catch (ex) {
      toast.error(`the reviewed of this Outcome has been failed ${ex}`);
    }
  };
  async replaceRejectedMsgItem(index, outcomeid, statuses) {
    this.setState({
      requiredItem: index,
      outcomeid: outcomeid,
      statuses: statuses,
    });
  }
  async replaceModalItem(
    index,
    fiscalyear,
    outcomename,
    outcomeid,
    statuses,
    outcomedescription,
    subprogramname,
    programname
  ) {
    this.setState({
      requiredItem: index,
      fiscalyear: fiscalyear,
      outcomename: outcomename,
      outcomeid: outcomeid,
      statuses: statuses,
      outcomedescription: outcomedescription,
      subprogramname: subprogramname,
      programname: programname,
    });

    try {
      await Outcome.addsappdf(fiscalyear, outcomename, outcomeid);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.rolename = ex.response.data;
        toast.error("Error:" + errors.rolename);
        this.setState({ errors });
      } else if (ex.response && ex.response.status === 409) {
        const errors = { ...this.state.errors };
        errors.rolename = ex.response.data;
        toast.error("Error:" + errors.rolename);
        this.setState({ errors });
      } else {
        toast.error(
          "An Error Occured, while saving role Please try again later"
        );
      }
    }
  }

  saveModalDetails(outcome) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.outcome;
    tempbrochure[requiredItem] = outcome;
    this.setState({ outcome: tempbrochure });
  }

  async deleteItem(InstitutionPartenerId) {
    //const { user } = this.state;

    try {
      if (!InstitutionPartenerId) {
        toast.info(`the Institution Partener you selected  doesnot exist`);
      } else {
        await Business.deleteBusinessPaterner(InstitutionPartenerId);
        toast.success(`this Institution Partener has been deleted successful`);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.rolename = ex.response.data;
        toast.error("Error:" + errors.rolename);
        this.setState({ errors });
      } else if (ex.response && ex.response.status === 409) {
        const errors = { ...this.state.errors };
        errors.rolename = ex.response.data;
        toast.error("Error:" + errors.rolename);
        this.setState({ errors });
      } else {
        toast.error(
          "An Error Occured, while saving InstitutionPartener Please try again later"
        );
      }
    }
  }

  render() {
    
    
    
    const canapprov = this.state.canapprov;
    const canreview = this.state.canreview;
   
    const { length: count } = this.state.outcome;
    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: outcome } = this.getPagedData();

    const brochure = outcome.map((outcome, index) => {
      return (
        <tr key={outcome.outcomeid}>
          {" "}
          <td>{outcome.outcomename}</td>
          <td>{outcome.outcomedescription}</td>
          <td>{outcome.fiscalyear}</td>
          <td>{outcome.statuses}</td>
          <td>
            {" "}
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() =>
                this.replaceModalItem(
                  index,
                  outcome.fiscalyear,
                  outcome.outcomename,
                  outcome.outcomeid,
                  outcome.statuses,
                  outcome.outcomedescription,
                  outcome.subprogramname,
                  outcome.programname
                )
              }
            >
              ViewSAP
            </button>{" "}
          </td>
          <td>
            {canreview && outcome.statuses === "New" && (
              <button
                className="btn btn-success"
                onClick={() => this.handlereview(outcome.outcomeid)}
              >
                Review
              </button>
            )}

            {canapprov && outcome.statuses === "Verified" && (
              <button
                className="btn btn-success"
                onClick={() => this.handleapproval(outcome.outcomeid)}
              >
                Approval
              </button>
            )}

            
          </td>
          <td>
            {outcome.statuses !== "Approved" && (
              <button
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#exampleModalapprov"
                onClick={() =>
                  this.replaceRejectedMsgItem(
                    index,
                    outcome.outcomeid,
                    outcome.statuses
                  )
                }
              >
                Reject
              </button>
            )}
          </td>
          <td>
            <button className="btn btn-secondary">
              <MdNotificationsActive />
            </button>
          </td>
        </tr>
      );
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.outcome[requiredItem];
    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col
          style={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          ></Col>
          <Card className=" shadow border-0">
            <CardHeader className="bg-transparent ">
              <div className="text-muted text-center mt-2 mb-3">
                <h1>
                  <div style={{ textAlign: "center" }}>
                    <h1>RMF Planning- View SAP </h1>
                  </div>
                </h1>
              </div>
              <div className="btn-wrapper text-center"></div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div>
                {count === 0 && (
                  <>
                    <p>There are no SAP in Database.</p>
                    <AddModal />
                  </>
                )}
                {count !== 0 && (
                  <>
                    <div style={{ textAlign: "center" }}>
                      <SearchBox
                        value={searchQuery}
                        onChange={this.handleSearch}
                      />
                    </div>
                    <div className="table-responsive mb-5">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Outcome</th>
                            <th>Outcome description</th>
                            <th>Fiscal year</th>
                            <th>statuses</th>

                            <th>View SAP</th>
                            <th>Aproval</th>
                            <th>Reject</th>
                            <th>Reject Msg</th>
                          </tr>
                        </thead>
                        <tbody>{brochure}</tbody>
                      </table>
                    </div>
                    <Modal
                      OutcomeId={this.state.outcomeid}
                      OutComeName={this.state.outcomename}
                      FiscalYear={this.state.fiscalyear}
                      statuses={this.state.statuses}
                      OutcomeDescription={this.state.outcomedescription}
                      SubProgramName={this.state.subprogramname}
                      ProgramName={this.state.programname}
                      saveModalDetails={this.saveModalDetails}
                    />
                    <Rejectionmsg
                      outcomeid={this.state.outcomeid}
                      statuses={this.state.statuses}
                    />
                  </>
                )}

                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default Sap;
