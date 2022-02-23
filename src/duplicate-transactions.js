function findDuplicateTransactions(transactions) {

  if (!transactions.length === 1) return [];
  if (!Array.isArray(transactions)) throw error("Error");
  if (!transactions.length) return transactions
  
  const map = new Map();
  const sortedTransactions = sortTransactions([...transactions]);
  
  sortedTransactions.forEach(transaction => {
    const {
      sourceAccount,
      targetAccount,
      amount,
      category,
      time,
    } = transaction;
  
    const key = `${sourceAccount}-${targetAccount}-${amount}-${category}-${time.slice(0, 15)}`;
     
    if (map.has(key)) {
      const group = map.get(key);
      const lastGroupMemberIndex = group.length - 1;
      const lastGroupMember = group[lastGroupMemberIndex];
  
      const timeDifference = getTimeDifference(
        lastGroupMember.time,
        time
      );
  
      if (timeDifference < 1) {
        group.push(transaction);
      }
    } else {
      map.set(key, [transaction]);
    }
  });
  
  const duplicates = filterGroups(Array.from(map.values())); // iterable of array of transactions
 // Array.from converts it to an Array of array of transactions
  
  return duplicates;
 }
  
 
  
 function getTimeDifference(time1, time2) {
  const milliseconds = getMilliseconds(time2) - getMilliseconds(time1);
  const minutes = milliseconds / (1000 * 60); // return time difference in minutes
  
  return minutes;
 }
  
 function sortTransactions(transactions) {
  return transactions.sort((a, b) => getMilliseconds(a.time) - getMilliseconds(b.time));
 }
  
 function filterGroups(groups) {
  return groups.filter(g => g.length > 1);
 }
  
 function getMilliseconds(timeStamp) {
  return new Date(timeStamp).getTime();
 }

export default findDuplicateTransactions;
