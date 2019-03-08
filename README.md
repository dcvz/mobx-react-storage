# mobx-react-storage
A mobx-observable layer on top of the platform's storage - AsyncStorage & localstorage (soon).

## Installation
Install the mobx-react-storage package in your project.
```bash
yarn add mobx-react-storage
# or with npm
# npm install --save mobx-react-storage
```

## API
```js
export default class Storage {
  // Initialize the module & load mobx layer from storage
  static read(): Promise<any>;
  // Remove all storage items
  static clear(): Promise<void>;
  // Get an item from the store, returns an observable
  static get(key: string): any;
  // Store an item under given key
  static set(key: string, value: any): Promise<void>;
  // Store a boolean flag for the given key
  static setFlag(key: string): Promise<void>;
  // Get a boolean flag from storage, returns an observable
  static getFlag(key: string): boolean;
  // Delete a key from storage.
  static delete(key: string): Promise<void>;
}
```
