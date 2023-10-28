import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/contractor/contractor";

export async function getcontractors() {
  try {
    const contractor = await http.get(apiEndpoint);
    return contractor;
  } catch (ex) {
    return null;
  }
}


export async function getcontractorById(Contractorid) {
  try {
    return await http.get(apiEndpoint, Contractorid);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractor data, Please try again later" +
        ex
    );
  }
}
export async function deletecontractor(Contractorid) {
  try {
    await http.delete(apiEndpoint, {
      data: { Contractorid: Contractorid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting contractor Please try again later" +
        ex
    );
  }
}

export async function addcontractor(Contractorid ,ContractorName ,islocal,contractoraddress ,contractoremail,contractorphonenumber,TinNumber,contactpersonFirstName,contactpersonMiddleName,contactpersonLastName,contactpersonemail,contactpersonphonenumber) {
  try {
    await http.post(apiEndpoint, {
      Contractorid ,
      ContractorName ,
      islocal,
      contractoraddress ,
      contractoremail,
      contractorphonenumber,
      TinNumber,
      contactpersonFirstName,
      contactpersonMiddleName,
      contactpersonLastName,
      contactpersonemail,
      contactpersonphonenumber,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving contractor of funds Please try again later" +
        ex
    );
  }
}
