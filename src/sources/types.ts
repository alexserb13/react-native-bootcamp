type MemberType = {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    memberId: number,
  };

export type MemberQuery = MemberType;

type LibraryType = {
    address1: string,
    city: string,
    country: string,
    id: number,
    name: string,
    zipCode: number,
    latitude: string,
    longitude: string,
  };

export type Libraries = Array<LibraryType>;

export type LibrariesQuery = {libraries: Libraries, total?: number};

type BookType = {
    name: string,
    author: string,
    takenDate: string,
    returnedDate: string,
    returnBefore: string,
    isbn: string,
  };

type Books = Array<BookType>;

export type BooksQuery = { books: Books };

export type LoginResponse = { userId: string, token: string, error: string};
