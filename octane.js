// Laravel Octane
const PACKAGES = [
  {
    id:'octane', name:'Laravel Octane', icon:'🚀', theme:'theme-red',
    subtitle:'laravel/octane', category:'Performance',
    desc:'تشغيل Laravel على FrankenPHP أو Swoole أو RoadRunner لأداء خارق السرعة.',
    tags:['Performance','Speed','Swoole','FrankenPHP'],
    tutorial: {
      sections: [
        { title:'ما هو Octane؟', content:`<p class="tut-p">Octane بيخلي Laravel يشتغل بطريقة مختلفة تماماً — بدل ما كل Request يبوت الـ Application من أول، الـ App بيتحمل مرة واحدة وبيفضل في الـ Memory.</p><div class="alert alert-warn"><div class="alert-icon">⚠️</div><div>لازم تكون حذر مع الـ Memory Leaks — أي Static State بيفضل بين الـ Requests!</div></div>` },
        { title:'التثبيت والتشغيل', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require laravel/octane
php artisan octane:install

<span class="cm"># تشغيل بـ FrankenPHP (الأسهل — كل حاجة في binary واحدة)</span>
php artisan octane:frankenphp

<span class="cm"># أو Swoole (أعلى أداء)</span>
php artisan octane:start --server=swoole --workers=4 --max-requests=500

<span class="cm"># أو RoadRunner</span>
php artisan octane:start --server=roadrunner</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">env</span></div><pre class="code">OCTANE_SERVER=swoole
OCTANE_HTTPS=false</pre></div>` },
        { title:'تجنب Memory Leaks', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// ❌ خطأ — static state يفضل بين الـ Requests</span>
<span class="kw">class</span> <span class="cls">UserService</span>
{
    <span class="kw">private static</span> <span class="var">$cache</span> = [];

    <span class="kw">public static function</span> <span class="fn">getUser</span>(<span class="kw">int</span> <span class="var">$id</span>)
    {
        <span class="kw">return</span> <span class="kw">static</span>::<span class="var">$cache</span>[<span class="var">$id</span>] ??= <span class="cls">User</span>::<span class="fn">find</span>(<span class="var">$id</span>);
    }
}

<span class="cm">// ✅ صح — استخدم Dependency Injection</span>
<span class="kw">class</span> <span class="cls">UserService</span>
{
    <span class="kw">public function</span> <span class="fn">__construct</span>(<span class="kw">private</span> <span class="cls">Cache</span> <span class="var">$cache</span>) {}

    <span class="kw">public function</span> <span class="fn">getUser</span>(<span class="kw">int</span> <span class="var">$id</span>)
    {
        <span class="kw">return</span> <span class="var">$this</span>->cache-><span class="fn">remember</span>(<span class="str">"user.&#36;{id}"</span>, <span class="num">60</span>, <span class="kw">fn</span>() => <span class="cls">User</span>::<span class="fn">find</span>(<span class="var">$id</span>));
    }
}</pre></div><div class="alert alert-warn"><div class="alert-icon">⚠️</div><div>كل Service Provider بيتحمل مرة واحدة فقط — أي State فيه هيفضل طول عمر الـ Server!</div></div>` },
        { title:'Octane Cache — أسرع من Redis', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Octane\\Facades\\Octane</span>;

<span class="cm">// Octane Cache — في Memory مباشرة (أسرع من Redis)</span>
<span class="cls">Octane</span>::<span class="fn">table</span>(<span class="str">'users'</span>)-><span class="fn">set</span>(<span class="str">'key'</span>, [<span class="str">'name'</span> => <span class="str">'Ahmed'</span>]);
<span class="cls">Octane</span>::<span class="fn">table</span>(<span class="str">'users'</span>)-><span class="fn">get</span>(<span class="str">'key'</span>);

<span class="cm">// تعريف الـ Tables في config/octane.php</span>
<span class="str">'tables'</span> => [
    <span class="str">'users'</span>    => <span class="num">1000</span>, <span class="cm">// 1000 row max</span>
    <span class="str">'settings'</span> => <span class="num">100</span>,
],</pre></div>` },
        { title:'Concurrent Tasks', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Octane\\Facades\\Octane</span>;

<span class="cm">// تنفيذ مهام بالتوازي (Swoole فقط)</span>
[<span class="var">$users</span>, <span class="var">$orders</span>, <span class="var">$stats</span>] = <span class="cls">Octane</span>::<span class="fn">concurrently</span>([
    <span class="kw">fn</span>() => <span class="cls">User</span>::<span class="fn">count</span>(),
    <span class="kw">fn</span>() => <span class="cls">Order</span>::<span class="fn">pending</span>()-><span class="fn">count</span>(),
    <span class="kw">fn</span>() => <span class="cls">Stats</span>::<span class="fn">today</span>(),
]);

<span class="cm">// بدل ما تنفذهم واحد ورا التاني
// بتنفذهم كلهم مع بعض — أسرع بكتير!</span></pre></div><div class="alert alert-info"><div class="alert-icon">💡</div><div>الـ Concurrent Tasks بتقلل وقت Response من مجموع الأوقات لأطولها فقط.</div></div>` },
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Octane وإيه الـ Servers اللي بيدعمها؟', a:`<p>Octane بيشغل Laravel على high-performance servers — التطبيق بيتحمل مرة واحدة في الـ Memory:</p><ul><li><strong>FrankenPHP</strong> — الأحدث، الأسهل، binary واحدة</li><li><strong>Swoole</strong> — PHP async extension، الأعلى أداء</li><li><strong>RoadRunner</strong> — Go-based server</li></ul><p>بيحقق 10x+ تحسن مقارنة بـ PHP-FPM.</p>` },
      { level:'easy', q:'إيه الفرق بين FrankenPHP وـ Swoole في Octane؟', a:`<table class="compare-table"><tr><th>FrankenPHP</th><th>Swoole</th></tr><tr><td>لا يحتاج Extension إضافية</td><td>يحتاج تثبيت Swoole Extension</td></tr><tr><td>أسهل في الـ Setup</td><td>أداء أعلى للـ Concurrent Requests</td></tr><tr><td>يدعم HTTP/3</td><td>لا يدعم HTTP/3</td></tr><tr><td>Octane Tables غير متاحة</td><td>Octane Tables متاحة</td></tr></table>` },
      { level:'medium', q:'إزاي بتتجنب Memory Leaks في Octane؟', a:`<p>أهم القواعد:</p><ul><li>لا تستخدم <code>static</code> properties لتخزين State</li><li>لا تربط Closures بـ Singleton Services</li><li>استخدم <code>--max-requests=500</code> لإعادة تشغيل Workers دورياً</li></ul><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// ❌ Memory Leak</span>
<span class="kw">static</span> <span class="var">$data</span> = [];
<span class="cm">// ✅ OK</span>
<span class="var">$this</span>->cache-><span class="fn">put</span>(<span class="str">'key'</span>, <span class="var">$data</span>);</pre></div>` },
      { level:'medium', q:'إيه هو Octane Cache وامتى تستخدمه؟', a:`<p>Octane Cache هو In-Memory Table مشتركة بين كل الـ Workers — أسرع من Redis لأن البيانات في نفس الـ Process Memory.</p><p>استخدمه للـ Data الثابتة زي الإعدادات والـ Lookups السريعة. مش مناسب للـ Data اللي بتتغير كتير.</p>` },
      { level:'hard', q:'إزاي بتنفذ Concurrent Tasks في Octane؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code">[<span class="var">$users</span>, <span class="var">$posts</span>] = <span class="cls">Octane</span>::<span class="fn">concurrently</span>([
    <span class="kw">fn</span>() => <span class="cls">User</span>::<span class="fn">count</span>(),
    <span class="kw">fn</span>() => <span class="cls">Post</span>::<span class="fn">published</span>()-><span class="fn">count</span>(),
]);</pre></div><p>متاحة فقط مع Swoole. الفكرة إن كل Task بتتنفذ في Coroutine منفصل — الكل بيشتغل مع بعض، مش واحد ورا التاني.</p>` },
      { level:'hard', q:'إيه أكبر تحدي في استخدام Octane وإزاي تتعامل معه؟', a:`<p><strong>Memory Leaks</strong> — الـ Application بيفضل في الـ Memory بين الـ Requests. أي State Static أو Singleton بيفضل من Request للتاني. الحل:</p><ul><li>استخدم Dependency Injection بدل Static Properties</li><li>اعمل <code>Octane::tick()</code> لـ cleanup</li><li>راقب الـ Memory Usage</li></ul>` },
    ]
  },

  // ==================== PENNANT ====================
];
