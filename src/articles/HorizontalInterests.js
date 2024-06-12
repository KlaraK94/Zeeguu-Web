import React from "react";
import * as s from './HorizontalInterests.sc';
import useSelectInterest from "../hooks/useSelectInterest";

export default function HorizontalInterests( {api, articlesListShouldChange} ){

    const {
        allTopics,

        toggleTopicSubscription
    } = useSelectInterest(api);


    function showOneInterest(title){
        //Find all articles by a topic
    }

    return(
        <div>
            <s.RowOfInterests>
            {allTopics.map((topic) => (
            <span 
            key={topic.id}
            style={{ cursor: "pointer" }}
            onClick={(e) => showOneInterest(topic.title)}
            >{topic.title}</span>
            ))}
            </s.RowOfInterests>
        </div>
    )
}
