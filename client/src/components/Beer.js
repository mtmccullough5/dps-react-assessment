import React from 'react';
import { Card, Container, Divider} from 'semantic-ui-react';
import axios from 'axios';


class Beer extends React.Component {
  state = { newBeer: {} };

  componentDidMount() {
    axios.get(`/api/beer/${this.props.match.params.name}`)
      .then( res => this.setState({ newBeer: res.data.entries[0] }) )
  }

  render() {
    const { id, style={}, name, description, abv, ibu, organic,} = this.state.newBeer;
    console.log(this.state.newBeer)
    return(
      <Container textAlign={'center'}>
        <Divider />
        <Card key={name} centered={true}>
          <Card.Content>
            <h1>{name}</h1>
            <h2>{style.short_name}</h2>
            <Divider />
            <h3>{description}</h3>
            <Divider />
            <p>{`ABV - ${abv}`}</p>
            <p>{`IBU - ${ibu}`}</p>
          </Card.Content>
        </Card>
      </Container>
    )
  }
}


export default Beer

