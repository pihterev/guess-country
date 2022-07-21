'use strict';

import { Component } from 'react';
import { Group, ModalPage, ModalPageHeader, ModalRoot, SimpleCell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon28CheckShieldDeviceOutline, Icon28DevicesOutline, Icon28KeyOutline } from '@vkontakte/icons';
import { GameState, UserState } from '../Types/State';

const lang = require('../lang/ru.json');

const MODAL_NAME = 'main-menu';

type MainMenuProps = {
  activeModal: boolean
  userState: UserState
  startGame: () => {}
  forceStartGame: () => {}
}

export class MainMenu extends Component<MainMenuProps> {

  public constructor(props: MainMenuProps) {
    super(props);
  }

  render() {
    return <ModalRoot activeModal={this.props.activeModal ? MODAL_NAME : null}>
      <ModalPage
        id={MODAL_NAME}
        header={
          <ModalPageHeader>
            {lang.global.menu}
          </ModalPageHeader>
        }
      >
        <Group mode="plain">
          {
            this.props.userState.game_state !== GameState.END ?
              <SimpleCell onClick={this.props.startGame} before={<Icon28KeyOutline />}>
                {this.props.userState.game_state === GameState.PAUSE ? lang.global.continue_game : lang.global.start_game}
              </SimpleCell> : ''
          }
          {
            this.props.userState.game_state === GameState.PAUSE || this.props.userState.game_state === GameState.END ?
              <SimpleCell onClick={this.props.forceStartGame} before={<Icon28KeyOutline />}>
                {lang.global.force_start_game}
              </SimpleCell> : ''
          }
          <SimpleCell
            before={<Icon28CheckShieldDeviceOutline />}
          >
            {lang.global.settings}
          </SimpleCell>
          <SimpleCell before={<Icon28DevicesOutline />}>
            {lang.global.leaderboard}
          </SimpleCell>
        </Group>
      </ModalPage></ModalRoot>;
  }
}

