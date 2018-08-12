import React from 'react';
import styled from 'react-emotion';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';

const setMeter = meter => () => ({
  meter: (meter || '').toLowerCase()
});

const setTone = tone => () => ({
  tone: (tone || '').toLowerCase()
});

const setContext = context => () => ({
  context: (context || '').toLowerCase()
});

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.searchRef = React.createRef();

    this.state = {
      meter: null,
      tone: null,
      context: null,
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleMeter = this.handleMeter.bind(this);
    this.handleTone = this.handleTone.bind(this);
    this.handleContext = this.handleContext.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleMeter(event) {
    const meter = event.target.textContent;
    this.setState(setMeter(meter));
  }

  handleTone(event) {
    const meter = event.target.textContent;
    this.setState(setTone(meter));
  }

  handleContext(event) {
    const meter = event.target.textContent;
    this.setState(setContext(meter));
  }

  render() {
    const value = [];

    if (this.state.meter) {
      value.push(`meter:${this.state.meter}`);
    }

    if (this.state.tone) {
      value.push(`tone:${this.state.tone}`);
    }

    if (this.state.context) {
      value.push(`context:${this.state.context}`);
    }

    if (this.state.value) {
      value.push(this.state.value);
    }

    return (
      <React.Fragment>
        <TextInput
          type="search"
          placeholder="Search..."
          value={value.join(' ')}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        <Flex>
          <FlexItem>
            <Text fontWeight="bold">
                How to search
            </Text>
            <Text fontWeight="bold">
                Select a paramete to add it to your search
            </Text>
          </FlexItem>
          <FlexItem>
            <Text fontWeight="bold">
                meter:
            </Text>
            <Button minimal size="medium" onClick={this.handleMeter}>
                10.10.10.10
            </Button>
            <Button minimal size="medium" onClick={this.handleMeter}>
                8.8.8.8
            </Button>
            <Button minimal size="medium" onClick={this.handleMeter}>
                6.8.6.8
            </Button>
          </FlexItem>
          <FlexItem>
            <Text fontWeight="bold">
                tune:
            </Text>
            <Button minimal size="medium" onClick={this.handleTone}>
                Rockingham
            </Button>
            <Button minimal size="medium" onClick={this.handleTone}>
                Hamburg
            </Button>
            <Button minimal size="medium" onClick={this.handleTone}>
                Eucharist
            </Button>
          </FlexItem>
          <FlexItem>
            <Text fontWeight="bold">
                context:
            </Text>
            <Button minimal size="medium" onClick={this.handleContext}>
                10.10.10.10
            </Button>
            <Button minimal size="medium" onClick={this.handleContext}>
                8.8.8.8
            </Button>
            <Button minimal size="medium" onClick={this.handleContext}>
                6.8.6.8
            </Button>
          </FlexItem>
        </Flex>
      </React.Fragment>
    );
  }
}
