// Laravel Sanctum
const PACKAGES = [
  {
    id:'sanctum', name:'Laravel Sanctum', icon:'🔐', theme:'theme-green',
    subtitle:'laravel/sanctum', category:'Authentication',
    desc:'نظام مصادقة خفيف الوزن لـ SPAs وـ Mobile Apps وـ APIs البسيطة.',
    tags:['Auth','API','SPA','Tokens'],
    tutorial: {
      sections: [
        {
          title:'ما هو Sanctum؟',
          content:`
            <p class="tut-p">Laravel Sanctum بيوفر نظام مصادقة بسيط وخفيف للـ SPAs وتطبيقات الموبايل والـ APIs. يعمل بطريقتين: <strong>API Tokens</strong> للموبايل، و<strong>Session Cookies</strong> للـ SPA.</p>
            <div class="feat-grid">
              <div class="feat-item"><div class="feat-emoji">🪙</div><div class="feat-t">API Tokens</div><div class="feat-d">إصدار tokens للمستخدمين مع تحديد الصلاحيات</div></div>
              <div class="feat-item"><div class="feat-emoji">🍪</div><div class="feat-t">SPA Auth</div><div class="feat-d">مصادقة بالـ Cookie للـ Single Page Apps</div></div>
              <div class="feat-item"><div class="feat-emoji">📱</div><div class="feat-t">Mobile Auth</div><div class="feat-d">مصادقة تطبيقات الموبايل بسهولة</div></div>
              <div class="feat-item"><div class="feat-emoji">🛡️</div><div class="feat-t">Token Abilities</div><div class="feat-d">تحديد ما يقدر كل token يعمله</div></div>
            </div>`
        },
        {
          title:'التثبيت',
          content:`
            <div class="steps">
              <div class="step-item"><strong style='margin-right:3rem'>تثبيت الـ Package</strong>
                <div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div>
                <pre class="code">composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
php artisan migrate</pre></div></div>
              <div class="step-item"><strong style='margin-right:3rem'>إضافة HasApiTokens للـ User Model</strong>
                <div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">app/Models/User.php</span></div>
                <pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Sanctum\\HasApiTokens</span>;

<span class="kw">class</span> <span class="cls">User</span> <span class="kw">extends</span> <span class="cls">Authenticatable</span>
{
    <span class="kw">use</span> HasApiTokens, HasFactory, Notifiable;
}</pre></div></div>
              <div class="step-item"><strong style='margin-right:3rem'>حماية الـ Routes</strong>
                <div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">routes/api.php</span></div>
                <pre class="code"><span class="cls">Route</span>::<span class="fn">middleware</span>(<span class="str">'auth:sanctum'</span>)-><span class="fn">group</span>(<span class="kw">function</span>() {
    <span class="cls">Route</span>::<span class="fn">get</span>(<span class="str">'/user'</span>, <span class="kw">fn</span>(<span class="cls">Request</span> <span class="var">$r</span>) => <span class="var">$r</span>-><span class="fn">user</span>());
    <span class="cls">Route</span>::<span class="fn">get</span>(<span class="str">'/profile'</span>, [<span class="cls">ProfileController</span>::<span class="kw">class</span>, <span class="str">'show'</span>]);
});</pre></div></div>
            </div>`
        },
        {
          title:'إصدار وإدارة الـ Tokens',
          content:`
            <div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">AuthController.php</span></div>
            <pre class="code"><span class="cm">// إصدار Token</span>
<span class="kw">public function</span> <span class="fn">login</span>(<span class="cls">Request</span> <span class="var">$request</span>)
{
    <span class="var">$user</span> = <span class="cls">User</span>::<span class="fn">where</span>(<span class="str">'email'</span>, <span class="var">$request</span>->email)->first();

    <span class="kw">if</span> (!<span class="var">$user</span> || !<span class="cls">Hash</span>::<span class="fn">check</span>(<span class="var">$request</span>->password, <span class="var">$user</span>->password)) {
        <span class="kw">return</span> <span class="fn">response</span>()->json([<span class="str">'message'</span> => <span class="str">'بيانات خاطئة'</span>], <span class="num">401</span>);
    }

    <span class="cm">// إصدار Token بصلاحيات محددة</span>
    <span class="var">$token</span> = <span class="var">$user</span>-><span class="fn">createToken</span>(<span class="str">'mobile-app'</span>, [<span class="str">'read'</span>, <span class="str">'write'</span>]);

    <span class="kw">return</span> <span class="fn">response</span>()->json([
        <span class="str">'token'</span> => <span class="var">$token</span>->plainTextToken,
        <span class="str">'user'</span>  => <span class="var">$user</span>,
    ]);
}

<span class="cm">// حذف الـ Token الحالي (Logout)</span>
<span class="kw">public function</span> <span class="fn">logout</span>(<span class="cls">Request</span> <span class="var">$request</span>)
{
    <span class="var">$request</span>-><span class="fn">user</span>()-><span class="fn">currentAccessToken</span>()-><span class="fn">delete</span>();
    <span class="kw">return</span> <span class="fn">response</span>()->json([<span class="str">'message'</span> => <span class="str">'تم تسجيل الخروج'</span>]);
}

<span class="cm">// حذف كل الـ Tokens</span>
<span class="var">$user</span>-><span class="fn">tokens</span>()-><span class="fn">delete</span>();

<span class="cm">// التحقق من الصلاحيات</span>
<span class="kw">if</span> (<span class="var">$user</span>-><span class="fn">tokenCan</span>(<span class="str">'write'</span>)) {
    <span class="cm">// له صلاحية الكتابة</span>
}</pre></div>
            <div class="alert alert-info"><div class="alert-icon">ℹ️</div><div>الـ Token بيُرجع مرة واحدة بس عند الإنشاء — احفظه فوراً! بعد كده بيتخزن مشفر في الـ DB.</div></div>`
        },
        {
          title:'SPA Authentication',
          content:`
            <p class="tut-p">للـ SPA، Sanctum بيستخدم الـ Session Cookie بدل الـ Token. أول خطوة هي CSRF handshake.</p>
            <div class="code-wrap"><div class="code-top"><span class="code-lang">javascript</span><span class="code-file">Frontend (Vue/React)</span></div>
            <pre class="code"><span class="cm">// Step 1: CSRF Cookie</span>
<span class="kw">await</span> <span class="fn">axios</span>.<span class="fn">get</span>(<span class="str">'/sanctum/csrf-cookie'</span>);

<span class="cm">// Step 2: Login</span>
<span class="kw">await</span> <span class="fn">axios</span>.<span class="fn">post</span>(<span class="str">'/login'</span>, {
    email: <span class="str">'user@example.com'</span>,
    password: <span class="str">'password'</span>,
});

<span class="cm">// Step 3: كل الـ Requests التالية authenticated تلقائياً</span>
<span class="kw">const</span> user = <span class="kw">await</span> <span class="fn">axios</span>.<span class="fn">get</span>(<span class="str">'/api/user'</span>);</pre></div>
            <div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">config/sanctum.php</span></div>
            <pre class="code"><span class="cm">// تحديد الـ Domains المسموح بيها</span>
<span class="str">'stateful'</span> => <span class="fn">explode</span>(<span class="str">','</span>, <span class="fn">env</span>(<span class="str">'SANCTUM_STATEFUL_DOMAINS'</span>,
    <span class="fn">sprintf</span>(<span class="str">'%s%s'</span>,
        <span class="str">'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1'</span>,
        <span class="cls">Sanctum</span>::<span class="fn">currentApplicationUrlWithPort</span>()
    )
)),</pre></div>`
        },
        {
          title:'Token Expiration',
          content:`
            <div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">config/sanctum.php</span></div>
            <pre class="code"><span class="cm">// Expiration بالدقائق (null = لا ينتهي)</span>
<span class="str">'expiration'</span> => <span class="num">525600</span>, <span class="cm">// سنة كاملة</span>

<span class="cm">// حذف الـ Tokens المنتهية تلقائياً</span>
<span class="str">'token_prefix'</span> => <span class="fn">env</span>(<span class="str">'SANCTUM_TOKEN_PREFIX'</span>, <span class="str">''</span>),</pre></div>
            <div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">routes/console.php</span></div>
            <pre class="code"><span class="cm">// Prune expired tokens يومياً</span>
<span class="cls">Schedule</span>::<span class="fn">command</span>(<span class="str">'sanctum:prune-expired --hours=24'</span>)-><span class="fn">daily</span>();</pre></div>`
        }
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Laravel Sanctum وامتى بتستخدمه؟', a:`<p>Sanctum هو package خفيف للمصادقة. بتستخدمه في:</p><ul><li><strong>SPAs</strong> — بيستخدم Session Cookies</li><li><strong>Mobile Apps</strong> — بيستخدم API Tokens</li><li><strong>APIs بسيطة</strong> — لما مش محتاج OAuth كامل</li></ul><p>الفرق عن Passport: Sanctum أبسط وأسرع، Passport بيوفر OAuth2 كامل.</p>` },
      { level:'easy', q:'إزاي بتعمل API Token وإزاي بتحدد صلاحياته؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// إنشاء Token بصلاحيات</span>
<span class="var">$token</span> = <span class="var">$user</span>-><span class="fn">createToken</span>(<span class="str">'app-name'</span>, [<span class="str">'read'</span>, <span class="str">'write'</span>, <span class="str">'delete'</span>]);

<span class="cm">// التحقق من الصلاحية</span>
<span class="kw">if</span> (<span class="var">$request</span>-><span class="fn">user</span>()-><span class="fn">tokenCan</span>(<span class="str">'delete'</span>)) {
    <span class="cm">// له صلاحية الحذف</span>
}</pre></div>` },
      { level:'medium', q:'إيه الفرق بين SPA Authentication وـ Token Authentication في Sanctum؟', a:`<table class="compare-table"><tr><th></th><th>SPA Auth</th><th>Token Auth</th></tr><tr><td><strong>الآلية</strong></td><td>Session Cookie</td><td>Bearer Token</td></tr><tr><td><strong>الاستخدام</strong></td><td>Frontend على نفس الـ Domain</td><td>Mobile / Third-party</td></tr><tr><td><strong>CSRF</strong></td><td>مطلوب</td><td>غير مطلوب</td></tr><tr><td><strong>الأمان</strong></td><td>أكثر أماناً من XSS</td><td>مناسب للـ stateless</td></tr></table>` },
      { level:'medium', q:'إزاي بتتعامل مع CSRF في SPA Authentication؟', a:`<p>خطوتين أساسيتين:</p><div class="code-wrap"><div class="code-top"><span class="code-lang">javascript</span></div><pre class="code"><span class="cm">// 1. أول طلب دايماً</span>
axios.defaults.withCredentials = true;
<span class="kw">await</span> axios.get(<span class="str">'/sanctum/csrf-cookie'</span>);

<span class="cm">// 2. Axios بيبعت XSRF-TOKEN header تلقائياً</span>
<span class="kw">await</span> axios.post(<span class="str">'/login'</span>, { email, password });</pre></div>` },
      { level:'medium', q:'إزاي بتعمل Token Expiration وتحذف الـ Tokens المنتهية؟', a:`<p>في <code>config/sanctum.php</code>، حدد الـ expiration بالدقائق:</p><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="str">'expiration'</span> => <span class="num">60</span> * <span class="num">24</span>, <span class="cm">// يوم كامل</span>

<span class="cm">// Pruning في Scheduler</span>
<span class="cls">Schedule</span>::<span class="fn">command</span>(<span class="str">'sanctum:prune-expired --hours=24'</span>)-><span class="fn">daily</span>();</pre></div>` },
      { level:'medium', q:'إزاي بتعمل مصادقة للموبايل ببيانات الـ User العادية؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="kw">public function</span> <span class="fn">mobileLogin</span>(<span class="cls">Request</span> <span class="var">$request</span>)
{
    <span class="var">$request</span>-><span class="fn">validate</span>([
        <span class="str">'email'</span>       => <span class="str">'required|email'</span>,
        <span class="str">'password'</span>    => <span class="str">'required'</span>,
        <span class="str">'device_name'</span> => <span class="str">'required'</span>,
    ]);

    <span class="var">$user</span> = <span class="cls">User</span>::<span class="fn">where</span>(<span class="str">'email'</span>, <span class="var">$request</span>->email)->first();

    <span class="kw">if</span> (!<span class="var">$user</span> || !<span class="cls">Hash</span>::<span class="fn">check</span>(<span class="var">$request</span>->password, <span class="var">$user</span>->password)) {
        <span class="kw">throw</span> <span class="cls">ValidationException</span>::<span class="fn">withMessages</span>([
            <span class="str">'email'</span> => [<span class="str">'بيانات الدخول غلط.'</span>],
        ]);
    }

    <span class="kw">return</span> <span class="var">$user</span>-><span class="fn">createToken</span>(<span class="var">$request</span>->device_name)->plainTextToken;
}</pre></div>` },
      { level:'hard', q:'إزاي بتعمل Multi-Guard مع Sanctum؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// config/auth.php</span>
<span class="str">'guards'</span> => [
    <span class="str">'admin-api'</span> => [
        <span class="str">'driver'</span>   => <span class="str">'sanctum'</span>,
        <span class="str">'provider'</span> => <span class="str">'admins'</span>,
    ],
],
<span class="str">'providers'</span> => [
    <span class="str">'admins'</span> => [<span class="str">'driver'</span> => <span class="str">'eloquent'</span>, <span class="str">'model'</span> => <span class="cls">Admin</span>::<span class="kw">class</span>],
],

<span class="cm">// الاستخدام في Routes</span>
<span class="cls">Route</span>::<span class="fn">middleware</span>(<span class="str">'auth:admin-api'</span>)-><span class="fn">group</span>(<span class="kw">function</span>() { ... });</pre></div>` },
      { level:'hard', q:'امتى تختار Sanctum وامتى تختار Passport؟', a:`<table class="compare-table"><tr><th>Sanctum</th><th>Passport</th></tr><tr><td>SPA + Mobile + Simple APIs</td><td>OAuth2 كامل مطلوب</td></tr><tr><td>لما أنت تتحكم في كل الـ Clients</td><td>Third-party clients</td></tr><tr><td>بسيط وسريع التثبيت</td><td>معقد لكن أقوى</td></tr><tr><td>لا يدعم Authorization Code Grant</td><td>يدعم كل OAuth2 Grants</td></tr></table><div class="alert alert-info"><div class="alert-icon">💡</div><div>90% من المشاريع تحتاج Sanctum وليس Passport.</div></div>` },
    ]
  },

  // ==================== CASHIER STRIPE ====================
];
