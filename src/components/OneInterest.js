import React, { useState } from "react";
import * as s from './OneInterest.sc';
import useSelectInterest from "../hooks/useSelectInterest";

export default function OneInterest( {api, chosenTopic} ){
    const {
        allTopics,
        toggleTopicSubscription,
        isSubscribed
    } = useSelectInterest(api);


    return(
        <div>
        <s.HeadlineSearch>
            <h1>{chosenTopic}</h1>
            {allTopics.map((topic) => (
                topic.title === chosenTopic ? (
                    <button
                    key={topic.id}
                    onClick={(e) => toggleTopicSubscription(topic)}>
                        {isSubscribed(topic) &&(
                            <p>- remove interest</p>
                        )}
                        {!isSubscribed(topic) &&(
                            <p>+ add interest</p>
                        )}
                        
                    </button>
                ) : null
            ))}
            
        </s.HeadlineSearch>

        </div>
    )
}