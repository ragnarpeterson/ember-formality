import Ember from 'ember';
import cancelEvent from '../utils/cancel-event';

export default Ember.Mixin.create({
  tagName: 'form',
  classNames: ['formable'],
  classNameBindings: ['isSubmitting'],
  params: null,
  isSubmitting: false,
  isPersistent: false,
  onSuccess: null,
  onFailure: null,

  generateParams() {
    return {};
  },

  execute() {
    // IMPLEMENT
  },

  didSucceed() {

  },

  didFail() {

  },

  handleSuccess(result) {
    this.didSucceed(result);
    this.sendAction('onSuccess', result);

    if (this.get('isPersistent')) {
      this.toggleSubmitting(false);
    }
  },

  handleFailure(reason) {
    this.didFail(reason);
    this.sendAction('onFailure', reason);
    this.toggleSubmitting(false);
  },

  setup: Ember.on('init', function() {
    this.set('params', this.generateParams());
  }),

  handleSubmit: Ember.on('submit', function(evt) {
    cancelEvent(evt);

    const handleSuccess = this.handleSuccess.bind(this);
    const handleFailure = this.handleFailure.bind(this);

    this.toggleSubmitting(true);
    this.execute().then(handleSuccess).catch(handleFailure);
  }),

  toggleSubmitting(value) {
    this.set('isSubmitting', value);
    this.$(':input').prop('disabled', value);
  }
});
