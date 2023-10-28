import React, { Component } from "react";
import Modal from "./modal";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Source from "../../../services/RevenuRessources/sourceofFundsServices";
import * as Business from "../../../services/RevenuRessources/businessPaternerServices";
import * as Outcome from "../../../services/RMFPlanning/outcomeService";
//import AddRole from "./addRole";
//import History from "./history";
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
      sources: [],
      business: [],
      outcome: [],
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
  async replaceModalItem(index, FiscalYear, OutComeName, OutcomeId) {
    this.setState({
      requiredItem: index,
    });

    try {
      await Outcome.addsappdf(FiscalYear, OutComeName, OutcomeId);
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
    const { length: count } = this.state.outcome;
    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: outcome } = this.getPagedData();

    const brochure = outcome.map((outcome, index) => {
      return (
        <tr key={outcome.OutcomeId}>
          {" "}
          <td>{outcome.OutComeName}</td>
          <td>{outcome.FiscalYear}</td>
          <td>{outcome.statuses}</td>
          <td>{outcome.OutcomeDescription}</td>
          <td>{outcome.SubProgramName}</td>
          <td>{outcome.ProgramName}</td>
          <td>
            {" "}
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() =>
                this.replaceModalItem(
                  index,
                  outcome.FiscalYear,
                  outcome.OutComeName,
                  outcome.OutcomeId
                )
              }
            >
              ViewSAP
            </button>{" "}
          </td>
          <td>
            <button className="btn btn-success">Approve</button>
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
                    <h1>RMF Planning- View SAP</h1>
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
                    <table className="table">
                      <thead>
                        <tr>
                          <th>outcomeName</th>
                          <th>outcomeFiscalYear</th>
                          <th>statuses</th>
                          <th>outcomeDescription</th>
                          <th>SubProgramName</th>
                          <th>ProgramName</th>
                          <th>View SAP</th>
                          <th>Aproval</th>
                        </tr>
                      </thead>
                      <tbody>{brochure}</tbody>
                    </table>
                    <Modal
                      Modal
                      OutcomeId={modalData.OutcomeId}
                      OutComeName={modalData.OutComeName}
                      FiscalYear={modalData.FiscalYear}
                      statuses={modalData.statuses}
                      OutcomeDescription={modalData.OutcomeDescription}
                      SubProgramName={modalData.SubProgramName}
                      ProgramName={modalData.ProgramName}
                      saveModalDetails={this.saveModalDetails}
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
