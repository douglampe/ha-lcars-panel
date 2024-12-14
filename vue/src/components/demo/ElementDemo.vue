<template>
  <h1>Visual Elements</h1>
  <h2>Bars</h2>
  <p>
    Bars are common visual elements in LCARS. Bars can be created with the
    <code>lcars-bar</code> class and by default they fill the available space. The example below is
    sized to one cell (<code>lcars-w-1</code>)
  </p>
  <div class="lcars-bar lcars-w-1"></div>
  <p>To make a bar one unit high, add a <code>horizontal</code> class:</p>
  <div class="lcars-bar horizontal lcars-w-1"></div>
  <p>
    To draw a rounded end, add another <code>div</code> with <code>left-end</code> or
    <code>right-end</code>.
  </p>
  <div class="lcars-column">
    <div class="lcars-bar left-end"></div>
    <div class="lcars-bar right-end"></div>
  </div>
  <p>
    You can add decorators to bars by adding a <code>decorator</code> class in addition to
    <code>left-end</code> or <code>right-end</code>
  </p>
  <div class="lcars-column">
    <div class="lcars-row">
      <div class="lcars-bar left-end decorated lcars-color-3-bg"></div>
      <div class="lcars-bar horizontal lcars-w-1 lcars-color-3-bg"></div>
    </div>
    <div class="lcars-bar right-end decorated"></div>
  </div>
  <h2>Elbows</h2>
  <p>Elbows are bendy bits.</p>
  <div class="lcars-column">
    <div class="lcars-row">
      <div class="lcars-elbow right-bottom lcars-w-1"></div>
      <div class="lcars-elbow left-bottom lcars-w-1"></div>
    </div>
    <div class="lcars-row">
      <div class="lcars-elbow right-top lcars-w-1"></div>
      <div class="lcars-elbow left-top lcars-w-1"></div>
    </div>
  </div>
  <div class="lcars-column gap">
    <div class="lcars-row gap">
      <div class="lcars-elbow right-bottom lcars-w-1"></div>
      <div class="lcars-elbow left-bottom lcars-w-1"></div>
    </div>
    <div class="lcars-row gap">
      <div class="lcars-elbow right-top lcars-w-1"></div>
      <div class="lcars-elbow left-top lcars-w-1"></div>
    </div>
  </div>
  <div class="lcars-column gap-small">
    <div class="lcars-row gap-small">
      <div class="lcars-elbow right-bottom lcars-w-1"></div>
      <div class="lcars-elbow left-bottom lcars-w-1"></div>
    </div>
    <div class="lcars-row gap-small">
      <div class="lcars-elbow right-top lcars-w-1"></div>
      <div class="lcars-elbow left-top lcars-w-1"></div>
    </div>
  </div>
  <h2>Elements</h2>
  <div class="lcars-card">
    <div class="lcars-element">lcars-element</div>
    <div class="lcars-element rounded">rounded</div>
    <div class="lcars-element button rounded">button rounded</div>
    <div class="lcars-element left-rounded">left-rounded</div>
    <div class="lcars-element right-rounded">right-rounded</div>
    <div class="lcars-element">
      lcars-element-decorator<span class="lcars-element-decorator"></span>
    </div>
    <div class="lcars-element">
      lcars-element-decorator right<span class="lcars-element-decorator right"></span>
    </div>
    <div class="lcars-element cap"></div>
  </div>
  <h2>Brackets</h2>
  <p>
    Brackets go on either side or above or below. Use <code>hollow</code> to make the bracket
    concave. Set the color of a bracket with background color (ex: <code>--lcars-color-1-bg</code>)
    but use background color to change the color of a hollow bracket(ex:
    <code>--lcars-color-1-border</code>).
  </p>
  <div class="lcars-row">
    <div class="lcars-bracket left lcars-color-3-bg"></div>
    <div class="lcars-w-3 lcars-h-3"></div>
    <div class="lcars-bracket right lcars-color-3-bg"></div>
  </div>
  <div class="lcars-row">
    <div class="lcars-bracket left hollow lcars-color-4-border"></div>
    <div class="lcars-w-3 lcars-h-3"></div>
    <div class="lcars-bracket right hollow lcars-color-4-border"></div>
  </div>
  <div class="lcars-row">
    <div class="lcars-column">
      <div class="lcars-bracket top lcars-w-3 lcars-color-5-bg"></div>
      <div class="lcars-w-3 lcars-h-3"></div>
      <div class="lcars-bracket bottom lcars-w-3 lcars-color-5-bg"></div>
    </div>
    <div class="lcars-column">
      <div class="lcars-bracket top hollow lcars-w-3 lcars-color-6-border"></div>
      <div class="lcars-w-3 lcars-h-3"></div>
      <div class="lcars-bracket bottom hollow lcars-w-3 lcars-color-6-border"></div>
    </div>
  </div>
</template>
