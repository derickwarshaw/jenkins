import test from 'ava';
import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { shallow } from 'enzyme';
import sinon from 'sinon';
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

test('has text and set properly', t => {
  t.is(wrapper.containsMatchingElement(<Text>ALERT MESSAGE TITLE</Text>), true);
});

test('has icon and set properly', t => {
  t.is(wrapper.containsMatchingElement(<Icon name='ios-alert' />), true);

  const custom = shallow(<AlertMessage onPress={() => {}} title='Alert Message Title' icon='test' />);
  t.is(custom.containsMatchingElement(<Icon name='test' />), true);
});

test('style props are passed to top view', t => {
  const withStyle = shallow(<AlertMessage title='Alert Message Title' style={{color: 'red'}} />);
  t.is(withStyle.props().style[1].color, 'red');
});

test('show false', t => {
  const hidden = shallow(<AlertMessage title='Alert Message Title' show={false} />);
  t.is(hidden.children().length, 0);
});
