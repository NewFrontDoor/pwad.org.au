const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Payment = new keystone.List('Payment');

Payment.add({
  paymentIntent: {type: Types.Text, hidden: true},
  user: {type: Types.Relationship, ref: 'User', initial: true, required: true},
  paymentUrl: {type: Types.Url, noedit: true}
});

Payment.schema.pre('save', function(next) {
  if (this.paymentIntent) {
    this.paymentUrl = `https://dashboard.stripe.com/test/payments/${this.paymentIntent}`;
  }

  return next();
});

transform.toJSON(Payment);
Payment.defaultColumns = 'user';
Payment.register();
