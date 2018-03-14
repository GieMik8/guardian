import * as React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import * as H from 'history';

import * as styles from './SearchForm.scss';
import Icon, { IconSizes } from '../../components/icon/Icon';
import { isBlank } from '~helpers/index';

const SearchIcon = require('../../assets/icons/search.svg');

interface RouteParams {
  q: string;
}

interface State {
  search: string;
  extent?: Extent;
}

export type Extent = 'large' | 'small';

interface Props {
  extent?: Extent;
}

class SearchForm extends React.Component<RouteComponentProps<RouteParams> & Props, State> {
  private unlisten: H.UnregisterCallback;

  constructor(props: RouteComponentProps<RouteParams> & Props) {
    super(props);
    this.state = {
      search: this.props.location.search && this.props.location.search.replace('?q=', '') || '',
      extent: this.props.extent || 'large'
    };
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((location: H.Location) => {
      if (location.search && location.search !== this.state.search) {
        this.setState({ search: location.search.replace('?q=', '') });
      }
    });
  }

  render() {
    let isLarge = this.state.extent === 'large';

    return (
      <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.onSearch(event)}>
        <div className="layout sm ms_a-center sm_nowrap">
          <div>
            <input 
              className={styles.searchField}
              placeholder="Search.."
              value={this.state.search} 
              onChange={(event: React.FormEvent<HTMLInputElement>) => this.updateSearch(event)} 
            />
          </div>
          <div className="layout ms_a-center">
            {isLarge ? 
              <button className={styles.searchSubmit} type="submit">Search</button>
              : <button className="unbutton" type="submit"><Icon size={IconSizes.sm} icon={SearchIcon}/></button>}
          </div>
        </div>
      </form>
    );
  }

  private updateSearch(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ search: event.currentTarget.value });
  }

  private onSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isBlank(this.state.search)) {
      this.props.history.push(`/search?q=${this.state.search}`);
    }
  }
}

export default withRouter(SearchForm);
