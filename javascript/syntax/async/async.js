"use strict";

// async & await

// 1. async
// async를 사용한 함수의 리턴값은 프로미스 객체이다.
let fuetchUser = async () => {
  // do network request in 10 secs...
  return "hiw min kim";
};

const user = fuetchUser();
console.log(user);

// 2. await
let delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let getApple = async () => {
  await delay(2000);
  return "🍎";
};

let getBanana = async () => {
  await delay(3000);
  return "🍌";
};

// 사과: 3초, 바나나: 3초 총 6초가 걸린다.
let pickFruits = async () => {
  const apple = await getApple(3000);
  const banana = await getBanana(3000);
  return `직렬처리: ${apple} + ${banana}`;
};

// 병렬처리로 변경
// 프로미스는 호출즉시 run을 한다.
// 병렬처리로 작동하므로 총 3초가 걸린다.
let pickFruits2 = async () => {
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;
  return `병렬처리: ${apple} + ${banana}`;
};

pickFruits().then(console.log);
pickFruits2().then(console.log);

// 3. useful Promise APIs
// 병렬처리시 Promise.all API를 사용한다.
let pickAllFruits = () => {
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(" + ")
  );
};

pickAllFruits().then(console.log);

// 다수의 Promise 중 가장 빨리 반환된 것을 고를 때
// Promise.race API를 사용한다.
let pickOnlyOne = () => {
  return Promise.race([getApple(), getBanana()]);
};

pickOnlyOne().then(console.log);
