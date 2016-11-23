import React from 'react';
import { Grid, Segment } from 'semantic-ui-react'
import { machine } from '../machine';
import ItemPanel from '../components/panels/item';
import PaymentPanel from '../components/panels/payment';


const style = {
    'margin': '100px 100px'
}

export default class App extends React.Component {
    render() {
        return (
            <div id="app" style={style}>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"></link>
                <Grid columns='equal' divided>
                    <Grid.Row stretched>
                        <Grid.Column width={10}>
                            <Segment>
                                <ItemPanel machine={machine} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <PaymentPanel machine={machine} />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {/*<Grid centered columns={2}>
                    <Grid.Column width={10}>
                        <Segment>1</Segment>
                    </Grid.Column>
                </Grid> */}
            </div>
        )
    }
}