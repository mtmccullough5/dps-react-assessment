import React from 'react';
import { Card, Divider,Image } from 'semantic-ui-react';
import axios from 'axios';
import altimage from '../images/image.png';

class Breweries extends React.Component {
  state = { Breweries: [] }

  componentDidMount() {
    axios.get('/api/all_breweries')
      .then( ({ data }) => {
        console.log(data.entries)
        this.setState({ Breweries: data.entries })
      });
  }

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
        </div>
    )
  }
}

export default Breweries
