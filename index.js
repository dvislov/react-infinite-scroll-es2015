import React, { Component } from 'react';
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
    this.myRef = React.createRef();
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

  scrollListener() {
    const el = this.myRef.current;
    const scrollTop =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < Number(this.props.threshold)) {
      this.detachScrollListener();
      // call loadMore after detachScrollListener to allow
      // for non-async loadMore functions
      this.props.loadMore((this.pageLoaded += 1));
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

  render() {
    const { children, hasMore, loader } = this.props;
    return (
      <div ref={this.myRef}>
        {children}
        {hasMore && loader}
      </div>
    );
  }
}

InfiniteScroll.defaultProps = {
  pageStart: 0,
  hasMore: false,
  threshold: 250,
  loader: null,
  children: null,
};

InfiniteScroll.propTypes = {
  pageStart: PropTypes.number,
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func.isRequired,
  threshold: PropTypes.number,
  loader: PropTypes.node,
  children: PropTypes.node,
};
