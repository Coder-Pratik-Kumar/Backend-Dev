// console.log("fetching user data ");

// let user;
// setTimeout(() => {
//     user = { name: "pratik", email: "pratik@gmail.com" }
//     console.log("user is fetched")
// }, 0);

// console.log(user);

// console.log("first task")
// setTimeout(() => {
  
//     console.log("task 2")
// }, 0);

// Promise.resolve().then(() => console.log("promise resolved"))
// console.log("task2")


const fetchUser = (id) => {
    return new Promise((resolve, reject)=> {
    setTimeout(() => {
        const users = {
            1: { name: "Raj", phone: "8859295480", address: "Aligarh" },
            2: {name: "Pratap", phone: "8859295490", address: "sndlkjdafl"}
        }

        const user = users[id];
        if (user) {
            resolve(user)
        }
        else {
            reject ("user not found")
        }
    },2000)
    })
}

fetchUser(1)
    .then((user) => console.log(user))
    .catch((error) => console.log(error))
console.log(fetchUser(1));

const getUserData = async () => {
    try {
        const user = await fetchUser()
        console.log(user);
    } catch (e) {
        console.log(e);
    }
};
getUserData();