import dotProp from 'dot-prop'
import cloneDeep from 'lodash.clonedeep'

export default class Config {
  private initialState: object
  private state: object

  constructor(state: object = {}) {
    this.state = cloneDeep(state)
    this.initialState = cloneDeep(state)
  }

  public get(key: string, defaultValue = null): any {
    return dotProp.get(this.state, key, defaultValue)
  }

  public set(key: string, value: any): void {
    dotProp.set(this.state, key, value)
  }

  public reset(): void {
    this.state = cloneDeep(this.initialState)
  }
}
