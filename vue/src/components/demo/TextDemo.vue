<script setup lang="ts">
import { showDemo } from '../../HAConfig'
</script>
<template>
  <div class="lcars-wmax">
    <h1>Text</h1>
    <p>
      As discussed in the <a href="#" @click="showDemo({ main: 'layout' })">Layouts</a> demo, the
      <code>lcars-wrapper</code> applies some default styles. Many of these apply to text.
    </p>
    <h2>Links</h2>
    <p>
      All links (<code>&lt;a&gt;</code> tag) like
      <a href="#" @click="showDemo({ main: 'none' })">this one</a> have
      <code>text-decoration</code> set to <code>none</code> to remove the underline, removes any
      margin or padding, and the color is set to <code>var(--lcars-color-default)</code>.
    </p>
    <h2>Paragraphs</h2>
    <p>
      Paragraphs (<code>&lt;p&gt;</code> tag) always display as <code>block</code> and disable flex
      layout. The font-size is set to 1/2 unit, and the margin is set to
      <code>var(--lcars-gap-small)</code>.
    </p>
    <h2>Code</h2>
    <p>
      Code samples are typically displayed using <code>&lt;code&gt;</code> tags for inline code
      (like the one in this sentence) and <code>&lt;pre&gt;</code> tags for block content. An
      example using the pre tag is below.
    </p>
    <div class="lcars-margin-1">
      <pre>
This is some multi-line
text that shows how the &lt;pre&gt;
tag behaves.</pre
      >
    </div>
    <h2>Font Sizes</h2>
    <p>
      Set the font size using the classes <code>lcars-font-1</code> through
      <code>lcars-font-6</code> where each size represents 1/4 of a unit
    </p>
    <ul>
      <li><span class="lcars-font-1">lcars-font-1</span></li>
      <li><span class="lcars-font-2">lcars-font-2</span></li>
      <li><span class="lcars-font-3">lcars-font-3</span></li>
      <li><span class="lcars-font-4">lcars-font-4</span></li>
      <li><span class="lcars-font-5">lcars-font-5</span></li>
      <li><span class="lcars-font-6">lcars-font-6</span></li>
    </ul>
    <h2>Headings</h2>
    <p>
      All heading tags (<code>h1</code> through <code>h6</code>) are displayed as bars with a height
      of one unit and text righ-justified (like you have seen in these demos). The colors cycle
      through the numbered colors (<code>var(--lcars-color-1)</code> through
      <code>var(--lcars-color-6)</code>) as shown below.
    </p>
    >
    <h1>h1</h1>
    <h2>h2</h2>
    <h3>h3</h3>
    <h4>h4</h4>
    <h5>h5</h5>
    <h6>h6</h6>
  </div>
</template>
