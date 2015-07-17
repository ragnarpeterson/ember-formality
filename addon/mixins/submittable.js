import Ember from 'ember';

export default Ember.Mixin.create({
  tagName: 'button',
  classNames: ['submit-button'],
  attributeBindings: ['type'],
  type: 'submit',
  label: null,
  isSubmitting: Ember.computed.oneWay('parentView.isSubmitting')
});
