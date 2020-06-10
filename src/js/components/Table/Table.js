import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Table, Tr } from "reactstrap";
import TableList, { TableHeader, TableBody, TableFoot } from "./TableList";
import { sumValues, AddObjectProps, ToolTip } from "../tools/SvgComp";

function TableStats({ ntsa, getValue }) {
  const [total, setTotal] = useState(0);

  const getSummary = (ntsa) =>
    ntsa
      .map(
        (nt) =>
          Number(nt["fatalties"]) +
          Number(nt["slightlyInjured"]) +
          Number(nt["seriouslyInjured"])
      )
      .reduce((a, b) => (a += b), 0);

  useEffect(() => {
    setTotal(getSummary(ntsa));
  });

  return (
    <>
      <Table className="table table-hover table-responsive table-bordered border-outline-primary  position-relative my-3">
        <thead>
          <tr>
            <th className="font-weight-bold">Victim class</th>
            <th className="font-weight-bold ">Summary</th>
            <TableList
              data={ntsa}
              a="victimClass"
              sendValue={getValue}
              TableBody={TableHeader}
            />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fatalties</td>
            <td className="font-weight-bold">{sumValues(ntsa, "fatalties")}</td>
            <TableList
              data={ntsa}
              a="fatalties"
              sendValue={getValue}
              TableBody={TableBody}
            />
          </tr>
          <tr>
            <td>Seriously Injured</td>
            <td className="font-weight-bold">
              {sumValues(ntsa, "seriouslyInjured")}
            </td>
            <TableList
              data={ntsa}
              a="seriouslyInjured"
              sendValue={getValue}
              TableBody={TableBody}
            />
          </tr>
          <tr>
            <td>Slightly injured</td>
            <td className="font-weight-bold">
              {sumValues(ntsa, "slightlyInjured")}
            </td>
            <TableList
              data={ntsa}
              a="slightlyInjured"
              sendValue={getValue}
              TableBody={TableBody}
            />
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="font-weight-bold">Total</td>
            <td className=" text-primary font-weight-bold text-lg">
              {total.toLocaleString()}
            </td>
            {ntsa.map((nt, i) => (
              <TableFoot
                key={i}
                data={ntsa}
                sendValue={getValue}
                a={nt["victimClass"]}
              />
            ))}
          </tr>
        </tfoot>
      </Table>
    </>
  );
}
export default TableStats;
