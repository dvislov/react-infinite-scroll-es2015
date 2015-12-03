# react-infinite-scroll-es2015
Infinite scroll ES2015 component for React based on [react-infinite-scroll](https://www.npmjs.com/package/react-infinite-scroll)

## Usage
`npm install react-infinite-scroll-es2015`

```
import InfiniteScroll from 'react-infinite-scroll-es2015';

<InfiniteScroll
  pageStart="0"
  threshold="500"
  loadMore={function()}
  hasMore={true || false}
  loader={<Loading />}>
  … here is your content to scroll
</InfiniteScroll>
```
## Options
* `pageStart` : The page number corresponding to the initial items, defaults to 0 which means that for the first loading, loadMore will be called with 1

* `loadMore()` : This function is called when the user scrolls down and we need to load stuff

* `hasMore` : Boolean stating if we should keep listening to scroll event and trying to load more stuff

* `loader` : Loader element to be displayed while loading stuff

* `threshold` : The distance between the bottom of the page and the bottom of the window's viewport that triggers the loading of new stuff - Defaults to 250
