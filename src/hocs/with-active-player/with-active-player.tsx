import * as React from "react";
import {Subtract} from "utility-types";

import Player from "../../components/audio-player/audio-player";
import withAudioPlayer from "../with-audio-player/with-audio-player";

interface State {
  activePlayerId: number;
}

interface InjectingProps {
  renderPlayer: (src: string, id: number) => React.ReactNode;
}

const AudioPlayer = withAudioPlayer(Player);

const withActivePlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  // Вычисляем реальные пропсы, которые нужно передать снаружи в обернутый компонент.
  // P - пропсы компонента, InjectingProps - добавляемые хоком пропсы.
  // T - пропсы, которые нужно передать в обернутый хоком компонент.
  // Условно: T = P - InjectingProps
  // Например: P = {foo: string, bar: string}, InjectingProps = {bar: string}
  // Тогда: T = {foo: string}
  type T = Subtract<P, InjectingProps>;

  class WithActivePlayer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    render() {
      const {activePlayerId} = this.state;

      return (
        <Component
          {...this.props}
          renderPlayer={(src, id) => {
            return (
              <AudioPlayer
                src={src}
                isPlaying={id === activePlayerId}
                onPlayButtonClick={() => this.setState({activePlayerId: activePlayerId === id ? -1 : id})}
              />
            );
          }}
        />
      );
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
