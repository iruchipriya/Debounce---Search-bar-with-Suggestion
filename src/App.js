import React, { useCallback, useState } from 'react';

const App = () => {
  const [suggestions, setSuggestions] = useState('');

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleChange = (value) => {
    fetch(`https://demo.dataverse.org/api/search?q=${value}`)
      .then((res) => res.json())
      .then((json) => setSuggestions(json.data.items));
  };

  // const optimizedFn = useCallback(debounce(handleChange, 2000), []);
  const optimizedFn = debounce(handleChange, 2000);

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Debouncing in React JS</h2>

      <input
        type="text"
        className="search"
        placeholder="Enter something here..."
        onChange={(e) => optimizedFn(e.target.value)}
      />

      {suggestions.length > 0 && (
        <div>
          {suggestions.map((el, i) => (
            <div key={i}>
              <span>{el.name}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default App;
