import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
// import wordsToNumbers from "words-to-numbers";
import { wToN } from "./Utility-Functions/Wordtonumber";

import NewsCards from "./components/NewsCards/NewsCards";
import styles from "./App.module.css"

const alanKey =
  "ea9016c39a67ea691ac2413c8fbf6de92e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  
  const [newsarticles, setNewsarticles] = useState([]);
  const [activeArticle , setActiveArticle] = useState(-1);
  useEffect(() => {
    const alanInstance =alanBtn({
      key: alanKey,
      onCommand: ({ command, data , number}) => {
        if (command === "newHeadlines") {
          setNewsarticles(data);
          setActiveArticle(-1);
        }
        else if (command === "highlight") {
          setActiveArticle((prevarticle)=> prevarticle+1);
        }
        else if (command === "open") {
          const parsedNumber = number.length > 2 ? wToN(number) : number;
          const article = data[parsedNumber-1];
          if(parsedNumber >20)
            {
               alanInstance.playText("Please try any other article");
            }
            else if(article)
              {
                alanInstance.playText("opening")
                window.open(article.url, "_blank");
              }
        }
      }
    });
  }, []);

  return (
    <div>
      <div
        className={styles.logoContainer}
      >
        <img
          src=""
          alt="alan ai logo"
          className={styles.alanLogo}
        />
      </div>
      <NewsCards articles={newsarticles} activeArticle={activeArticle} />
    </div>
  );
};
export default App;
