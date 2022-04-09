import "./CvsDownloader.css";
import { CSVLink } from "react-csv";
import GraphQlApi from "../api/graphqlApiCall";
import { useState } from "react";

const CvsDownloader = (props) => {
  const filename = "AllActivities.cvs";
  const [data, setData] = useState([])

  const getAllActivitiesOverview = async (event, done) => {
    const api = new GraphQlApi();
    const resp = await api.getAllActivitiesOverview();
    console.log([resp.data]); 
    done(true)
    setData([resp.data]);
  };

  return (
    <CSVLink data={data} asyncOnClick={true} filename={filename} target="_blank" onClick={getAllActivitiesOverview}>
      Download Test Cvs
    </CSVLink>
  );
};

export default CvsDownloader;
