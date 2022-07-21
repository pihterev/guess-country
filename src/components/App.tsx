'use strict';

import { useState } from 'react';
import {
  ConfigProvider,
  useAdaptivity,
  AppRoot,
  SplitLayout,
  SplitCol,
  ViewWidth,
  View,
  Panel,
  PanelHeader, usePlatform, AdaptivityProvider, Snackbar,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { MainMenu } from './MainMenu';
import { GameField } from './GameField';
import { COUNTRIES } from './Globe';
import { Question, QuestionType } from '../Types/Question';
import { GameState } from '../Types/State';
import { Icon28Settings } from '@vkontakte/icons';

const lang = require('../lang/ru.json');

const initialUserState = {
  level: 1,
  attempts: 3,
  number_correct_answers: 0,
  game_state: GameState.START,
  opened_countries: [],
};

export const App = () => {
  const { viewWidth } = useAdaptivity();
  const platform = usePlatform();
  const [shownMenu, setShownMenu] = useState(true);
  const [userState, updateUserState] = useState(initialUserState);
  const [snackBar, setSnackBar] = useState(null);
  const [currentQuestion, updateCurrentQuestion] = useState(null);

  const handlerAnswer = (selectedCountryId: number): boolean => {
    if (selectedCountryId === currentQuestion.country.value) {
      userState.number_correct_answers++;
      userState.opened_countries.push(selectedCountryId);
      updateUserState({ ...userState });
      generateQuestion();
      setSnackBar(<>
        <Snackbar
          layout="vertical"
          onClose={() => setSnackBar( null )}
        >
          Ответ верный
        </Snackbar>
      </>);
      return true;
    }

    userState.number_correct_answers = 0;
    userState.attempts--;
    updateUserState({ ...userState });
    setSnackBar(<>
      <Snackbar
        layout="vertical"
        onClose={() => setSnackBar( null )}
      >
        Ответ неверный
      </Snackbar>
    </>);

    if (userState.attempts === 0) {
      showMenu(GameState.END);
    }

    return false;
  };

  const generateQuestion = (): Question => {
    const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    const question = {
      type: QuestionType.WHERE,
      country: country,
    };

    updateCurrentQuestion(question);
    return question;
  };

  const startGame = () => {
    userState.game_state = GameState.PROCESS;
    setShownMenu(!shownMenu);
    updateUserState(userState);
    generateQuestion();
    return true;
  };

  const forceStartGame = () => {
    userState.game_state = GameState.PROCESS;
    userState.attempts = 3;
    userState.number_correct_answers = 0;
    userState.opened_countries = [];
    setShownMenu(!shownMenu);
    updateUserState(userState);
    generateQuestion();
    return true;
  };

  const showMenu = (state: GameState = GameState.PAUSE) => {
    userState.game_state = state;
    setShownMenu(true);
    updateUserState(userState);
    return true;
  };

  return (
    <ConfigProvider platform={platform} appearance={'light'}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout header={<PanelHeader separator={false} />} modal={<MainMenu
            userState={userState}
            startGame={startGame}
            forceStartGame={forceStartGame}
            activeModal={shownMenu}
          />}>
            <SplitCol spaced={viewWidth > ViewWidth.MOBILE}>
              <View activePanel="main-menu">
                <Panel id="main-menu">
                  <PanelHeader before={
                    <Icon28Settings onClick={() => {showMenu();}} />
                  }>{lang.global.title}</PanelHeader>
                  <GameField handlerAnswer={handlerAnswer} userState={userState} currentQuestion={currentQuestion}></GameField>
                </Panel>
              </View>
            </SplitCol>
          </SplitLayout>
          {snackBar}
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
