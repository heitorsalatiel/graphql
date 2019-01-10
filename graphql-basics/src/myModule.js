const message = "Some message from myModule.js";

const name = "Heitor Salatiel";

const location = "BH";

const getGreeting = (name) => {
    return `Welcome to the course ${name}`
}

export {message, name, getGreeting, location as default}

