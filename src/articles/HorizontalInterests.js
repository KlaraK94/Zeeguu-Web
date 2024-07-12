import React, { useState, useEffect } from "react";
import * as s from "./HorizontalInterests.sc";
import useSelectInterest from "../hooks/useSelectInterest";
import OneInterest from "../components/OneInterest";
import redirect from "../utils/routing/routing";

export default function HorizontalInterests({ api }) {
  const { isSubscribed, subscribedTopics, availableTopics } =
    useSelectInterest(api);

  function showOneInterest(topic) {
    redirect(`/articles/interest/${topic}`);
  }

  return (
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
    </div>
  );
}
