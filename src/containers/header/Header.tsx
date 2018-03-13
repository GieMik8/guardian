import * as React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';

import * as styles from './Header.scss';

interface RouteParams {
  q: string;
}

interface State {
  search: string;
}

class Header extends React.Component<RouteComponentProps<RouteParams>, State> {
  constructor(props: RouteComponentProps<RouteParams>) {
    super(props);
    this.state = {
      search: this.props.location.search && this.props.location.search.replace('?q=', '') || ''
    };
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.onSearch(event)}>
          <label>
            Search:
            <input 
              value={this.state.search} 
              onChange={(event: React.FormEvent<HTMLInputElement>) => this.updateSearch(event)} 
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state.search}</p>
      </div>
    );
  }

  public updateSearch(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ search: event.currentTarget.value });
  }

  public onSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.history.push(`/search?q=${this.state.search}`);
  }
}

export default withRouter(Header);
