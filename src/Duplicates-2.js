//DUPLICATE TRANSACTIONS

function removeTransactionsPastLimit(array) {
  const result = [];
  let forwardDiff;
  let backwardDiff;
  let i = 0;
  while (i < array.length) {
    //only calculate forwardDiff if we are not at the last index of the array
    //to avoid going out of bounds
    //if we are assign a value of Infinity
    forwardDiff =
      i < array.length - 1
        ? Math.abs(new Date(array[i][1]) - new Date(array[i + 1][1]))
        : Infinity;

    //only calculate backwardDiff if we are not at the first index of the array
    //to avoid going out of bounds
    //if we are assign a value of Infinity
    backwardDiff =
      i > 0
        ? Math.abs(new Date(array[i - 1][1]) - new Date(array[i][1]))
        : Infinity;

    if (forwardDiff <= 60000) {
      result.push(array[i]);
    }
    if (backwardDiff <= 60000 && forwardDiff > 60000) {
      result.push(array[i]);
    }
    i++;
  }
  return result;
}

function findDuplicateTransactions(transactions) {
  if (!Array.isArray(transactions)) throw new Error('must be an array');
  if (transactions.length < 2) return [];
  const result = [];
  const clone = JSON.parse(JSON.stringify(transactions));

  //remove the parts that differentiate dupplicates i.e id and time
  //and turn the object into a string with JSON.stringify
  const strigifiedTransactions = clone.map((transaction) =>
    JSON.stringify({
      sourceAccount: transaction.sourceAccount,
      targetAccount: transaction.targetAccount,
      amount: transaction.amount,
      category: transaction.category,
    })
  );

  const lookUp = {};
  //forEach string, use it as a key in the lookUp object. if we see it for the first time,
  //the value will be an array with the only element being another array storing the id and time
  //if we already have the key in the lookUp object push a new array with an id and time
  //we end up with a key like
  //'{"sourceAccount":"company_x","targetAccount":"my_account","amount":10000,"category":"pension_benefits"}'
  //the value of this key will be an array
  //all the elements of the main array will be arrays holding the id and time of each transaction
  //that has a sourceAccount of company_x, targetAccount of my_account, amount of 1000 and category of pension_benefits
  strigifiedTransactions.forEach((transaction, i) => {
    lookUp[transaction]
      ? lookUp[transaction].push([clone[i].id, clone[i].time])
      : (lookUp[transaction] = [[clone[i].id, clone[i].time]]);
  });
  let temp = [];
  Object.keys(lookUp).forEach((key) => {
    //sort individual main array by the dates of the inner arrays
    lookUp[key].sort((a, b) => new Date(a[1]) - new Date(b[1]));
    //traverse the main array to remove transactions beyond the 1 minute timeframe
    lookUp[key] = removeTransactionsPastLimit(lookUp[key]);
    //recreate the original object structure
    lookUp[key].forEach((value) =>
      temp.push({ id: value[0], time: value[1], ...JSON.parse(key) })
    );
    //push into the main result and clear
    if (temp.length > 1) result.push(temp);
    temp = [];
  });
  //sort in cases where the result is not properly ordered
  result.sort((a, b) => new Date(a[0].time) - new Date(b[0].time));
  return result;
}

console.log(removeTransactionsPastLimit());
