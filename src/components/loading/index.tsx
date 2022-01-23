import React from 'react';
import './index.scss';
class Loading extends React.Component<
  {
    label: string;
  },
  {
    isError: boolean;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  changeStatus(flag: boolean) {
    this.setState({
      isError: flag,
    });
  }

  render() {
    const { label } = this.props;
    return (
      <>
        <div className="loading-index" data-testid="loading-div-test">
          {label}
        </div>
      </>
    );
  }
}

export default Loading;
