import React, { Component } from 'react'

export class NewsItem extends Component {

 

  render() {
    let {title,description, ImageUrl,NewsUrl, author, date,source}= this.props;
    return (
      <div>
    <div className="card" >
    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex:'1'}}>
    {source}
    
  </span>
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
