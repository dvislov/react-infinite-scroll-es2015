import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import deepEqual from 'deep-equal';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
}

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  componentDidMount() {
    this.pageLoaded = this.props.pageStart;
    this.attachScrollListener();
  }

  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props.children, nextProps.children);
  }

  componentDidUpdate() {
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  render() {
    let props = this.props;
    return React.DOM.div(null, props.children, props.hasMore && props.loader);
  }

  scrollListener() {
    let el = ReactDOM.findDOMNode(this);
    let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < Number(this.props.threshold)) {
      this.detachScrollListener();
      // call loadMore after detachScrollListener to allow
      // for non-async loadMore functions
      this.props.loadMore(this.pageLoaded += 1);
    }
  }

  attachScrollListener() {
    if (!this.props.hasMore) {
      return;
    }
    window.addEventListener('scroll', this.scrollListener);
    window.addEventListener('resize', this.scrollListener);
    this.scrollListener();
  }

  detachScrollListener() {
    window.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('resize', this.scrollListener);
  }
}

InfiniteScroll.defaultProps = {
  pageStart: 0,
  hasMore: false,
  threshold: 250
};

InfiniteScroll.propTypes = {
  pageStart: PropTypes.number,
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func.isRequired,
  threshold: PropTypes.number,
  loader: PropTypes.node.isRequired
};
