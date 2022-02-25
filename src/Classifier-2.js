////CLASSIFIER

// Create a function to calculae age...
function getAge(birth) {
  let cur = new Date(2019, 0, 1);
  let past = new Date(birth);
  let age = cur.getFullYear() - past.getFullYear();
  return age;
}

// Write a function to sort students according to their date of birth...
function groupMembers(input) {
  const clone = JSON.parse(JSON.stringify(input));
  const data = clone.sort(
    (current, next) => getAge(current.dob) - getAge(next.dob)
  );

  //Add the age property to each object...
  const transformedData = data.map((person) => {
    person.age = 2019 - new Date(person.dob).getFullYear();
    return person;
  });

  const groups = [];
  //use 3 pointers
  let i = 0;
  let j = 1;
  let k = 2;
  while (i < transformedData.length) {
    let first = transformedData[i];
    let second = transformedData[j];
    let third = transformedData[k];

    //check the age difference between the current person and the person
    //2 places ahead. if it is less than or equal to 5, group 3 of them
    //then move the pointers 3 places ahead of their previous positions
    if (Math.abs(first?.age - third?.age) <= 5) {
      groups.push([first, second, third]);
      i += 3;
      j += 3;
      k += 3;
      continue;
    }

    //check the age difference between the current person and the person
    //1 place ahead. if it is less than or equal to 5, group both of them
    //then move the pointers 2 places ahead of their previous positions
    if (Math.abs(first?.age - second?.age) <= 5) {
      groups.push([first, second]);
      i += 2;
      j += 2;
      k += 2;
      continue;
    }

    //the difference in age between the current person and next is
    //greater than 5 so we just keep the current person in a group of his own
    //and move the pointers 1 place ahead
    groups.push([first]);
    i++;
    j++;
    k++;
  }

  //get regNumbers in an array of arrays and convert them to numbers
  const regNumbers = groups.map((group) => {
    return group.map((person) => parseInt(person.regNo));
  });
  return { groups, regNumbers };
}

function getSum(group) {
  return group.reduce((total, person) => total + person.age, 0);
}

function classifier(input) {
  const result = {};
  const { groups, regNumbers } = groupMembers(input);
  result.noOfGroups = groups.length;
  groups.forEach((group, index) => {
    const key = `group${index + 1}`;
    result[key] = {
      members: group,
      oldest: group[group.length - 1].age,
      sum: getSum(group),
      regNos: regNumbers[index].sort((a, b) => a - b),
    };
  });
  return result;
}

console.log(
  classifier([
    {
      name: 'Hendrick',
      dob: '1853-07-18T00:00:00.000Z',
      regNo: '041',
    },
    {
      name: 'Albert',
      dob: '1879-03-14T00:00:00.000Z',
      regNo: '033',
    },
    {
      name: 'Marie',
      dob: '1867-11-07T00:00:00.000Z',
      regNo: '024',
    },
    {
      name: 'Neils',
      dob: '1885-10-07T00:00:00.000Z',
      regNo: '02',
    },
    {
      name: 'Max',
      dob: '1858-04-23T00:00:00.000Z',
      regNo: '014',
    },
    {
      name: 'Erwin',
      dob: '1887-08-12T00:00:00.000Z',
      regNo: '09',
    },
    {
      name: 'Auguste',
      dob: '1884-01-28T00:00:00.000Z',
      regNo: '08',
    },
    {
      name: 'Karl',
      dob: '1901-12-05T00:00:00.000Z',
      regNo: '120',
    },
    {
      name: 'Louis',
      dob: '1892-08-15T00:00:00.000Z',
      regNo: '022',
    },
    {
      name: 'Arthur',
      dob: '1892-09-10T00:00:00.000Z',
      regNo: '321',
    },
    {
      name: 'Paul',
      dob: '1902-08-08T00:00:00.000Z',
      regNo: '055',
    },
    {
      name: 'William',
      dob: '1890-03-31T00:00:00.000Z',
      regNo: '013',
    },
    {
      name: 'Owen',
      dob: '1879-04-26T00:00:00.000Z',
      regNo: '052',
    },
    {
      name: 'Martin',
      dob: '1871-02-15T00:00:00.000Z',
      regNo: '063',
    },
    {
      name: 'Guye',
      dob: '1866-10-15T00:00:00.000Z',
      regNo: '084',
    },
    {
      name: 'Charles',
      dob: '1868-02-14T00:00:00.000Z',
      regNo: '091',
    },
  ])
);
