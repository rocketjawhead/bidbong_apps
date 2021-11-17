import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import DeviceInfo from 'react-native-device-info';
import SocketIOClient from 'socket.io-client';

export {
  React,
  axios,
  NumberFormat,
  AsyncStorage,
  NetInfo,
  PropTypes,
  Carousel,
  DeviceInfo,
  SocketIOClient,
};

export * from 'react';
export * from 'react-native';
export * from '@react-navigation/native';
