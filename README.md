# LCARS For Home Assistant

[![HACS](https://img.shields.io/badge/HACS-default-orange.svg?style=flat-square)](https://hacs.xyz/)
[![GitHub release](https://img.shields.io/github/v/release/douglampe/ha-lcars-panel)](#)
[![GitHub release date](https://img.shields.io/github/release-date/douglampe/ha-lcars-panel)](#)
[![GitHub last commit](https://img.shields.io/github/last-commit/douglampe/ha-lcars-panel)](#)
[![getting started](https://img.shields.io/badge/getting_started-guide-1D76DB)](https://douglampe.github.io/ha-lcars-panel/)

Inspired by the iconic Star Trek user interface, LCARS for Home Assistant is intended to provide an LCARS-like dashboard experience for home assistant.

## Installation for Home Assistant

### HACS

The easiest way to install HA LCARS Panel is via HACS ([Home Assistant Community Store](https://hacs.xyz/)).

Steps:

- Ensure HACS is installed in Home Assistant.
- Go to HACS → Frontend → Custom Repositories.
- Add this repository: https://github.com/douglampe/ha-lcars-panel as type Dashboard
- Install HA LCARS Panel from HACS.
- Clear your browser cache and reload Home Assistant.

### Manual Install

- Download `ha-lcars-panel.js` and `ha-lcars-panel.css` from the latest
  [release](https://github.com/douglampe/ha-lcars-panel/releases).
- Copy both files to the `/config/www` folder of your Home Assistant installation.
- Add `/local/ha-lcars-panel.js` and `/local/ha-lcars-panelcss` as resources under Settings->Dashboards->Resources

## Configuration

The best way to learn how to use this LCARS system is through this [interactive demo](https://douglampe.github.io/ha-lcars-panel/).

If you'd prefer to jump right in, you can find sample configurations (including the configuration for the interactive demo) [here](https://github.com/douglampe/ha-lcars-panel/tree/main/src/assets/config).

## Acknowledgements

- Inspired by this [LCARS Home Assistant Theme](https://github.com/th3jesta/ha-lcars),
  and this [LCARS HTML/CSS Framework](https://github.com/joernweissenborn/lcars).
- [LCARS UI](https://github.com/louh/lcars) encouraged me to use Vue instead of vanilla JavaScript.
- Thanks to [HA Lovelace Connector](https://github.com/iva-stolnik/vue-ha-lovelace-connector) for cracking the code on
  wrapping a Vue SFC as a custom component.
- Shout out to [Name That Color](https://chir.ag/projects/name-that-color/) for helping give a name to colors I grabbed
  from various samples and for linking to [Colblindor](https://www.color-blindness.com/color-name-hue/)
  which provided the list of available colors.
- Thanks to [LCARS Anomations](https://youtube.com/playlist?list=PLah0JzbIlDe8vDgRiKqmX7yTxDFh4yEYA&si=UuGOlyX1Z4b-LT1n)
  on YouTube for inspiration for components and demos.
- Thanks to [The LCARS](https://www.thelcars.com/) for coming up with some cool themes that are supported here.
