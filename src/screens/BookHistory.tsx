import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { Loading, Book } from 'components';
import { useBooksHistoryQuery } from 'sources/queries';

export const BookHistoryScreen:FC = () => {
  const { data, isLoading } = useBooksHistoryQuery();
  const { books = [] } = data || {};

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView>
      {books.map((book) => (
        <Book
          key={`${book.isbn}`}
          title={book.name}
          author={book.author}
          borrowed={book.takenDate}
          returnedDate={book.returnedDate}
          returnBefore={book.returnBefore}
        />
      ))}
    </ScrollView>
  );
};
