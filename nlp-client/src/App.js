import React, { useState } from "react";
import axios from "axios";
import "./App.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const App = function mainApp() {
  const [sentiment, setSentiment] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.sentence.value;
    const data = { sentence: content };

    try {
      setLoading(true);
      // change this accordingly based on production
      const response = await axios.post("/api/v1/analyze", data);
      if (response.status === 200) {
        const { pred, prob } = response.data.data;
        setSentiment(`${pred}`);
        setConfidence(`${prob}%`);
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage("Oops!! Something went wrong on the backend!");
      setLoading(false);
    }
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
            positive, negative, or neutral from User Generated Contents. It is
            the most researched subfield and has received a lot of attention in
            recent decades. Since then, numerous approaches and algorithms have
            been introduced, ranging from <strong>lexicon-based</strong> to{" "}
            <strong>machine learning</strong> and <strong>deep learning</strong>
            -based SA. Implementation of the Sentiment Analysis Model can be
            found on{" "}
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
          <div className="App__Form__Result">
            <p>Sentiment Label: {sentiment}</p>
            <p>Confidence Score: {confidence}</p>
          </div>
          <form id="input-form" onSubmit={handleSubmit}>
            <textarea
              name="sentence"
              rows="15"
              cols="70"
              wrap="soft"
              placeholder="Try with you own text..."
              defaultValue="Today is a good day!!"
            />
            <button type="submit" disabled={loading}>
              Classify Text
            </button>
          </form>
          {errorMessage}
        </div>
      </main>
      <footer className="App__Footer">
        Design and Built by De Jong Yeong © 2021{" "}
      </footer>
    </div>
  );
};

export default App;
