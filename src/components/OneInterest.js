import React from "react";
import * as s from './OneInterest.sc';
import useSelectInterest from "../hooks/useSelectInterest";

export default function OneInterest( {
    api, 
    chosenTopic, 
    toggleTopicSubscription,
    textButton} ){

    const {
        allTopics
    } = useSelectInterest(api);
 
    const updateInterests = (topic) => {
        toggleTopicSubscription(topic);  
    }

    return(
        <s.HeadlineSearch>
            <h1>{chosenTopic}</h1>
            {allTopics.map((topic) => (
                topic.title === chosenTopic ? (
                    <button
                    key={topic.id}
                    onClick={(e) => updateInterests(topic)}>
                        <p>{textButton}</p>
                    </button>
                ) : null
            ))}
        </s.HeadlineSearch>
    )
}