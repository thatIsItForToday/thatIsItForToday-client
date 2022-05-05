const getNumbersOfMemoriesAsText = number => {
  switch (number) {
    case 0:
      return "You have no memory...";
    case 1:
      return "You have 1 memory...";
    default:
      return `You have ${number} memories...`;
  }
};

export { getNumbersOfMemoriesAsText };
