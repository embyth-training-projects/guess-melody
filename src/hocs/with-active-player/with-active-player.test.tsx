import * as React from "react";
import * as renderer from "react-test-renderer";

import withActivePlayer from "./with-active-player";
import {noop} from "../../utils";

interface MockComponentProps {
  children: React.ReactNode;
}

const MockComponent = (props: MockComponentProps) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const MockComponentWrapped = withActivePlayer(MockComponent);

it(`withActivePlayer is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      isPlaying={false}
      onPlayButtonClick={noop}
      src=""
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
