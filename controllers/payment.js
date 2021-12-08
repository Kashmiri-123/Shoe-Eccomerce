const express = require('express');
const Razorpay = require('razorpay');

var RazorpayConfig = {
    key_id: 'rzp_test_9lmHAgAQ3qqVM7',
    key_secret: 'gn4GTgrrKhDWASWMsYUvS7Tx',
};

var instance = new Razorpay(RazorpayConfig);

module.exports.config = RazorpayConfig;
module.exports.instance = instance;

// exports.makePayment = (req,res) => {
//     const amount = req.body.totalAmount;

//     var options = {
//         amount: amount,  // amount in the smallest currency unit
//         currency: "INR",
//         receipt: "order_rcptid_11"
//       };
//       instance.orders.create(options, function(err, order) {
//         console.log(order);
//         res.send({orderId: order.id})
//       });
// }