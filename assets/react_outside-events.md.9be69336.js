import{_ as e,o as s,c as t,N as a}from"./chunks/framework.c6f03c5f.js";const F=JSON.parse('{"title":"Outside Events","description":"","frontmatter":{},"headers":[],"relativePath":"react/outside-events.md","lastUpdated":1694038825000}'),n={name:"react/outside-events.md"},o=a(`<h1 id="outside-events" tabindex="-1">Outside Events <a class="header-anchor" href="#outside-events" aria-label="Permalink to &quot;Outside Events&quot;">​</a></h1><p>This set of utilities is meant to track when a user takes an action outside of a given element.</p><p>For example, if you want to check when a user is clicking outside of the currently focused element, you&#39;d use <code>onOutsideClick</code></p><p>They&#39;re all based on the <a href="./onOutsideEvent.ts">onOutsideEvent</a> code, which will provide a good baseline for someone to read</p><h2 id="event-listeners" tabindex="-1">Event Listeners <a class="header-anchor" href="#event-listeners" aria-label="Permalink to &quot;Event Listeners&quot;">​</a></h2><table><thead><tr><th>File</th><th>Function</th></tr></thead><tbody><tr><td><code>useOutsideClick</code></td><td><code>useOutsideClick</code></td></tr><tr><td><code>useOutsideFocus</code></td><td><code>useOutsideFocus</code></td></tr></tbody></table><p>Both of these functions take three parameters:</p><ol><li><code>parentRef</code>: A reference to the element from a <code>React.createRef</code> or <code>useRef</code></li><li><code>enable</code>: A boolean to enable/disable the listener</li><li><code>onOutsideEvent</code>: A function to run when the outside event is ran</li></ol><p>So, for example, you could find yourself with the following code:</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> El </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">ref</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useRef</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// This will always run becuase of the \`true\`. You may want to disable</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// the event listener in some cases, if so then just change \`true\` to</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// a changing boolean value</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">useOutsideClick</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">ref</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">The user has clicked outside of the div</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">ref</span><span style="color:#89DDFF;">={</span><span style="color:#BABED8;">ref</span><span style="color:#89DDFF;">} /&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><h2 id="base-event-listener" tabindex="-1">Base Event Listener <a class="header-anchor" href="#base-event-listener" aria-label="Permalink to &quot;Base Event Listener&quot;">​</a></h2><p>If you find yourself needing an event listener from outside of what&#39;s been created, you&#39;re able to extend the base code that both of those functions base off of</p><table><thead><tr><th>File</th><th>Function</th></tr></thead><tbody><tr><td><code>useOutsideEvent</code></td><td><code>useOutsideEvent</code></td></tr></tbody></table><p>This base hook takes two parameters:</p><ol><li><code>eventName</code>: The name of the event in a string for the <code>document.addEventListener</code> to attach to</li><li><code>params</code>: An array of the three parameters listed for the above usage</li></ol><p>If you read through the code for any of the hooks that extend the base hook, you&#39;ll see that writing your own is rather trivial</p>`,16),l=[o];function p(c,r,i,d,y,h){return s(),t("div",null,l)}const D=e(n,[["render",p]]);export{F as __pageData,D as default};
