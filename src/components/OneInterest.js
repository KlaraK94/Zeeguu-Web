import React from "react";
import * as s from './Search.sc';
import useSelectInterest from "../hooks/useSelectInterest";

export default function OneInterest( {api, chosenTopic} ){
    const {
        allTopics,
        toggleTopicSubscription
    } = useSelectInterest(api);

    return(
        <div>
        <s.HeadlineSearch>
            <h1>{chosenTopic}</h1>
            {allTopics.map((topic) => (
                topic.title === chosenTopic ? (
                    <p
                    key={topic.id}
                    onClick={(e) => toggleTopicSubscription(topic)}>
                        + add interest
                    </p>
                ) : null
            ))}
            
        </s.HeadlineSearch>

        </div>
    )
}