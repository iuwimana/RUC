import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/contractinspection/contractinspection";
const apiEndpoints = apiUrl.apiUrl + "/contractinspection/contractinspections";

export async function getcontractinspections() {
  try {
    const contractor = await http.get(apiEndpoint);
    return contractor;
  } catch (ex) {
    return null;
  }
}


export async function getcontractinspectionByserviceorder(serviceorderid) {
  try {
    return await http.post(apiEndpoints, {serviceorderid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractinspection data, Please try again later" +
        ex
    );
  }
}
export async function deletecontractinspection(inspectionid) {
  try {
    await http.delete(apiEndpoint, {
      data: { inspectionid: inspectionid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting inspection Please try again later" +
        ex
    );
  }
}

export async function addcontractinspection(inspectionid,serviceorderid ,  isworkloadfinished , istimelineexpected , observations,isreadyforpayment) {
  try {
    await http.post(apiEndpoint, {
      inspectionid,
      serviceorderid , 
       isworkloadfinished , 
       istimelineexpected , 
       observations,
       isreadyforpayment,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving inspection of funds Please try again later" +
        ex
    );
  }
}
