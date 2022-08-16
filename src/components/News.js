import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
   
  static defaultProps= {
    country:'us',
    pageSize: 9,
    category: 'general'
  }
  static defaultTypes= {
    country:PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalize=(string)=>{

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    console.log("I am A Constructor");
    this.state ={
      articles: [],
      loading: false,
      page:1
    }
    document.title= `${this.capitalize(this.props.category)} - NewsHunter`;
  }
  async UpdateNews ()
  {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=40d7b707060e4ef5974c5b6096a9d48c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch (url);
    let parseedData = await data.json();
    console.log(parseedData);
    this.setState({articles: parseedData.articles,
    totalResults:parseedData.totalResults,
    loading:false
    });
  }
  async componentDidMount()
    {
     this.UpdateNews();
    }

    HandlePrevClick= async()=>{
      
      this.setState({
        page: this.state.page -1});
        this.UpdateNews(); 
    }
    HandleNextClick= async()=>{
        this.setState({
          page: this.state.page +1});
          this.UpdateNews(); 
    
  }
  render() {
    
    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsHunter - Top {this.capitalize(this.props.category)} Headlines</h2>
       {this.state.loading &&  <Spinner/>}
        <div className="row my-3">
        {!this.state.loading && this.state.articles.map((element)=>{
          
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title? element.title.slice(0,50):""} description={element.description?element.description.slice(0,130): ""} ImageUrl={element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
        
        })}


        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} onClick={this.HandlePrevClick} className="btn btn-success">&larr; Previous</button>
        <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.HandleNextClick} className="btn btn-success">Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
