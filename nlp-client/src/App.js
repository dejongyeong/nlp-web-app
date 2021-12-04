import React, { useState } from "react";
import "./App.css";

const App = function mainApp() {
  const [sentiment, setSentiment] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.sentence.value;
    console.log(content);
    setSentiment("Positive");
  };

  return (
    <div className="App">
      <header className="App__Header">Sentiment Analysis</header>
      <main className="App__Context">
        <div className="App__Description">
          <p>
            Sentiment Analysis (SA) or Opinion Mining is a subfield of{" "}
            <strong>Natural Language Processing</strong> that extracts,
            identifies, and determines the underlying sentiments of either
            positive, negative, or neutral from User Generated Contents (UGC).
            It is the most researched subfield and has received a lot of
            attention in recent decades. Since then, a variety approaches or
            algorithms have been introduced, ranging from{" "}
            <strong>lexicon-based</strong> to <strong>machine learning</strong>{" "}
            or <strong>deep learning</strong>-based approaches. Implementation
            of the Sentiment Analysis Model can be found on{" "}
            <a
              href="https://github.com/dejongyeong/nlp-web-app/blob/ml-model/model/sentiment-analysis.ipynb"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="App__Form">
          <div className="App__Form__Result">Sentiment Tag: {sentiment}</div>
          <form id="input-form" onSubmit={handleSubmit}>
            <textarea
              name="sentence"
              rows="15"
              cols="70"
              wrap="soft"
              placeholder="Try with you own text..."
              defaultValue="Today is a good day!!"
            />
            <button type="submit">Classify Text</button>
          </form>
        </div>
      </main>
      <footer className="App__Footer">
        Design and Built by De Jong Yeong © 2021{" "}
      </footer>
    </div>
  );
};

export default App;
