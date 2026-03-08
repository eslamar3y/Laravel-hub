// Laravel Pulse
const PACKAGES = [
  {
    id:'pulse', name:'Laravel Pulse', icon:'💓', theme:'theme-red',
    subtitle:'laravel/pulse', category:'Monitoring',
    desc:'Real-time Performance Dashboard — Server Health، Slow Queries، User Activity.',
    tags:['Monitoring','Performance','Dashboard','Metrics'],
    tutorial: {
      sections: [
        { title:'ما هو Pulse؟', content:`<p class="tut-p">Pulse هو Performance Monitoring dashboard لـ Production — بيتابع الـ Server Health والـ Slow Queries وأنشطة المستخدمين في Real-time.</p><div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require laravel/pulse
php artisan vendor:publish --provider="Laravel\\Pulse\\PulseServiceProvider"
php artisan migrate</pre></div>` },
        { title:'الـ Cards المتاحة وإعداد الـ Dashboard', content:`<div class="feat-grid"><div class="feat-item"><div class="feat-emoji">🖥️</div><div class="feat-t">Servers</div><div class="feat-d">CPU، Memory، Disk لكل سيرفر</div></div><div class="feat-item"><div class="feat-emoji">🐌</div><div class="feat-t">Slow Queries</div><div class="feat-d">أبطأ DB Queries</div></div><div class="feat-item"><div class="feat-emoji">👤</div><div class="feat-t">User Requests</div><div class="feat-d">المستخدمين الأكثر نشاطاً</div></div><div class="feat-item"><div class="feat-emoji">❌</div><div class="feat-t">Exceptions</div><div class="feat-d">الأخطاء الأكثر تكراراً</div></div><div class="feat-item"><div class="feat-emoji">📋</div><div class="feat-t">Slow Jobs</div><div class="feat-d">الـ Jobs الأبطأ تنفيذاً</div></div><div class="feat-item"><div class="feat-emoji">🔄</div><div class="feat-t">Cache</div><div class="feat-d">نسبة الـ Cache Hits/Misses</div></div></div><div class="code-wrap"><div class="code-top"><span class="code-lang">blade</span><span class="code-file">resources/views/dashboard.blade.php</span></div><pre class="code">&lt;x-pulse&gt;
    &lt;livewire:pulse.servers      cols="full" /&gt;
    &lt;livewire:pulse.usage        cols="4" rows="2" /&gt;
    &lt;livewire:pulse.queues       cols="4" /&gt;
    &lt;livewire:pulse.cache        cols="4" /&gt;
    &lt;livewire:pulse.slow-queries cols="8" /&gt;
    &lt;livewire:pulse.exceptions   cols="6" /&gt;
    &lt;livewire:pulse.slow-jobs    cols="6" /&gt;
    &lt;livewire:pulse.slow-requests cols="6" /&gt;
&lt;/x-pulse&gt;</pre></div>` },
        { title:'تسجيل Custom Metrics', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Pulse\\Facades\\Pulse</span>;

<span class="cm">// تسجيل مبيعات — sum</span>
<span class="cls">Pulse</span>::<span class="fn">record</span>(
    type: <span class="str">'purchase'</span>,
    key: <span class="str">'revenue'</span>,
    value: <span class="var">$order</span>->total,
)-><span class="fn">sum</span>();

<span class="cm">// تسجيل عدد الطلبات — count</span>
<span class="cls">Pulse</span>::<span class="fn">record</span>(
    type: <span class="str">'api_call'</span>,
    key: <span class="str">'stripe'</span>,
    value: <span class="num">1</span>,
)-><span class="fn">count</span>();

<span class="cm">// تسجيل الحد الأقصى — max</span>
<span class="cls">Pulse</span>::<span class="fn">record</span>(
    type: <span class="str">'response_time'</span>,
    key: <span class="var">$request</span>->path(),
    value: <span class="var">$duration</span>,
)-><span class="fn">max</span>()-><span class="fn">avg</span>();</pre></div>` },
        { title:'تخصيص من يرى الـ Dashboard', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">app/Providers/AppServiceProvider.php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Pulse\\Facades\\Pulse</span>;

<span class="kw">public function</span> <span class="fn">boot</span>(): <span class="kw">void</span>
{
    <span class="cm">// تحديد من يقدر يشوف الـ Dashboard</span>
    <span class="cls">Pulse</span>::<span class="fn">authorizeUsing</span>(<span class="kw">function</span>(<span class="var">$request</span>) {
        <span class="kw">return</span> <span class="var">$request</span>-><span class="fn">user</span>()-><span class="fn">hasRole</span>(<span class="str">'admin'</span>);
    });

    <span class="cm">// تجاهل Routes معينة من التسجيل</span>
    <span class="cls">Pulse</span>::<span class="fn">filter</span>(<span class="kw">function</span>(<span class="cls">Entry</span> <span class="var">$entry</span>) {
        <span class="kw">return</span> !<span class="fn">str_starts_with</span>(<span class="var">$entry</span>->key, <span class="str">'/horizon'</span>);
    });
}</pre></div><div class="alert alert-info"><div class="alert-icon">💡</div><div>الـ Pulse Dashboard متاح على <code>/pulse</code> — غيّر الـ Path من <code>config/pulse.php</code>.</div></div>` },
        { title:'Pulse في Production — الأداء', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">config/pulse.php</span></div><pre class="code"><span class="cm">// استخدام Redis بدل DB للـ ingest</span>
<span class="str">'ingest'</span> => [
    <span class="str">'driver'</span> => <span class="fn">env</span>(<span class="str">'PULSE_INGEST_DRIVER'</span>, <span class="str">'redis'</span>),
    <span class="str">'redis'</span>  => [
        <span class="str">'connection'</span> => <span class="fn">env</span>(<span class="str">'PULSE_REDIS_CONNECTION'</span>, <span class="str">'default'</span>),
        <span class="str">'chunk'</span>      => <span class="num">1000</span>,
    ],
],

<span class="cm">// تقليل الـ Sample Rate</span>
<span class="str">'slow_queries'</span>  => [<span class="str">'threshold'</span> => <span class="num">1000</span>], <span class="cm">// ms</span>
<span class="str">'slow_requests'</span> => [<span class="str">'threshold'</span> => <span class="num">1000</span>],
<span class="str">'slow_jobs'</span>     => [<span class="str">'threshold'</span> => <span class="num">1000</span>],</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># تشغيل الـ Worker الخاص بـ Pulse</span>
php artisan pulse:work

<span class="cm"># حذف البيانات القديمة</span>
php artisan pulse:purge</pre></div>` },
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Laravel Pulse وما الفرق بينه وبين Telescope؟', a:`<table class="compare-table"><tr><th>Pulse</th><th>Telescope</th></tr><tr><td>Production Monitoring</td><td>Development Debugging</td></tr><tr><td>Real-time metrics (CPU، Memory)</td><td>Request by request details</td></tr><tr><td>Server health tracking</td><td>لا يتتبع السيرفر</td></tr><tr><td>خفيف على الـ Performance</td><td>ثقيل - للـ Dev فقط</td></tr><tr><td>Aggregated data</td><td>Raw request data</td></tr></table>` },
      { level:'easy', q:'إيه الـ Cards الموجودة في Pulse Dashboard؟', a:`<ul><li><strong>Servers</strong> — CPU، Memory، Storage</li><li><strong>Usage</strong> — أكثر المستخدمين نشاطاً</li><li><strong>Exceptions</strong> — الأخطاء المتكررة</li><li><strong>Slow Queries</strong> — أبطأ DB Queries</li><li><strong>Slow Jobs</strong> — أبطأ Queue Jobs</li><li><strong>Slow Requests</strong> — أبطأ HTTP Requests</li><li><strong>Queues</strong> — حالة الـ Queues</li><li><strong>Cache</strong> — Hits vs Misses</li></ul>` },
      { level:'medium', q:'إزاي بتسجل Custom Metric في Pulse؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Pulse\\Facades\\Pulse</span>;

<span class="cm">// تسجيل مبيعات — مجموع</span>
<span class="cls">Pulse</span>::<span class="fn">record</span>(
    type: <span class="str">'purchase'</span>,
    key: <span class="str">'revenue'</span>,
    value: <span class="var">$order</span>->total,
)-><span class="fn">sum</span>();

<span class="cm">// أو عد الأحداث</span>
<span class="cls">Pulse</span>::<span class="fn">record</span>(<span class="str">'api_call'</span>, <span class="str">'stripe'</span>, <span class="num">1</span>)-><span class="fn">count</span>();</pre></div>` },
      { level:'medium', q:'إزاي بتحمي الـ Pulse Dashboard وتحدد من يشوفه؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">AppServiceProvider.php</span></div><pre class="code"><span class="cls">Pulse</span>::<span class="fn">authorizeUsing</span>(<span class="kw">function</span>(<span class="var">$request</span>) {
    <span class="kw">return</span> <span class="var">$request</span>-><span class="fn">user</span>()?-><span class="fn">hasRole</span>(<span class="str">'admin'</span>);
});</pre></div>` },
      { level:'hard', q:'إزاي بتحسن أداء Pulse في Production؟', a:`<p>3 استراتيجيات:</p><ol><li><strong>Redis Ingest</strong> — بدل ما يكتب في DB مباشرة، يكتب في Redis أولاً</li><li><strong>pulse:work</strong> — Worker منفصل يعالج البيانات في الخلفية</li><li><strong>Sample Rate</strong> — تقليل نسبة التسجيل للـ Requests الكتير</li></ol><div class="code-wrap"><div class="code-top"><span class="code-lang">env</span></div><pre class="code">PULSE_INGEST_DRIVER=redis
PULSE_SERVER_SAMPLE_RATE=0.5  <span class="cm"># سجّل 50% فقط</span></pre></div>` },
    ]
  },

  // ==================== REVERB ====================
];
