import test from 'ava';
import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { shallow } from 'enzyme';
import AlertMessage from '../../App/Components/AlertMessageComponent';


const wrapper = shallow(<AlertMessage title='Alert Message Title' />);

test('component exists', t => {
  t.is(wrapper.length, 1);
});

test('component structure', t => {
  t.is(wrapper.name(), 'Animatable.View');
  t.is(wrapper.children().length, 1);
  t.is(wrapper.children().first().name(), 'View');

  const subview = wrapper.children().first();
  t.is(subview.children().length, 2);
});

test('Has text and set properly', t => {
  t.is(wrapper.containsMatchingElement(<Text>ALERT MESSAGE TITLE</Text>), true);
});

test('Has icon and default icon set properly', t => {
  t.is(wrapper.containsMatchingElement(<Icon name='ios-alert' />), true);
});

test('Has custom icon set properly', t => {
  const customIconWrapper = shallow(<AlertMessage onPress={() => {}} title='Alert Message Title' icon='test' />);
  t.is(customIconWrapper.containsMatchingElement(<Icon name='test' />), true);
});

test('Style props are passed to top view', t => {
  const styledWrapper = shallow(<AlertMessage title='Alert Message Title' style={{color: 'red'}} />);
  t.is(styledWrapper.props().style[1].color, 'red');
});

test('show false', t => {
  const hiddenWrapper = shallow(<AlertMessage title='Alert Message Title' show={false} />);
  t.is(hiddenWrapper.children().length, 0);
});
