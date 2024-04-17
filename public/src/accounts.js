function findAccountById(accounts, id) {
  // This finds the account with the matching ID and returns that object
  const found = accounts.find(account => account.id === id);
  return found;
}

function sortAccountsByLastName(accounts) {
  //This function sorts the accounts by last name by changing the last name to lowercase and then comparing with the next name
  let sorted = accounts.sort((account1, account2) => account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1);
  return sorted;
}

function getAccountFullNames(accounts) {
  //This account takes the names of the accounts and populates a new array with only the first and last name
  return accounts.map(account => {
    const { first, last } = account.name;
    return `${first} ${last}`;
  });
}

// NOTE: YOU DON'T HAVE TO EDIT THE FUNCTIONS BELOW
function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    const count = book.borrows.reduce((borrowAcc, borrow) => {
      return borrow.id === account.id ? borrowAcc + 1 : borrowAcc;
    }, 0);

    return acc + count;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
      .filter((book) => {
        const recent = book.borrows[0];
        return !recent.returned && recent.id === account.id;
      })
      .map((book) => {
        const author = authors.find((author) => author.id === book.authorId);
        return { ...book, author };
      });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getAccountFullNames,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
