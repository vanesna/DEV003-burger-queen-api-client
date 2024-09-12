import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/header";
import CardWorker from "./CardWorker";

export default function Users() {
  const [workers, setWorkers] = useState([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const getWorkers = () => {
    const token = localStorage.getItem("sessionToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get("http://localhost:8080/users", { headers })
      .then((res) => {
        const response = res.data;
        console.log(response);
        setWorkers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateWorker = (e) => {
    e.preventDefault();
    // input de mail
    // input de rol
    // objeto de suario editado
    const token = localStorage.getItem("sessionToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios.put();
  };

  const deleteWorker = (id, e) => {
    e.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      const token = localStorage.getItem("sessionToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      axios
        .delete(`http://localhost:8080/users/${id}`, { headers })
        .then((res) => {
          console.log("deleted worker", res);
          setWorkers(workers.filter((worker) => worker.id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  const addWorker = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getWorkers();
  }, []);

  return (
    <div>
      <Header />
      <CardWorker workers={workers} deleteWorker={deleteWorker} />
    </div>
  );
}
