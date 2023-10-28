import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/contractpayment/contractpayment";
const apiEndpoints = apiUrl.apiUrl + "/contractpayment/contractpayments";

export async function getcontractpayments() {
  try {
    const contractor = await http.get(apiEndpoint);
    return contractor;
  } catch (ex) {
    return null;
  }
}


export async function getcontractpaymentBycontract(contractid) {
  try {
    return await http.post(apiEndpoints, {contractid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractpayment data, Please try again later" +
        ex
    );
  }
}
export async function deletecontractpayment(contractpaymentid) {
  try {
    await http.delete(apiEndpoint, {
      data: { contractpaymentid: contractpaymentid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting contractpayment Please try again later" +
        ex
    );
  }
}

export async function addcontractpayment(contractpaymentid,contractid ,payedamount,contractamount ,remainamount) {
  try {
    await http.post(apiEndpoint, {
      contractpaymentid,
      contractid ,
      payedamount,
      contractamount ,
      remainamount
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving inspection of funds Please try again later" +
        ex
    );
  }
}
