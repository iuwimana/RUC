import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/fiscalyear/fiscalyear";
const apiEndpoints = apiUrl.apiUrl + "/fiscalyear/fiscalyears";


export async function getFiscalyears() {
  try {
    const Fiscalyear = await http.get(apiEndpoint);
    return Fiscalyear
  } catch (ex) {
    return null;
  }

  

}


export async function deleteFiscalyear(FiscalYearId) {
  try {
      await http.delete(apiEndpoint,{ data: { FiscalYearId: FiscalYearId } });
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting Fiscalyear Please try again later"+ex);
  }
}
export async function addFiscalyear(FiscalYearId,FiscalYear) {
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
  
     await http.post(apiEndpoint,{FiscalYearId,FiscalYear});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving Fiscalyear of funds Please try again later" + ex );;
  }
}
 
   



 