"use strict";

// state: pending -> fulfilled or rejected
// Producer vs Consumer

// 1. Producer
// when new Promise is created, the executor runs automatically.
const promise = new Promise((resolve, reject) => {
  console.log("doing something...");
  setTimeout(() => {
    resolve("hwi min kim");
    // reject(new Error('no network'));
  }, 2000);
});

// 2. Consumers: then, catch, finally
promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally");
  });

// 3. Promise chaniing
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("🐔"), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    // setTimeout(() => resolve(`${hen} => 🥚`), 1000);
    setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000);
  });
const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

// 매개변수를 1가지만 받아서
// 함수에 하나만 전달하는 경우 생략가능
getHen()
  .then((hen) => getEgg(hen))
  .then((egg) => cook(egg))
  .then((meal) => console.log(meal));

// 에러 발생 시
// 그 이후의 then은 무시하고 catch로 넘어간다.
getHen() //
  .then(getEgg)
  .then(cook)
  .then(console.log)
  .catch(console.log);

// 에러 발생 시
// then 사이에 catch를 넣어 에러 핸들링이 가능
getHen() //
  .then(getEgg)
  .catch((error) => {
    return "🍤";
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);
