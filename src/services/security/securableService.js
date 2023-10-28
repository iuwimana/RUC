import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/securable/securable";
const permissionapiEndpoint = apiUrl.apiUrl + "/rolepermission/rolepermission";
const permissionapiEndpoints = apiUrl.apiUrl + "/rolepermission/rolepermissions";
const apiEndpointaudit = apiUrl.apiUrl + "/securable/audit";

export async function getsecurables() {
  try {
    return await http.get(apiEndpoint);
  } catch (ex) {
    return null;
  }
}

export async function getaudittrails() {
  try {
    return await http.get(apiEndpointaudit);
  } catch (ex) {
    return null;
  }
}
export async function getsecurableId(SecurableID) {
  try {
    return await http.get(apiEndpoint,SecurableID);
  } catch (ex) {
    return toast.error("An Error Occured, while fetching securable data, Please try again later"+ex);
  }
}
export async function deletesecurable(SecurableID) {
  try {
     await http.delete(apiEndpoint,{ data: { SecurableID: SecurableID } });
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting role Please try again later"+ex);
  }
}

export async function getsecurableaccess(Email,securableid) {
  try {
    return await http.post(permissionapiEndpoints,{Email,securableid});
  } catch (ex) {
    return null;
  }
}

export async function addrolepermission(RolePermissionID,RoleID,SecurableID,CanAccess,CanCreate,CanView,CanModify,CanDelete,CanExecute) {
  try {
    
  
     await http.post(permissionapiEndpoint,{ RolePermissionID,RoleID,SecurableID,CanAccess,CanCreate,CanView,CanModify,CanDelete,CanExecute});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving Role Permission Please try again later" + ex );;
  }
}


export async function addsecurables(SecurableID,SecurableName) {
  try {
    
  
     await http.post(apiEndpoint,{ SecurableID,SecurableName});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving securable Please try again later" + ex );;
  }
}
 
   



 