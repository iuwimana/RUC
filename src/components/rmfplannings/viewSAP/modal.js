import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import * as Outcome from "../../../services/RMFPlanning/outcomeService";
import * as bank from "../../../services/RevenuRessources/bankservices";
import * as PaternerStatuses from "../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../services/RevenuRessources/businessPaternerServices";
import "./Modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {
        OutcomeId: 0,
        OutComeName: "",
        FiscalYear: "",
        statuses: "",
        OutcomeDescription: "",
        SubProgramName: "",
        ProgramName: "",
      },
      OutcomeId: 0,
      OutComeName: "",
      FiscalYear: "",
      statuses: "",
      OutcomeDescription: "",
      SubProgramName: "",
      ProgramName: "",
      user: {},
      errors: {},
      banks: [],
      outcomes: [],
      paternerStatuses: [],
    };
  }

 
  componentWillReceiveProps(nextProps) {
    this.setState({
      OutcomeId: nextProps.OutcomeId,
      OutComeName: nextProps.OutComeName,
      FiscalYear: nextProps.FiscalYear,
      statuses: nextProps.statuses,
      OutcomeDescription: nextProps.OutcomeDescription,
      SubProgramName: nextProps.SubProgramName,
      ProgramName: nextProps.ProgramName,
      
    });
    
  }
   async populateBanks() {
    try {
      const item = this.state;
      const { data: banks } = await bank.getbanks();
      const { data: outcomes } = await Outcome.getoutcomeforSAP(4);
      const { data: paternerStatuses } =
        await PaternerStatuses.getpaternerstatuses();
      this.setState({ banks, paternerStatuses,outcomes });
    } catch (ex) {
      toast.error("Loading issues......");
    }
  }
  async componentDidMount() {
    await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });
    
  }


  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }

  PartenerStatusIdHandler(e) {
    this.setState({ PartenerStatusId: e.target.value });
  }
  BankIdHandler(e) {
    this.setState({ BankId: e.target.value });
  }
  InstitutionPartenerIdHandler(e) {
    this.setState({ InstitutionPartenerId: e.target.value });
  }
  InstitutionPartenerNameHandler(e) {
    this.setState({ InstitutionPartenerName: e.target.value });
  }

  AccountNumberHandler(e) {
    this.setState({ AccountNumber: e.target.value });
  }
  async handleSave() {
  }
 
  render() {
    const paternerStatuses = this.state.paternerStatuses;
    const outcomes = this.state.outcomes;

     const brochure = outcomes.map((outcomes, index) => {
     

      return (
        
        <tr key={outcomes.OutcomeId}>
          <td>{outcomes.ProgramName}</td>
          <td>{outcomes.SubProgramName}</td>
          <td>{outcomes.OutPutName}</td>
          <td>{outcomes.IndicatorName}</td>
          <td>{outcomes.BaselineName}</td>
          <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            {outcomes.StartingQuarter}</td>            
            <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              {outcomes.EndingQuarter}</td>
            <td>{outcomes.TargetName}</td>
          <td>{outcomes.ActivityName}</td>
          <td>{outcomes.StakeHolderName}</td>
          <td>{outcomes.EstimatedBudget}</td>
          <td>{outcomes.SourceoffundName}</td>
                   
          
        </tr>
      )
    });
    return (
      <div
        className="modal fade"
        id="exampleModal"
        dialogClassName="my-modal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        size="xs"
                      style={{ maxWidth: "7700px", width: "100%" }}
      >
        <div className="modal-dialog" role="document"style={{ maxWidth: "7700px", width: "100%", height: "100%" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                RMFPlanning-View SAP
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


            <table cellpadding="0" cellspacing="0" border={1}>
                
                <tr class="heading">
                   <td>Program</td>
                   <td>Sub-Program</td>
                   <td>Output</td>
                   <td>Indicators </td>
                   <td>Baseline</td>
                   <td colspan="3"><table><tr><td colspan="3"> Targets/ Milestones</td></tr>
                              <tr> <td>From Quarter</td> <td>To Quarter</td> <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Target</td> </tr> </table></td>
                   <td>Activities to Deliver output </td>
                   <td>Stakeholders</td>
                   <td>Estimated budget in Rwf</td>
                   <td> Source of Fund</td>
                </tr>

                <tr>
                <td colspan="10">Outcome:{this.state.OutComeName}</td>
                </tr>
                {brochure}
             </table>
               

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
    );
  }
}

export default Modal;
