import * as s from "./Word.sc";

import { useState } from "react";

export default function Word({
  bookmark,
  notifyUnstar,
  notifyDelete,
  children,
  api,
  hideStar,
}) {
  const [starred, setStarred] = useState(bookmark.starred);
  const [deleted, setDeleted] = useState(false);
  let importance = Math.min(10, Math.floor(bookmark.origin_importance));
  let importanceBars = "";
  if (importance) {
    // importanceBars = '▰'.repeat(importance) + '▱'.repeat(11 - importance)
    // importanceBars = '⣿'.repeat(importance) + '⣀'.repeat(11 - importance)
    importanceBars = "■".repeat(importance) + "□".repeat(11 - importance);

    // ideas from:
    // https://changaco.oy.lc/unicode-progress-bars/
  }

  function toggleStarred(bookmark) {
    if (starred) {
      api.unstarBookmark(bookmark.id);
      bookmark.starred = false;
      setStarred(false);
    } else {
      api.starBookmark(bookmark.id);
      setStarred(true);
      bookmark.starred = true;
    }

    if (notifyUnstar) {
      notifyUnstar(bookmark);
    }
  }

  function deleteBookmark(bookmark) {
    api.deleteBookmark(bookmark.id);
    setDeleted(true);
    if (notifyDelete) {
      notifyDelete(bookmark);
    }
  }

  if (deleted) {
    return <></>;
  }

  let grayed_out_if_not_scheduled_for_study = { color: "gray" };
  if (bookmark.fit_for_study || bookmark.starred) {
    grayed_out_if_not_scheduled_for_study = {};
  }

  return (
    <>
      <s.Word key={bookmark.id}>
        <s.TrashIcon onClick={(e) => deleteBookmark(bookmark)}>
          <img src="/static/images/trash.svg" alt="trash" />
        </s.TrashIcon>

        {!hideStar && (
          <s.StarIcon onClick={(e) => toggleStarred(bookmark)}>
            <img
              src={
                "/static/images/star" +
                (bookmark.starred ? ".svg" : "_empty.svg")
              }
              alt="star"
            />
          </s.StarIcon>
        )}

        <s.WordPair>
          <div className="from" style={grayed_out_if_not_scheduled_for_study}>
            {bookmark.from}
          </div>

          <s.Importance>
            <span className={"im" + importance}>{importanceBars}</span>
          </s.Importance>

          <div className="to" style={grayed_out_if_not_scheduled_for_study}>
            {bookmark.to}
          </div>
        </s.WordPair>
      </s.Word>
      {children}

      <s.Spacer />
    </>
  );
}