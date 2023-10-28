import React, { Component, useLocation } from "react";
import Modal from "./modal";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Source from "../../../../services/RevenuRessources/sourceofFundsServices";
import * as Business from "../../../../services/RevenuRessources/businessPaternerServices";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import * as FiscalYearContractType from "../../../../services/ContractManagement/ContractSetting/Fiscalyearcontracttypeservice";

//import AddRole from "./addRole";
//import History from "./history";
import Pagination from "../../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../../searchBox";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";

class BusinessPaterner extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      value: this.props.location.state,
      fiscalyearid: 0,
      fiscalyearids: 0,
      sources: [],
      business: [],
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
      const { state } = this.props.location;
      if (!state.fiscalyearid) {
        toast.error(`error while loading Fiscal year:${state.fiscalyearid}`);
      } else {
        
        const fiscalyearids=state.fiscalyearid;
        
        const { data: sources } = await Source.getSource();
        
        const { data: business } =
          await FiscalYearContractType.getfiscalyearcontracttypeByfiscalyearId(
            state.fiscalyearid
          );
        if (!business || !sources) {
          return toast.error("An Error Occured,data fetching ...");
        } else {
          this.setState({ sources, business,fiscalyearids });
        }
        
      }
      
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching business data Please try again later" +
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
      business: allsources,
    } = this.state;

    let filtered = allsources;
    if (searchQuery)
      filtered = allsources.filter(
        (m) =>
          m.fiscalyear
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.contracttypename.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.fiscalyearcontracttypeid)
      filtered = allsources.filter(
        (m) =>
          m.Business.fiscalyearcontracttypeid ===
          selectedrole.fiscalyearcontracttypeid
      );
    /////////////////////////////////////////// fiscalyear contracttypename
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const business = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: business };
  };
  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
    
  }

  handleshow(fiscalyearids){
    this.setState({fiscalyearids:fiscalyearids})
    
  }

 

  saveModalDetails(business) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.business;
    tempbrochure[requiredItem] = business;
    this.setState({ business: tempbrochure });
  }

  async deleteItem(fiscalyearcontracttypeid) {
    //const { user } = this.state;

    try {
      if (!fiscalyearcontracttypeid) {
        toast.info(`the Institution Partener you selected  doesnot exist`);
      } else {
        await FiscalYearContractType.deletefiscalyearcontracttype(fiscalyearcontracttypeid);
        toast.success(`this fiscalyearcontracttype has been deleted successful`);
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
    const { length: count } = this.state.business;
    const { pageSize, currentPage, searchQuery } = this.state;
  
    const { totalCount, data: business } = this.getPagedData();
    if (business == []) {
      return toast.error("An Error Occured,data fetching ...");
    } else {
      const brochure = business.map((business, index) => {
        return (
          <tr key={business.fiscalyearcontracttypeid}>
            <td>{business.fiscalyear}</td>
            <td>{business.islocked.toString()}</td>
            <td>{business.contracttypename}</td>
            <td>{business.cancreateserviceorder.toString()}</td>
            <td>
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => this.replaceModalItem(index)}
              >
                <AiFillEdit />
                Update
              </button>{" "}
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => this.deleteItem(business.fiscalyearcontracttypeid)}
              >
                <AiFillDelete />
                Delete
              </button>
            </td>
          </tr>
        );
      });

      const requiredItem = this.state.requiredItem;
      let modalData = this.state.business[requiredItem];
      const fiscalyearids = this.state.fiscalyearids;
      

      
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
                      <small>Contract management- Contract Type</small>
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
                        <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#exampleAddModal"
                          onClick={() => this.handleshow(this.state.fiscalyearids)}
                        >
                          <FcPlus />
                          Addsource
                        </button>
                        <p>There are no Business Paterner in Database.</p>
                        <AddModal />
                      </>
                    )}
                    {count !== 0 && (
                      <>
                        <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#exampleAddModal"
                          onClick={() => this.handleshow(this.state.fiscalyearids)}
                        >
                          <FcPlus />
                          Addsource
                        </button>

                        <div style={{ textAlign: "center" }}>
                          <SearchBox
                            value={searchQuery}
                            onChange={this.handleSearch}
                          />
                        </div>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>fiscalyear</th>
                              <th>isAcive</th>
                              <th>contracttypename</th>
                              <th>cancreateserviceorder</th>
                              

                              <th>Update</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>{brochure}</tbody>
                        </table>
                        <AddModal fiscalyearcontracttypeid={
                          modalData.fiscalyearcontracttypeid
                        }
                          contracttypeid={
                            modalData.contracttypeid
                          }
                          contracttypename={
                            modalData.contracttypename
                          }
                          fiscalyearid={fiscalyearids}
                          
                          saveModalDetails={this.saveModalDetails}
                        />
                        

                        <Modal
                        fiscalyearcontracttypeid={
                          modalData.fiscalyearcontracttypeid
                        }
                          contracttypeid={
                            modalData.contracttypeid
                          }
                          contracttypename={
                            modalData.contracttypename
                          }
                          fiscalyearid={modalData.fiscalyearid}
                          
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
                </div>
              </CardBody>
            </Card>
          </Col>
        </div>
      );
    }
  }
}

export default BusinessPaterner;
