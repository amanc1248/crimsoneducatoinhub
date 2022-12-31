import React from "react";
import axios from "axios";

// fetching all data
export function getData(data) {
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
          pageNumber: data.pageNumber,
          nPerPage: data.nPerPage,
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
  console.log("HELLO", data);
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

//insert photo into cloudinary
export function insertPhoto(data) {
  let url = data.url;
  let formData = data.formData;

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    console.log(url);
    axios
      .post(url, config)
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// update data
export function updateData(data) {
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
          id: data.id,
          collectionName: data.collectionName,
          updateTo: data.updatedTo,
        },
        config
      )
      .then((result) => {
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// delete data
export function deleteData(data) {
  let url = data.url;
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .delete(url, config)
      .then((result) => {
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

//get one modal total count
export function getOneModalTotalCount(data) {
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

//yaha maile token add grya xu yesma token add grda kai farak prxa prdaina?
//get one modal all documents
export function getOneModalAllDocuments(data) {
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
          token: data.token,
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
// export function getOneModalAllDocumentsToken(data) {
//   let url = data.url;
//   const config = {
//     header: {
//       "Content-Type": "application/json",
//     },
//   };
//   return new Promise((resolve, reject) => {
//     axios
//       .post(
//         url,
//         {
//           collectionName: data.collectionName,
//         },
//         config
//       )
//       .then((result) => {
//         console.log(result.data);
//         resolve(result.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   });
// }

//get one modal documents by id
export function getOneModalDocumentsById(data) {
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
          id: data.id,
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
