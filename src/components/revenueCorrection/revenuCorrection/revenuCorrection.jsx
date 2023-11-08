import React, { Component } from "react";
//import Modal from './modal';
//import AddModal from './addroleModal';
import { Card, CardHeader, CardBody, Col } from "reactstrap";

import { toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import * as Source from "../../../services/RevenuRessources/revenuCorrectionService";
import * as RevProdData from "../../../services/RevenuRessources/revenuPaymentServices";
import * as FiscalYear from "../../../services/RMFPlanning/fiscalYearService";
import {
  FcCurrencyExchange,
} from "react-icons/fc";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import './collection.css'
import ListGroup from './../../common/listGroup';

class RevenuCorrection extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      fiscalyearid: this.props.fiscalyearid,
      fiscalyearname: this.props.fiscalyearname,
      
      revenuproductid: 0,
      revenuproductname: "",
      totaldeposit: 0,
      sources: [],
      services: [],
      revprod: [],
      revprods: [],
      fiscalyear: [],
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
  async populateBanks() {
    try {
      if (this.state.fiscalyearid === 0) {
        const { data: fiscalyear } = await FiscalYear.getFiscalyears();
        this.setState({ fiscalyear });
        const fiscalyearid = [];
        const people = fiscalyear.map((fiscalyear) => {
          fiscalyearid.push(fiscalyear.fiscalyearid);
        });
        this.setState({ fiscalyearid: fiscalyearid[0] });

        const fiscalyearname = [];
        const FiscalYearName = fiscalyear.map((fiscalyear) => {
          fiscalyearname.push(fiscalyear.fiscalyear);
        });
        this.setState({ fiscalyearname: fiscalyearname[0] });
        const { data } = await RevProdData.getrevenupaymentByFiscalyear(
          fiscalyearid[0]
        );
        const revprods = [
          { revenuepaymentid: 0, revenueproductname: "All Products" },
          ...data,
        ];
        this.setState({ revprods });
      } else {
        const { data: fiscalyear } = await FiscalYear.getFiscalyears();
        this.setState({ fiscalyear });
        const { data } = await RevProdData.getrevenupaymentByFiscalyear(
           this.state.fiscalyearid
        );
        const revprods = [
          { revenuepaymentid: 0, revenueproductname: "All Products" },
          ...data,
        ];
        this.setState({ revprods });
        
      }
    } catch (ex) {
      toast.error("current user data Loading issues......" + ex);
    }
  }
  async componentDidMount() {
    try {
      await this.populateBanks();
      const { data: sources } = await Source.getrevenucorrectionByFiscalYearID(
        this.state.fiscalyearid
      );
      this.setState({ sources });

      const deposit = [];
      const amount = 0;
      const deplist = sources.map((sources) => {
        deposit.push(sources.deposit);
      });

      this.setState({
        totaldeposit: deposit.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ),
      });
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching role data Please try again later" + ex
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
  handleselect = (revprod) => {
    this.setState({ selectedrole: revprod, searchQuery: "", currentPage: 1 });
    const revenuproduct = JSON.stringify(revprod.revenuepaymentid);
    const revenuproducts = JSON.stringify(revprod.revenueproductname);
    this.setState({
      revenuproductid: revenuproduct,
      revenuproductname: revenuproducts,
    });
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
          m.paymentmodename
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
    else if (selectedrole && selectedrole.revenuepaymentid)
      filtered = allsources.filter(
        (m) => m.revenuepaymentid === selectedrole.revenuepaymentid
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

  async fiscalyearidHandler(e) {
    this.setState({ fiscalyearid: e.target.value });
    await this.componentDidMount();
    console.log("current fiscayear:" + this.state.fiscalyearid);
    this.setState({ fiscalyearname: " "});
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
    const {
      pageSize,
      currentPage,
      selectedrole,
      searchQuery,
      sources: allsources,
    } = this.state;

    const { totalCount, data: sources } = this.getPagedData();
    const countproduct = this.state.revenuproductid;
    const fiscalyear = this.state.fiscalyear;
    const brochure = sources.map((sources, index) => {
      return (
        <tr key={sources.revenuecorrectionid}>
          <td>{sources.revenueproductname}</td>
          <td>{sources.bordername}</td>
          <td>{sources.sourceoffundname}</td>
          {/*<td>{sources.accountnumber}</td>
          <td>{sources.bankname}</td>*/}
          <td>{sources.correctiondate}</td>
          <td>{sources.deposit}</td>
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
              <div
                data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb"
                className="rectangle9"
              >
                <div
                  data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb"
                  className="revPr"
                >
                  <div className="row">
                    <big style={{ fontSize: 48 }}>revenu collection</big>
                  </div>
                  <div className="row">
                    @{this.state.revenuproductname}
                    {"- on fiscay Year - "}
                    {""}
                    <small>{this.state.fiscalyearname}</small> <br />
                  </div>
                </div>
                <div
                  data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb"
                  className="revsum"
                >
                  Total revenu collected{" "}
                  <big style={{ fontSize: 28 }}>
                    {" "}
                    {new Intl.NumberFormat().format(this.state.totaldeposit) +
                      " " +
                      "Rwf"}
                  </big>
                </div>
              </div>
              <svg
                data-layer="503cdd18-2d99-4021-824e-3d8e0cce609d"
                preserveAspectRatio="none"
                viewBox="0 0 82 83"
                className="ellipse3"
              >
                <FcCurrencyExchange />
              </svg>
              <div className="btn-wrapper text-center"></div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="row">
                <div className="col-3">
                  <br />
                  <br />
                  <br />
                  <div className="card" style={{ height: 380 }}>
                    <ListGroup
                      items={this.state.revprods}
                      textProperty="revenueproductname"
                      valueProperty="revenuepaymentid"
                      selectedItem={this.state.selectedrole}
                      onItemSelect={this.handleselect}
                    />
                  </div>
                </div>
                <div className="col">
                  <div>
                    <div>
                      {count === 0 && (
                        <>
                          {countproduct && countproduct !== "0" && (
                            <Link
                              to="/revenu/upload"
                              className="btn btn-success"
                            >
                              <FcPlus /> AddRevenu
                            </Link>
                          )}
                          <p>
                            There are revenu correction Payment in Database.
                          </p>
                        </>
                      )}
                      {count !== 0 && (
                        <>
                          {countproduct && countproduct !== "0" && (
                            <NavLink
                              to={{
                                pathname: "/revenu/upload",
                                state: {
                                  revenuproductid: this.state.revenuproductid,
                                  revenuproductname:
                                    this.state.revenuproductname,
                                },
                              }}
                              className="btn btn-success"
                            >
                              <FcPlus />
                              AddRevenu
                            </NavLink>
                          )}
                          {console.log(
                            `revenuproductid:${this.state.revenuproductid} revenuproductname${this.state.revenuproductname}`
                          )}

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
                                <th>Nation border</th>
                                <th>SourceofFundname</th>
                                {/*} <th>AccountNumber</th>
                                <th>Bankname</th>*/}
                                <th>Service Period</th>
                                <th>Deposit</th>
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
