import { useState, useEffect, useContext } from "react";
import * as s from "../Exercise.sc.js";
import SpeakButton from "../SpeakButton.js";
import strings from "../../../i18n/definitions.js";
import NextNavigation from "../NextNavigation.js";
import LoadingAnimation from "../../../components/LoadingAnimation.js";
import InteractiveText from "../../../reader/InteractiveText.js";
import shuffle from "../../../assorted/fisherYatesShuffle.js";
import { removePunctuation } from "../../../utils/preprocessing/preprocessing.js";
import { TranslatableText } from "../../../reader/TranslatableText.js";
import AudioTwoBotInput from "./MultipleChoiceAudioBottomInput.js";
import exerciseTypes from "../../ExerciseTypeConstants.js";
import DisableAudioSession from "../DisableAudioSession.js";
import SessionStorage from "../../../assorted/SessionStorage.js";
import useSubSessionTimer from "../../../hooks/useSubSessionTimer.js";
import { SpeechContext } from "../../../contexts/SpeechContext.js";
import LearningCycleIndicator from "../../LearningCycleIndicator.js";

// The user has to select the correct spoken L2 translation of a given L1 word out of three.
// This tests the user's active knowledge.

const EXERCISE_TYPE = exerciseTypes.multipleChoiceAudio;

