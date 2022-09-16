const age = parseInt(prompt("How old are you?"));

// console.log(isNaN(age));


if(isNaN(age)) {
  console.log("Please write a number");
} else if (age < 18) {
  console.log("You are too young to drink.");
} else if (age >= 18 && age <= 60) {
  console.log("You can drink.");
} else {
  console.log("You'd better not drink.")
}
