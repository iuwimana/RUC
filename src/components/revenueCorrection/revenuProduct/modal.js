import React, { Component } from "react";
import * as Source from "../../../services/RevenuRessources/sourceofFundsServices";
import * as Product from "../../../services/RevenuRessources/productServices";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import * as bank from "../../../services/RevenuRessources/bankservices";
import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";


class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {RevenueProductId:0,RevenueProductname:"",sourceoffundid:0 , sourceoffundname: ""},
      
      user:{},
      sources: [],
      errors: {},
      banks: [],
      revenues: [],
    };
  }
  schema = {
    RevenueProductId: Joi.number()
                       .required(),
    RevenueProductname: Joi.string()
                        .required()
                        .label("RevenueProductname"),
    SourceofFundId: Joi.number()
                       .required(),
    SourceofFundname: Joi.string()
                         .required()
                         .label("SourceofFundname"),
    
  };
  async populateBanks() {
    try{
      const { data: banks } = await bank.getbanks();
    const { data: revenues } = await RevenuType.getrevenuTypes();
    const { data: sources } = await Source.getSource();
    this.setState({ banks,revenues,sources });

    }catch (ex) {
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
      
      RevenueProductId: nextProps.RevenueProductId,
      RevenueProductname: nextProps.RevenueProductname,
      SourceofFundId: nextProps.SourceofFundId,
      SourceofFundname: nextProps.SourceofFundname,
      AccountNumber: nextProps.AccountNumber,
      BankId: nextProps.BankId,
      BankName: nextProps.BankName,
      Bankname: nextProps.Bankname,
      RevenueTypeId: nextProps.RevenueTypeId,
      RevenueTypename: nextProps.RevenueTypename,
      StartDate: nextProps.StartDate,
      EndDate: nextProps.EndDate,
      
    });
  }
  


sourceofFundIdHandler(e) {
    this.setState({ sourceoffundid: e.target.value });
  }
RevenueProductIdHandler(e) {
    this.setState({ RevenueProductId: e.target.value });
  }
RevenueProductnameHandler(e) {
    this.setState({ RevenueProductname: e.target.value });
  }
SourceofFundnamedHandler(e) {
    
    this.setState({ sourceoffundname: e.target.value });
  }






   handleSave=async(e)=> {
   // const { user } = this.state;
   
     try {
      const data  = this.state;
      await Product.addRevenueProduct(data.RevenueProductId,data.RevenueProductname,data.sourceoffundid);
      toast.success(`Revenue Product data RevenueProductname:  ${data.RevenueProductname} and SourceofFund: ${data.sourceoffundid}  has been updated successful`);
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
        
        toast.error("An Error Occured, while saving role Please try again later");
    }
    }
  }

  render() {
    const sources = this.state.sources;
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Revenu Product
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


            <div className="modal-body">
              <div className="mb-3">
                <input
                  type="hidden"
                  className="form-control"
                  value={this.state.RevenueProductId}
                  onChange={(e) => this.RevenueProductIdHandler(e)}
                  placeholder="RevenueProductId"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Revenue ProductName
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.RevenueProductname}
                  onChange={(e) => this.RevenueProductnameHandler(e)}
                  placeholder="RevenueProductname"
                />
              </div>
              
              <div className="mb-3">
                 <div className="col-auto">
                <label htmlFor="exampleFormControlInput1" >
                  Source of Fund
                </label></div>
                 <div className="col-auto">


                  <select name="SourceofFundId" id="SourceofFundId" className="form-control" onChange={(e) => this.sourceofFundIdHandler(e)}>
                  <option value={this.state.SourceofFundId}>{this.state.SourceofFundname}
                    </option>
                  {sources.map(sources => (
                     <option key={sources.sourceoffundid} value={sources.sourceoffundid} >
                     {sources.sourceoffundname}
                    </option>
                    ))}
                    
                    </select>


                </div>
                
              </div>
            
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                
                onClick={this.handleSave}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
