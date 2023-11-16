import React, { Component } from "react";
import * as role from "../../../services/security/roleServices";
import * as UserData from "../../../services/security/userServices";
import * as UserApprovalData from "../../../services/security/userapprovalservice";

import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      userapprovalid: 0,
      userid: 0,
      email: "",
      approvallevel: "",
      approvalitem: "",
      roleid: 0,
      rolename: "",
      users: [],
       description: "",
       isSystemRole: false ,
    user:{},
    errors: {}
    };
  }


   async componentDidMount() {
    const { data: users } = await UserData.getUsers();
    const user = auth.getJwt();
    this.setState({ user, users });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      
      userapprovalid: nextProps.userapprovalid,
      userid: nextProps.userid,
      email: nextProps.email,
      approvallevel: nextProps.approvallevel,
      approvalitem: nextProps.approvalitem,
      
    });
  }
  

  userapprovalidHandler(e) {
    this.setState({ userapprovalid: e.target.value });
  }

  useridHandler(e) {
    this.setState({ userid: e.target.value });
  }

  emailHandler(e) {
    this.setState({ email: e.target.value });
  }
  approvallevelHandler(e) {
    this.setState({ approvallevel: e.target.value });
  }
  approvalitemHandler(e) {
    this.setState({ approvalitem: e.target.value });
  }





  async handleSave() {
    const { user } = this.state;
   
    try {
    const item = this.state;
    const email="jadormf@gmail.com";     

      await UserApprovalData.adduserapprovals(
        item.userapprovalid,
        item.userid,
        email,
        item.approvallevel,
        item.approvalitem);
      toast.success(
        `role with rolename: userid:${item.userid} ,approvallevel: ${item.approvallevel} and approvalitem:${item.approvalitem} has been updated successful`
      );
      //const { state } = this.props.location;
      //window.location = state ? state.from.pathname : "/security/role";
      //this.props.history.push("/security/role");
       
      
    
    //this.props.saveModalDetails(item);
    //(myString.toLowerCase() === 'true');
     //toast.info(` ${item.roleid} and ${item.rolename} and ${item.isSystemRole} and ${item.description}`);
   // const item = this.state;
    //this.props.saveModalDetails(item);
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
    const users = this.state.users;
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
                Update User Approvals
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
              <div className="mb-3"></div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  user
                </label>
                <select
                  name="userid"
                  id="userid"
                  className="form-control"
                  onChange={(e) => this.useridHandler(e)}
                >
                  <option value={this.state.userid}>{this.state.email}</option>
                  {users.map((users) => (
                    <option key={users.user_userid} value={users.user_userid}>
                      {users.user_email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Approval Level
                </label>
                <select
                  name="approvallevel"
                  id="approvallevel"
                  className="form-control"
                  onChange={(e) => this.approvallevelHandler(e)}
                >
                  <option value={this.state.approvallevel}>
                    {this.state.approvallevel}
                  </option>
                  <option value="Initiator">Initiator</option>
                  <option value="Verifier">Verifier</option>
                  <option value="Approv">Approv</option>
                </select>
              </div>
              <div className="mb-3">
                <div className="col-auto">
                  <label htmlFor="exampleFormControlInput1">
                    Approval Item
                  </label>
                </div>
                <div className="col-auto">
                  <select
                    name="approvalitem"
                    id="approvalitem"
                    className="form-control"
                    onChange={(e) => this.approvalitemHandler(e)}
                  >
                    <option value={this.state.approvalitem}>
                      {this.state.approvalitem}
                    </option>
                    <option value="Planing">Planing</option>
                    <option value="contract Setting">contract Setting</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Payment"> Payment
                    </option>
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
                onClick={() => {
                  this.handleSave();
                }}
              >
                UpdateRole
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
