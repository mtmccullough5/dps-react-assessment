import React from 'react';
import { Card, Divider } from 'semantic-ui-react';
import axios from 'axios';

class Breweries extends React.Component {
  state = { Breweries: [] }

  componentDidMount() {
    axios.get('/api/all_breweries')
      .then( ({ data }) => {
        this.setState({ Breweries: data.entries })
      });
  }

  render() {
    let { Breweries } = this.state;
    return (
      <div>
        <Divider />
          <Card.Group>    
              { Breweries.map( Brewery =>
                  <Card key={Brewery.id} >
                      <Card.Content>
                        <Divider />
                        <Card.Header>
                          {Brewery.name}
                        </Card.Header>
                      </Card.Content>
                  </Card>
              )};            
          </Card.Group>
        </div>
    )
  }
}

export default Breweries
