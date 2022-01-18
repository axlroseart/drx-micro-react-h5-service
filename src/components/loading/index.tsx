import React from 'react';
import './index.scss';

class Loading extends React.Component<
  {
    label: string;
  },
  unknown
> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { label } = this.props;
    return (
      <div className="loading-index" data-testid="loading-div-test">
        {label}
      </div>
    );
  }
}

export default Loading;
