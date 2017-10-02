import React from 'react';
import { Card, Divider,Image } from 'semantic-ui-react';
import axios from 'axios';
import altimage from '../images/image.png';
import ReactPaginate from 'react-paginate';
import '../styles/pagination.css';

class Breweries extends React.Component {
  state = { Breweries: [], page: 1, pageCount: 0, offset: 10, per_page: 10 }

  componentDidMount() { 
    this.loadPage();
  }
  loadPage() { 
    axios.get(`/api/all_breweries?page=${this.state.page}&per_page=${this.state.per_page}`)
    .then( ({ data }) => {
      this.setState({ Breweries: data.entries, pageCount: data.total_pages})
    });
  }

  handlePageClick = (Breweries) => {
    let selected = Breweries.selected;
    let offset = Math.ceil(selected * this.state.per_page);
    let per_page = this.state.per_page;
    let page = Math.ceil(offset/per_page)
    this.setState({offset: offset, page: page}, () => {
      this.loadPage();
    });
  };

  render() {
    let { Breweries } = this.state;
    
    return (
      <div>
        <Divider />
          <Card.Group>    
              { Breweries.map( ({id,name,images={}}) => 
                  <Card key={id}>
                      <Card.Content>
                      <Image src={images.icon} alt={'Brewery Logo'}/>
                        <Divider />
                        <Card.Header>
                          {name}
                        </Card.Header>
                      </Card.Content>
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

export default Breweries
