import React, { Component } from "react";
import Modal from "./modal";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";
import * as Payment from "../../../services/RevenuRessources/revenuPaymentServices";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

class RevenuPayment extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      products: [],
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
      const { data: products } = await Payment.getrevenupayments();

      this.setState({ products });
    } catch (ex) {
      return toast.error(
        "An Error Occured, while rfetching revenu Payment data Please try again later" +
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
      products: allproducts,
    } = this.state;

    let filtered = allproducts;
    if (searchQuery)
      filtered = allproducts.filter(
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
          m.revenuetypename
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.value.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.revenuepaymentid)
      filtered = allproducts.filter(
        (m) => m.product.revenuepaymentid === selectedrole.revenuepaymentid
      );
    ///////////////////////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const products = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: products };
  };
  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
  }

  saveModalDetails(products) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.products;
    tempbrochure[requiredItem] = products;
    this.setState({ products: tempbrochure });
  }

  async deleteItem(revenuepaymentid) {
    //const { user } = this.state;

    try {
      if (!revenuepaymentid) {
        toast.info(
          `the revenu Payment you selected  doesnot exist ${revenuepaymentid}`
        );
      } else {
        await Payment.deleteRevenuePayment(revenuepaymentid);
        toast.success(`this revenu Payment has been deleted successful`);
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
          "An Error Occured, while saving revenu Payment Please try again later"
        );
      }
    }
  }

  render() {
    const { length: count } = this.state.products;
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: products } = this.getPagedData();
    const brochure = products.map((products, index) => {
      return (
        <tr key={products.revenuepaymentid}>
          <td>{products.revenueproductname}</td>
          <td>{products.paymentmodename}</td>
          <td>{products.sourceoffundname}</td>
          <td>{products.accountnumber}</td>
          <td>{products.bankname}</td>
          <td>{products.revenuetypename}</td>
          <td>{products.value}</td>
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
              onClick={() => this.deleteItem(products.revenuepaymentid)}
            >
              <AiFillDelete />
              Delete
            </button>
          </td>
        </tr>
      );
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.products[requiredItem];

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
                    <h1>RMF Resource Collection- revenu Payment</h1>
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
                      >
                        <FcPlus />
                        AddPayment
                      </button>
                      <p>There are revenu Payment in Database.</p>
                      <AddModal />
                    </>
                  )}
                  {count !== 0 && (
                    <>
                      <button
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target="#exampleAddModal"
                      >
                        <FcPlus />
                        AddPayment
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
                            <th>RevenueProductname</th>
                            <th>PaymentModename</th>
                            <th>SourceofFundname</th>
                            <th>AccountNumber</th>
                            <th>Bankname</th>
                            <th>RevenueTypename</th>
                            <th>Amount to pay</th>
                            <th>Update</th>
                            <th>Delete</th>
                          </tr>
                        </thead>

                        <tbody>{brochure}</tbody>
                      </table>

                      <AddModal />

                      <Modal
                        RevenuePaymentId={modalData.revenuepaymentid}
                        RevenueProductId={modalData.revenueproductid}
                        PaymentModeId={modalData.paymentmodeid}
                        RevenueProductname={modalData.revenueproductname}
                        PaymentModename={modalData.paymentmodename}
                        SourceofFundname={modalData.sourceoffundname}
                        AccountNumber={modalData.accountnumber}
                        Bankname={modalData.bankname}
                        RevenueTypename={modalData.revenuetypename}
                        Value={modalData.value}
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

export default RevenuPayment;
