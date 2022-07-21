import { UserState } from '../Types/State';
import { Component } from 'react';
import { Cell, Counter, Group, List } from '@vkontakte/vkui';
import { Icon28UserOutline } from '@vkontakte/icons';

type StatusBarProps = {
  userState: UserState
}

export class StatusBar extends Component<StatusBarProps> {
  render() {
    return  <Group>
      <List>
        <Cell before={<Icon28UserOutline />}
              indicator={<Counter mode="primary">{this.props.userState.attempts}</Counter>}
        >
          Количество попыток
        </Cell>
        <Cell
          indicator={<Counter mode="primary">{this.props.userState.opened_countries.length}</Counter>}
        >
          Всего правильных ответов
        </Cell>
        <Cell
          indicator={<Counter mode="primary">{this.props.userState.number_correct_answers}</Counter>}
        >
          Серия правильных ответов подряд
        </Cell>
      </List>
    </Group>;
  }
}
