import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    marginTop: 5,
    flexDirection: "row",
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
  },
  section: {
    margin: 10,
    padding: 20,
    flexGrow: 1,
  },
  sectionWrapper: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: "20",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  invalid: {
    fontSize: "11",
    fontStyle: "italic",
    margin: 10,
    marginLeft: 30,
  },
  textNoMargin: {
    fontSize: "14",
  },
  text: {
    fontSize: "14",
    marginBottom: 10,
  },
  h2: {
    fontSize: "20",
    marginBottom: "10",
  },
  h3: {
    fontSize: "18",
    marginBottom: "10",
  },
  h4: {
    fontSize: "17",
    marginBottom: "10",
  },
  h5: {
    fontSize: "15",
    marginBottom: "10",
  },
});

const generateBlock = (block) => {
  const type = block._type;
  if (type === "image") {
    //if images aren't rendered properly it is likely due to CORS
    return <Image style={styles.image} src={block.asset.url} />;
  }

  if (type === "block" && block.children[0]._type === "span") {
    switch (block.style) {
      case "h2":
        return block.children.map((child) => (
          <Text style={styles.h2}>{child.text.trim()}</Text>
        ));
        break;
      case "h3":
        return <Text style={styles.h3}>{block.children[0].text.trim()}</Text>;
        break;
      case "h4":
        return <Text style={styles.h4}>{block.children[0].text.trim()}</Text>;
        break;
      case "h5":
        return <Text style={styles.h5}>{block.children[0].text.trim()}</Text>;
        break;
      default:
        return block.children.length > 1 ? (
          <View style={styles.sectionWrapper}>
            {block.children.map((child) => {
              let markKey, href, mark;
              if (child.marks.length > 0) {
                markKey = child.marks[0];
                mark = block.markDefs.find((m) => m._key === markKey);
              }

              if (mark) {
                href = mark.href;
              }

              return href ? (
                <Link src={href}>
                  <Text style={styles.textNoMargin}>{child.text.trim()}</Text>
                </Link>
              ) : (
                <Text style={styles.textNoMargin}>{child.text.trim()}</Text>
              );
            })}
          </View>
        ) : (
          <Text style={styles.text}>{block.children[0].text.trim()}</Text>
        );
    }
  }

  if (type === "video") {
    return (
      <Text style={styles.invalid}>
        Embedded Video:{" "}
        <Link src={block.url}>
          <Text>{block.url}</Text>
        </Link>
      </Text>
    );
  }

  if (type === "block") {
    switch (block.children[0]._type) {
      case "ul":
        return (
          <Text style={styles.invalid}>Lists not yet supported by PDFs</Text>
        );
        break;
      case "ol":
        return (
          <Text style={styles.invalid}>Lists not yet supported by PDFs</Text>
        );
        break;
      case "li":
        return (
          <Text style={styles.invalid}>Lists not yet supported by PDFs</Text>
        );
        break;
      case "normal":
        return <Text style={styles.text}>{block.children[0].text.trim()}</Text>;
        break;
      default:
        return (
          <Text style={styles.invalid}>
            Element {block.children[0]._type} is not yet supported by PDFs.
          </Text>
        );
        break;
    }
  }

  return (
    <Text style={styles.invalid}>
      Element {type} is not yet supported by PDFs.
    </Text>
  );
};

function PDFReaderBlocks({ blocks, title }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {title && <Text style={styles.title}>{title}</Text>}
          {blocks.map((block) => generateBlock(block))}
        </View>
      </Page>
    </Document>
  );
}

export default PDFReaderBlocks;
