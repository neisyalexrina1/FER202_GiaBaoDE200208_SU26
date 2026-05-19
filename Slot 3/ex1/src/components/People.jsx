import React from 'react';
import './MyCSS.css';

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

  // Sort people by age, then by name
  const sortedPeople = [...people].sort((a, b) => {
    if (a.age === b.age) {
      return a.name.localeCompare(b.name);
    }
    return a.age - b.age;
  });

  const teenager = sortedPeople.find(person => person.age >= 10 && person.age <= 16);

  return (
    <div>
      <h2>People List</h2>
      <table className="people-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {sortedPeople.map(person => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>First Teenager:</h3>
        {teenager ? (
          <p>{teenager.name} - {teenager.age} years old</p>
        ) : (
          <p>No teenager found</p>
        )}
      </div>
    </div>
  );
}

export default People;
