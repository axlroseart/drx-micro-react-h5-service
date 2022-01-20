import React from 'react';
import './index.scss';
import PageNotFound from 'src/components/pageNotFound';
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
        <button
          data-testid="loading-button"
          onClick={() => {
            this.changeStatus(true);
          }}
        >
          showError
        </button>
        {this.state.isError && (
          <div data-testid="error-tip">
            <p>something went wrong</p>
          </div>
        )}
        {!this.state.isError && <PageNotFound />}
      </>
    );
  }
}

export default Loading;
