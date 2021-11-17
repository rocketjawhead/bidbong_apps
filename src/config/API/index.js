import ApiRequest from './config';
import baseUrl from './url';

const API = {};

API.login = ApiRequest.post(baseUrl.login);
API.signup = ApiRequest.post(baseUrl.users);
API.getProfile = ApiRequest.get(baseUrl.profile);
API.updateProfile = ApiRequest.post(baseUrl.updateUser);

// ROOM
API.getLiveRoom = ApiRequest.get(baseUrl.liveRoom);
API.getListRoom = ApiRequest.get(baseUrl.listRoom);
API.getDetailRoom = ApiRequest.get(baseUrl.DetailRoom);
API.getWaitingRoom = ApiRequest.get(baseUrl.waitingRoom);
API.getEndRoom = ApiRequest.get(baseUrl.endRoom);

// KEY
API.payKey = ApiRequest.post(baseUrl.payKey);
API.buyKey = ApiRequest.post(baseUrl.buyKey);
API.getUserKey = ApiRequest.get(baseUrl.userKey);
API.getListKey = ApiRequest.get(baseUrl.getListKey);

// BIDDING
API.bidding = ApiRequest.put(baseUrl.bidding);
API.getUserBid = ApiRequest.get(baseUrl.getUserBid);
API.reservation = ApiRequest.post(baseUrl.reservation);
API.getCart = ApiRequest.get(baseUrl.getCart);

// SHIPPING
API.getShippingUser = ApiRequest.get(baseUrl.getShippingUser);

// PAYMENT
API.payment = ApiRequest.put(baseUrl.payment);

// RESET PASSWORD
API.reqResetPassword = ApiRequest.post(baseUrl.reqResetPass);
API.reqCheckOTP = ApiRequest.post(baseUrl.reqCheckOtp);
API.reqSetPass = ApiRequest.post(baseUrl.reqSetPass);

// NOTIFICATION
API.getNotif = ApiRequest.get(baseUrl.getNotif);
API.setRead = ApiRequest.post(baseUrl.setRead);

/**
 * =======================================================
 * ADMIN
 * =======================================================
 */

// ROOM
API.getAdminLiveRoom = ApiRequest.get(baseUrl.getAdminLiveRoom);
API.getAdminWaitingRoom = ApiRequest.get(baseUrl.getAdminWaitingRoom);
API.getAdminEndRoom = ApiRequest.get(baseUrl.getAdminEndRoom);
API.createProduct = ApiRequest.post(baseUrl.product);
API.deleteProduct = ApiRequest.delete(baseUrl.product);
API.createRoom = ApiRequest.post(baseUrl.room);
API.deleteRoom = ApiRequest.delete(baseUrl.room);
API.adminDetailRoom = ApiRequest.get(baseUrl.adminDetailRoom);
API.editRoom = ApiRequest.put(baseUrl.room);
API.editProduct = ApiRequest.put(baseUrl.product);
API.leaveRoom = ApiRequest.post(baseUrl.leaveRoom);

// KEY
API.getKey = ApiRequest.get(baseUrl.key);
API.updateKey = ApiRequest.put(baseUrl.key);
API.createKey = ApiRequest.post(baseUrl.key);

// SHIPPING
API.getShipping = ApiRequest.get(baseUrl.shipping);
API.updaetShipping = ApiRequest.put(baseUrl.shipping);
API.createShipping = ApiRequest.post(baseUrl.shipping);
API.searchCountry = ApiRequest.get(baseUrl.searchShipping);

// USERS
API.getUsers = ApiRequest.get(baseUrl.getUser);
API.deleteUser = ApiRequest.delete(baseUrl.getUser);
API.updateUser = ApiRequest.put(baseUrl.getUser);

// SET WINNER
API.setWinner = ApiRequest.post(baseUrl.setWinner);

// REPORT
API.getReportChart = ApiRequest.get(baseUrl.reportChart);

// ORDER
API.updateStatusOrder = ApiRequest.post(baseUrl.updateStatusOrder);
API.getListBidder = ApiRequest.get(baseUrl.listBidder);
API.getLastwinner = ApiRequest.get(baseUrl.lastwinner);

API.getCountries = ApiRequest.get(baseUrl.countries);

export default API;
