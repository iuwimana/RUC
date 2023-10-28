import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Program from "../../../services/RMFPlanning/programServices";

import {  useState } from "react";

const EditForm = ({ personDetails, Description, index }) => {
  


  const id = index;

  const [programname, setProgramname] = useState(personDetails);
  const [description, setDescription] = useState(Description);

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      await Program.addprogram(id, programname, description);
      toast.success(`Program data  ${programname} and ${description}  has been updated successful`);
      window.location.reload(false);
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
        toast.error(
          "An Error Occured, while saving Program data Please try again later"
        );
      }
      
    }
    
  };
   
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Programname *"
          name="Programname"
          value={programname}
          onChange={(e) => setProgramname(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          as="textarea"
          placeholder="Description"
          rows={3}
          name="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      
      <Button variant="success" type="submit" block>
        Update
      </Button>
       
    </Form>
  );
};

export default EditForm;
