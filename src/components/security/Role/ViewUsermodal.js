import React, { Component } from "react";
import * as role from "../../../services/security/roleServices";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { Tab, Tabs } from "react-bootstrap";
import * as User from "../../../services/security/userServices";
import * as Role from "../../../services/security/roleServices";
import { Form } from "react-bootstrap";

class ViewUserModal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      tabKey: "one",
      initTabKey: "one",
      roleid: 0,
      rolename: "",
      description: "",
      isSystemRole: false,
      users: [],
      roles: [],
      user: {},
      errors: {},
    };
  }
   
  async componentDidMount() {
    try {
      
      
      
      const { data: users } = await User.getUsers();
      this.setState({ users });
      const user = auth.getJwt();
      this.setState({ user });
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching Users data Please try again later" +
          ex
      );
    }
  }

  async componentWillReceiveProps(nextProps) {
    this.setState({
      
      roleid: nextProps.roleid,
      rolename: nextProps.rolename,
      description: nextProps.description,
      isSystemRole: Boolean(nextProps.isSystemRole),
      
    });
    const {data:roles} = await Role.getRoleById(nextProps.roleid)
    this.setState({roles});
    
  }

  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }

  rolenameHandler(e) {
    this.setState({ rolename: e.target.value });
  }
  async roleIdHandler (e) {
    this.setState({ roleid: e.target.value });
    await this.populateBanks();
  }
  descriptionHandler(e) {
    this.setState({ description: e.target.value });
  }
  isSystemRoleHandler(e) {
    this.setState({ isSystemRole: e.target.checked });
  }

  

  async handleSave() {
    const { user } = this.state;

    try {
      const item = this.state;

      await role.addRoles(
        user,
        item.roleid,
        item.rolename,
        item.description,
        item.isSystemRole
      );
      toast.success(
        `role with rolename: ${item.rolename} ,description: ${item.description} and isSystemRole:${item.isSystemRole} has been updated successful`
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
    
    const roles=this.state.roles
    
    

      const brochure= roles.map((users, index) => {
      return (
        <tr key={users.userid}>
          <td>{users.email}</td>
          <td>{users.createdate}</td>
          <td>{users.fullname}</td>
        </tr>
      );
    });

      
    
    
    return (
      <div>
        <div
          className="modal fade"
          id="exampleModalView"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog"
            role="document"
            style={{ maxWidth: "7700px", width: "80%", height: "100%" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <Form>
                <div className="container">
                  <Form.Group>
                    
                    <div className="row">
                      <div className="col">RoleName :</div>
                      <div className="col">
                        <Form.Control type="text" value={this.state.rolename} />
                      </div>
                    </div>
                  </Form.Group>
                  <br></br>

                  <Form.Group>
                    <div className="row">
                      <div className="col">Description:</div>
                      <div className="col">
                        <Form.Control
                          type="text"
                          value={this.state.description}
                        />
                      </div>
                    </div>
                  </Form.Group>
                </div>
              </Form>
              <br></br>
              <br></br>
              <br></br>

              <div>
                <Tabs
                  activeKey={this.state.tabKeytabKey}
                  onSelect={(e) => this.state.initTabKey(e)}
                >
                  <Tab eventKey="two" title="Users">
                    <br></br>
                    <br></br>

                    <center>
                      <p>Users</p>

                      <div style={{ textAlign: "center" }}></div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Email</th>
                            <th>CreateDate</th>
                            <th>FullName</th>
                            
                          </tr>
                        </thead>
                        <tbody>{brochure}</tbody>
                      </table>
                    </center>

                    <p></p>
                  </Tab>
                </Tabs>
              </div>

              <div className="modal-footer">
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

export default ViewUserModal;  
