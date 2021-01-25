import * as React from "react";

interface Props {
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  src: string;
}

interface State {
  isLoading: boolean;
}

const withAudioPlayer = (Component) => {
  class WithAudioPlayer extends React.PureComponent<Props, State> {
    private audioRef: React.RefObject<HTMLAudioElement>;

    constructor(props) {
      super(props);

      this.audioRef = React.createRef();

      this.state = {
        isLoading: true,
      };
    }

    componentDidMount() {
      const {src} = this.props;

      const audio = this.audioRef.current;

      audio.src = src;

      audio.oncanplaythrough = () => this.setState({isLoading: false});
    }

    componentDidUpdate() {
      const audio = this.audioRef.current;

      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWillUnmount() {
      const audio = this.audioRef.current;

      audio.oncanplaythrough = null;
      audio.src = ``;
    }

    render() {
      const {isLoading} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
        >
          <audio ref={this.audioRef} />
        </Component>
      );
    }
  }

  return WithAudioPlayer;
};

export default withAudioPlayer;
