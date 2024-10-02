function factorialInterative(num) {
 if(num < 0) return undefined;
    let total = 1;
  for (let i = num; i > 1; i--) {
    total *= i;
  }
  return total;
}

console.log(factorialInterative(5)); // 120

function factorial(num) {
    console.trace();
  if(num === 1 || num === 0) return 1;
  return num * factorial(num - 1);
}

console.log(factorial(5)); // 120