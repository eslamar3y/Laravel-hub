// Laravel Horizon
const PACKAGES = [
  {
    id:'horizon', name:'Laravel Horizon', icon:'🔭', theme:'theme-blue',
    subtitle:'laravel/horizon', category:'Queues',
    desc:'Dashboard احترافي لمراقبة وإدارة Redis Queues — Jobs، Metrics، Retries.',
    tags:['Queues','Redis','Monitoring','Jobs'],
    tutorial: {
      sections: [
        { title:'ما هو Laravel Horizon؟', content:`<p class="tut-p">Horizon بيوفر Dashboard جميل لمراقبة الـ Jobs والـ Queues على Redis. بتشوف كل حاجة — المنتظرة، الشغالة، الفاشلة، والـ Metrics.</p><div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require laravel/horizon
php artisan horizon:install
php artisan migrate</pre></div><div class="alert alert-info"><div class="alert-icon">ℹ️</div><div>Horizon بيشتغل مع Redis فقط كـ Queue Driver.</div></div>` },
        { title:'الإعداد والتشغيل', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># تشغيل Horizon</span>
php artisan horizon

<span class="cm"># في Production — استخدم Supervisor</span>
php artisan horizon:pause
php artisan horizon:continue
php artisan horizon:terminate</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">config/horizon.php</span></div><pre class="code"><span class="str">'environments'</span> => [
    <span class="str">'production'</span> => [
        <span class="str">'supervisor-1'</span> => [
            <span class="str">'maxProcesses'</span>  => <span class="num">10</span>,
            <span class="str">'balanceMaxShift'</span> => <span class="num">1</span>,
            <span class="str">'balanceCooldown'</span> => <span class="num">3</span>,
        ],
    ],
    <span class="str">'local'</span> => [
        <span class="str">'supervisor-1'</span> => [<span class="str">'maxProcesses'</span> => <span class="num">3</span>],
    ],
],</pre></div>` },
        { title:'حماية الـ Dashboard', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">app/Providers/HorizonServiceProvider.php</span></div><pre class="code"><span class="kw">protected function</span> <span class="fn">gate</span>()
{
    <span class="cls">Gate</span>::<span class="fn">define</span>(<span class="str">'viewHorizon'</span>, <span class="kw">function</span>(<span class="var">$user</span>) {
        <span class="kw">return</span> <span class="fn">in_array</span>(<span class="var">$user</span>->email, [
            <span class="str">'admin@example.com'</span>,
        ]);
    });
}</pre></div>` }
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Laravel Horizon وما الفرق بينه وبين queue:work؟', a:`<ul><li><code>queue:work</code> — يشغل jobs بدون monitoring</li><li><code>horizon</code> — يشغل jobs مع Dashboard، Metrics، Auto-scaling، Failure tracking</li></ul><p>Horizon مبني فوق Redis ويوفر visibility كاملة على كل الـ Jobs.</p>` },
      { level:'medium', q:'إزاي بتعمل Auto-Scaling للـ Workers في Horizon؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="str">'supervisor-1'</span> => [
    <span class="str">'balance'</span>         => <span class="str">'auto'</span>, <span class="cm">// auto scaling</span>
    <span class="str">'minProcesses'</span>    => <span class="num">1</span>,
    <span class="str">'maxProcesses'</span>    => <span class="num">20</span>,
    <span class="str">'balanceMaxShift'</span> => <span class="num">1</span>,  <span class="cm">// أقصى تغيير في مرة</span>
    <span class="str">'balanceCooldown'</span> => <span class="num">3</span>,  <span class="cm">// ثواني بين كل scale</span>
],</pre></div>` },
      { level:'hard', q:'إزاي بتحمي Dashboard من الوصول غير المصرح؟', a:`<p>بتعرّف Gate اسمها <code>viewHorizon</code> في الـ HorizonServiceProvider:</p><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cls">Gate</span>::<span class="fn">define</span>(<span class="str">'viewHorizon'</span>, <span class="kw">function</span>(<span class="var">$user</span>) {
    <span class="kw">return</span> <span class="var">$user</span>-><span class="fn">hasRole</span>(<span class="str">'admin'</span>);
});</pre></div>` },
      { level:'medium', q:'إزاي بتعمل Notification لما Job تفشل كتير؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cls">Horizon</span>::<span class="fn">routeMailNotificationsTo</span>(<span class="str">'admin@example.com'</span>);
<span class="cls">Horizon</span>::<span class="fn">routeSlackNotificationsTo</span>(<span class="str">'slack-webhook-url'</span>);
<span class="cls">Horizon</span>::<span class="fn">routeSmsNotificationsTo</span>(<span class="str">'01234567890'</span>);</pre></div>` },
    ]
  },

  // ==================== TELESCOPE ====================
];
