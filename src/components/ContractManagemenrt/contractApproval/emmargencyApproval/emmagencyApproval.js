import React, { Component } from "react";
import Modal from "./modal";
import AddModal from "./addroleModal";
import Rejectionmsg from "./rejectionmsg";
import { toast } from "react-toastify";
import { MdNotificationsActive } from "react-icons/md";
//import { Link } from "react-router-dom";
import * as Source from "../../../../services/RevenuRessources/sourceofFundsServices";
import * as Business from "../../../../services/RevenuRessources/businessPaternerServices";
import * as Outcome from "../../../../services/RMFPlanning/outcomeService";
import * as FiscalYear from "../../../../services/RMFPlanning/fiscalYearService";
import * as ContractData from "../../../../services/ContractManagement/ContractSetting/contractservice";

import Pagination from "../../../common/pagination";
//import Form from "../common/form";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { paginate } from "../../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../../searchBox";
import _ from "lodash";
 
class EmmargencyApproval extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      fiscalyearid: this.props.fiscalyearid,
      fiscalyearid:7,
      fiscalyear: "",
      outcomename: "",
      outcomeid: 0,
      statuses: "",
      outcomedescription: "",
      subprogramname: "",
      programname: "",
      contractid: 0,
      contractdiscription: "",
      contractbudget: 0,
      contractorstartdate: "",
      contractorenddate: "",
      contractmodeid: 0,
      contractmode: "",
      contractorid: 0,
      contractorname: "",
      contractoraddress: "",
      contractoremail: "",
      contractorphonenumber: "",
      tinnumber: "",
      contactpersonfirstname: "",
      contactpersonmiddlename: "",
      contactpersonlastname: "",
      contactpersonemail: "",
      contactpersonphonenumber: "",
      maintenancetypeid: 0,
      maintenancetypename: "",
      roadid: 0,
      roadname: "",
      roaddistance: 0,
      targetid: 0,
      targetname: "",
      startquartid: 0,
      startquarter: "",
      endquarterid: 0,
      endquarter: "",
      projecttypeid: 0,
      projecttypename: "",
      cancreateserviceorder: false,
      projectid: 0,
      projectdescription: "",
      budgetallocatetotheroad: 0,
      projectstartingdate: "",
      projectendingdate: "",
      status: "",
      projectlength: 0,
      projectref: "",
      measurementname: "",

      canapprov: true,
      canreview: true,
      sources: [],
      business: [],
      outcome: [],
      contracts: [],
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
      const { data: sources } = await Source.getSource();
      const { data: business } = await Business.getBusinessPaterners();
      const { data: outcome } = await ContractData.getcontractByfiscalyear(
        this.state.fiscalyearid
      );
      const { data: contracts } = await ContractData.getcontractByfiscalyear(
        this.state.fiscalyearid
      );
     this.setState({ sources, business, outcome, contracts });
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
          m.contractdiscription
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.contractmode.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.projecttypename.toLowerCase().startsWith(searchQuery.toLowerCase())
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
  handleapproval = async (contractid) => {
    try {
      const statuse = "Approved";
      if (!contractid) {
        toast.info(`the outcome you selected ${contractid} doesnot exist`);
      } else {
        await ContractData.updatecontractstatus(contractid, statuse);
        toast.success(`this contract  has been Approved successful`);
      }
    } catch (ex) {
      toast.error(`the Approval of this contract has been failed ${ex}`);
    }
  };

  handlereview = async (contractid) => {
    try {
      const statuse = "Verified";
      if (!contractid) {
        toast.info(`the User you selected ${contractid} doesnot exist`);
      } else {
        await ContractData.updatecontractstatus(contractid, statuse);
        toast.success(`this contract  has been reviewed successful`);
      }
    } catch (ex) {
      toast.error(`the reviewed of this contract has been failed ${ex}`);
    }
  };
  async replaceRejectedMsgItem(index, contractid, status) {
    this.setState({
      requiredItem: index,
      contractid: contractid,
      status: status,
    });
  }
  async replaceModalItem(
    index,
    contractid,
    contractdiscription,
    contractbudget,
    contractorstartdate,
    contractorenddate,
    contractmodeid,
    contractmode,
    contractorid,
    contractorname,
    contractoraddress,
    contractoremail,
    contractorphonenumber,
    tinnumber,
    contactpersonfirstname,
    contactpersonmiddlename,
    contactpersonlastname,
    contactpersonemail,
    contactpersonphonenumber,
    maintenancetypeid,
    maintenancetypename,
    roadid,
    roadname,
    roaddistance,
    targetid,
    targetname,
    startquartid,
    startquarter,
    endquarterid,
    endquarter,
    fiscalyearid,
    fiscalyear,
    projecttypeid,
    projecttypename,
    cancreateserviceorder,
    projectid,
    projectdescription,
    budgetallocatetotheroad,
    projectstartingdate,
    projectendingdate,
    status,
    projectlength,
    projectref,
    measurementname
  ) {
    this.setState({
      requiredItem: index,
      contractid: contractid,
      contractdiscription: contractdiscription,
      contractbudget: contractbudget,
      contractorstartdate: contractorstartdate,
      contractorenddate: contractorenddate,
      contractmodeid: contractmodeid,
      contractmode: contractmode,
      contractorid: contractorid,
      contractorname: contractorname,
      contractoraddress: contractoraddress,
      contractoremail: contractoremail,
      contractorphonenumber: contractorphonenumber,
      tinnumber: tinnumber,
      contactpersonfirstname: contactpersonfirstname,
      contactpersonmiddlename: contactpersonmiddlename,
      contactpersonlastname: contactpersonlastname,
      contactpersonemail: contactpersonemail,
      contactpersonphonenumber: contactpersonphonenumber,
      maintenancetypeid: maintenancetypeid,
      maintenancetypename: maintenancetypename,
      roadid: roadid,
      roadname: roadname,
      roaddistance: roaddistance,
      targetid: targetid,
      targetname: targetname,
      startquartid: startquartid,
      startquarter: startquarter,
      endquarterid: endquarterid,
      endquarter: endquarter,
      fiscalyearid: fiscalyearid,
      fiscalyear: fiscalyear,
      projecttypeid: projecttypeid,
      projecttypename: projecttypename,
      cancreateserviceorder: cancreateserviceorder,
      projectid: projectid,
      projectdescription: projectdescription,
      budgetallocatetotheroad: budgetallocatetotheroad,
      projectstartingdate: projectstartingdate,
      projectendingdate: projectendingdate,
      status: status,
      projectlength: projectlength,
      projectref: projectref,
      measurementname: measurementname,
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
        <tr key={outcome.contractid}>
          {" "}
          <td>{outcome.contractdiscription}</td>
          <td>{outcome.contractmode}</td>
          <td>{outcome.projecttypename}</td>
          <td>{outcome.contractbudget}</td>
          <td>{outcome.status}</td>
          <td>
            {" "}
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() =>
                this.replaceModalItem(
                  index,
                  outcome.contractid,
                  outcome.contractdiscription,
                  outcome.contractbudget,
                  outcome.contractorstartdate,
                  outcome.contractorenddate,
                  outcome.contractmodeid,
                  outcome.contractmode,
                  outcome.contractorid,
                  outcome.contractorname,
                  outcome.contractoraddress,
                  outcome.contractoremail,
                  outcome.contractorphonenumber,
                  outcome.tinnumber,
                  outcome.contactpersonfirstname,
                  outcome.contactpersonmiddlename,
                  outcome.contactpersonlastname,
                  outcome.contactpersonemail,
                  outcome.contactpersonphonenumber,
                  outcome.maintenancetypeid,
                  outcome.maintenancetypename,
                  outcome.roadid,
                  outcome.roadname,
                  outcome.roaddistance,
                  outcome.targetid,
                  outcome.targetname,
                  outcome.startquartid,
                  outcome.startquarter,
                  outcome.endquarterid,
                  outcome.endquarter,
                  outcome.fiscalyearid,
                  outcome.fiscalyear,
                  outcome.projecttypeid,
                  outcome.projecttypename,
                  outcome.cancreateserviceorder,
                  outcome.projectid,
                  outcome.projectdescription,
                  outcome.budgetallocatetotheroad,
                  outcome.projectstartingdate,
                  outcome.projectendingdate,
                  outcome.status,
                  outcome.projectlength,
                  outcome.projectref,
                  outcome.measurementname
                )
              }
            >
              View
            </button>{" "}
          </td>
          <td>
            {canapprov && outcome.status === "New" && (
              <button
                className="btn btn-success"
                onClick={() => this.handlereview(outcome.contractid)}
              >
                Review
              </button>
            )}

            {canreview && outcome.status === "Verified" && (
              <button
                className="btn btn-success"
                onClick={() => this.handleapproval(outcome.contractid)}
              >
                Approval
              </button>
            )}
          </td>
          <td>
            {outcome.status !== "Approved" && (
              <button
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#exampleModalapprov"
                onClick={() =>
                  this.replaceRejectedMsgItem(
                    index,
                    outcome.contractid,
                    outcome.status
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
                    <h1>RMF Contract Management- Approv Emmergency contract</h1>
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
                            <th>Contract</th>
                            <th>contract mode</th>
                            <th>contract type</th>
                            <th>Budget</th>
                            <th>status</th>

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
                      contractid={this.state.contractid}
                      contractdiscription={this.state.contractdiscription}
                      contractbudget={this.state.contractbudget}
                      contractorstartdate={this.state.contractorstartdate}
                      contractorenddate={this.state.contractorenddate}
                      contractmodeid={this.state.contractmodeid}
                      contractmode={this.state.contractmode}
                      contractorid={this.state.contractorid}
                      contractorname={this.state.contractorname}
                      contractoraddress={this.state.contractoraddress}
                      contractoremail={this.state.contractoremail}
                      contractorphonenumber={this.state.contractorphonenumber}
                      tinnumber={this.state.tinnumber}
                      contactpersonfirstname={this.state.contactpersonfirstname}
                      contactpersonmiddlename={this.state.contactpersonmiddlename}
                      contactpersonlastname={this.state.contactpersonlastname}
                      contactpersonemail={this.state.contactpersonemail}
                      contactpersonphonenumber={this.state.contactpersonphonenumber}
                      maintenancetypeid={this.state.maintenancetypeid}
                      maintenancetypename={this.state.maintenancetypename}
                      roadid={this.state.roadid}
                      roadname={this.state.roadname}
                      roaddistance={this.state.roaddistance}
                      targetid={this.state.targetid}
                      targetname={this.state.targetname}
                      startquartid={this.state.startquartid}
                      startquarter={this.state.startquarter}
                      endquarterid={this.state.endquarterid}
                      endquarter={this.state.endquarter}
                      fiscalyearid={this.state.fiscalyearid}
                      fiscalyear={this.state.fiscalyear}
                      projecttypeid={this.state.projecttypeid}
                      projecttypename={this.state.projecttypename}
                      cancreateserviceorder={this.state.cancreateserviceorder}
                      projectid={this.state.projectid}
                      projectdescription={this.state.projectdescription}
                      budgetallocatetotheroad={this.state.budgetallocatetotheroad}
                      projectstartingdate={this.state.projectstartingdate}
                      projectendingdate={this.state.projectendingdate}
                      status={this.state.status}
                      projectlength={this.state.projectlength}
                      projectref={this.state.projectref}
                      measurementname={this.state.measurementname}
                      saveModalDetails={this.saveModalDetails}
                    />
                    <Rejectionmsg
                      contractid={this.state.contractid}
                      status={this.state.status}
                      
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

export default EmmargencyApproval;
