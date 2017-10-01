import React from 'react';
import { Card, Divider } from 'semantic-ui-react';
import axios from 'axios';

class Beers extends React.Component {
  state = { beers: [] }

  componentDidMount() {
    axios.get('/api/all_beers')
      .then( ({ data }) => {
        console.log(data.entries)
        this.setState({ beers: data.entries })
      });
    console.log(this.state)
  }

  render() {
    let { beers } = this.state;
    return (
      
      <div>
        <p color={'white'}>This is Here</p>
        <Divider />
          <Card.Group>    
              { beers.map( beer =>
                  <Card key={beer.id} >
                      <Card.Content>
                        <Divider />
                        <Card.Header>
                          {beer.name}
                        </Card.Header>
                      </Card.Content>
                  </Card>
              )};            
          </Card.Group>
        </div>
    )
  }
}

export default Beers
