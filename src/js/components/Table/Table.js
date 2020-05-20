import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Table, Tr } from "reactstrap";
import TableList, { TableHeader, TableBody, TableFoot } from "./TableList";
import { sumValues, AddObjectProps } from "../tools/SvgComp";

function TableStats({ ntsa }) {
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
    <Table className="table table-hover table-bordered border-outline-primary  my-3">
      <thead>
        <tr>
          <th className="font-weight-bold">Victim class</th>
          <th className="font-weight-bold ">Summary</th>
          <TableList data={ntsa} a="victimClass" TableBody={TableHeader} />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fatalties</td>
          <td className="font-weight-bold">{sumValues(ntsa, "fatalties")}</td>

          <TableList data={ntsa} a="fatalties" TableBody={TableBody} />
        </tr>
        <tr>
          <td>Seriously Injured</td>
          <td className="font-weight-bold">
            {sumValues(ntsa, "seriouslyInjured")}
          </td>

          <TableList data={ntsa} a="seriouslyInjured" TableBody={TableBody} />
        </tr>
        <tr>
          <td>Slightly injured</td>
          <td className="font-weight-bold">
            {sumValues(ntsa, "slightlyInjured")}
          </td>
          <TableList data={ntsa} a="slightlyInjured" TableBody={TableBody} />
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td className="font-weight-bold">Total</td>
          <td className="purple darken-1 text-white text-lg">
            {total.toLocaleString()}
          </td>
          <TableFoot data={ntsa} a="pedestrians" />
          <TableFoot data={ntsa} a="passengers" />
          <TableFoot data={ntsa} a="motor_cyclists" />
          <TableFoot data={ntsa} a="drivers" />
          <TableFoot data={ntsa} a="pillion_passengers" />
          <TableFoot data={ntsa} a="pedal_cyclists" />
        </tr>
      </tfoot>
    </Table>
  );
}
export default TableStats;
