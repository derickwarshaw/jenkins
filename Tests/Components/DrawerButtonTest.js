import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import DrawerButton from '../../App/Components/DrawerButton';

test('component exists', t => {
  const wrapper = shallow(<DrawerButton
    onPress={() => {}}
    text='I am button' />);

  t.is(wrapper.length, 1);
});

test('component structure', t => {
  const wrapper = shallow(<DrawerButton />);
  t.is(wrapper.name(), 'TouchableOpacity');
  t.is(wrapper.children().length, 1);
  t.is(wrapper.children().first().name(), 'Text');
});

test('onPress', t => {
  const callback = sinon.spy();
  const wrapper = shallow(<DrawerButton
    onPress={callback} />);

  wrapper.simulate('press');

  t.is(callback.calledOnce, true);
});
