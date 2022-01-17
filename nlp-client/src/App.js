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
  const [modelOption, setModelOption] = useState("mnb");

  const handleModelOptionChange = (event) => {
    const { target } = event;
    if (target.checked) {
      setModelOption(target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.sentence.value;
    const model = event.target.model.value;
    const data = { sentence: content, option: model };

    try {
      setLoading(true);
      // change this accordingly based on production
      const response = await axios.post("/api/v1/analyze", data);
      if (response.status === 200) {
        const { pred, prob } = response.data.data;
        const label = pred === 0 ? "Negative" : "Positive";
        const percent = Math.round(prob * 100 * 100) / 100;
        setSentiment(`${label}`);
        setConfidence(`${percent}%`);
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
            been introduced, ranging from lexicon-based to machine learning (ML)
            and deep learning (DL) -based SA. In{" "}
            <strong>Multinomial Naive Bayes</strong> ML model, the algorithm
            determines the probabilities of classes assigned to a corpus by
            using the join probabilities of words and classes. In contrast, the{" "}
            <strong>
              Bidirectional Encoder Representations from Transformers (BERT)
            </strong>{" "}
            DL model has a deeper sense of language context and can provide a
            much higher confidence score than a single-direction language
            models.
          </p>
          <p>
            <strong>Dataset:</strong> IMDB Reviews (35,000 train and 15,000
            test)
          </p>
          <p>
            Implementation of the Sentiment Analysis Model can be found in{" "}
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
          <div className="App__Form__Input">
            <form id="input-form" onSubmit={handleSubmit}>
              <textarea
                name="sentence"
                rows="15"
                cols="70"
                wrap="soft"
                placeholder="Try with you own text..."
                defaultValue="Today is a good day!!"
              />
              <div className="App__Form__Radio">
                <div className="App__Form__Radio__Option">
                  <input
                    type="radio"
                    value="mnb"
                    name="model"
                    checked={modelOption === "mnb"}
                    onChange={handleModelOptionChange}
                  />
                  <p>Multinomial Naive Bayes</p>
                </div>
                <div className="App__Form__Radio__Option">
                  <input
                    type="radio"
                    value="bert"
                    name="model"
                    checked={modelOption === "bert"}
                    onChange={handleModelOptionChange}
                  />
                  <p>BERT Deep Learning</p>
                </div>
              </div>
              <button type="submit" disabled={loading}>
                {loading ? (
                  <i className="fa fa-circle-o-notch fa-spin" />
                ) : (
                  "Classify Text"
                )}
              </button>
            </form>
          </div>
          {errorMessage}
        </div>
      </main>
      <footer className="App__Footer">
        Design and Built by De Jong Yeong © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
