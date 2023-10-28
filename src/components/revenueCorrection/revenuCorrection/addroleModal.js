import React, { Component } from "react";
import * as Product from "../../../services/RevenuRessources/productServices";
import * as Payment from "../../../services/RevenuRessources/revenuPaymentServices";
import * as Source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import Papa from "papaparse";
import * as PaymentModes from "../../../services/RevenuRessources/paymentModeservices";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";

class AddroleModal extends Component {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: {
        RevenuePaymentId: 0,
        PaymentModeId: 0,
        RevenueProductId: 0,
        Value: 0,
      },
      user: {},
      ParsedData: [],
      TableRows: [],
      Values: [],
      products: [],
      sources: [],
      payments: [],
      paymentModes: [],
      errors: {},
    };
  }
  async populateBanks() {
    try{
    const { data: products } = await Product.getrevenuproducts();
    const { data: paymentModes } = await PaymentModes.getpaymentModes();
    const { data: sources } = await Source.getSource();
    this.setState({ products, paymentModes, sources });
    }catch(ex){
      return toast.error("An Error Occured, while rfetching revenu Payment data Please try again later" + ex);
    }
  }

  async componentDidMount() {
    await this.populateBanks();
    const user = auth.getJwt();
    const ParsedData = this.state.ParsedData;
    const TableRows = this.state.TableRows;
    const Values = this.state.Values;
    this.setState({ user, ParsedData, TableRows, Values });
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
      }.bind(this),
    });
  };
  handleClick(i) {
    const ParsedData = this.state.ParsedData;
    
  }

  render() {
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
        <div className="modal-dialog" role="document">
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
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Value
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.valueHandler(e)}
                placeholder="amount to be payed"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Value
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.valueHandler(e)}
                placeholder="amount to be payed"
              />
            </div>
            {/* File Uploader */}
            <input
              type="file"
              name="file"
              onChange={this.changeHandler}
              accept=".csv"
              style={{ display: "block", margin: "10px auto" }}
            />
            <br />
            <br />
            {/* Table */}
            <table className=" striped bordered hover">
              <thead>
                <tr>
                  {TableRows.map((rows, index) => {
                    return <th key={index}>{rows}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {Values.map((value, index) => {
                  return (
                    <tr key={index}>
                      {value.map((val, i) => {
                        return <td key={i}>{val}</td>;
                      })}

                      <td>
                        <button onClick={() => this.handleClick(index)}>
                          ok
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

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
