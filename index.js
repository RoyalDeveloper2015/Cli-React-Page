
var program = require('commander');
var fs = require('fs')

function getIndexTemplate(pagename) {
  return `import page from './page'
export default page
  `
}

function getPageTemplate(pagename) {
  return `//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styles from 'styles'

// create a component
class ${pagename} extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>${pagename}</Text>
      </View>
    );
  }
}

//make this component available to the app
export default ${pagename};
  `
}

function getCssTemplate() {
  return `import { StyleSheet } from 'react-native'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default styles
  `
}

program
  .arguments('<pagename>')
  .option('-t, --type <type>', 'CSS file type, android: will generate styles.android.js, ios: will generate styles.io.js, both: will generate both')
  // .option('-u, --username <username>', 'The user to authenticate as')
  // .option('-p, --password <password>', 'The user\'s password')
  .action(function(pagename) {
    if (!fs.existsSync(pagename)){
      fs.mkdir(pagename, function() {
        fs.writeFile(`./${pagename}/index.js`, getIndexTemplate(pagename), function(err) {
            if(err) {
                console.log(err)
                return console.log('Failed Write File index.js');
            }

            console.log("index.js created");
        });
        fs.writeFile(`./${pagename}/page.js`, getPageTemplate(pagename), function(err) {
            if(err) {
                console.log(err)
                return console.log('Failed Write File page.js');
            }

            console.log("page.js created");
        });
        fs.writeFile(`./${pagename}/styles.js`, getCssTemplate(), function(err) {
            if(err) {
                return console.log('Failed Write File styles.js');
            }

            console.log("styles.js created");
        });
        if (program.type == 'android' ) {
          fs.writeFile(`./${pagename}/styles.android.js`, getCssTemplate(), function(err) {
              if(err) {
                  return console.log('Failed Write File styles.android.js');
              }

              console.log("styles.android.js created");
          });
        }
        if (program.type == 'ios' ) {
          fs.writeFile(`./${pagename}/styles.ios.js`, getCssTemplate(), function(err) {
              if(err) {
                  return console.log('Failed Write File styles.ios.js');
              }

              console.log("styles.ios.js created");
          });
        }
        if (program.type == 'both' ) {
          fs.writeFile(`./${pagename}/styles.ios.js`, getCssTemplate(), function(err) {
              if(err) {
                  return console.log('Failed Write File styles.ios.js');
              }

              console.log("styles.ios.js created");
          });
          fs.writeFile(`./${pagename}/styles.android.js`, getCssTemplate(), function(err) {
              if(err) {
                  return console.log('Failed Write File styles.android.js');
              }

              console.log("styles.android.js created");
          });
        }
      });

    } else {
      console.log(`Directory with  ${pagename} already exist !`)
    }
  })
  .parse(process.argv);
