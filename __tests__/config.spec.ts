import Config from '../lib/config'

describe('config', () => {
  it('gets and sets keys with values ', () => {
    const config = new Config()
    expect(config.get('some-key')).toBeNull()
    config.set('some-key', 'a value')
    expect(config.get('some-key')).toEqual('a value')
  })

  it('can get a default value if a key is not set', () => {
    const config = new Config()
    expect(config.get('unset-key', 'default')).toEqual('default')
  })

  it('supports dot notation for keys to get and set nested values', () => {
    const config = new Config()
    config.set('first', { second: 'value' })
    expect(config.get('first.second')).toEqual('value')
    config.set('first.second', 'new value')
    expect(config.get('first')).toEqual({ second: 'new value' })
  })

  it('accepts a set of initial values in the constructor', () => {
    const config = new Config({ 'initial-key': 'initial value' })

    expect(config.get('initial-key')).toEqual('initial value')
  })

  it('can be reset to intiial values', () => {
    const config = new Config({
      'some-key': 'some value',
      'another-key': { 'nested-key': 'nested value' }
    })

    config.set('some-key', 'another value')
    expect(config.get('some-key')).toEqual('another value')
    config.reset()
    expect(config.get('some-key')).toEqual('some value')

    config.set('another-key.nested-key', 'foo')
    expect(config.get('another-key')).toEqual({ 'nested-key': 'foo' })
    config.reset()
    expect(config.get('another-key')).toEqual({ 'nested-key': 'nested value' })
  })
})
