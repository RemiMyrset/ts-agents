// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(
  {},
  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
    },
  },
)
