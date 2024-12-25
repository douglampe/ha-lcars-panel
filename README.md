# LCARS For Home Assistant
Inspired by the iconic Star Trek user interface, LCARS for Home Assistant is intended to provide an LCARS-like dashboard experience for home assistant.

## Installation for Home Assistant

- Download `ha-lcars-panel-v#.#.#.js` and `ha-lcars-panel-v#.#.#.css` from the latest [release](https://github.com/douglampe/ha-lcars-panel/releases).
- Copy both files to the `/config/www` folder of your Home Assistant installation.
- Add `/local/ha-lcars-panel-v#.#.#.js` and `/local/ha-lcars-panel-v#.#.#.css` as resources under Settings->Dashboards->Resources

## Configuration

The best way to learn how to use this LCARS system is through this [interactive demo](https://douglampe.github.io/ha-lcars-panel/).

If you'd prefer to jump right in, you can find sample configurations (including the configuration for the interactive demo) [here](https://github.com/douglampe/ha-lcars-panel/tree/main/src/assets/config).

## Acknowledgements

Inspired by this [LCARS Home Assistant Theme](https://github.com/th3jesta/ha-lcars),
and this [LCARS HTML/CSS Framework](https://github.com/joernweissenborn/lcars). [LCARS UI](https://github.com/louh/lcars) encouraged me to use Vue instead of vanilla JavaScript. Thanks to
[HA Lovelace Connector](https://github.com/iva-stolnik/vue-ha-lovelace-connector) for cracking the code on wrapping a
Vue SFC as a custom component. Shout out to [Name That Color](https://chir.ag/projects/name-that-color/) for helping
give a name to colors I grabbed from various samples and for linking to [Colblindor](https://www.color-blindness.com/color-name-hue/)
which provided the list of available colors. Thanks to [LCARS Anomations](https://youtube.com/playlist?list=PLah0JzbIlDe8vDgRiKqmX7yTxDFh4yEYA&si=UuGOlyX1Z4b-LT1n) on YouTube for inspiration for components and demos.
