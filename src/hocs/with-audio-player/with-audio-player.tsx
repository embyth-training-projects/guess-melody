import * as React from "react";
import PropTypes from "prop-types";

const withAudioPlayer = (Component) => {
  class WithAudioPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = React.createRef();

      this.state = {
        isLoading: true,
      };
    }

    componentDidMount() {
      const {src} = this.props;

      const audio = this._audioRef.current;

      audio.src = src;

      audio.oncanplaythrough = () => this.setState({isLoading: false});
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;

      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;

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
          <audio ref={this._audioRef} />
        </Component>
      );
    }
  }

  WithAudioPlayer.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
  };

  return WithAudioPlayer;
};

export default withAudioPlayer;
