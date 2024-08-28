export const idlFactory = ({ IDL }) => {
  const Character = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
  });
  const Macro = IDL.Record({
    'content' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
  });
  const Tip = IDL.Record({
    'content' : IDL.Text,
    'author' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'getCharacters' : IDL.Func([], [IDL.Vec(Character)], ['query']),
    'getGeneralInfo' : IDL.Func([], [IDL.Text], ['query']),
    'getMacros' : IDL.Func([], [IDL.Vec(Macro)], ['query']),
    'getTips' : IDL.Func([], [IDL.Vec(Tip)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
