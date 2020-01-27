import React, {FC} from 'react';
import {Text, Flex, Box, Card} from 'theme-ui';
import Router from 'next/router';

import Link from './link';

const Featured: FC = () => (
  <>
    <Text as="h3">Featured</Text>
    <Flex
      sx={{
        flexDirection: ['column', 'row']
      }}
    >
      <Box marginBottom={3} width="0" shrink={0} grow={1}>
        <Card
          sx={{
            height: '100%'
          }}
          onClick={async () => Router.push('/worship')}
        >
          <Text>
            <Link>Worship</Link>
          </Text>
          {/* <CardBlock>
            <Styled.p variant="prose">
              Components and templates for constructing a service of worship
            </Text>
          </CardBlock> */}
        </Card>
      </Box>
      <Box marginBottom={3} width="0" shrink={0} grow={1}>
        <Card
          sx={{
            height: '100%'
          }}
          onClick={async () => Router.push('/pray')}
        >
          <Text>
            <Link>Pray</Link>
          </Text>
          {/* <CardBlock>
            <Styled.p variant="prose">
              Useful resources to use for personal or corporate prayer.
            </Text>
          </CardBlock> */}
        </Card>
      </Box>
      <Box marginBottom={3} width="0" shrink={0} grow={1}>
        <Card
          sx={{
            height: '100%'
          }}
          onClick={async () => Router.push('/rejoice')}
        >
          <Text>
            <Link>Rejoice</Link>
          </Text>
          {/* <CardBlock>
            <Styled.p variant="prose">The New & Improved Rejoice Plus!</Text>
          </CardBlock> */}
        </Card>
      </Box>
    </Flex>
  </>
);

export default Featured;
