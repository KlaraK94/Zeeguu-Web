import React, { useState } from "react";
import * as s from './HorizontalInterests.sc';
import useSelectInterest from "../hooks/useSelectInterest";
import OneInterest from "../components/OneInterest";

export default function HorizontalInterests( {api, articlesListShouldChange } ){
    const {
        allTopics,
        isSubscribed,
        subscribedTopics,
        availableTopics
    } = useSelectInterest(api);
    
    const [oneTopicChosen, setOneTopicChosen] = useState();

    function showOneInterest(topic){
        setOneTopicChosen(topic);
        //show all articles with the chosen topic...
    }

    return(
        <div>
            <s.RowOfInterests>
                {subscribedTopics?.map((topic) => (
                    <div key={topic.id}>
                    <button 
                    onClick={(e) => showOneInterest(topic.title)}
                    type="button"
                    className={`interests ${!isSubscribed(topic) && "unsubscribed"}`}
                    >
                        <span>{topic.title}</span>
                    </button>
                </div>
                ))}

                {availableTopics?.map((topic) => (
                    <div key={topic.id}>
                        <button 
                        onClick={(e) => showOneInterest(topic.title)}
                        type="button"
                        className={`interests ${!isSubscribed(topic) && "unsubscribed"}`}
                        >
                            <span>{topic.title}</span>
                        </button>
                    </div>
                ))}
            </s.RowOfInterests>

            <OneInterest
            api={api}
            chosenTopic={oneTopicChosen}
            articlesListShouldChange={articlesListShouldChange}
            />
            
        </div>
    )
}
