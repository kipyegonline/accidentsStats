import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Table, Tr } from "reactstrap";
import TableList, { TableHeader, TableBody, TableFoot } from "./TableList";
import { sumValues, AddObjectProps, ToolTip } from "../tools/SvgComp";

function TableStats({ ntsa }) {
  const [total, setTotal] = useState(0);
  const [tools, setTools] = useState({});
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
  const getValue = (val, e) => {
    setTools({
      width: val.width,
      height: val.height,
      x: val.x,
      y: val.y,
      top: window.screenY,
      left: window.screenX,
    });
  };

  return (
    <>
      <ToolTip tools={tools} />
      <Table className="table table-hover table-bordered border-outline-primary  position-relative my-3">
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
            <td className="purple darken-1 text-white text-lg">
              {total.toLocaleString()}
            </td>
            {ntsa.map((nt, i) => (
              <TableFoot key={i} data={ntsa} a={nt["victimClass"]} />
            ))}
          </tr>
        </tfoot>
      </Table>
    </>
  );
}
export default TableStats;

let name = "sheeila";
let newName = "";
for (let i = 0; i < name.length; i++) {
  for (let j = 0; j < name.length; j++) {
    //console.log(name[i], "\n", name[j]);
  }
}
