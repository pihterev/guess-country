import { Component } from 'react';
import { Globe } from './Globe';
import { Div, Group } from '@vkontakte/vkui';
import { Question } from '../Types/Question';
import { UserState } from '../Types/State';
import { StatusBar } from './StatusBar';

const lang = require('../lang/ru.json');

type GameFieldProps = {
  userState: UserState,
  handlerAnswer: (countryId: number) => boolean,
  currentQuestion: Question
}

export class GameField extends Component<GameFieldProps> {
  public render() {
    return <div>
      <StatusBar userState={this.props.userState} />

      <Globe
        handlerAnswer={this.props.handlerAnswer}
        title={this.getStringQuestion()}
      />
      {this.props.currentQuestion ? <Group>
        <Div>
          <div
            style={{
              backgroundImage:
                'linear-gradient(135deg, #f24973 0%, #3948e6 100%)',
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              alignContent: 'space-around',
              paddingBottom: '6px',
              color: 'white',
              borderRadius: 12,
            }}
          >
            {this.getStringQuestion()}
          </div>
        </Div>
      </Group> : ''}
    </div>;
  }

  private getStringQuestion(): string {
    if (!this.props.currentQuestion) {
      return '';
    }

    return lang.global.answer_where.replace('{country}', this.props.currentQuestion.country.name);
  }
}
