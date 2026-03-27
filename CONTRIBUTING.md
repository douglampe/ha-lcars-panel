# Contributing

## Quick Start

```bash
git clone https://github.com/douglampe/ha-lcars-panel.git
cd ha-lcars-panel
yarn
./build.sh
./start-ha.sh
yarn dev
```

Launch home assistant at [localhost:8123](http://localhost:8123) and complete the setup process.

Register dasbhaord resources:

- `/local/ha-lcars-panel.js`
- `/local/ha-lcars-panel.css`

```yaml
views:
  - type: panel
    path: api
    title: LCARS
    cards:
      - type: custom:ha-lcars-panel
        children:
          - type: pill
            text: Hello LCARS!
```

## Initial Setup

### Node.js

Node.js is required to build the source code. We recommend
[NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) to simplify running different node
versions.

### VS Code

We recommend [Visual Studio Code](https://code.visualstudio.com/download) for development.

### Docker

Running Home Assistant locally is recommended for development. We have configuration and scripts to make this easy
using [Docker](https://docs.docker.com/engine/install/).

### Development Environment Setup

```bash
# Clone the repository
git clone https://github.com/douglampe/ha-lcars-panel.git
# Navigate to the code folder
cd ha-lcars-panel
# Install dependencies
yarn
# Build and copy files to Home Assistant www folder
./build.sh
# Start Home Assistant
./start-ha.sh
yarn dev
```

### Initial Home Assistant Setup

Launch home assistant at [localhost:8123](http://localhost:8123) and complete the setup process.

- Navigate to Settings->Dashboards
- Select "Resources" from the top-right menu
- Click "ADD RESOURCE"
- Add `/local/ha-lcars-panel.js` (Leave JavaScript module selected)
- Click "ADD RESOURCE"
- Add `/local/ha-lcars-panel.css` (Leave Stylesheet selected)

### Creating a Test Dashboard

- Navitate to Settings->Dashboards
- Click "ADD DASHBOARD"
- Select "New dashboard from scratch"
- Enter "LCARS" (Or whatever your prefer) as the Title and click "CREATE"
- Navigate to the dashboard created above
- Clicke the pencil icon in the top-right to edit the dashboard
- Slect "Raw configuration editor" from the top-right menu
- Enter the following minimum configuration to get started:

## Components

To add a new commponent:

- Create a new Vue 3 component using the Coposition API in the `src/components` folder.
- Add an `import` for the component to `src/ComponentRegsitry.ts`.
- Add a call to `registerComponent` with the `type` and name of your component.

After building (`./build.sh`) you may need to force Home Assistant to reload of the resources by adding a umique suffix
such as `?=1` to the resource URL.
