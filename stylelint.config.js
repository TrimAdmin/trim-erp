import { propertyGroups } from 'stylelint-config-clean-order'

const propertiesOrder = propertyGroups.map((properties) => ({
  noEmptyLineBetween: true,
  emptyLineBefore: 'never', // Don't add empty lines between order groups.
  properties,
}))

/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
    'stylelint-prettier/recommended',
    'stylelint-config-recommended-vue/scss',
  ],
  rules: {
    'block-no-empty': true,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'order/properties-order': [
      propertiesOrder,
      {
        severity: 'warning',
        unspecified: 'bottomAlphabetical',
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'use', 'each'],
      },
    ],
  },
}
