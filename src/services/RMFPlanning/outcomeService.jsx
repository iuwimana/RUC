import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/outcome/outcome";
const apiEndpoints = apiUrl.apiUrl + "/outcome/outcomes";
const apiEndpointpdf = apiUrl.apiUrl + "/outcome/create-pdf";
const apiEndpointsap = apiUrl.apiUrl + "/outcome/outcomesap";
export async function getoutcomes() {
  try {
    const outcome = await http.get(apiEndpoint);
    return outcome;
  } catch (ex) {
    return null;
  }
}
export async function getoutcomeforSAP(OutcomeId) {
  try {
    const outcome = await http.post(apiEndpointsap, { OutcomeId });
    return outcome;
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching outcome data, Please try again later" +
        ex
    );
  }
}

export async function getoutcomeById(SubProgramId) {
  try {
    const outcome = await http.post(apiEndpoints, { SubProgramId });
    return outcome;
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching outcome data, Please try again later" +
        ex
    );
  }
}
export async function deleteoutcome(OutcomeId) {
  try {
    await http.delete(apiEndpoint, { data: { OutcomeId: OutcomeId } });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting outcome Please try again later" + ex
    );
  }
}
export async function addoutcome(
  OutcomeId,
  SubProgramId,
  OutComeName,
  FiscalYearID,
  Description
) {
  try {
    //fetch(apiEndpoint, {
    //method: 'POST',
    // body: JSON.stringify({
    //  RoleID: RoleID,
    //   RoleName: RoleName,
    //  Description: Description,
    //   IsSystemRole: IsSystemRole,
    // }),
    // headers: {
    //   'Content-type': 'application/json; charset=UTF-8',
    // },
    // })

    await http.post(apiEndpoint, {
      OutcomeId,
      SubProgramId,
      OutComeName,
      FiscalYearID,
      Description,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving outcome of funds Please try again later" +
        ex
    );
  }
}

export async function addsappdf(FiscalYear, Outcome, OutcomeId) {
  try {
    await http.post(apiEndpointpdf, {
      FiscalYear,
      Outcome,
      OutcomeId,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving SAP PDF of funds Please try again later" +
        ex
    );
  }
}
