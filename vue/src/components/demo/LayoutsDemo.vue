<script setup lang="ts">
import { haConfig, showDemo } from '../../HAConfig'

const subs = [
  {
    class: 'lcars-vw',
    desc: 'width = 100% of the viewport width',
  },
  {
    class: 'lcars-vh',
    desc: 'height = 100% of the viewport width',
  },
  {
    class: 'lcars-vmax',
    desc: 'height and widht both = 100% of the viewport',
  },
  {
    class: 'lcars-wmax',
    desc: 'width = 100%',
  },
  {
    class: 'lcars-hmax',
    desc: 'height = 100%',
  },
  {
    class: 'lcars-max',
    desc: 'width and height both = 100%',
  },
  {
    class: 'lcars-sq-vmax',
    desc: 'square with width and height both = 100% of the viewport maximum dimension',
  },
  {
    class: 'lcars-sq-vmin',
    desc: 'square with width and height both = 100% of the viewport minimum dimension',
  },
]
</script>
<template>
  <div class="lcars-wmax">
    <div
      v-if="haConfig.demo?.sub"
      class="lcars-border lcars-w-1 lcars-code"
      :class="haConfig.demo.sub"
    >
      {{ haConfig.demo.sub }}
      <span class="lcars-element button rounded" @click="showDemo({ main: 'layout' })">Close</span>
    </div>
    <div v-if="!haConfig.demo?.sub" class="lcars-font-2">
      <h1>Layout</h1>
      <h2>Unit</h2>
      <p>
        The layout system is intended to follow the law of least astonishment. The size of each
        element is calculated in terms of the "LCARS UNIT". This is set by the CSS variable
        <code>--lcars-unit</code> which has a default value of <code>50px</code>. Here is a 1-unit
        square:
        <span
          class="lcars-golden-tanoi-bg"
          style="
            display: inline-block;
            vertical-align: text-top;
            width: var(--lcars-unit);
            height: var(--lcars-unit);
          "
        ></span>
      </p>
      <h2>Top-Level Containers</h2>
      <p>
        The <code>lcars-wrapper</code> class sets the background color to
        <code>var(--lcars-color-default-bg)</code> (black by default), sets the text color to
        <code>var(--lcars-color-default-text)</code>, sets the default font to an LCARS-friendly
        font, and sets <code>text-transform</code> to <code>uppercase</code>. This class also causes
        changes to the default behavior certain elements which are covered in other secctions of
        this demo.
      </p>
      <p>
        While most of the layout system is based on the "unit", we recognize that you might want to
        start with a top-level container that is the size of the viewport or 100% of the available
        height. The below classes are available
      </p>
      <table class="lcars-table lcars-margin-1">
        <tr v-for="sub in subs" :key="sub.class">
          <td class="lcars-code">{{ sub.class }}</td>
          <td>{{ sub.desc }}</td>
          <td>
            <div
              class="lcars-element button rounded lcars-margin-1"
              @click="showDemo({ main: 'layout', sub: sub.class, fullScreen: true })"
            >
              Demo
            </div>
          </td>
        </tr>
      </table>
      <h2>Borders</h2>
      <p>
        Most layout elements have margins and padding set to 0 by default. You can add padding and
        margins using the helper classes
        <code>lcars-pad-1</code> through
        <code>lcars-pad-10</code>
        and
        <code>lcars-margin-1</code> through <code>lcars-margin-10</code> to add padding or margin
        respectively with a multiple of <code>var(--lcars-gap-small)</code> which defaults to 1/10
        of a unit.
      </p>
      <p>
        While the LCARS interface does not typically apply borders to elements, borders are helpful
        for troubleshooting layout issues. The <code>lcars-border</code> class applies a 1-pixel
        border using the default color (<code>var(--lcars-color-default)</code>).
      </p>
      <h2>Grid System</h2>
      <p>
        Like many other popular layout systems, our supports the Flexbox layout. Unlike layout
        systems such as Bootstrap which are based on percentage of screen size, our system is based
        on units. This allows you to layout LCARS elements such as bars and elbows in a manner that
        ensures proportions remain correct regardless of screen size. The default cell size for the
        grid is 3 units wide (<code>var(--lcars-cell-width)</code>) by 2 units high
        (<code>var(--lcars-cell-height)</code>). We have helper classes for cell width and height
        ranging from 1 to 12 cells. Use class
        <code>.lcars-w-1</code> through
        <code>.lcars-w-12</code>
        to set the width and <code>.lcars-h-1</code> through <code>.lcars-h-12</code> to set the
        height. Use <code>lcars-row</code> and <code>lcars-column</code> to set the flex direction.
        Below are some examples:
      </p>
      <div class="lcars-row lcars-w-12">
        <div
          v-for="n in 6"
          :key="n"
          class="lcars-border lcars-w-1 lcars-code lcars-pad-0 lcars-margin-0"
        >
          lcars-w-1
        </div>
        <div
          v-for="n in 3"
          :key="n"
          class="lcars-border lcars-w-2 lcars-code lcars-pad-0 lcars-margin-0"
        >
          lcars-w-2
        </div>
        <div
          v-for="n in 2"
          :key="n"
          class="lcars-border lcars-w-3 lcars-code lcars-pad-0 lcars-margin-0"
        >
          lcars-w-3
        </div>
        <div class="lcars-border lcars-w-4 lcars-code lcars-pad-0 lcars-margin-0">lcars-w-4</div>
        <div class="lcars-border lcars-w-2 lcars-code lcars-pad-0 lcars-margin-0">lcars-w-1</div>
        <div class="lcars-column lcars-h-6">
          <div
            v-for="n in 6"
            :key="n"
            class="lcars-border lcars-h-1 lcars-code lcars-pad-0 lcars-margin-0"
          >
            lcars-h-1
          </div>
          <div
            v-for="n in 3"
            :key="n"
            class="lcars-border lcars-h-2 lcars-code lcars-pad-0 lcars-margin-0"
          >
            lcars-h-2
          </div>
          <div
            v-for="n in 2"
            :key="n"
            class="lcars-border lcars-h-3 lcars-code lcars-pad-0 lcars-margin-0"
          >
            lcars-h-3
          </div>
          <div class="lcars-border lcars-h-4 lcars-code lcars-pad-0 lcars-margin-0">lcars-h-4</div>
          <div class="lcars-border lcars-h-2 lcars-code lcars-pad-0 lcars-margin-0">lcars-h-2</div>
          <div class="lcars-border lcars-h-5 lcars-code lcars-pad-0 lcars-margin-0">lcars-h-5</div>
          <div class="lcars-border lcars-h-1 lcars-code lcars-pad-0 lcars-margin-0">lcars-h-1</div>
        </div>
      </div>
      <p>
        Adding a <code>-half</code> suffix to any of the above will add an additional half cell
        width or height. The <code>lcars-w-0-half</code> class will set the width to 1/2 of a cell
        unit.
      </p>
      <div class="lcars-pad-1 lcars-block">
        <div class="lcars-row lcars-w-9">
          <div
            v-for="n in 9"
            :key="n"
            class="lcars-border lcars-w-1 lcars-code lcars-pad-0 lcars-margin-0"
          >
            lcars-w-1
          </div>
          <div class="lcars-border lcars-w-0-half lcars-code lcars-pad-0 lcars-margin-0">
            lcars-w-0-half
          </div>
          <div class="lcars-border lcars-w-1-half lcars-code lcars-pad-0 lcars-margin-0">
            lcars-w-1-half
          </div>
          <div class="lcars-border lcars-w-2-half lcars-code lcars-pad-0 lcars-margin-0">
            lcars-w-2-half
          </div>
          <div class="lcars-border lcars-w-3-half lcars-code lcars-pad-0 lcars-margin-0">
            lcars-w-3-half
          </div>
          <div class="lcars-border lcars-w-1 lcars-code lcars-pad-0 lcars-margin-0">lcars-w-1</div>
        </div>
      </div>
      <p>
        Adding a <code>-plus</code> or <code>-minus</code> suffix to any of the cell size classes
        will add or subtract one unit additional half cell width or height. The
        <code>lcars-w-unit</code> class will set the width to one unit.
      </p>
      <div class="lcars-pad-1 lcars-block">
        <div class="lcars-row lcars-w-9">
          <div
            v-for="n in 9"
            :key="n"
            class="lcars-border lcars-w-1 lcars-code lcars-pad-0 lcars-margin-0"
          >
            lcars-w-1
          </div>
          <div class="lcars-border lcars-w-1-plus lcars-code lcars-pad-0 lcars-margin-0">
            lcars-w-1-plus
          </div>
          <div class="lcars-border lcars-w-1-minus lcars-code lcars-pad-0 lcars-margin-0">
            lcars-w-1-minus
          </div>
          <div class="lcars-border lcars-w-2-plus lcars-code lcars-pad-0 lcars-margin-0">
            lcars-w-2-plus
          </div>
          <div class="lcars-border lcars-w-2-minus lcars-code lcars-pad-0 lcars-margin-0">
            lcars-w-2-minus
          </div>
          <div class="lcars-border lcars-w-3-minus lcars-code lcars-pad-0 lcars-margin-0">
            lcars-w-3-minus
          </div>
          <div class="lcars-border lcars-w-unit lcars-code lcars-pad-0 lcars-margin-0">
            lcars-w-unit
          </div>
        </div>
      </div>
      <p>
        By default, there is no margin or padding in layout elements. To add a small gap between the
        children of a row or column, add a <code>gap</code> class to add a 1/5 unit margin or use
        <code>gap-small</code> to add a 1/10 unit margin.
      </p>
      <div class="lcars-column">
        <div class="lcars-row gap">
          <div class="lcars-bar horizontal lcars-w-1"></div>
          <div class="lcars-bar horizontal lcars-w-1"></div>
          <div class="lcars-bar horizontal lcars-w-1"></div>
        </div>
        <p></p>
        <div class="lcars-row gap-small">
          <div class="lcars-bar horizontal lcars-w-1"></div>
          <div class="lcars-bar horizontal lcars-w-1"></div>
          <div class="lcars-bar horizontal lcars-w-1"></div>
        </div>
      </div>
      <p></p>
      <div class="lcars-column gap">
        <div class="lcars-bar lcars-w-1"></div>
        <div class="lcars-bar lcars-w-1"></div>
        <div class="lcars-bar lcars-w-1"></div>
      </div>
      <p></p>
      <div class="lcars-column gap-small">
        <div class="lcars-bar lcars-w-1"></div>
        <div class="lcars-bar lcars-w-1"></div>
        <div class="lcars-bar lcars-w-1"></div>
      </div>
    </div>
  </div>
</template>
