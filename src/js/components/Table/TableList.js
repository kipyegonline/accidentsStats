import React from "react";
import { sumValues, AddObjectProps } from "../tools/SvgComp";

export const TableList = ({ data, TableBody, a }) =>
  data.map((d) => (
    <TableBody key={d.id} classlist={d.victimClass} yoda={d} name={d[a]} />
  ));

export const TableBody = ({ name, classlist, yoda }) => {
  //get the object property name
  const objectClass = Object.entries(yoda).find((item) => item[1] === name);
  //concatenate the object name, victim class and year
  classlist = `${classlist}-${objectClass[0]}-${new Date(
    yoda.addedon
  ).getFullYear()}`;

  const handleMouseEnter = (e) => {
    //get the other element
    const otherEl = classControl(e.target.classList.value);

    e.target.classList.add("purple");
    e.target.style.color = "white";
    //also style the other table
    otherEl.classList.add("purple");
    otherEl.style.color = "white";
  };
  const handleMouseLeave = (e) => {
    //get the other element

    const otherEl = classControl(e.target.classList.value);
    e.target.classList.remove("purple");
    e.target.style.color = "";
    //also remove  style from  the other table
    otherEl.classList.remove("purple");
    otherEl.style.color = "";
  };
  return (
    <td
      className={classlist}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {name}
    </td>
  );
};
export const TableFoot = ({ data, a }) => (
  <td className="font-weight-bold summary">{AddObjectProps(data, a)}</td>
);
export const TableHeader = ({ name }) => {
  let header = "";
  if (name.indexOf("_") !== -1) {
    header = name.split("_");
    header = header.join(" ");
    header = header.slice(0, 1).toUpperCase() + header.slice(1);
  } else {
    header = name.slice(0, 1).toUpperCase() + name.slice(1);
  }
  return <th className="font-weight-bold">{header}</th>;
};
export default TableList;

//helper func
function classControl(str) {
  if (!str.includes("purple")) {
    let classStr = str.split("-");

    if (classStr.includes("2020")) {
      classStr[classStr.indexOf("2020")] = "2019";
    } else if (classStr.includes("2019")) {
      classStr[classStr.indexOf("2019")] = "2020";
    }
    classStr = classStr.join("-");

    const el = document.querySelector(`.${classStr}`);
    return el;
  } else {
    str = str.slice(0, str.length - 6);
    let classStr = str.split("-");

    if (classStr.includes("2020 ")) {
      classStr[classStr.indexOf("2020 ")] = "2019 ";
    } else if (classStr.includes("2019 ")) {
      classStr[classStr.indexOf("2019 ")] = "2020 ";
    }
    classStr = classStr.join("-");

    const el = document.querySelector(`.${classStr}`);
    return el;
  }
}
