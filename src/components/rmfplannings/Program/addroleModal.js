import React from "react";
import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import * as Program from "../../../services/RMFPlanning/programServices";
import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import Form from "../../common/form";
class AddroleModal extends Form {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);
    
    this.state = {
     data: {  ProgramId:0,ProgramName:"",Description:""}
     ,user:{},
     programs: [],
     revenues: [],
      errors: {}
    };
  }
async populateBanks() {
  try{
    const { data: programs } = await Program.getprograms();
    const { data: revenues } = await RevenuType.getrevenuTypes();
    this.setState({ programs,revenues });

  }catch (ex) {
    toast.error("Loading issues......");
  }
    
    
  }

 async  componentDidMount() {
  await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });
  }
    componentWillReceiveProps(nextProps) {
    this.setState({
       
      ProgramId: nextProps.ProgramId,
      ProgramName: nextProps.ProgramName,
      Description: nextProps.Description,
      
    });
  }
 schema = {
    ProgramId: Joi.number()
                       .required(),
    ProgramName: Joi.string()
                         .required()
                         .label("ProgramName"),
    Description: Joi.string()
                      .required()
                      .label("Description"),
   
  };
  
 
   handleClick= async(e)=>{
    try {
    const { data } = this.state;
    const ProgramId=0
    await Program.addprogram(ProgramId,data.ProgramName,data.Description);
    toast.success(`Program  has been saved successful`);
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
        
        toast.error("An Error Occured, while saving Program data Please try again later");
    }
    }
   }
  

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
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Program
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
              {this.renderInput("ProgramName", "ProgramName")}
              {this.renderArear("Description", "Description")}

              
              <div className="modal-footer">
              <button 
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
                onClick={this.handleClick}
              >AddNew</button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button >
              
              </div>
              </form>
           
            
          </div>
        </div>
      </div>
    );
  }
}

export default AddroleModal;
