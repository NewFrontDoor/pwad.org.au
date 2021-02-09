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

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

const backgroundImages = {
  pca: [
    {path: '/static/ppts/bgimg.jpg'},
    {path: '/static/ppts/mainbg.jpg'},
    {color: 'D6FEFF'},
    {color: 'FFFFFF'}
  ],
  white: [
    {fill: 'FFFFFF'},
    {fill: 'FFFFFF'},
    {color: '000000'},
    {color: '000000'}
  ],
  beige: [
    {fill: 'EBE1B8'},
    {fill: 'EBE1B8'},
    {color: '000000'},
    {color: '000000'}
  ]
};

const fonts = {
  arial: 'Arial',
  arialRounded: 'Arial Rounded MT',
  helvetica: 'Helvetica'
};

function produceSlide({
  title,
  content,
  hymnNumber,
  fontOption = 'arial',
  backgroundOption = 'pca',
  ratioOpt = 'LAYOUT_16x9'
}) {
  const verses = toPlainText(content);

  const pptx = new Pptxgen();
  pptx.layout = ratioOpt;

  pptx.defineSlideMaster({
    title: 'TITLE_SLIDE',
    background: {...backgroundImages[backgroundOption][0]},
    objects: [
      {
        placeholder: {
          options: {
            name: 'title',
            type: 'title',
            x: 1.22,
            y: 0.76,
            w: 8.46,
            h: 3.07,
            align: 'left',
            bold: true,
            fontSize: 44,
            fontFace: fonts[fontOption],
            color: {...backgroundImages[backgroundOption][2]}, // 'D6FEFF',
            shadow: {
              type: 'outer',
              angle: 45,
              blur: 3,
              offset: 3
            }
          },
          text: 'title here'
        }
      },
      {
        placeholder: {
          options: {
            name: 'hymnNumber',
            type: 'body',
            x: 1.28,
            y: 2.85,
            w: 7,
            h: 1.6,
            align: 'left',
            bold: true,
            fontSize: 21,
            fontFace: fonts[fontOption],
            color: {...backgroundImages[backgroundOption][3]},
            shadow: {
              type: 'outer',
              angle: 45,
              blur: 3,
              offset: 3
            }
          },
          text: 'hymn number here'
        }
      }
    ]
  });

  pptx.defineSlideMaster({
    title: 'LYRIC_SLIDE',
    background: {...backgroundImages[backgroundOption][1]},
    objects: [
      {
        placeholder: {
          options: {
            name: 'body',
            type: 'body',
            x: 0.17,
            y: 0.21,
            w: 9.58,
            h: 5.42,
            align: 'left',
            fontSize: 37,
            bold: true,
            fontFace: fonts[fontOption],
            color: {...backgroundImages[backgroundOption][3]}
          },
          text: 'Lyrics here'
        }
      }
    ]
  });

  pptx
    .addSlide('TITLE_SLIDE')
    .addText(title, {placeholder: 'title'})
    .addText(hymnNumber === 0 ? '' : `Rejoice ${hymnNumber}`, {
      placeholder: 'hymnNumber'
    });
  verses.map((para) =>
    pptx.addSlide('LYRIC_SLIDE').addText(para, {placeholder: 'body'})
  );
  pptx.writeFile(
    `${hymnNumber === 0 ? '' : `${hymnNumber}-`}${slugify(title)}.pptx`
  );
}

export default produceSlide;
