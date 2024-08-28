import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Character { 'name' : string, 'description' : [] | [string] }
export interface Macro {
  'content' : string,
  'name' : string,
  'description' : [] | [string],
}
export interface Tip { 'content' : string, 'author' : [] | [string] }
export interface _SERVICE {
  'getCharacters' : ActorMethod<[], Array<Character>>,
  'getGeneralInfo' : ActorMethod<[], string>,
  'getMacros' : ActorMethod<[], Array<Macro>>,
  'getTips' : ActorMethod<[], Array<Tip>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
