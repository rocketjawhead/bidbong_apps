/* eslint-disable import/no-cycle */
import CONFIG from '../const.js';

export const config = { ...CONFIG };

const baseUrl = {};

baseUrl.login = `${config.url.api}v1/users/login`;
baseUrl.users = `${config.url.api}v1/users`;
baseUrl.profile = `${config.url.api}v1/users/profile`;
baseUrl.updateUser = `${config.url.api}v1/users/update`;

// ROOM
baseUrl.listRoom = `${config.url.api}v1/room/list`;
baseUrl.waitingRoom = `${config.url.api}v1/room/waiting`;
baseUrl.liveRoom = `${config.url.api}v1/users/room/live`;
baseUrl.endRoom = `${config.url.api}v1/users/room/end`;
baseUrl.DetailRoom = `${config.url.api}v1/room/detail`;
baseUrl.leaveRoom = `${config.url.api}v1/users/room/leave`;

// KEY
baseUrl.buyKey = `${config.url.api}v1/order/key`;
baseUrl.payKey = `${config.url.api}v1/order/key/pay`;
baseUrl.userKey = `${config.url.api}v1/users/Key`;
baseUrl.getListKey = `${config.url.api}v1/key/list`;

// bidding
baseUrl.getUserBid = `${config.url.api}v1/user/bid`;
baseUrl.reservation = `${config.url.api}v1/order/bidding`;
baseUrl.bidding = `${config.url.api}v1/order/bidding/update`;
baseUrl.getCart = `${config.url.api}v1/users/room/have/winner`;

// SHIPPING
baseUrl.getShippingUser = `${config.url.api}v1/users/shipping/type`;

// PAYMENT
baseUrl.payment = `${config.url.api}v1/order/bidding/payment`;

// REST PASSWORD
baseUrl.reqResetPass = `${config.url.api}v1/users/reset/request`;
baseUrl.reqCheckOtp = `${config.url.api}v1/users/reset/check`;
baseUrl.reqSetPass = `${config.url.api}v1/users/reset/setpassword`;

// NOTIFICATION
baseUrl.getNotif = `${config.url.api}v1/user/inbox/list`;
baseUrl.setRead = `${config.url.api}v1/user/inbox/setread`;

/**
 * ==============================================================
 * ADMIN
 * ==============================================================
 */

// ROOM
baseUrl.getAdminLiveRoom = `${config.url.api}v1/room/live`;
baseUrl.getAdminWaitingRoom = `${config.url.api}v1/room/waiting`;
baseUrl.getAdminEndRoom = `${config.url.api}v1/room/end`;
baseUrl.product = `${config.url.api}admin/product`;
baseUrl.room = `${config.url.api}admin/stores`;
baseUrl.adminDetailRoom = `${config.url.api}admin/room/detail`;

// KEY
baseUrl.key = `${config.url.api}admin/keys`;

// SHIPPING
baseUrl.shipping = `${config.url.api}admin/shipping/type`;
baseUrl.searchShipping = `${config.url.api}admin/shipping/type/search`;

// GET USER LIST
baseUrl.getUser = `${config.url.api}admin/users`;

// SET WINNER
baseUrl.setWinner = `${config.url.api}admin/stores/winner/set`;

// REPORT
baseUrl.reportChart = `${config.url.api}v1/dashboard/bidder`;
baseUrl.listBidder = `${config.url.api}v1/dashboard/bidder/bidderlist`;
baseUrl.lastwinner = `${config.url.api}v1/dashboard/bidder/lastwinner`;

// ORDER
baseUrl.updateStatusOrder = `${config.url.api}admin/bidding/confirm/update`;

baseUrl.countries = 'https://restcountries.eu/rest/v2/all';

export default baseUrl;
