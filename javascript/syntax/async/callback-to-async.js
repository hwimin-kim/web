"use strict";

//Callback Hell example
class UserStorage {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          (id === "khm" && password === "gnlals") ||
          (id === "kms" && password === "audtjd")
        ) {
          resolve(id);
        } else {
          reject(new Error("not found"));
        }
      }, 2000);
    });
  }

  getRoles(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user === "khm") {
          resolve({ name: "khm", role: "admin" });
        } else {
          reject(new Error("no access"));
        }
      }, 1000);
    });
  }
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");

let checkUser = async () => {
  try {
    const user = await userStorage.loginUser(id, password);
    const userAdmin = await userStorage.getRoles(user);
    alert(`Hello ${userAdmin.name}, you have a ${userAdmin.role}`);
  } catch (error) {
    console.log(error);
  }
};

checkUser();
