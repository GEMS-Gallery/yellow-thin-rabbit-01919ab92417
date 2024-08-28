import Char "mo:base/Char";
import Hash "mo:base/Hash";
import Int "mo:base/Int";

import Text "mo:base/Text";
import Array "mo:base/Array";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";

actor {
  // Types
  type Character = {
    name: Text;
    description: ?Text;
  };

  type Tip = {
    content: Text;
    author: ?Text;
  };

  type Macro = {
    name: Text;
    content: Text;
    description: ?Text;
  };

  // Stable variables
  stable var generalInfo: Text = "The Shaman class in World of Warcraft is a versatile hybrid that can specialize in healing, melee damage, or ranged magical damage.";

  stable var characters: [Character] = [
    { name = "Thrall"; description = ?"Former Warchief of the Horde and one of the most powerful shamans in Azeroth's history." },
    { name = "Drek'Thar"; description = ?"Legendary Frostwolf clan shaman and mentor to Thrall." },
  ];

  stable var tips: [Tip] = [
    { content = "Use Earth Shield on the tank for efficient healing."; author = ?"ShamanMaster" },
    { content = "Chain Lightning is great for AoE damage in dungeons."; author = null },
  ];

  stable var macros: [Macro] = [
    {
      name = "Interrupt";
      content = "/cast [target=mouseover,exists,harm][] Wind Shear";
      description = ?"Quickly interrupt spells using mouseover targeting."
    },
    {
      name = "Healing Rain";
      content = "/cast [@cursor] Healing Rain";
      description = ?"Cast Healing Rain at your cursor location for quick placement."
    },
  ];

  // Query functions
  public query func getGeneralInfo() : async Text {
    generalInfo
  };

  public query func getCharacters() : async [Character] {
    characters
  };

  public query func getTips() : async [Tip] {
    tips
  };

  public query func getMacros() : async [Macro] {
    macros
  };
}
