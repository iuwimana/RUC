import React from "react";
import * as Product from "../../../services/RevenuRessources/productServices";
import * as Payment from "../../../services/RevenuRessources/revenuPaymentServices";
import * as Source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import * as PaymentModes from "../../../services/RevenuRessources/paymentModeservices";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import Form from "../../common/form";
class AddroleModal extends Form {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: {
        RevenuePaymentId: 0,
        paymentmodeid: 0,
        revenueproductid: 0,
        Value: 0,
        fiscalyearid: this.props.fiscalyearid,
      },
      user: {},
      products: [],
      sources: [],
      payments: [],
      paymentModes: [],
      errors: {},
    };
  }
  async populateBanks() {
    try {
      const { data: products } = await Product.getrevenuproducts();
      const { data: paymentModes } = await PaymentModes.getpaymentModes();
      const { data: sources } = await Source.getSource();
      this.setState({ products, paymentModes, sources });
    } catch (ex) {
      toast.error("Loading issues......");
    }
  }
  async componentDidMount() {
    await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });
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
      fiscalyearid:nextProps.fiscalyearid,
    });
  }
  schema = {
    RevenuePaymentId: Joi.number().required(),
    paymentmodeid: Joi.number().required(),
    revenueproductid: Joi.number().required(),
    Value: Joi.number().required(),
  };

  handleClick = async (e) => {
    try {
      const { data } = this.state;
      const RevenuePaymentId = 0;
       await Payment.addRevenuepayment(
        RevenuePaymentId,
        data.paymentmodeid,
        data.revenueproductid,
        data.Value,
        data.fiscalyearid
      ); 
       
      toast.success(`Revenuepayment data   has been updated successful paymentmodeid:
      ${data.paymentmodeid}, 
      revenueproductid:${data.revenueproductid} 
      Value: ${data.Value}
      fiscalyearid:${data.fiscalyearid}`);
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
          "An Error Occured, while saving Revenuepayment Please try again later"
        );
      }
    }
  };

  render() {
    //const banks=this.state.banks
    return (
      <div
        className="modal fade"
        id="exampleAddModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document" style={{
            maxWidth: "870px",
            width: "100%",
            height: "100%",
          }}>  
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Collection unit rate
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

            <form onSubmit={this.handleSubmit}>
              {this.renderSelectPaymentMode(
                "paymentmodeid",
                "Payment Mode",
                this.state.paymentModes
              )}
              {this.renderSelectRevenuProduct(
                "revenueproductid",
                "collection",
                this.state.products
              )}
              {this.renderInput("Value", "Value")}

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
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddroleModal;
