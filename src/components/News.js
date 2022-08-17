import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 9,
    category: "general",
  };
  static defaultTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("I am A Constructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)} - NewsHunter`;
  }
  async UpdateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseedData = await data.json();
    this.props.setProgress(70);
    console.log(parseedData);
    this.setState({
      articles: parseedData.articles,
      totalResults: parseedData.totalResults,
      loading:false
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.UpdateNews();
  }

  HandlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.UpdateNews();
  };
  HandleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.UpdateNews();
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseedData = await data.json();
    console.log(parseedData);
    this.setState({
      articles: this.state.articles.concat(parseedData.articles),
      totalResults: parseedData.totalResults,
      loading: false,
    });
  };
  render() {
    return (
      <>
        <h2 className="text-center">
          NewsHunter - Top {this.capitalize(this.props.category)} Headlines
        </h2>
        {/* {this.state.loading &&  <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-3">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 50) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 130)
                          : ""
                      }
                      ImageUrl={element.urlToImage}
                      NewsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} onClick={this.HandlePrevClick} className="btn btn-success">&larr; Previous</button>
        <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.HandleNextClick} className="btn btn-success">Next &rarr;</button>
        </div> */}
      </>
    );
  }
}

export default News;
