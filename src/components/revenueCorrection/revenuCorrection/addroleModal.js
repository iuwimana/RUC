import React, { Component } from "react";
import Papa from "papaparse";
import * as Product from "../../../services/RevenuRessources/productServices";
import * as Payment from "../../../services/RevenuRessources/revenuPaymentServices";
import * as Correction from "../../../services/RevenuRessources/revenuCorrectionService";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import * as auth from "../../../services/authService";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

class AddroleModal extends Component {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: {
        RevenueCorrectionId: 0,
        RevenueProductId: 0,
        RevenuePaymentId: 0,
        CorrectionDate: "",
        RefNumber: {},
        TransactionDetails: {},
        Deposit: {},
        PoRef: {},
        DocId: {},
      },
      fiscalyearid: this.props.fiscalyearid,
      loadData: [],
      user: {},
      ParsedData: [],
      TableRows: [],
      Values: [],
      product: [],
      sources: [],
      payment: [],
      paymentModes: [],
      errors: {},
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
      const { data: product } = await Product.getrevenuproducts();
      const { data: payment } = await Payment.getrevenupayments();
      this.setState({ product, payment });
    } catch (ex) {
      toast.error("Loading issues......");
    }
  }

  async componentDidMount() {
    try {
      await this.populateBanks();
      const user = auth.getJwt();
      const ParsedData = this.state.ParsedData;
      const TableRows = this.state.TableRows;
      const Values = this.state.Values;
      this.setState({ user, ParsedData, TableRows, Values });
    } catch (ex) {
      return toast.error(
        "An Error Occured, while rfetching revenu Payment data Please try again later" +
          ex
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      RevenuePaymentId: nextProps.RevenuePaymentId,
      RevenueProductname: nextProps.RevenueProductname,
      PaymentModename: nextProps.PaymentModename,
      RevenueProductId: nextProps.RevenueProductId,
      PaymentModeId: nextProps.PaymentModeId,
      SourceofFundname: nextProps.SourceofFundname,
      AccountNumber: nextProps.AccountNumber,
      Bankname: nextProps.Bankname,
      RevenueTypename: nextProps.RevenueTypename,
      Value: nextProps.Value,
    });
  }
  schema = {
    RevenuePaymentId: Joi.number().required(),
    PaymentModeId: Joi.number().required(),
    RevenueProductId: Joi.number().required(),
    Value: Joi.number().required(),
  };

  PaymentIDHandler(e) {
    this.setState({ RevenuePaymentId: e.target.value });
  }
  ProductIdHandler(e) {
    this.setState({ RevenueProductId: e.target.value });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        const ParsedData = results.data;
        const TableRows = rowsArray[0];
        const Values = valuesArray;
        this.setState({ ParsedData, TableRows, Values });
        this.handlepage();
      }.bind(this),
    });
  };
  handlepage(i) {
    const { pageSize, currentPage } = this.state;

    const ParsedData = this.state.ParsedData;

    const products = paginate(ParsedData, currentPage, pageSize);

    return { totalCount: ParsedData.length, products, ParsedData };
  }
  handleSave = async (e) => {
    try {
      // e.preventDefault();
      const RevenueCorrectionId = 0;
      let loadData = this.state.loadData;
      const Values = this.state.Values;
      const data = this.state;
      const ParsedData = this.state.ParsedData;
      // await Correction.addrevenucorrection(
      //  RevenueCorrectionId,
      //  data.RevenuePaymentId,
      //  data.RevenueProductId,
      //  ParsedData
      //);
      for (const country of Object.keys(ParsedData)) {
        loadData = [...loadData, ParsedData[country]];
      }

      if (data.RevenueProductId && data.RevenuePaymentId && loadData) {
        await Correction.addrevenucorrection(
          RevenueCorrectionId,
          data.RevenueProductId,
          data.RevenuePaymentId,
          loadData
        );

        toast.success("Revenu correction file upload successfull");
      } else {
        toast.error("All Field are required");
      }
    } catch (ex) {
      toast.error(
        "An Error Occured, while uploading revenu correction file:" + ex
      );
    }
    //this.props.history.push("/revenu/revenucorrection");
  };

  render() {
    const payment = this.state.payment;
    const product = this.state.product;
    //const banks=this.state.banks
    const { totalCount } = this.handlepage();
    const { pageSize, currentPage } = this.state;
    const products = paginate(Values, currentPage, pageSize);
    //const banks=this.state.banks
    const TableRows = this.state.TableRows;
    const Values = this.state.Values;
    return (
      <div
        className="modal fade"
        id="exampleAddModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
          style={{
            maxWidth: "870px",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Revenu Correction
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            
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
                    <big>Revenu Collection</big>
                  </div>
                </h1>
              </div>
              <div className="btn-wrapper text-center"></div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <Col lg="300" md="100">
                            <Card className=" shadow border-0">
                              <CardHeader className="bg-transparent pb-5">
                                <div className="text-muted text-center mt-2 mb-3">
                                  <h1></h1>
                                </div>
                              </CardHeader>
                              <CardBody className="px-lg-5 py-lg-5">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group row">
                                      <label
                                        htmlFor="exampleFormControlInput1"
                                        className="col-sm-2 col-form-label"
                                      >
                                        Payment
                                      </label>
                                      <div className="col-sm-10">
                                        <select
                                          name="RevenuePaymentId"
                                          id="RevenuePaymentId"
                                          className="form-control"
                                          onChange={(e) =>
                                            this.PaymentIDHandler(e)
                                          }
                                        >
                                          <option
                                            value={this.state.RevenuePaymentId}
                                          >
                                            {this.state.Value}
                                          </option>
                                          {payment.map((payment) => (
                                            <option
                                              key={payment.revenuepaymentid}
                                              value={payment.revenuepaymentid}
                                            >
                                              {payment.revenueproductname}
                                              {"--->"}
                                              {payment.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group row">
                                      <label
                                        htmlFor="exampleFormControlInput1"
                                        className="col-sm-2 col-form-label"
                                      >
                                        Product
                                      </label>
                                      <div className="col-sm-10">
                                        <select
                                          name="RevenueProductId"
                                          id="RevenueProductId"
                                          className="form-control"
                                          onChange={(e) =>
                                            this.ProductIdHandler(e)
                                          }
                                        >
                                          <option
                                            value={this.state.RevenueProductId}
                                          >
                                            {this.state.RevenueProductname}
                                          </option>
                                          {product.map((product) => (
                                            <option
                                              key={product.revenueproductid}
                                              value={product.revenueproductid}
                                            >
                                              {product.revenueproductname}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <label htmlFor="exampleFormControlInput1">
                                      choose a CSV file to upload
                                    </label>
                                  </div>
                                  <div className="col">
                                    <input
                                      type="file"
                                      name="file"
                                      onChange={this.changeHandler}
                                      accept=".csv"
                                      style={{
                                        display: "block",
                                        margin: "10px auto",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col"></div>
                                  <div className="col">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={this.handleSave}
                                      aria-hidden="true"
                                    >
                                      Load CSV Data
                                    </button>
                                  </div>
                                </div>

                                {/* File Uploader */}

                                <br />
                                <br />
                                {/* Table */}
                                <table
                                  className=" striped bordered hover"
                                  border={1}
                                >
                                  <thead>
                                    <tr>
                                      {TableRows.map((rows, index) => {
                                        return <th key={index}>{rows}</th>;
                                      })}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {products.map((value, index) => {
                                      return (
                                        <tr key={index}>
                                          {value.map((val, i) => {
                                            return <td key={i}>{val}</td>;
                                          })}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                                <Pagination
                                  itemsCount={totalCount}
                                  pageSize={pageSize}
                                  currentPage={currentPage}
                                  onPageChange={this.handlePageChange}
                                />
                              </CardBody>
                            </Card>
                          </Col>
                        </div>

                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

            <div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.handleClick}
                >
                  AddNew
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddroleModal;
