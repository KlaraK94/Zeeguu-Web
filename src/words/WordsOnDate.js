import { Link } from 'react-router-dom'

export function WordsOnDate ({
  bookmarks_in_day,
  deleteBookmark,
  toggleStarred
}) {
  function groupBy (list, keyGetter) {
    const map = new Map()
    list.forEach(item => {
      const key = keyGetter(item)
      const collection = map.get(key)
      if (!collection) {
        map.set(key, [item])
      } else {
        collection.push(item)
      }
    })
    return map
  }

  let bookmarks_by_article = groupBy(bookmarks_in_day, x => x.article_id)

  let articleIDs = Array.from(bookmarks_by_article.keys())

  return (
    <div>
      {articleIDs.map(article_id => (
        <>
          <div className='articleContainer'>
            <div className='verticalLine'></div>
            <div className='titleContainer'>
              <h2 className='articleTitle'>
                {bookmarks_by_article.get(article_id)[0].article_title}
              </h2>
            </div>
            <div className='openArticle'>
              <Link className='open' to={'/read/article?id=' + article_id}>
                <p className='customP'>Open</p>
              </Link>
            </div>
          </div>
          <table width='100%' className='table table-no-borders'>
            <tbody>
              {bookmarks_by_article.get(article_id).map(bookmark => (
                <tr>
                  <td
                    style={{
                      textAlign: 'left',
                      width: '1em',
                      paddingLeft: '1em',
                      paddingTop: '0.4em'
                    }}
                  >
                    <Link onClick={e => deleteBookmark(bookmark.id)} id='trash'>
                      <img src='/static/images/trash.svg' alt='trash' />
                    </Link>
                  </td>

                  <td width='40px'>
                    <div onClick={e => toggleStarred(bookmark.id)}>
                      <img src='/static/images/star_empty.svg' alt='star' />
                    </div>
                  </td>

                  <td colspan='2' className='word-details-td'>
                    <div className='impression'>
                      {bookmark.from}
                      <span style={{ color: 'black' }}> – </span>
                      {bookmark.to}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ))}
    </div>
  )
}
