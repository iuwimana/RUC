import React, { Component } from "react";
import * as Role from "../../../services/security/roleServices";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      userid: 0,
      roleid:0,
      rolename:"",
    user:{},
    roles:[],
    errors: {}
    };
  }

  async populateBanks() {
    try{
      const { data: roles } = await Role.getRoles();
    this.setState({ roles });

    }catch (ex) {
    toast.error("Loading issues......");
  }
}


   async componentDidMount() {
    try{
      await this.populateBanks();
      const user = auth.getJwt();
       this.setState({ user });

    } catch (ex) {
      toast.error("Loading Issue............"+ex);

    }
    
  }
 
  componentWillReceiveProps(nextProps) {
    try{
    this.setState({
      
      
      userid: nextProps.userid,
      
    });
     } catch (ex) {
      toast.error(`the activation of this user has failed ${ex}`);
    }
  }
  

  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }

UserIdHandler(e) {
    this.setState({ userid: e.target.value });
  }
RoleIDIdHandler(e) {
    this.setState({ roleid: e.target.value });
  }
isSystemRoleHandler(e) {
    
    this.setState({ issystemrole: e.target.checked });
  }





  async handleSave() {
    const { user } = this.state;
   
    try {
    const item = this.state;
    const RoleUserID=0;
     

      await Role.addRoleUsers(RoleUserID,item.roleid,item.userid);
      toast.success(`role with role: ${item.roleid}  and isSystemRole:${item.userid} has been updated successful`);
      
      
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
    const roles = this.state.roles;
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
                Grant User Role
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
                  value={this.state.userid}
                  onChange={(e) => this.UserIdHandler(e)}
                  placeholder="Userid"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  UserRole
                </label>
                <div className="col-auto">


                  <select name="roleid" id="roleid" className="form-control" onChange={(e) => this.RoleIDIdHandler(e)}>
                  <option value={this.state.roleid}>{this.state.rolename}
                    </option>
                  {roles.map(role => (
                     <option key={role.roleid} value={role.roleid}>
                     {role.rolename}
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
                onClick={() => {
                  this.handleSave();
                }}
              >
                GrantRole
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
