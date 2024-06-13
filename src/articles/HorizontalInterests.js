import React, { useState } from "react";
import * as s from './HorizontalInterests.sc';
import useSelectInterest from "../hooks/useSelectInterest";
import OneInterest from "../components/OneInterest";

export default function HorizontalInterests( {
    api, 
    articlesListShouldChange } ){

    const {
        allTopics,
        isSubscribed
    } = useSelectInterest(api);

    const [isShowingOneInterest, setShowingOneInterest] = useState(false);
    const [oneTopicChosen, setOneTopicChosen] = useState();


    function showOneInterest(topic){
        setShowingOneInterest(true);
        setOneTopicChosen(topic);
    }

    return(
        <div>
            <s.RowOfInterests>

                {allTopics?.map((topic) => (
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

            {isShowingOneInterest &&(
                <OneInterest
                api={api}
                chosenTopic={oneTopicChosen}
                />
            )}
        </div>
    )
}
