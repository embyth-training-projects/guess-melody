import * as React from "react";

import Player from "../../components/audio-player/audio-player";
import withAudioPlayer from "../with-audio-player/with-audio-player";

const AudioPlayer = withAudioPlayer(Player);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends React.PureComponent {
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
