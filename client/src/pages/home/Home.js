import React from "react";
import Header from "../../component/Header/Header";
import "./Home.css";
import Csvreader from "../../component/CSVreader/Csvreader";

const Home = () => {
  return (
    <>
      <Header />
      <Csvreader />
    </>
  );
};

export default Home;
