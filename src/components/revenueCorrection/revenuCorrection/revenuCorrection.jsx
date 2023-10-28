import React, { Component } from "react";
//import Modal from './modal';
//import AddModal from './addroleModal';
import { Card, CardHeader, CardBody, Col } from "reactstrap";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as Source from "../../../services/RevenuRessources/revenuCorrectionService";
//import * as Services from "../../../services/RevenuRessources/paternerServiceServices";
//import AddRole from "./addRole";
//import History from "./history";
import Pagination from "../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";

class RevenuCorrection extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      sources: [],
      services: [],
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
      const { data: sources } = await Source.getrevenucorrections();

      this.setState({ sources });
    } catch (ex) {
      return toast.error(
        "An Error Occured, while rfetching role data Please try again later" +
          ex
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
      sources: allsources,
    } = this.state;

    let filtered = allsources;
    if (searchQuery)
      filtered = allsources.filter(
        (m) =>
          m.revenueproductname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.raymentmodename
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.sourceoffundname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.accountnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.bankname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.correctiondate
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.transactiondetails
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          // m.DocId.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.refnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.correctiondate
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.poref.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.partenerserviceid)
      filtered = allsources.filter(
        (m) => m.Services.partenerserviceid === selectedrole.partenerserviceid
      );
    ///////////////////////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const sources = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: sources };
  };
  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
  }

  saveModalDetails(sources) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.sources;
    tempbrochure[requiredItem] = sources;
    this.setState({ sources: tempbrochure });
  }

  async deleteItem(RevenueCorrectionId) {
    //const { user } = this.state;

    try {
      if (!RevenueCorrectionId) {
        toast.info(`the Revenue Correction you selected  doesnot exist`);
      } else {
        await Source.deleterevenucorrection(RevenueCorrectionId);
        toast.success(`this revenu Correction has been deleted successful`);
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
          "An Error Occured, while saving revenu Correction Please try again later"
        );
      }
    }
  }

  render() {
    const { length: count } = this.state.sources;
    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: sources } = this.getPagedData();

    const brochure = sources.map((sources, index) => {
      return (
        <tr key={sources.revenuecorrectionid}>
          <td>{sources.revenueproductname}</td>
          <td>{sources.paymentmodename}</td>
          <td>{sources.sourceoffundname}</td>
          <td>{sources.accountnumber}</td>
          <td>{sources.bankname}</td>
          <td>{sources.correctiondate}</td>
          <td>{sources.deposit}</td>
          <td>{sources.transactiondetails}</td>
        </tr>
      );
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.sources[requiredItem];
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
                    <h1>RMF Resource Collection- revenu Collection</h1>
                  </div>
                </h1>
              </div>
              <div className="btn-wrapper text-center"></div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div>
                <div>
                  {count === 0 && (
                    <>
                      <Link to="/revenu/upload" className="btn btn-success">
                        <FcPlus /> AddRevenu
                      </Link>
                      <p>There are revenu correction Payment in Database.</p>
                    </>
                  )}
                  {count !== 0 && (
                    <>
                      <Link to="/revenu/upload" className="btn btn-success">
                        <FcPlus />
                        AddRevenu
                      </Link>
                      <div style={{ textAlign: "center" }}>
                        <SearchBox
                          value={searchQuery}
                          onChange={this.handleSearch}
                        />
                      </div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>RevenueProductname</th>
                            <th>PaymentModename</th>
                            <th>SourceofFundname</th>
                            <th>AccountNumber</th>
                            <th>Bankname</th>
                            <th>Service Period</th>
                            <th>Deposit</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>{brochure}</tbody>
                      </table>
                    </>
                  )}
                  <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default RevenuCorrection;
