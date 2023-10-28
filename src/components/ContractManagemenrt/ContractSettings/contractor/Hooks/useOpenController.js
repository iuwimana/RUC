import { useCallback, useState } from "react";

export default function useOpenController(initialState) {
  const [isOpen, setOpenState] = useState(initialState);
  const [isOpenrec, setOpenrecState] = useState(initialState);
  const [isOpenplan, setOpenplanState] = useState(initialState);
  const [isOpencont, setOpencontState] = useState(initialState);
  const [isOpenfiscalyear, setOpenfiscalyearState] = useState(initialState);
  const[isOpencontracttype,setOpencontracttypeState]= useState(initialState);
   const[isOpenproject,setOpenprojectState]= useState(initialState);
   const[isOpenlookup,setOpenlookupState]= useState(initialState);
   const[isOpensecurity,setOpensecurityState]= useState(initialState);

   

  
 const togglesecurity = useCallback(() => {
    setOpensecurityState((state) => !state);
  }, [setOpensecurityState]);

   const togglelookup = useCallback(() => {
    setOpenlookupState((state) => !state);
  }, [setOpenlookupState]);
 
  const toggle = useCallback(() => {
    setOpenState((state) => !state);
  }, [setOpenState]);

  const togglerec = useCallback(() => {
    setOpenrecState((state) => !state);
  }, [setOpenrecState]);

  const toggleplan = useCallback(() => {
    setOpenplanState((state) => !state);
  }, [setOpenplanState]);
  const toggleCont = useCallback(() => {
    setOpencontState((state) => !state);
  }, [setOpencontState]);

  const togglecontracttype = useCallback(() => {
    setOpencontracttypeState((state) => !state);
  }, [setOpencontracttypeState]);

   const togglefiscalyear = useCallback(() => {
    setOpenfiscalyearState((state) => !state);
  }, [setOpenfiscalyearState]);

  const toggleproject = useCallback(() => {
    setOpenprojectState((state) => !state);
  }, [setOpenprojectState]);

  return { isOpen,isOpenrec,isOpenplan,isOpencont,isOpenfiscalyear,isOpencontracttype,isOpenproject,isOpenlookup,isOpensecurity, toggle,togglerec,toggleplan,toggleCont,togglefiscalyear,togglecontracttype,toggleproject,togglelookup ,togglesecurity};  
} 

