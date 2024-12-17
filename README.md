# LCARS For Home Assistant

Inspired by the iconic Star Trek user interface, this [LCARS Home Assistant Theme](https://github.com/th3jesta/ha-lcars),
and this [LCARS HTML/CSS Framework](https://github.com/joernweissenborn/lcars), LCARS for Home Assistant is intended
to provide a LCARS-like dashboard experience for home assistant. Thanks to
[HA Lovelace Connector](https://github.com/iva-stolnik/vue-ha-lovelace-connector) for cracking the code on wrapping a
Vue SFC as a custom component. Shout out to [Name That Color](https://chir.ag/projects/name-that-color/) for helping
give a name to colors I grabbed from various samples.

## Configuration

While the component provided by this project can be used as a custom card, it is best used as a custom panel so it
effectively completely replaces Lovelace as the dashboard.

Sample Configuration:

```yaml
panel_custom:
  - name: lcars-custom-card
    url_path: lcars
    sidebar_title: LCARS
    sidebar_icon: si:startrek
    module_url: /local/lcars/lcars.js
    config:
      menuItems:
        - index: "01"
          title: Cartography
          color: "var(--lcars-color-chestnut-rose)"
          items:
            - type: "LCARSColumn"
              children:
                - type: "HorizontalPanel"
                  props:
                    color: "var(--lcars-color-neon-carrot)"
                  children:
                    - type: "HorizontalScale"
                      props:
                        cols: 3
                        bgColor: "var(--lcars-color-neon-carrot)"
                        color: "var(--lcars-color-anakiwa)"
                        title: Azimuth
                        entity: "sun.sun"
                        attribute: azimuth
                        min: 0
                        max: 360
                        tickInterval: 45
                        minorTickInterval: 5
                        decimalPlaces: 1
            - type: "LCARSColumn"
              children:
                - type: "VerticalPanel"
                  props:
                    color: "var(--lcars-color-dodger-blue)"
                  children:
                    - type: "HorizontalScale"
                      props:
                        cols: 3
                        bgColor: "var(--lcars-color-dodger-blue)"
                        color: "var(--lcars-color-anakiwa)"
                        title: Elevation
                        entity: "sun.sun"
                        attribute: elevation
                        min: -180
                        max: 180
                        tickInterval: 45
                        minorTickInterval: 5
                        decimalPlaces: 1
        - index: "02"
          title: Navigation
          color: "var(--lcars-color-neon-carrot)"
        - index: "03"
          title: Sensors
          color: "var(--lcars-color-periwinkle)"
        - index: "04"
          title: Communication
          color: "var(--lcars-color-dodger-blue)"
        - index: "05"
          title: Engineering
          color: "var(--lcars-color-lilac)"
        - index: "06"
          title: Holodeck
          color: "var(--lcars-color-periwinkle)"
        - index: "07"
          title: Medical
          color: "var(--lcars-color-dodger-blue)"
```
