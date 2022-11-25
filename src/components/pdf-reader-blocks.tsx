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
    marginTop: '10',
    flexDirection: "row",
    backgroundColor: "#fff",
    fontFamily: 'Helvetica',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: '20'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  invalid: {
    fontSize: "11",
    fontStyle: 'italic',
    margin: 10,
    marginLeft: 30,
  },
  text: {
    fontSize: "14",
    margin: 10,
    marginLeft: 30,
  },
  h2:{
    fontSize: "18",
    marginBottom: '10'
  },
  h3:{
    fontSize: "17",
    marginBottom: '10'
  },
  h4:{
    fontSize: "16",
    marginBottom: '10'
  },
  h5:{
    fontSize: "15",
    marginBottom: '10'
  }
});

const generateBlock = (block) => {
  const type = block._type 
  if(type === "image"){
    //if images aren't rendered properly it is likely due to CORS
    return <Image style={styles.image} src={block.asset.url} />
  }

  if(type === "video"){
    return <Text style={styles.invalid}>Embedded Video: <Link src={block.url}><Text>{block.url}</Text></Link></Text>
  }

  if(type === 'block'){
    switch (block.children[0]._type) {
      case 'span':
        return <Text style={styles.text}>{block.children[0].text.trim()}</Text>
      case 'h2':
        return <Text style={styles.h2}>{block.children[0].text.trim()}</Text>
      case 'h3':
        return <Text style={styles.h3}>{block.children[0].text.trim()}</Text>
      case 'h4':
        return <Text style={styles.h4}>{block.children[0].text.trim()}</Text>
      case 'h5':
        return <Text style={styles.h5}>{block.children[0].text.trim()}</Text>
      case 'ul':
        return <Text style={styles.invalid}>Lists not yet supported by PDFs</Text>
      case 'ol':
        return <Text style={styles.invalid}>Lists not yet supported by PDFs</Text>
      case 'li':
        return <Text style={styles.invalid}>Lists not yet supported by PDFs</Text>
      case 'normal':
        return <Text style={styles.text}>{block.children[0].text.trim()}</Text>
      default:
        return <Text style={styles.invalid}>Element {block.children[0]._type} is not yet supported by PDFs.</Text>
    }
  }
  
  return <Text style={styles.invalid}>Element {type} is not yet supported by PDFs.</Text>
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
