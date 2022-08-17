import React, { Component } from 'react'

export class NewsItem extends Component {

 

  render() {
    let {title,description, ImageUrl,NewsUrl, author, date,source}= this.props;
    return (
      <div className='my-3'>
    <div className="card" >
    <div style={{display: 'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
    <span className=" badge rounded-pill bg-danger">
    {source}
    
  </span>
    </div>
  <img src={ImageUrl? ImageUrl: 'https://i.ytimg.com/vi/-1o3TkbB_ww/hqdefault.jpg'} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {author? author :"Unknown"} on {new Date(date).toTimeString()}</small></p>
    <a rel='noreferrer' href={NewsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>

  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
