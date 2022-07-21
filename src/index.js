'use strict';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import bridge from '@vkontakte/vk-bridge';

bridge.send('VKWebAppInit', {}).then(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(<App />);
});

