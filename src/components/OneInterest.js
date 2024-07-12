import React, { useState, useEffect } from "react";
import * as s from "./OneInterest.sc";
import useSelectInterest from "../hooks/useSelectInterest";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function OneInterest({ api }) {
  const { chosenTopic } = useParams();
  const {
    allTopics,
    unsubscribeFromTopic,
    subscribeToTopic,
    subscribedTopics,
  } = useSelectInterest(api);
  const [textButton, setTextButton] = useState("");
  const [isSubscribedToTopic, setIsSubscribedToTopic] = useState();
  const [articleList, setArticleList] = useState();
  const [originalList, setOriginalList] = useState(null);
  const [theSavedSubscribedTopics, setTheSavedSubscribedTopics] =
    useState(null);

  useEffect(() => {
    if (subscribedTopics) {
      const isSubscribed = subscribedTopics.some(
        (topic) => topic.title === chosenTopic,
      );
      setIsSubscribedToTopic(isSubscribed);
      setTextButton(isSubscribed ? "- remove interest" : "+ add interest");
    }
  }, [subscribedTopics, chosenTopic]);

  useEffect(() => {
    articlesListShouldChange(chosenTopic);
  }, [subscribedTopics]);

  //when the user changes interests...
  function articlesListShouldChange(chosenTopic) {
    //setArticleList(null);
    setTheSavedSubscribedTopics([...subscribedTopics]);
    console.log("Original ", subscribedTopics);

    if (subscribedTopics == null) {
      console.log("subscribe", chosenTopic);
      //subscribeToTopic(topicToAdd);
    } else {
      subscribedTopics.forEach((topic) => {
        console.log("unsubscribe", topic);
        //unsubscribeFromTopic(topic);
      });
    }
    console.log("saved", theSavedSubscribedTopics);

    /*
        api.getUserArticles((articles) => {
          setArticleList(articles);
          setOriginalList([...articles]);
        });
        theSavedSubscribedTopics.forEach((topic) => {
          //subscribeToTopic(topic);
        });**/
  }

  const toggleSubscriptionToTopic = (topic) => {
    if (isSubscribedToTopic) {
      unsubscribeFromTopic(topic);
      setIsSubscribedToTopic(false);
      toast("Topic removed from interests!");
    } else {
      subscribeToTopic(topic);
      setIsSubscribedToTopic(true);
      toast("Topic added to interests!");
    }
  };

  return (
    <s.HeadlineSearch>
      <h1>{chosenTopic}</h1>
      {allTopics.map((topic) =>
        topic.title === chosenTopic ? (
          <button
            key={topic.id}
            onClick={(e) => toggleSubscriptionToTopic(topic)}
          >
            <p>{textButton}</p>
          </button>
        ) : null,
      )}
    </s.HeadlineSearch>
  );
}
