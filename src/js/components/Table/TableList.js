import React from "react";
import PropTypes from "prop-types";
import { sumValues, AddObjectProps } from "../tools/SvgComp";

const getYear = (date = Date.now()) => new Date(date).getFullYear();
//TABLE LIST
export const TableList = ({ data, TableBody, sendValue, a }) =>
  data.map((d) => (
    <TableBody
      key={d.id}
      classlist={d.victimClass}
      yoda={d}
      sendValue={sendValue}
      name={d[a]}
    />
  ));

TableList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  TableBody: PropTypes.func,
  a: PropTypes.string,
  ntsa: PropTypes.arrayOf(PropTypes.object),
};
export const TableBody = ({ name, classlist, yoda, sendValue }) => {
  //get the object property name
  const objectClass = Object.entries(yoda).find((item) => item[1] === name);

  //concatenate the object name, victim class and yearif
  if (objectClass) {
    classlist = `${classlist}-${objectClass[0]}-${new Date(
      yoda.addedon
    ).getFullYear()}`;
  }

  const handleMouseEnter = (e, data) => {
    const year = getYear(data.addedon);
    //get the other element from the dom
    const otherEl = classControl(e.target.classList.value);

    if (year == getYear()) {
      //send them up
      getTableData(e, otherEl);
      sendValue(e.target.getBoundingClientRect(), e);
    }

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
      onMouseEnter={(e) => handleMouseEnter(e, yoda)}
      onMouseLeave={(e) => handleMouseLeave(e, yoda)}
      onMouseOut={(e) => handleMouseLeave(e, yoda)}
    >
      {name}
    </td>
  );
};
TableBody.propTypes = {
  name: PropTypes.string.isRequired,
  sendValue: PropTypes.func,
  classlist: PropTypes.string.isRequired,
  yoda: PropTypes.shape({
    victimClass: PropTypes.string,
    fill: PropTypes.string,
    fatalties: PropTypes.string,
    slightlyInjured: PropTypes.string,
    seriouslyInjured: PropTypes.string,
    id: PropTypes.string,
    addedon: PropTypes.string,
  }).isRequired,
};
export const TableFoot = ({ data, a }) => {
  const classSelect = "summary_" + a + "_" + getYear(data[0]["addedon"]);
  const handleMouseEnter = (e, data) => {
    let year = getYear(data[0]["addedon"]);
    const el = hoverControl(e);
    if (year == getYear()) {
      //send them up
      getTableData(e, el);
    }
    //perform UI duties
    e.target.classList.add("purple");
    el.classList.add("purple");
  };
  const handleMouseLeave = (e) => {
    const el = hoverControl(e);
    //clean up the UI
    e.target.classList.remove("purple");
    el.classList.remove("purple");
  };

  return (
    <td
      className={`font-weight-bold ${classSelect}`}
      data-hover={classSelect}
      onMouseEnter={(e) => handleMouseEnter(e, data)}
      onMouseLeave={handleMouseLeave}
    >
      {AddObjectProps(data, a)}
    </td>
  );
};

TableFoot.propTypes = {
  data: PropTypes.array,
  a: PropTypes.string.isRequired,
};
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
TableHeader.propTypes = { name: PropTypes.string.isRequired };
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
function hoverControl(el) {
  let clickedYear = el.target.dataset.hover;
  clickedYear = clickedYear.split("_");
  let clickedClass = "";

  if (parseInt(clickedYear[clickedYear.length - 1]) == 2020) {
    clickedYear[clickedYear.length - 1] = 2019;

    clickedClass = clickedYear;
  } else {
    clickedYear[clickedYear.length - 1] = 2020;
    clickedClass = clickedYear;
  }
  clickedClass = "." + clickedClass.join("_");

  const elem = document.querySelector(`${clickedClass}`);
  return elem;
}

function getTableData(event, otherTable) {
  const variance =
    Number(event.target.textContent) - Number(otherTable.textContent);
  const tdetails = {
    lastyear: +otherTable.textContent,
    thismonth: +event.target.textContent,
    variance,
    pervariance: (variance / +otherTable.textContent) * 100,
    dims: event.target.getBoundingClientRect(),
  };
  // console.log("T tails", tdetails);
}
