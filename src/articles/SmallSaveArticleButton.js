import * as s from "./SmallSaveArticleButton.sc.js";
import {toast, ToastContainer} from "react-toastify";
import {useState} from "react";
import 'react-toastify/dist/ReactToastify.css';


export default function SmallSaveArticleButton ({article, api}) {

    const [isSaved, setIsSaved] = useState(article.has_personal_copy);

    function saveArticle() {
        api.makePersonalCopy(article.id, (data)=> {
            if (data === "OK") {
                setIsSaved(true);
                toast('Article added to your Saves!');
            }
        })
    }

    return <>

        {isSaved?
            <s.SavedLabel> Saved <img src="/static/images/zeeguuLogo.svg" width="11" alt={""}/> </s.SavedLabel> :
            <div><s.SaveButton onClick={saveArticle}>Save</s.SaveButton></div>}

        <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        </>


}