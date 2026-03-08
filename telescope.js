// Laravel Telescope
const PACKAGES = [
  {
    id:'telescope', name:'Laravel Telescope', icon:'🔬', theme:'theme-purple',
    subtitle:'laravel/telescope', category:'Debugging',
    desc:'أداة Debugging احترافية — بتسجل كل Requests، Queries، Jobs، Exceptions في Dashboard.',
    tags:['Debug','Monitoring','Development','Logs'],
    tutorial: {
      sections: [
        { title:'ما هو Telescope؟', content:`<p class="tut-p">Telescope هو الـ Debugger الشامل للـ Laravel — بيسجل كل حاجة بتحصل في تطبيقك.</p><div class="feat-grid"><div class="feat-item"><div class="feat-emoji">🌐</div><div class="feat-t">HTTP Requests</div><div class="feat-d">كل طلب، الـ Headers والـ Response</div></div><div class="feat-item"><div class="feat-emoji">🗃️</div><div class="feat-t">DB Queries</div><div class="feat-d">كل Query مع وقت التنفيذ</div></div><div class="feat-item"><div class="feat-emoji">📬</div><div class="feat-t">Emails & Notifications</div><div class="feat-d">معاينة كل إيميل قبل الإرسال</div></div><div class="feat-item"><div class="feat-emoji">⚡</div><div class="feat-t">Jobs & Queues</div><div class="feat-d">تتبع كل Job من البداية للنهاية</div></div></div>` },
        { title:'التثبيت', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate</pre></div><div class="alert alert-warn"><div class="alert-icon">⚠️</div><div>Telescope لـ Development فقط. لا تثبته في Production إلا لو عارف إيه بتعمل.</div></div>` },
        { title:'حماية Dashboard في Production', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">app/Providers/TelescopeServiceProvider.php</span></div><pre class="code"><span class="kw">protected function</span> <span class="fn">gate</span>()
{
    <span class="cls">Gate</span>::<span class="fn">define</span>(<span class="str">'viewTelescope'</span>, <span class="kw">function</span>(<span class="var">$user</span>) {
        <span class="kw">return</span> <span class="fn">in_array</span>(<span class="var">$user</span>->email, [<span class="str">'admin@yourapp.com'</span>]);
    });
}</pre></div>` },
        { title:'الـ Watchers', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">config/telescope.php</span></div><pre class="code"><span class="str">'watchers'</span> => [
    <span class="cm">// تتبع Slow Queries فقط (أبطأ من 100ms)</span>
    <span class="cls">Watchers\\QueryWatcher</span>::<span class="kw">class</span> => [
        <span class="str">'enabled'</span>   => <span class="fn">env</span>(<span class="str">'TELESCOPE_QUERY_WATCHER'</span>, <span class="kw">true</span>),
        <span class="str">'slow'</span>      => <span class="num">100</span>,
    ],
    <span class="cm">// تتبع Slow Requests فقط</span>
    <span class="cls">Watchers\\RequestWatcher</span>::<span class="kw">class</span> => [
        <span class="str">'enabled'</span>   => <span class="fn">env</span>(<span class="str">'TELESCOPE_REQUEST_WATCHER'</span>, <span class="kw">true</span>),
        <span class="str">'size_limit'</span> => <span class="fn">env</span>(<span class="str">'TELESCOPE_RESPONSE_SIZE_LIMIT'</span>, <span class="num">64</span>),
    ],
],</pre></div>` }
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Laravel Telescope وما هي أبرز مميزاته؟', a:`<p>Telescope هو debugging dashboard بيسجل ويعرض:</p><ul><li>HTTP Requests والـ Responses</li><li>Database Queries مع وقت التنفيذ</li><li>Emails والـ Notifications</li><li>Jobs والـ Queue Workers</li><li>Cache Operations</li><li>Exceptions والـ Errors</li><li>Scheduled Tasks</li></ul>` },
      { level:'medium', q:'إزاي بتمنع Telescope من تسجيل بيانات حساسة؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cls">Telescope</span>::<span class="fn">filter</span>(<span class="kw">function</span>(<span class="cls">IncomingEntry</span> <span class="var">$entry</span>) {
    <span class="cm">// سجّل الـ Errors فقط في Production</span>
    <span class="kw">if</span> (<span class="fn">app</span>()-><span class="fn">environment</span>(<span class="str">'production'</span>)) {
        <span class="kw">return</span> <span class="var">$entry</span>-><span class="fn">isReportableException</span>() ||
               <span class="var">$entry</span>-><span class="fn">isFailedJob</span>();
    }
    <span class="kw">return</span> <span class="kw">true</span>;
});</pre></div>` },
      { level:'hard', q:'إيه الفرق بين Telescope وـ Debugbar؟ امتى تستخدم كل منهم؟', a:`<table class="compare-table"><tr><th></th><th>Telescope</th><th>Debugbar</th></tr><tr><td><strong>الواجهة</strong></td><td>Dashboard منفصل</td><td>Toolbar في الصفحة</td></tr><tr><td><strong>السجلات</strong></td><td>محفوظة في DB</td><td>في memory فقط</td></tr><tr><td><strong>الاستخدام</strong></td><td>Production debugging</td><td>Local dev فقط</td></tr><tr><td><strong>الـ Jobs</strong></td><td>يتتبعها</td><td>لا</td></tr></table>` },
    ]
  },

  // ==================== SCOUT ====================
];
