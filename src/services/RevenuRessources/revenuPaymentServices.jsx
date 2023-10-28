import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/revenupayment/revenupayment";

export async function getrevenupayments() {
  try {
    const revenupaymentget = await http.get(apiEndpoint);
    return revenupaymentget;
  } catch (ex) {
    return null;
  }
}

export async function getrevenupaymentById(RevenuePaymentId) {
  try {
    return await http.get(apiEndpoint, RevenuePaymentId);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching RevenuePayment data, Please try again later" +
        ex
    );
  }
}
export async function deleteRevenuePayment(RevenuePaymentId) {
  try {
    await http.delete(apiEndpoint, {
      data: { RevenuePaymentId: RevenuePaymentId },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting RevenuePayment Please try again later" +
        ex
    );
  }
}
export async function addRevenuepayment(
  RevenuePaymentId,
  paymentmodeid,
  revenueproductid,
  Value
) {
  try {
    await http.post(apiEndpoint, {
      RevenuePaymentId,
      paymentmodeid,
      revenueproductid,
      Value,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving RevenuePayment of funds Please try again later" +
        ex
    );
  }
}
