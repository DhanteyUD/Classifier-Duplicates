function classifier(input) {

  // Check if input is an array and if array length is greater than 1...
  if (!Array.isArray(input)) throw Error ("Input must be an array");
  if (!input.length) return { noOfGroups: 0 };

  // Make a new copy of classifier input...
  const newInput = [...input];

  // Function to calculate age of students assuming current year is 2019...
  const newAge = (year) => new Date(2019, 0, 1).getFullYear() - new Date(year).getFullYear()

  // Create a new classifier object literal that includes all student details including age...
  const newClassifier = newInput.map(detail => ({
    name: detail.name,
    age: newAge(detail.dob),
    regNo: detail.regNo,
    dob: detail.dob,
  }));

  // Sort students age in ascending order...
  const sortedAge = newClassifier.sort((a, b) => a.age - b.age);

  // Initialize a store with the first student in the sorted age array and use the student as a base to check for grouping conditions...
  let store = [sortedAge[0]];
  let studentGroup = [];

  // Group students by age difference not more than 5 and group length not more than 3...
  for (let i = 1; i < newClassifier.length; i++) {
    if (sortedAge[i].age - store[0].age <= 5 && store.length <= 2) {
      store.push(newClassifier[i]);
    } else {
      studentGroup.push(store);
      store = [];
      store.push(newClassifier[i]);
    }
  }

  // For last group in store...
  if (store.length) {
    studentGroup.push(store);
  }

  // Set key for number of groups in output..
  let output = {};
  output['noOfGroups'] = studentGroup.length;

  // Create output format for each student group...
  const groupOutput = studentGroup.map((group) => {
    return {
      members: group.map((details) => ({
        name: details.name,
        age: details.age,
        dob: details.dob,
        regNo: details.regNo,
      })),
      oldest: group[group.length - 1].age,
      sum: group.reduce((a, b) => {
        return a + b.age;
      }, 0),
      regNos: group.map(n => (Number(n.regNo))).sort((a, b) => a - b)
    };
  });

  // Set output key for each group...
  groupOutput.forEach((group, i) => {
    let currentGroup = `group${i + 1}`;

    output = {
      ...output,
      [currentGroup]: group };
  });

  return output;
}

export default classifier;
