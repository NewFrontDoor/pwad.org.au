import React from 'react';
import {css} from 'react-emotion';
import Router from 'next/router';
import Text from 'mineral-ui/Text';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import Card, {CardBlock, CardTitle} from 'mineral-ui/Card';
import Link from './link';

const Featured = () => (
  <>
    <Text element="h3">Featured</Text>
    <Flex breakpoints={['narrow']} direction={['column', 'row']}>
      <FlexItem marginBottom="md" width="0" shrink={0} grow={1}>
        <Card
          className={css`
            height: 100%;
          `}
          onClick={() => Router.push('/worship')}
        >
          <CardTitle>
            <Link>Worship</Link>
          </CardTitle>
          <CardBlock>
            <Text appearance="prose">
              Components and templates for constructing a service of worship
            </Text>
          </CardBlock>
        </Card>
      </FlexItem>
      <FlexItem marginBottom="md" width="0" shrink={0} grow={1}>
        <Card
          className={css`
            height: 100%;
          `}
          onClick={() => Router.push('/pray')}
        >
          <CardTitle>
            <Link>Pray</Link>
          </CardTitle>
          <CardBlock>
            <Text appearance="prose">
              Useful resources to use for personal or corporate prayer.
            </Text>
          </CardBlock>
        </Card>
      </FlexItem>
      <FlexItem marginBottom="md" width="0" shrink={0} grow={1}>
        <Card
          className={css`
            height: 100%;
          `}
          onClick={() => Router.push('/rejoice')}
        >
          <CardTitle>
            <Link>Rejoice</Link>
          </CardTitle>
          <CardBlock>
            <Text appearance="prose">The New & Improved Rejoice Plus!</Text>
          </CardBlock>
        </Card>
      </FlexItem>
    </Flex>
  </>
);

export default Featured;
