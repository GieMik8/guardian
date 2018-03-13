import * as React from 'react';

type AsyncComponent = React.Component | null;

// tslint:disable: no-any
interface State {
  component: AsyncComponent;
}

const asyncComponent = (importComponent: any ) => {
    return class extends React.Component<any, State> {
        state = {
            component: null
        };

        componentDidMount () {
            importComponent()
                .then((cmp: any) => {
                    this.setState({component: cmp.default});
                });
        }
        
        render () {
            const C: any = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    };
};

export default asyncComponent;