import React from 'react';
import { Card, Divider } from 'semantic-ui-react';
import axios from 'axios';

class Beers extends React.Component {
  state = { beers: [] }

  componentDidMount() {
    axios.get('/api/all_beers')
      .then( ({ data }) => {
        this.setState({ beers: data.entries })
      });
  }

  render() {
    let { beers } = this.state;
    return (
      <div>
        <Divider />
          <Card.Group>    
              { beers.map( ({id,name,style={}}) =>
                  <Card key={id} >
                      <Card.Content>
                        <Card.Header>
                          {name}
                        </Card.Header>
                        <Divider />
                          {style.short_name}
                      </Card.Content>
                  </Card>
              )};            
          </Card.Group>
        </div>
    )
  }
}

export default Beers
