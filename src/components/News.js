import React, {useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News =(props)=> {
  
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

    

  const UpdateNews= async () =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;

    setloading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parseedData = await data.json();
    props.setProgress(70);
    
    setarticles(parseedData.articles)
    settotalResults(parseedData.totalResults)
    setloading(false)

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalize(props.category)} - NewsHunter`;
   UpdateNews();
  }, [])
  


//  const HandlePrevClick = async () => {
//     setpage(page-1)
//     UpdateNews()
//   };
// const  HandleNextClick = async () => {
//   setpage(page+1)
//   UpdateNews()
//   };
 const fetchMoreData = async () => {
    
   
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    
    let data = await fetch(url);
    let parseedData = await data.json();
    console.log(parseedData);
    setarticles(articles.concat(parseedData.articles))
    settotalResults(parseedData.totalResults)
    
    
  };
    return (
      <>
        <h2 className="text-center" style={{marginTop:'80px'}}>
          NewsHunter - Top {capitalize(props.category)} Headlines
        </h2>
        {/* {loading &&  <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-3">
              {articles.map((element) => {
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
        <button type="button" disabled={page<=1} onClick={HandlePrevClick} className="btn btn-success">&larr; Previous</button>
        <button type="button" disabled={page+1 > Math.ceil(totalResults/props.pageSize)} onClick={HandleNextClick} className="btn btn-success">Next &rarr;</button>
        </div> */}
      </>
    );
  
}
News.defaultProps = {
  country: "us",
  pageSize: 9,
  category: "general",
};
News.defaultTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
