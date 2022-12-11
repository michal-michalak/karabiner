// @ts-ignore
import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, printEmoji } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      // {
      //   type: "basic",
      //   description: "Disable CMD + Tab to force Hyper Key usage",
      //   from: {
      //     key_code: "tab",
      //     modifiers: {
      //       mandatory: ["left_command"],
      //     },
      //   },
      //   to: [
      //     {
      //       key_code: "tab",
      //     },
      //   ],
      // },
      // {
      //   type: "basic",
      //   description: "Slash -> Hyper Key",
      //   from: {
      //     key_code: "slash",
      //   },
      //   to: [
      //     {
      //       key_code: "left_shift",
      //       modifiers: ["left_command", "left_control", "left_option"],
      //     },
      //   ],
      //   to_if_alone: [
      //     {
      //       key_code: "slash",
      //     },
      //   ],
      // },
    ],
  },
  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      g: app("Google Chrome"),
      v: app("Visual Studio Code"),
      // d: app("Discord"),
      s: app("Slack"),
      t: app("Terminal"),
      z: app("zoom.us"),
      r: app("Telegram"),
      // "i"Message
      i: app("Messages"),
      m: app("Spotify"),
      p: app("PyCharm"),
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{key_code: "left_arrow"}],
      },
      j: {
        to: [{key_code: "down_arrow"}],
      },
      k: {
        to: [{key_code: "up_arrow"}],
      },
      l: {
        to: [{key_code: "right_arrow"}],
      },
      // Magicmove via homerow.app
      m: {
        to: [{key_code: "f", modifiers: ["right_control"]}],
      },
      // Scroll mode via homerow.app
      s: {
        to: [{key_code: "j", modifiers: ["right_control"]}],
      },
      d: {
        to: [{key_code: "d", modifiers: ["right_shift", "right_command"]}],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{key_code: "play_or_pause"}],
      },
      n: {
        to: [{key_code: "fastforward"}],
      },
      b: {
        to: [{key_code: "rewind"}],
      },
    },

    // e = Emoji
    e: {
      up_arrow: printEmoji("⬆️"),
      down_arrow: printEmoji("⬇️"),
      left_arrow: printEmoji("⬅️"),
      right_arrow: printEmoji("➡️"),
      t: printEmoji("🤔"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "michal-michalak",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
