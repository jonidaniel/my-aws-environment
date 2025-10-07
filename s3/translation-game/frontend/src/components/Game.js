import { useEffect, useState } from "react";
import Header from "./Header";
import Translations from "./Translations";
import Footer from "./Footer";
import "../style-sheets/Game.css";

function Game() {
  const [translations, setTranslations] = useState([]);
  const [indicator, setIndicator] = useState();

  function handleSubmit(id, value) {
    let correct = translations.find(
      (item) => item.fin === value && item.id === id
    );
    if (correct) {
      setIndicator(id);
      postGuess(correct.fin);
    } else {
      if (value) postGuess(value);
    }
  }

  const postGuess = async (guess) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fin: guess }),
    };

    try {
      await fetch("http://localhost:8080/guess", requestOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTranslations = async () => {
    try {
      const data = await fetch("http://13.61.165.26:8080/animal");
      console.log(data);
      const translations = await data.json();
      console.log(translations);
      setTranslations(translations);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  return (
    <div className="Game">
      <Header />
      <Translations
        handleSubmit={handleSubmit}
        indicator={indicator}
        translations={translations}
      />
      <Footer />
    </div>
  );
}

export default Game;
