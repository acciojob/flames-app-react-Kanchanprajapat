import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState("");

  const calculateRelationship = () => {
    if (name1.trim() === "" || name2.trim() === "") {
      setResult("Please Enter valid input");
      return;
    }

    const removeCommonLetters = (str1, str2) => {
      let map = {};

      for (let char of str1) {
        if (map[char]) {
          map[char]++;
        } else {
          map[char] = 1;
        }
      }

      for (let char of str2) {
        if (map[char]) {
          map[char]--;
          if (map[char] === 0) delete map[char];
        }
      }

      const remaining1 = Object.keys(map)
        .filter((key) => map[key] > 0)
        .reduce((sum, key) => sum + map[key], 0);

      const remaining2 = str2
        .split("")
        .filter((char) => !str1.includes(char)).length;

      return remaining1 + remaining2;
    };

    const totalRemaining = removeCommonLetters(name1, name2);
    const relation = totalRemaining % 6;

    const relationshipMap = [
      "Siblings",
      "Friends",
      "Love",
      "Affection",
      "Marriage",
      "Enemy",
    ];

    setResult(relationshipMap[relation]);
  };

  const clearFields = () => {
    setName1("");
    setName2("");
    setResult("");
  };

  return (
    <div id="main">
      <input
        type="text"
        data-testid="input1"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
      />
      <input
        type="text"
        data-testid="input2"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
      />
      <button data-testid="calculate_relationship" onClick={calculateRelationship}>
        Calculate
      </button>
      <button data-testid="clear" onClick={clearFields}>
        Clear
      </button>
      <h3 data-testid="answer">{result}</h3>
    </div>
  );
};

export default App;
