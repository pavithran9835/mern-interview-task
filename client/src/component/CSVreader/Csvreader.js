import React, { useState } from "react";
import "./Csvreader.css";
import CSVReader from "react-csv-reader";
import axios from "axios";
import { getCookie } from "../../helper";
import { Link } from "react-router-dom";
import GetAppIcon from "@material-ui/icons/GetApp";

const Csvreader = () => {
  const token = getCookie("token");

  const [fieldData, setFieldData] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleForce = (data, fileInfo) => {
    setFieldData(data[0]);
    setButtonDisabled(false);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  const updateDataHandler = () => {
    axios.post(
      "http://localhost:5000/user/update_user",
      {
        firstname: fieldData.firstname,
        lastname: fieldData.lastname,
        age: fieldData.age,
        gender: fieldData.gender,
        education: fieldData.education,
        mobile: fieldData.mobile,
        address: fieldData.address,
        state: fieldData.state,
        nationality: fieldData.nationality,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <div className="csv_container">
      <div className="home_left">
        <p>upload csv file to update user data</p>
        <div className="input_file">
          <CSVReader
            cssClass="react-csv-input"
            onFileLoaded={handleForce}
            parserOptions={papaparseOptions}
          />
        </div>
        <Link to="/files/data.csv" target="_blank" download>
          Click here to Download CSV file <GetAppIcon />
        </Link>
      </div>
      <div className="home_right">
        {fieldData.firstname && (
          <div className="file_data_container">
            <p>
              <span>First Name</span> : {fieldData.firstname}
            </p>
            <p>
              <span>Last Name</span> : {fieldData.lastname}
            </p>
            <p>
              <span>Age</span> : {fieldData.age}
            </p>
            <p>
              <span>Gender</span> : {fieldData.gender}
            </p>
            <p>
              <span>Education</span> : {fieldData.education}
            </p>
            <p>
              <span>Address</span> : {fieldData.address}
            </p>
            <p>
              <span>State</span> : {fieldData.state}
            </p>
            <p>
              <span>Nationality</span> : {fieldData.nationality}
            </p>
            <button
              type="button"
              onClick={updateDataHandler}
              className={buttonDisabled ? "buttonDisable" : "buttonActive"}
              disabled={buttonDisabled ? "true" : ""}
            >
              Update Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Csvreader;
