// Laravel Pennant
const PACKAGES = [
  {
    id:'pennant', name:'Laravel Pennant', icon:'🚩', theme:'theme-green',
    subtitle:'laravel/pennant', category:'Feature Flags',
    desc:'Feature Flags لـ Laravel — فعّل/عطّل Features بشكل انتقائي لمجموعات مستخدمين.',
    tags:['Features','Flags','A/B Testing','Rollout'],
    tutorial: {
      sections: [
        { title:'ما هو Pennant؟', content:`<p class="tut-p">Pennant هو نظام Feature Flags الرسمي لـ Laravel. بيخليك تفعّل Features لمجموعة مستخدمين بدون ما تعمل Deploy جديد.</p>` },
        { title:'التثبيت وإنشاء Feature', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require laravel/pennant
php artisan vendor:publish --tag="pennant-migrations"
php artisan migrate</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">AppServiceProvider.php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Pennant\\Feature</span>;

<span class="cls">Feature</span>::<span class="fn">define</span>(<span class="str">'new-dashboard'</span>, <span class="kw">function</span>(<span class="cls">User</span> <span class="var">$user</span>) {
    <span class="cm">// فعّله لـ Beta Users فقط</span>
    <span class="kw">return</span> <span class="var">$user</span>->is_beta;
});

<span class="cm">// أو نسبة مئوية (Canary Release)</span>
<span class="cls">Feature</span>::<span class="fn">define</span>(<span class="str">'new-checkout'</span>, <span class="cls">Lottery</span>::<span class="fn">odds</span>(<span class="num">1</span>, <span class="num">10</span>)); <span class="cm">// 10% من المستخدمين</span></pre></div>` },
        { title:'استخدام Features في الكود', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// في PHP</span>
<span class="kw">if</span> (<span class="cls">Feature</span>::<span class="fn">active</span>(<span class="str">'new-dashboard'</span>)) {
    <span class="kw">return</span> <span class="fn">view</span>(<span class="str">'dashboard-v2'</span>);
}

<span class="cm">// في Blade</span>
@feature('new-dashboard')
    &lt;!-- New Dashboard --&gt;
@else
    &lt;!-- Old Dashboard --&gt;
@endfeature

<span class="cm">// لمستخدم معين</span>
<span class="cls">Feature</span>::<span class="fn">for</span>(<span class="var">$user</span>)-><span class="fn">active</span>(<span class="str">'new-dashboard'</span>);

<span class="cm">// تفعيل/تعطيل يدوي</span>
<span class="cls">Feature</span>::<span class="fn">activate</span>(<span class="str">'new-dashboard'</span>);
<span class="cls">Feature</span>::<span class="fn">deactivate</span>(<span class="str">'new-dashboard'</span>);</pre></div>` }
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Pennant وإيه استخداماته؟', a:`<p>Pennant هو Feature Flags system. بيُستخدم في:</p><ul><li><strong>Canary Releases</strong> — تجربة Feature على 10% من المستخدمين</li><li><strong>A/B Testing</strong> — مقارنة نسختين</li><li><strong>Beta Programs</strong> — إتاحة Features للـ Beta Users فقط</li><li><strong>Emergency Rollback</strong> — تعطيل Feature بشكل فوري</li></ul>` },
      { level:'medium', q:'إزاي بتعمل Gradual Rollout بـ Pennant؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Pennant\\Feature</span>;

<span class="cm">// 1% الأسبوع الأول، 10% الثاني، 100% الثالث</span>
<span class="cls">Feature</span>::<span class="fn">define</span>(<span class="str">'new-payment'</span>, <span class="kw">function</span>(<span class="cls">User</span> <span class="var">$user</span>) {
    <span class="kw">return</span> <span class="cls">Lottery</span>::<span class="fn">odds</span>(<span class="num">1</span>, <span class="num">100</span>);
});</pre></div>` },
    ]
  },

  // ==================== DUSK ====================
];
