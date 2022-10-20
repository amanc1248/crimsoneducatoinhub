import axios from "axios";
import React from "react";

// fetching all data
export function getAllData(data) {
  let url = data.url;
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(
        url,
        {
          collectionName: data.collectionName,
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// insert data
export function insertData(data) {
  let url = data.url;
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(
        url,
        {
          collectionName: data.collectionName,
          doc: data.doc,
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

//get total count
export function getTotalCount(data) {
  let url = data.url;
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(
        url,
        {
          collectionNames: data.collectionNames,
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
export function calculateDate(data) {
  let url = data.url;
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(
        url,
        {
          collectionNames: data.collectionNames,
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
export function getCourseData(data) {
  let url = data.url;
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(
        url,
        {
          collectionName: data.collectionName,
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
