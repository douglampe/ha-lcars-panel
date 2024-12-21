# LCARS For Home Assistant

Inspired by the iconic Star Trek user interface, this [LCARS Home Assistant Theme](https://github.com/th3jesta/ha-lcars),
and this [LCARS HTML/CSS Framework](https://github.com/joernweissenborn/lcars), LCARS for Home Assistant is intended
to provide a LCARS-like dashboard experience for home assistant. Thanks to
[HA Lovelace Connector](https://github.com/iva-stolnik/vue-ha-lovelace-connector) for cracking the code on wrapping a
Vue SFC as a custom component. Shout out to [Name That Color](https://chir.ag/projects/name-that-color/) for helping
give a name to colors I grabbed from various samples and [Colblindor](https://www.color-blindness.com/color-name-hue/)
for providing the list of available colors.

## Configuration

While the component provided by this project can be used as a custom card, it is best used as a custom panel so it
effectively completely replaces Lovelace as the dashboard.

Sample Configuration can be found in `src/assets/config/test.yaml`