export default function MultipleChoiceAudio({
  api,
  bookmarksToStudy,
  correctAnswer,
  notifyIncorrectAnswer,
  setExerciseType,
  isCorrect,
  setIsCorrect,
  moveToNextExercise,
  toggleShow,
  reload,
  setReload,
  exerciseSessionId,
  activeSessionDuration,
}) {
  const [incorrectAnswer, setIncorrectAnswer] = useState("");
  const [messageToAPI, setMessageToAPI] = useState("");
  const [interactiveText, setInteractiveText] = useState();
  const [choiceOptions, setChoiceOptions] = useState(null);
  const [currentChoice, setCurrentChoice] = useState("");
  const [firstTypeTime, setFirstTypeTime] = useState();
  const [selectedButtonId, setSelectedButtonId] = useState("");
  const [getCurrentSubSessionDuration] = useSubSessionTimer(
    activeSessionDuration,
  );
  const bookmarkToStudy = bookmarksToStudy[0];
  const speech = useContext(SpeechContext);

  console.log("exercise session id: " + exerciseSessionId);

  useEffect(() => {
    setExerciseType(EXERCISE_TYPE);
    setInteractiveText(
      new InteractiveText(
        bookmarksToStudy[0].context,
        bookmarksToStudy[0].from_lang,
        bookmarksToStudy[0].article_id,
        api,
        "TRANSLATE WORDS IN EXERCISE",
        EXERCISE_TYPE,
        speech,
      ),
    );
    consolidateChoice();
    if (!SessionStorage.isAudioExercisesEnabled()) handleDisabledAudio();
  }, []);

  function disableAudio(e) {
    e.preventDefault();
    SessionStorage.disableAudioExercises();
    handleDisabledAudio();
  }

  function notifyChoiceSelection(selectedChoice) {
    console.log("checking result...");
    if (
      selectedChoice ===
      removePunctuation(bookmarksToStudy[0].from.toLowerCase())
    ) {
      correctAnswer(bookmarksToStudy[0]);
      setIsCorrect(true);
      let concatMessage = messageToAPI + "C";
      handleAnswer(concatMessage);
    } else {
      setIncorrectAnswer(selectedChoice);
      notifyIncorrectAnswer(bookmarksToStudy[0]);
      let concatMessage = messageToAPI + "W";
      setMessageToAPI(concatMessage);
    }
  }

  function inputKeyPress() {
    if (firstTypeTime === undefined) {
      setFirstTypeTime(new Date());
    }
  }

  // Setting current choice and id if the correct index is chosen
  function buttonSelectTrue(id) {
    if (currentChoice !== 0) {
      setCurrentChoice(true);
      setSelectedButtonId(id);
    }
    console.log(id + " true");
  }

  // Setting current choice and id if the incorrect index is chosen
  function buttonSelectFalse(id) {
    if (currentChoice !== 1 || currentChoice !== 2) {
      setCurrentChoice(false);
      setSelectedButtonId(id);
    }
    console.log(id + " false");
  }

  function handleDisabledAudio() {
    api.logUserActivity("AUDIO_DISABLE", "", bookmarksToStudy[0].id, "");
    moveToNextExercise();
  }

  function handleShowSolution() {
    let message = messageToAPI + "S";
    notifyIncorrectAnswer(bookmarksToStudy[0]);
    setIsCorrect(true);
    handleAnswer(message);
  }

  function handleIncorrectAnswer() {
    setMessageToAPI(messageToAPI + "W");
    notifyIncorrectAnswer(bookmarksToStudy[0]);
    setFirstTypeTime(new Date());
  }

  function handleAnswer(message) {
    setMessageToAPI(message);
    api.uploadExerciseFinalizedData(
      message,
      EXERCISE_TYPE,
      getCurrentSubSessionDuration(activeSessionDuration, "ms"),
      bookmarksToStudy[0].id,
      exerciseSessionId,
    );
  }

  function consolidateChoice() {
    // Index 0 is the correct bookmark and index 1 and 2 are incorrect
    let listOfchoices = [0, 1, 2];
    let shuffledListOfChoices = shuffle(listOfchoices);
    setChoiceOptions(shuffledListOfChoices);
  }

  function handleCorrectAnswer(message) {
    setMessageToAPI(message);
    correctAnswer(bookmarksToStudy[0]);
    setIsCorrect(true);
    api.uploadExerciseFinalizedData(
      message,
      EXERCISE_TYPE,
      getCurrentSubSessionDuration(activeSessionDuration, "ms"),
      bookmarksToStudy[0].id,
      exerciseSessionId,
    );
  }

  if (!interactiveText) {
    return <LoadingAnimation />;
  }

  const selectedButtonStyle = (id) => {
    if (selectedButtonId === id) {
      return "selected";
    }
    return null;
  };

  function handleClick(id) {
    setSelectedButtonId(id);
    console.log(id + " selected");
  }

  return (
    <s.Exercise>
      <div className="headlineWithMoreSpace">
        {strings.multipleChoiceAudioHeadline}
      </div>
      <div className="learningCycleIndicator">
        <LearningCycleIndicator
          learningCycle={bookmarksToStudy[0].learning_cycle}
          coolingInterval={bookmarksToStudy[0].cooling_interval}
        />
      </div>

      <div className="contextExample">
        <TranslatableText
          isCorrect={isCorrect}
          interactiveText={interactiveText}
          translating={true}
          pronouncing={false}
          bookmarkToStudy={bookmarksToStudy[0].from}
        />
      </div>

      {!isCorrect && (
        <s.CenteredRow>
          {/* Mapping bookmarks to the buttons in random order, setting button properties based on bookmark index */}
          {choiceOptions ? (
            choiceOptions.map((option) =>
              0 !== option ? (
                <SpeakButton
                  handleClick={() => buttonSelectFalse(option)}
                  onClick={(e) => handleClick(option)}
                  bookmarkToStudy={bookmarksToStudy[option]}
                  api={api}
                  id={option.id}
                  styling={selectedButtonStyle(option)}
                />
              ) : (
                <SpeakButton
                  handleClick={() => buttonSelectTrue(option)}
                  onClick={(e) => handleClick(option)}
                  bookmarkToStudy={bookmarksToStudy[option]}
                  api={api}
                  id={option.id}
                  styling={selectedButtonStyle(option)}
                />
              ),
            )
          ) : (
            <></>
          )}
        </s.CenteredRow>
      )}

      {!isCorrect && (
        <AudioTwoBotInput
          currentChoice={currentChoice}
          notifyChoiceSelection={notifyChoiceSelection}
          incorrectAnswer={incorrectAnswer}
          setIncorrectAnswer={setIncorrectAnswer}
          handleShowSolution={handleShowSolution}
          toggleShow={toggleShow}
          handleCorrectAnswer={handleCorrectAnswer}
          handleIncorrectAnswer={handleIncorrectAnswer}
          messageToAPI={messageToAPI}
          setMessageToAPI={setMessageToAPI}
          notifyKeyPress={inputKeyPress}
        />
      )}
      {isCorrect && (
        <>
          <br></br>
          <h1 className="wordInContextHeadline">{bookmarksToStudy[0].to}</h1>
        </>
      )}
      <NextNavigation
        message={messageToAPI}
        api={api}
        bookmarksToStudy={bookmarkToStudy}
        moveToNextExercise={moveToNextExercise}
        reload={reload}
        setReload={setReload}
        handleShowSolution={handleShowSolution}
        toggleShow={toggleShow}
        isCorrect={isCorrect}
      />
      {SessionStorage.isAudioExercisesEnabled() && (
        <DisableAudioSession disableAudio={disableAudio} />
      )}
    </s.Exercise>
  );
}
