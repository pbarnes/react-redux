import { Component, PropTypes, Children } from 'react';
import storeShape from '../utils/storeShape';

export default class Provider extends Component {
  static childContextTypes = {
    store: storeShape.isRequired
  };

  static propTypes = {
    store: storeShape.isRequired,
    children: PropTypes.element.isRequired
  };

  getChildContext() {
    return { store: this.state.store };
  }

  constructor(props, context) {
    super(props, context);
    this.state = { store: props.store };
  }

  componentWillReceiveProps(nextProps) {
    const { store } = this.state;
    const { store: nextStore } = nextProps;

    if (store !== nextStore) {
      const nextReducer = nextStore.getReducer();
      store.replaceReducer(nextReducer);
    }
  }

  render() {
    return Children.only(this.props.children);
  }
}
