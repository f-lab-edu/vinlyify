const splitLengthyList = (items: string[]) => {
  const list = [];
  let temp = [];
  for (const element of items) {
    if (temp.length === 50) {
      list.push(temp);
      temp = [];
    } else {
      temp.push(element);
    }
  }
  return list;
};

export default splitLengthyList;
