import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
          pageNumber: data.pageNumber,
          nPerPage: data.nPerPage,
          checkPermission: data.checkPermission,
          userId: data.userId,
        },
        config
      )
      .then((result) => {
        resolve(result.data);
      })
      .catch((e) => {
        if (e.response.data.error === "UNAUTHORIZED") {
          toast.error(e.response.data.error, { autoClose: 5000 });
          reject(e.response.data.error);
        }
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
          checkPermission: data.checkPermission,
          userId: data.userId,
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        if (e.response.data.error === "UNAUTHORIZED") {
          toast.error(e.response.data.error, { autoClose: 5000 });
          reject(e.response.data.error);
        }
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
  console.log("data updated", data);
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
          checkPermission: data.checkPermission,
          userId: data.userId,
        },
        config
      )
      .then((result) => {
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.error === "UNAUTHORIZED") {
          toast.error(e.response.data.error, { autoClose: 5000 });
          reject(e.response.data.error);
        }
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
        if (e.response.data.error === "UNAUTHORIZED") {
          toast.error(e.response.data.error, { autoClose: 5000 });
          reject(e.response.data.error);
        }
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
          checkPermission:data.checkPermission,
          userId:data.userId
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.error === "UNAUTHORIZED") {
          toast.error(e.response.data.error, { autoClose: 5000 });
          reject(e.response.data.error);
        }
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
          checkPermission:data.checkPermission,
          userId:data.userId
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.error === "UNAUTHORIZED") {
          toast.error(e.response.data.error, { autoClose: 5000 });
          reject(e.response.data.error);
        }
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
          checkPermission:data.checkPermission,
          userId:data.userId
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.error === "UNAUTHORIZED") {
          toast.error(e.response.data.error, { autoClose: 5000 });
          reject(e.response.data.error);
        }
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
          checkPermission:data.checkPermission,
          userId:data.userId
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.error === "UNAUTHORIZED") {
          toast.error(e.response.data.error, { autoClose: 5000 });
          reject(e.response.data.error);
        }
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
          checkPermission:data.checkPermission,
          userId:data.userId
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.error === "UNAUTHORIZED") {
          toast.error(e.response.data.error, { autoClose: 5000 });
          reject(e.response.data.error);
        }
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
          filter: data.filter,
          checkPermission:data.checkPermission,
          userId:data.userId
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.error === "UNAUTHORIZED") {
          toast.error(e.response.data.error, { autoClose: 5000 });
          reject(e.response.data.error);
        }
      });
  });
}

//get document by filter
export function getDocumentByFilter(data) {
  console.log("Data........", data);
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
          filter: data.filter,
          aggregateArray: data.aggregateArray,
          returnAs: data.returnAs,
          filterType: data.filterType,
          checkPermission:data.checkPermission,
          userId:data.userId
        },
        config
      )
      .then((result) => {
        console.log(result.data);
        resolve(result.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.error === "UNAUTHORIZED") {
          toast.error(e.response.data.error, { autoClose: 5000 });
          reject(e.response.data.error);
        }
      });
  });
}
