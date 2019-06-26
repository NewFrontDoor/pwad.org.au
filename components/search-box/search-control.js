import React from 'react';
import {isEmpty} from 'lodash';
import {Query} from 'react-apollo';
import Box from 'mineral-ui/Box';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import {CheckboxGroup} from 'mineral-ui/Checkbox';
import Media from '../media';
import {Formik, Form, FormField, FieldArray} from '../form';
import {LIST_ALL} from '../queries';
import SearchResult from './search-result';

const hymnMetreDefaults = [
  '10.10.10.10',
  '4.4.4.4',
  '8.8.8.8',
  '10.10.10.8',
  '8.6.8.6'
];

const toggleHowToSearch = ({showHowToSearch}) => ({
  showHowToSearch: !showHowToSearch
});

const toggleAdvancedSearch = ({showAdvancedSeach}) => ({
  showAdvancedSeach: !showAdvancedSeach
});

export default class SearchBox extends React.Component {
  searchRef = React.createRef();

  state = {
    showHowToSearch: false,
    showAdvancedSeach: false
  };

  handleHowToSearch = () => {
    this.setState(toggleHowToSearch);
  };

  handleAdvancedSearch = () => {
    this.setState(toggleAdvancedSearch);
  };

  handleSearch = fields => {
    this.setState(() => fields);
  };

  render() {
    const {showHowToSearch, showAdvancedSeach, ...search} = this.state;
    const showSearchResults = !isEmpty(search);

    return (
      <>
        <Text as="h3">Search</Text>
        <Text appearance="prose">
          Search for hymns, worship resources, prayer resources and worship aids
          using the search box below. Advanced search will allow you to refine
          your criteria on data available in the resource.
        </Text>
        <Formik
          initialValues={{
            customMetre: '',
            hymnMetre: [],
            search: '',
            title: '',
            tune: '',
            passage: ''
          }}
          onSubmit={this.handleSearch}
        >
          <Form>
            <Flex marginBottom="1em">
              <FlexItem grow={1} marginEnd="auto">
                <FormField
                  hideLabel
                  input={TextInput}
                  label="Search"
                  name="search"
                  placeholder="Search..."
                  type="search"
                />
              </FlexItem>
              {showAdvancedSeach && (
                <FlexItem marginStart="1em">
                  <Button type="submit">Search</Button>
                </FlexItem>
              )}
            </Flex>
            <Flex justifyContent="between" marginBottom="1em">
              <Media query="medium">
                <FlexItem>
                  <Button
                    minimal
                    size="medium"
                    onClick={this.handleHowToSearch}
                  >
                    How to search
                  </Button>
                </FlexItem>
              </Media>
              <FlexItem>
                <Button
                  minimal
                  size="medium"
                  onClick={this.handleAdvancedSearch}
                >
                  Advanced Search
                </Button>
              </FlexItem>
            </Flex>
            {showHowToSearch && (
              <Text>
                Search Instructions to help people to search. Lorem ipsum dolor
                sit amet, affert theophrastus in sea, at aeterno invidunt
                platonem has. Habeo inimicus rationibus mel ex, nisl fabellas
                nec ei, quo et quot putant legendos. Prompta definitiones nam
                an, quidam scaevola per te. Eum at purto vocibus mnesarchum,
                diam falli an nam. Dicunt perfecto deserunt mel in, mundi
                moderatius eu eam.
              </Text>
            )}
            {showAdvancedSeach && (
              <Flex>
                <FlexItem
                  grow={1}
                  width="50%"
                  breakpoints={['medium']}
                  direction={['column', 'row']}
                >
                  <Box marginBottom="1em">
                    <FormField input={TextInput} label="Title" name="title" />
                  </Box>
                  <Box marginBottom="1em">
                    <FieldArray
                      input={CheckboxGroup}
                      label="Hymn Metre"
                      name="hymnMetre"
                      data={hymnMetreDefaults.map(value => ({
                        label: value,
                        value
                      }))}
                    />
                  </Box>
                  <Box marginBottom="1em">
                    <FormField
                      hideLabel
                      name="customMetre"
                      input={TextInput}
                      label="Custom Metre"
                    />
                  </Box>
                  <Box marginBottom="1em">
                    <FormField input={TextInput} label="Tune" name="tune" />
                  </Box>
                  <Box marginBottom="1em">
                    <FormField
                      input={TextInput}
                      label="Passage"
                      name="passage"
                    />
                  </Box>
                </FlexItem>
                <Media query="medium">
                  <FlexItem grow={1} width="50%">
                    <Text>
                      Search Instructions to help people to search. Lorem ipsum
                      dolor sit amet, affert theophrastus in sea, at aeterno
                      invidunt platonem has. Habeo inimicus rationibus mel ex,
                      nisl fabellas nec ei, quo et quot putant legendos. Prompta
                      definitiones nam an, quidam scaevola per te. Eum at purto
                      vocibus mnesarchum, diam falli an nam. Dicunt perfecto
                      deserunt mel in, mundi moderatius eu eam.
                    </Text>
                  </FlexItem>
                </Media>
              </Flex>
            )}
          </Form>
        </Formik>
        {showSearchResults && (
          <Query query={LIST_ALL} variables={search}>
            {({loading, error, data}) => {
              if (loading) {
                return 'Loading...';
              }

              if (error) {
                return `Error! ${error.message}`;
              }

              return data.hymnMany.map(props => (
                <SearchResult key={props._id} {...props} />
              ));
            }}
          </Query>
        )}
      </>
    );
  }
}
