import React, { Component } from "react";
import * as Role from "../../../services/security/roleServices";
import * as User from "../../../services/security/userServices";
import * as Securable from "../../../services/security/securableService";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      userpermissionid:0, 
      userid:0, 
      securableid:0, 
      canaccess: false, 
      cancreate: false, 
      canview: false, 
      canmodify: false, 
      candelete: false, 
      canexecute: false,
      SecurableID: 0,
      securablename:"",
      email:"" ,
      issystemrole:false,
      RoleID:0,
      userid:0,
      email:"",
      userpermissionid:0, 
      SecurableName: "",
      RoleName: "",
      isSystemRole: false, 
      CanView: false, 
      CanModify: false,
      CanExecute: false,
      CanDelete: false,
      CanCreate: false,
      CanAccess: false,
      user: {},
      roles:[],
      users:[],
      errors: {},
    };
  }

  async componentDidMount() {
    try{
    const { data: roles } = await Role.getRoles();
    const {data:users}=await User.getUsers();
    const user = auth.getJwt();
    this.setState({ user,roles,users });
    }catch (ex) {
      return toast.error(
        "Data Loading issues...." +
          ex
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    try{
    this.setState({
      SecurableID: nextProps.SecurableID,
      userid:nextProps.userid,                    
      email:nextProps.email,
      RoleID: nextProps.RoleID, 
      userpermissionid: nextProps.userpermissionid,
      SecurableName: nextProps.SecurableName,
      RoleName: nextProps.RoleName,
      isSystemRole: Boolean(nextProps.isSystemRole),
      CanView: Boolean(nextProps.CanView),
      CanModify: Boolean(nextProps.CanModify),
      CanExecute: Boolean(nextProps.CanExecute),
      CanDelete: Boolean(nextProps.CanDelete),
      CanCreate: Boolean(nextProps.CanCreate),
      CanAccess: Boolean(nextProps.CanAccess),
      userpermissionid: nextProps.userpermissionid,
       userid: nextProps.userid, 
       securableid: nextProps.securableid, 
       canaccess: Boolean(nextProps.canaccess), 
       cancreate: Boolean(nextProps.cancreate), 
       canview: Boolean(nextProps.canview), 
       canmodify: Boolean(nextProps.canmodify), 
       candelete: Boolean(nextProps.candelete), 
       canexecute: Boolean(nextProps.canexecute),
       securablename:nextProps.securablename,
       email:nextProps.email,
       issystemrole:Boolean(nextProps.issystemrole),
    });
  }catch (ex) {
      return toast.error(
        "Data Loading issues...." +
          ex
      );
    }
  }
     
  canaccessHandler(e) {
    this.setState({ canaccess: e.target.checked });
  }

  cancreateHandler(e) {
    this.setState({ cancreate: e.target.checked });
  }
  canexecuteHandler(e) {
    this.setState({ canexecute: e.target.checked });
  }
   canmodifyHandler(e) {
    this.setState({ canmodify: e.target.checked });
  }
   canviewHandler(e) {
    this.setState({ canview: e.target.checked }); 
  }
  useridCreateHandler(e) {
    this.setState({ userid: e.target.value });
  }
  emailCreateHandler(e) {
    this.setState({ email: e.target.value });
  }

  

  securablenameHandler(e) {
    this.setState({ securablename: e.target.value });
  }
  RoleIDIdHandler(e){
    this.setState({ RoleID: e.target.value });
  }
  candeleteHandler(e) {
    this.setState({ candelete: e.target.checked });
  }
  issystemroleHandler(e) {
    this.setState({ issystemrole: e.target.checked });
  }

  async handleSave() {
    const { user } = this.state;

    try {
      const item = this.state;
      if (item.userpermissionid) {
        var userpermissionid =item.userpermissionid
         
      }else{
        userpermissionid=0

      }
     
      await Securable.addrevenucollectionsecurables(
     
        userpermissionid,
        item.userid,
        item.securableid,
        item.canaccess,
        item.cancreate,
        item.canview,
        item.canmodify,
        item.candelete,
        item.canexecute
      );
      
      toast.success(
        `role with RolePermissionID: ${userpermissionid} ,
        RoleID: ${item.userid} and 
        SecurableID:${item.securableid} CanDelete ${item.candelete} CanExecute ${item.canexecute}
         CanAccess:${item.canaccess} CanCreate ${item.cancreate}
          CanView:${item.canview} CanModify ${item.canmodify}
         has been updated successful`
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
        toast.error(
          "An Error Occured, while saving role Please try again later"
        );
      }
    }
  }

  render() {
    const roles = this.state.roles;
    const users=this.state.users;
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document"style={{ maxWidth: "7700px", width: "80%", height: "100%" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Set User permission
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
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  User
                </label>
                <div className="col-auto">


                  <select name="RoleID" id="RoleID" className="form-control" onChange={(e) => this.useridCreateHandler(e)} disabled>
                  <option value={this.state.userid}>{this.state.email}
                    </option>
                  {users.map(users => (
                     <option key={users.user_userid} value={users.user_userid}>
                     {users.user_email}
                    </option>
                    ))}
                    
                    </select>
                </div>
              </div>
                </div>
              </div>
              <br></br>
              <br></br>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      securablename
                    </label>
                    <label
                      className="form-control"
                      onChange={(e) => this.securablenameHandler(e)}
                    >
                      {this.state.securablename}
                      </label>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <div className="col-auto">
                      <label htmlFor="exampleFormControlInput1">
                        IsSystemRole
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        name="IsSystemRole"
                        type="checkbox"
                        className="form-control"
                        value={this.state.issystemrole}
                        checked={this.state.issystemrole}
                        onChange={(e) => this.issystemroleHandler(e)}
                      />
                    </div>
                  </div>
                </div>
                     
                <div className="col">
                  <div className="mb-3">
                    <div className="col-auto">
                      <label htmlFor="exampleFormControlInput1">
                        CanView
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        name="CanView"
                        type="checkbox"
                        className="form-control"
                        value={this.state.canview}
                        checked={this.state.canview}
                        onChange={(e) => this.canviewHandler(e)}
                      /> 
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <div className="col-auto">
                      <label htmlFor="exampleFormControlInput1">
                        CanModify
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        name="IsSystemRole"
                        type="checkbox"
                        className="form-control"
                        value={this.state.canmodify}
                        checked={this.state.canmodify}
                        onChange={(e) => this.canmodifyHandler(e)}
                      /> 
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <div className="col-auto">
                      <label htmlFor="exampleFormControlInput1">
                        CanExecute
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        name="CanExecute"
                        type="checkbox"
                        className="form-control"
                        value={this.state.canexecute}
                        checked={this.state.canexecute}
                        onChange={(e) => this.canexecuteHandler(e)}
                      /> 
                    </div>
                  </div> 
                </div>
                <div className="col">
                  <div className="mb-3">
                    <div className="col-auto">
                      <label htmlFor="exampleFormControlInput1">
                        CanDelete
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        name="CanDelete"
                        type="checkbox"
                        className="form-control"
                        value={this.state.candelete}
                        checked={this.state.candelete}
                        onChange={(e) => this.candeleteHandler(e)}
                      /> 
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <div className="col-auto">
                      <label htmlFor="exampleFormControlInput1">
                        CanCreate
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        name="CanCreate"
                        type="checkbox"
                        className="form-control"
                        value={this.state.cancreate}
                        checked={this.state.cancreate}
                        onChange={(e) => this.cancreateHandler(e)} 
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <div className="col-auto">
                      <label htmlFor="exampleFormControlInput1">
                        CanAccess
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        name="CanAccess"
                        type="checkbox"
                        className="form-control"
                        value={this.state.canaccess}
                        checked={this.state.canaccess}
                        onChange={(e) => this.canaccessHandler(e)}
                      />
                    </div>
                  </div>
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
                SetUserPermission
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
