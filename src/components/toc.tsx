/** @jsx jsx */
import {FC} from 'react';
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';
import GithubSlugger from 'github-slugger';

type BlockContent = {
  style: string;
  children: any[];
};

type TocProps = {
  blocks?: BlockContent[];
};

const Toc: FC<TocProps> = ({blocks}) => {
  const headings = deriveToc(blocks);

  return (
    <div>
      <h2>Contents:</h2>
      <ul>
        {headings.map(item => (
          <li key={item.slug}>
            <a href={`#${item.slug}`}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Toc.propTypes = {
  blocks: PropTypes.array.isRequired
};

type TocItem = {
  slug: string;
  name: any[];
};

export function deriveToc(content: BlockContent[]): TocItem[] {
  const toc = [];
  const slugger = new GithubSlugger();

  for (const block of content) {
    if (block.style === 'h2') {
      const name = block.children;
      const slug = slugger.slug(name);
      toc.push({slug, name});
    }
  }

  return toc;
}

export default Toc;
