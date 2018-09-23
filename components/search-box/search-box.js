import React from 'react';
import styled from 'react-emotion';
import Box from 'mineral-ui/Box';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import {FormField} from 'mineral-ui/Form';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import {CheckboxGroup} from 'mineral-ui/Checkbox';

const setMeter = (value, checked) => prevState => {
  const meters = [...prevState.meters];
  const index = meters.indexOf(value);
  const hasValue = index !== -1;

  if (checked && !hasValue) {
    meters.push(value);
  } else if (hasValue) {
    meters.splice(index, 1);
  }

  return {meters};
};

const toggleHowToSearch = ({showHowToSearch}) => ({
  showHowToSearch: !showHowToSearch
});

const toggleAdvancedSearch = ({showAdvancedSeach}) => ({
  showAdvancedSeach: !showAdvancedSeach
});

const searchState = ({customMeter, tune, search, ...rest}) => {
  const value = [];
  let meters = [...rest.meters];

  if (customMeter) {
    meters = [...meters, customMeter];
  }

  if (meters.length > 0) {
    value.push(`meter:${meters.join(',')}`);
  }

  if (tune) {
    value.push(`tune:${tune}`);
  }

  value.push(search);

  return value;
};

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.searchRef = React.createRef();

    this.state = {
      customMeter: '',
      meters: [],
      search: '',
      title: '',
      tune: '',
      passage: '',
      showHowToSearch: false,
      showAdvancedSeach: !false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMeter = this.handleMeter.bind(this);
    this.handleHowToSearch = this.handleHowToSearch.bind(this);
    this.handleAdvancedSearch = this.handleAdvancedSearch.bind(this);
  }

  handleChange(name) {
    return event => this.setState({
      [name]: event.target.value
    });
  }

  handleSearch(event) {
    const state = searchState(this.state).slice(0, -1).join(' ');
    const search = event.target.value.replace(state, '').trimStart();
    this.setState({search});
  }

  handleMeter(event) {
    const {checked, value} = event.target;
    this.setState(setMeter(value, checked));
  }

  handleHowToSearch() {
    this.setState(toggleHowToSearch);
  }

  handleAdvancedSearch() {
    this.setState(toggleAdvancedSearch);
  }

  render() {
    const {customMeter, meters, tune, passage, title, showHowToSearch, showAdvancedSeach} = this.state;

    const search = searchState(this.state).join(' ');

    return (
      <React.Fragment>
        <Flex marginBottom="1em">
          <FlexItem grow={1} marginEnd="auto">
            <FormField
              hideLabel
              input={TextInput}
              label="Search"
              type="search"
              placeholder="Search..."
              value={search}
              onBlur={this.handleBlur}
              onChange={this.handleSearch}
            />
          </FlexItem>
          {showAdvancedSeach && (
            <FlexItem marginStart="1em">
              <Button>
                Search
              </Button>
            </FlexItem>
          )}
        </Flex>
        <Flex justifyContent="between" marginBottom="1em">
          <FlexItem>
            <Button minimal size="medium" onClick={this.handleHowToSearch}>
                How to search
            </Button>
          </FlexItem>
          <FlexItem>
            <Button minimal size="medium" onClick={this.handleAdvancedSearch}>
                Advanced Search
            </Button>
          </FlexItem>
        </Flex>
        {showHowToSearch && (
          <Text>
            Search Instructions to help people to search. Lorem ipsum dolor sit amet,
            affert theophrastus in sea, at aeterno invidunt platonem has.
            Habeo inimicus rationibus mel ex, nisl fabellas nec ei, quo et quot putant legendos.
            Prompta definitiones nam an, quidam scaevola per te. Eum at purto vocibus mnesarchum,
            diam falli an nam. Dicunt perfecto deserunt mel in, mundi moderatius eu eam.
          </Text>
        )}
        {showAdvancedSeach && (
          <React.Fragment>
            <Box marginBottom="1em">
              <FormField
                input={TextInput}
                label="Title"
                value={title}
                onBlur={this.handleBlur}
                onChange={this.handleChange('title')}
              />
            </Box>
            <Box marginBottom="1em">
              <FormField
                input={CheckboxGroup}
                label="Hymn Meter"
                name="hymn-meter"
                checked={meters}
                data={[
                  {label: '10.10.10.10', value: '10.10.10.10'},
                  {label: '4.4.4.4.4', value: '4.4.4.4.4'},
                  {label: '8.8.8.8', value: '8.8.8.8'},
                  {label: '10.10.10.8', value: '10.10.10.8'},
                  {label: '8.6.8.6', value: '8.6.8.6'}
                ]}
                onBlur={this.handleBlur}
                onChange={this.handleMeter}
              />
            </Box>
            <Box marginBottom="1em">
              <FormField
                hideLabel
                input={TextInput}
                label="Custom Meter"
                value={customMeter}
                onBlur={this.handleBlur}
                onChange={this.handleChange('customMeter')}
              />
            </Box>
            <Box marginBottom="1em">
              <FormField
                input={TextInput}
                label="Tune"
                value={tune}
                onBlur={this.handleBlur}
                onChange={this.handleChange('tune')}
              />
            </Box>
            <Box marginBottom="1em">
              <FormField
                input={TextInput}
                label="Passage"
                value={passage}
                onBlur={this.handleBlur}
                onChange={this.handleChange('passage')}
              />
            </Box>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
