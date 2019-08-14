import React, { Component } from 'react';
import { Text, Alert, View, TouchableOpacity } from 'react-native';
import { Container, Content, Item, Input, Icon, Button } from 'native-base';
import { SocialIcon } from 'react-native-elements';

import styles from './styles/Login';

class Login extends Component {
  render() {
    return (
      <Container>
        <Content style={{ flex: 1 }}>
          <View style={styles.socialButtons}>
            <SocialIcon
              title="Sign In With Facebook"
              button
              type="facebook"
              onPress={() => Alert.alert('facebook login')}
            />
            <SocialIcon
              title="Sign In With Google"
              button
              type="google-plus-official"
              onPress={() => Alert.alert('google login')}
            />
          </View>
          <View style={styles.seperator}>
            <Text style={styles.seperatorText}>Or</Text>
          </View>
          <View>
            <Item block>
              <Icon active name="person" />
              <Input placeholder="username" />
            </Item>
            <Item block>
              <Icon active name="lock" />
              <Input placeholder="Password" secureTextEntry />
            </Item>
          </View>
          <View style={styles.footerText}>
            <TouchableOpacity onPress={() => Alert.alert('Remember Password?')}>
              <Text style={styles.footerText}>
                Don't Remember your Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <Button block large onPress={() => Alert.alert('logged in')}>
              <Text style={styles.text}>LOG IN ></Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Login;
