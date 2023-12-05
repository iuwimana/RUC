import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { FcPlus } from "react-icons/fc";
import useOpenController from "./Hooks/useOpenController";
import { TableSection } from "./TableSection.jsx";
import * as Program from "../../../services/RMFPlanning/programServices";
import * as SubProgram from "../../../services/RMFPlanning/subProgramService";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";

const ProgramTable = () => {
  const { isOpen, toggle } = useOpenController(false);
  const { isLoading, setIsLoading } = useState(true);
  const [program, setProgram] = useState([]);
  const [subProgram, setSubProgram] = useState([]);

  try {
    useEffect(() => {
      const fetchProgram = async () => {
        try {
          const { data } = await Program.getprograms();
          setProgram(data);
          const { datas } = await SubProgram.getsubprograms();
          setSubProgram(datas);
        } catch (ex) {
          toast.error("Loading issues......");
        }
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error("Loading issues......");
  }
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Col
        style={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        ></Col>

        <Card className=" shadow border-0">
          <CardHeader className="bg-transparent ">
            <div className="text-muted text-center mt-2 mb-3">
              <h1>
                <div style={{ textAlign: "center" }}>
                  <h1>RMF Planning- Single Action Plan</h1>
                </div>
              </h1>
            </div>
            <div className="btn-wrapper text-center"></div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="table-responsive mb-5">
              <table>
                <thead>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <div
                      style={{
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      AddProgram
                      <button
                        className="btn btn-secondar"
                        data-toggle="modal"
                        data-target="#exampleAddModal"
                      >
                        <FcPlus />
                      </button>
                    </div>
                    <AddModal />
                  </th>
                </thead>

                {program.map((program) => (
                  <TableSection
                    persondetails={program.programname}
                    description={program.description}
                    index={program.programid}
                  />
                ))}
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default ProgramTable;
