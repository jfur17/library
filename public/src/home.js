function getTotalBooksCount(books) {
  // the total amount of books should be equal to the length of the books object and that is then returned
  let total = books.length;
  return total;
}

function getTotalAccountsCount(accounts) {
  // same as the above for total number of accounts
  let total = accounts.length;
  return total;
}

function getBooksBorrowedCount(books) {
  // This returns the total amount of books that are checked out as the data has a log of the checkouts with the borrow event in the zero index being false if checked out
  let filtered = books.filter(book => !book.borrows[0].returned);
  return filtered.length;
}

// Tbis is a helper function that's called by other functions inside this file. You don't have to edit it.
function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

// NOTE: YOU DON'T HAVE TO EDIT THE FUNCTIONS BELOW
function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }

    return acc;
  }, {});

  const sorted = _sortObjectByValues(count);
  return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, { id, borrows }) => {
    acc[id] = borrows.length;
    return acc;
  }, {});

  const sorted = _sortObjectByValues(groupById);
  return sorted
      .map((id) => {
        const { title: name } = books.find(({ id: bookId }) => bookId === id);
        return { name, count: groupById[id] };
      })
      .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }

    return acc;
  }, {});

  for (let id in count) {
    const sum = count[id].reduce((a, b) => a + b);
    count[id] = sum;
  }

  const sorted = _sortObjectByValues(count);
  return sorted
      .map((authorId) => {
        const {
          name: { first, last },
        } = authors.find(({ id }) => id === Number(authorId));
        const name = `${first} ${last}`;
        return { name, count: count[authorId] };
      })
      .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
