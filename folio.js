// Laravel Folio
const PACKAGES = [
  {
    id:'folio', name:'Laravel Folio', icon:'📁', theme:'theme-green',
    subtitle:'laravel/folio', category:'Routing',
    desc:'File-based Routing — بدل Route::get() ، كل ملف Blade = Route تلقائي.',
    tags:['Routing','Blade','Pages','Convention'],
    tutorial: {
      sections: [
        { title:'ما هو Folio؟', content:`<p class="tut-p">Folio بيوفر File-based Routing لـ Laravel — زي Next.js. كل ملف Blade في مجلد <code>pages</code> بيبقى Route تلقائي.</p>` },
        { title:'التثبيت والاستخدام', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require laravel/folio
php artisan folio:install</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">text</span><span class="code-file">مجلد pages</span></div><pre class="code">pages/
├── index.blade.php         → /
├── about.blade.php         → /about
├── users/
│   ├── index.blade.php     → /users
│   ├── [id].blade.php      → /users/{id}
│   └── [User].blade.php    → /users/{user} (Route Model Binding)
└── blog/
    └── [...slug].blade.php → /blog/* (wildcard)</pre></div>` },
        { title:'Middleware وـ Route Names', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">pages/dashboard.blade.php</span></div><pre class="code"><span class="cm">&lt;?php</span>
<span class="kw">use function</span> <span class="cls">Laravel\\Folio</span>\{<span class="fn">middleware</span>, <span class="fn">name</span>};

<span class="cm">// تطبيق Middleware</span>
<span class="fn">middleware</span>([<span class="str">'auth'</span>, <span class="str">'verified'</span>]);

<span class="cm">// تسمية الـ Route</span>
<span class="fn">name</span>(<span class="str">'dashboard'</span>);
<span class="cm">?&gt;</span>

&lt;x-app-layout&gt;
    &lt;h1&gt;مرحباً، &#123;&#123; auth()-&gt;user()-&gt;name &#125;&#125;&lt;/h1&gt;
&lt;/x-app-layout&gt;</pre></div>` },
        { title:'Folio مع Volt — Components في نفس الملف', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">pages/posts/[Post].blade.php</span></div><pre class="code"><span class="cm">&lt;?php</span>
<span class="kw">use</span> <span class="cls">App\\Models\\Post</span>;
<span class="kw">use</span> <span class="cls">Livewire\\Volt\\Component</span>;
<span class="kw">use function</span> <span class="cls">Laravel\\Folio</span>\{<span class="fn">name</span>};

<span class="fn">name</span>(<span class="str">'posts.show'</span>);

<span class="kw">new class extends</span> <span class="cls">Component</span> {
    <span class="kw">public</span> <span class="cls">Post</span> <span class="var">$post</span>;

    <span class="kw">public function</span> <span class="fn">like</span>(): <span class="kw">void</span>
    {
        <span class="var">$this</span>->post-><span class="fn">increment</span>(<span class="str">'likes'</span>);
    }
};
<span class="cm">?&gt;</span>

&lt;div&gt;
    &lt;h1&gt;&#123;&#123; &#36;post-&gt;title &#125;&#125;&lt;/h1&gt;
    &lt;button wire:click="like"&gt;👍 &#123;&#123; &#36;post-&gt;likes &#125;&#125;&lt;/button&gt;
&lt;/div&gt;</pre></div>` },
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Folio وامتى تستخدمه؟', a:`<p>Folio هو File-based routing لـ Laravel. مناسب لـ:</p><ul><li>Content-heavy sites (blogs، docs، marketing)</li><li>مشاريع Blade-only بدون complexity</li><li>Rapid prototyping</li></ul><p>مش مثالي للـ APIs أو المشاريع اللي فيها logic كتير في الـ Routes.</p>` },
      { level:'easy', q:'إزاي بتعمل Dynamic Route في Folio؟', a:`<p>بتستخدم square brackets في اسم الملف:</p><ul><li><code>[id].blade.php</code> → <code>/posts/{id}</code> — parameter عادي</li><li><code>[Post].blade.php</code> → <code>/posts/{post}</code> — Route Model Binding تلقائي</li><li><code>[...slug].blade.php</code> → <code>/blog/2024/my-post</code> — wildcard</li></ul>` },
      { level:'medium', q:'إزاي بتطبق Middleware على صفحة Folio؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">&lt;?php</span>
<span class="kw">use function</span> <span class="cls">Laravel\\Folio</span>\{<span class="fn">middleware</span>};
<span class="fn">middleware</span>([<span class="str">'auth'</span>]);
<span class="cm">?&gt;</span>

&lt;!-- محتوى الصفحة --&gt;</pre></div><p>أو من خلال <code>FolioServiceProvider</code> لمجلد بأكمله:</p><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cls">Folio</span>::<span class="fn">path</span>(<span class="fn">resource_path</span>(<span class="str">'views/pages'</span>))
     -><span class="fn">middleware</span>([
         <span class="str">'admin/*'</span> => [<span class="str">'auth'</span>, <span class="str">'admin'</span>],
     ]);</pre></div>` },
      { level:'medium', q:'ما الفرق بين Folio وـ Inertia؟', a:`<table class="compare-table"><tr><th>Folio</th><th>Inertia</th></tr><tr><td>Server-side Blade Pages</td><td>SPA-like با Vue/React</td></tr><tr><td>لا يحتاج API</td><td>يحتاج JSON responses</td></tr><tr><td>SEO ممتاز بدون إعداد</td><td>يحتاج SSR للـ SEO</td></tr><tr><td>للـ Content Sites</td><td>للـ Interactive Apps</td></tr></table>` },
    ]
  },

  // ==================== BREEZE ====================
];
