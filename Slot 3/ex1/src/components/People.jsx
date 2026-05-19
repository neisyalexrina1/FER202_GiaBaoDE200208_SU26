import React from 'react';

function People() {
  const people = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Alice Johnson', age: 17 },
    { id: 4, name: 'Michael Brown', age: 28 },
    { id: 5, name: 'Emily Davis', age: 16 },
    { id: 6, name: 'Chris Wilson', age: 27 },
    { id: 7, name: 'Sarah Taylor', age: 29 },
    { id: 8, name: 'David Anderson', age: 31 },
    { id: 9, name: 'Sophia Martinez', age: 26 },
    { id: 10, name: 'James Lee', age: 15 },
  ];

  const teenager = people.find(person => person.age >= 10 && person.age < 16);

  return (
    <div>
      <h2>People List</h2>
      <ul>
        {people.map((person, index) => (
          <li key={person.id}>
            {index + 1}. {person.name} - {person.age} years old
          </li>
        ))}
      </ul>
      <div>
        <h3>First Teenager:</h3>
        {teenager ? (
          <p>{teenager.name} - {teenager.age} years old</p>
        ) : (
          <p>No result</p>
        )}
      </div>
    </div>
  );
}

export default People;
