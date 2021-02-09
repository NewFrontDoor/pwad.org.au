/** @jsx jsx */
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';
import GithubSlugger from 'github-slugger';
import {BlockContent} from '../../queries/_types';

const slugger = new GithubSlugger();

type TocProps = {
  blocks?: BlockContent[];
};

const Toc = ({blocks}: TocProps) => {
  const headings = deriveToc(blocks ?? []);

  return (
    <div>
      <h2>Contents:</h2>
      <ul>
        {headings.map((item) => (
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
  name: string;
};

export function deriveToc(content: BlockContent[]): TocItem[] {
  const toc: TocItem[] = [];

  for (const block of content) {
    if (block.style === 'h2') {
      const name = block.children.map((child) => child.text).join(' ');
      const slug = slugger.slug(name);
      toc.push({slug, name});
    }
  }

  return toc;
}

export default Toc;
