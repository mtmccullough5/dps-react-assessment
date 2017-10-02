import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Divider } from 'semantic-ui-react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../styles/pagination.css';

class Beers extends React.Component {
  state = { beers: [], page: 1, pageCount: 0, offset: 10, per_page: 10 }

  componentDidMount() { 
    this.loadPage();
  }
  loadPage() { 

    axios.get(`/api/all_beers?page=${this.state.page}&per_page=${this.state.per_page}`)
    .then( ({ data }) => {
      this.setState({ beers: data.entries, pageCount: data.total_pages})
    });
  }

  handlePageClick = (beers) => {
    let selected = beers.selected;
    let offset = Math.ceil(selected * this.state.per_page);
    let per_page = this.state.per_page;
    let page = Math.ceil(offset/per_page)
    this.setState({offset: offset, page: page}, () => {
      this.loadPage();
    });
  };
  render() {
    let { beers } = this.state;
    return (
      <div>
        <Divider />
          <Card.Group>    
              { beers.map( ({id,name,style={}}) =>
                  <Card key={id} >
                    <Link to={`/beer/${id}`}>
                      <Card.Content>
                        <Card.Header>
                          {name}
                        </Card.Header>
                        <Divider />
                          {style.short_name}
                      </Card.Content>
                      </Link>
                  </Card>
              )};            
          </Card.Group>
          <div>
            <ReactPaginate previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={<a href="">...</a>}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"react-paginate"}
                        subContainerClassName={"react-paginate"}
                        activeClassName={"active"} 
                        pageClassName={"pageClass"}
                        />
          </div>
        </div>
    )
  }
}

export default Beers
