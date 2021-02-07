import Pptxgen from 'pptxgenjs';

function toPlainText(blocks = []) {
  return (
    blocks
      // Loop through each block
      .map((block) => {
        // If it's not a text block with children,
        // return nothing
        if (block._type !== 'block' || !block.children) {
          return '';
        }

        // Loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join('\n');
      })
  );
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

const pptx = new Pptxgen();
pptx.layout = 'LAYOUT_16x10';

pptx.defineSlideMaster({
  title: 'TITLE_SLIDE',
  objects: [
    {image: {x: 0, y: 0, w: '100%', h: '100%', path: '/static/ppts/bgimg.jpg'}},
    {
      placeholder: {
        options: {
          name: 'title',
          type: Pptxgen.PLACEHOLDER_TYPES.title,
          x: 1.22,
          y: 0.76,
          w: 8.46,
          h: 3.07
        },
        text: 'title here'
      }
    },
    {
      placeholder: {
        options: {
          name: 'hymnNumber',
          type: Pptxgen.PLACEHOLDER_TYPES.body,
          x: 1.28,
          y: 2.85,
          w: 7,
          h: 1.6
        },
        text: 'hymn number here'
      }
    }
  ]
});

pptx.defineSlideMaster({
  title: 'LYRIC_SLIDE',
  bkgd: {path: '/static/ppts/mainbg.jpg'},
  objects: [
    {
      placeholder: {
        options: {
          name: 'body',
          type: Pptxgen.PLACEHOLDER_TYPES.body,
          x: 0.17,
          y: 0.21,
          w: 9.58,
          h: 5.42
        },
        text: 'Lyrics here'
      }
    }
  ]
});

type SlideOptions = {
  title: string;
  content: unknown[];
  hymnNumber: number;
};

function produceSlide({title, content, hymnNumber}: SlideOptions) {
  const verses = toPlainText(content);

  pptx
    .addSlide('TITLE_SLIDE')
    .addText(title, {
      placeholder: 'title',
      align: 'left',
      bold: true,
      fontSize: 44,
      fontFace: 'Arial',
      color: 'D6FEFF',
      shadow: {
        type: 'outer',
        angle: 45,
        blur: 3,
        offset: 3
      }
    })
    .addText(hymnNumber === 0 ? '' : `Rejoice ${hymnNumber}`, {
      placeholder: 'hymnNumber',
      align: 'left',
      bold: true,
      fontSize: 21,
      fontFace: 'Arial',
      color: 'FFFFFF',
      shadow: {
        type: 'outer',
        angle: 45,
        blur: 3,
        offset: 3
      }
    });
  verses.map((para) =>
    pptx.addSlide('LYRIC_SLIDE').addText(para, {
      placeholder: 'body',
      align: 'left',
      fontSize: 37,
      bold: true,
      fontFace: 'Arial',
      color: 'FFFFFF',
      shadow: {
        type: 'outer',
        angle: 45,
        blur: 3,
        offset: 3
      }
    })
  );
  pptx.writeFile(
    `${hymnNumber === 0 ? '' : `${hymnNumber}-`}${slugify(title)}.pptx`
  );
}

export default produceSlide;
