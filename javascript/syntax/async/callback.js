'use strict';

// Synchronous callback
let printImmediately = print=>print();
printImmediately(()=>console.log('sync callback'));

// Asynchronous callback
let printWithDelay = (print,timeout)=>{
    setTimeout(print,timeout);
};
printWithDelay(()=>console.log('async callback'),2000);

//Callback Hell example
class UserStorage{
    loginUser(id, password, onSuccess, onError){
        setTimeout(()=>{
            if(
                (id === 'khm' && password === 'gnlals') ||
                (id === 'kms' && password === 'audtjd')
            ){
                onSuccess(id);
            }else{
                onError(new Error('not found'));
            }
        },2000);
    }

    getRoles(user, onSuccess, onError){
        setTimeout(()=>{
            if(user === 'khm'){
                onSuccess({name: 'khm', role: 'admin'});
            }else{
                onError(new Error('no access'));
            }
        },1000);
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

userStorage.loginUser(
    id, 
    password,
    user=>{
        userStorage.getRoles(
            user, 
            userWithRole=>{
                alert(`Hellow ${userWithRole.name}, you have a ${userWithRole.role}`);
            },
            error=>{
                console.log(error)
            }
        );
    },
    error=>{console.log(error)}
);