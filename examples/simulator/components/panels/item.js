import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
export default class ItemPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], selected: null }
  }
  componentDidMount() {
    this.setState({
      items: this.props.machine.inventory.items
    });
    this.props.machine.inventory.onUpdate((items) => {
      this.setState({ items });
    });
  }
  select(event) {
    const { machine } = this.props;
    const id = event.currentTarget.id.replace('item.', '');
    machine.selectById(id);
  }
  render() {
    const { machine } = this.props;
    return (
      <div>
      <Card.Group itemsPerRow={machine.options.ui.columns}>
        {
          this.state.items
            .map(item => item.toJSON())
            .map(item => {
              return (
                  <Card key={item.id.toString()} id={`item.${item.id}`} onClick={this.select.bind(this)} style={{width: '40%'}}>
                    <Image src={item.image.url} style={{width: 'auto'}}/>
                    <Card.Content>
                      <Card.Header>{item.name}</Card.Header>
                      <Card.Description>{item.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <span>Cost: <Icon name='dollar' />{item.cost.toFixed(2)}</span>
                      <br />
                      <span>Availability: {item.quantity > 0 ? 'In Stock': 'Out of Stock' } ({ item.quantity })</span>
                      <br/>
                    </Card.Content>
                  </Card>
              )
            })
        }
        </Card.Group>
      </div>
    )
  }
}